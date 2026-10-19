import { CreateBookingDTO } from "../dtos/booking.dto";
import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKeyWithLock,
} from "../repositories/booking.repository";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/helpers/generateIdempotenyKey.helper";

import prismaClient from "../prisma/client";
import { redlock } from "../config/redis.config";
import { redisConig } from "../config";
import { mailerQueue } from "../queues/email.queue";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import logger from "../config/logger.config";

// [Concurrency Issue] Here we are not allowing 2 users to block a same seat at all ,or maually store in some ds 
export async function createBookingService(createBookingDTO: CreateBookingDTO) {
  const ttl = redisConig.LOCK_TTL;
  const bookingResource = `hotel:${createBookingDTO.hotelId}-user:${createBookingDTO.userId}`;

  try {
    await redlock.acquire([bookingResource], ttl )
      const booking = await createBooking({
        userId: createBookingDTO.userId,
        hotelId: createBookingDTO.hotelId,
        totalGuests: createBookingDTO.totalGuests,
        bookingAmount: createBookingDTO.bookingAmount,
      });

      const idempotencyKey = generateIdempotencyKey();

      await createIdempotencyKey(idempotencyKey, booking.id);

      return {
        bookingId: booking.id,
        idempotencyKey: idempotencyKey,
      };
  } catch (error) {
    throw new InternalServerError(
      "Failed to acquire lock for booking resource",
    );
  }
}

// [Pesimestic Locking] handling concurrency issue by same user for finiliazing the booking
export async function confirmBookingService(idempotencyKey: string) {
  // Execute the database transaction
  const booking = await prismaClient.$transaction(async (tx) => {
    const idempotencyKeyData = await getIdempotencyKeyWithLock(
      tx,
      idempotencyKey,
    );

    if (!idempotencyKeyData || !idempotencyKeyData.bookingId) {
      throw new NotFoundError("Idempotency key not found");
    }

    if (idempotencyKeyData.finalized) {
      throw new BadRequestError("Idempotency key already finalized");
    }

    const confirmedBooking = await confirmBooking(
      tx,
      idempotencyKeyData.bookingId,
    );
    await finalizeIdempotencyKey(tx, idempotencyKey);

    return confirmedBooking;
  });

  // Dispatch the email job to BullMQ AFTER the transaction commits
  try {
    await mailerQueue.add(MAILER_PAYLOAD, {
      to: booking.userId, // get via headers
      subject: "Booking Confirmed Successfully",
      templateId: "booking-confirmation",
      params: {
        name: booking.userId, // get via headers
        orderId: booking.id.toString(),
        hotelId: booking.hotelId,
        totalGuests: booking.totalGuests,
        bookingAmount: booking.bookingAmount,
        appName: "Airbnb",
      },
    });
  } catch (error) {
    // Log the failure, but do not throw an error that breaks the response.
    // The booking is already safely confirmed in the database.
    logger.error(
      `Failed to enqueue confirmation email for booking ${booking.id}:`,
      error,
    );
  }

  return booking;
}
