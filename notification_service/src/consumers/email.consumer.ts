import { Job, tryCatch, Worker } from "bullmq";
import { NotificationDto } from "../dtos/notification.dto";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { getRedisConnObject } from "../config/redis.config";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { renderMailTemplate } from "../templates/templates.handler";
import { sendEmail } from "../services/mailer.service";
import logger from "../config/logger.config";

export const setupMailerWorker = () => {
  try {
    const emailProcessor = new Worker<NotificationDto>(
      MAILER_QUEUE, // Name of the queue
      async (job: Job) => {
        if (job.name !== MAILER_PAYLOAD) {
          throw new Error("Invalid job name");
        }

        // call the service layer from here.
        const payload = job.data;
        console.log(`Processing email for: ${JSON.stringify(payload)}`);

        const emailContent = await renderMailTemplate(
          payload.templateId,
          payload.params,
        );


        await sendEmail(payload.to, payload.subject, emailContent);

        logger.info(
          `Email sent to ${payload.to} with subject "${payload.subject}"`,
        );
      }, // Process function
      {
        connection: getRedisConnObject(),
      },
    );

    emailProcessor.on("failed", (job: Job | undefined, err: Error) => {
      console.error(`Email processing failed for job ID ${job?.id}:`, err);
    });

    emailProcessor.on("completed", () => {
      console.log("Email processing completed successfully");
    });
  } catch (error) {
    console.log("email consumer failed", error);
  }
};
