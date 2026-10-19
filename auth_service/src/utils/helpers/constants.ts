export const SYSTEM_PERMISSIONS = [
  // Hotel / Property Management
  { name: "hotels:create", description: "Allows creating a new hotel listing", resource: "hotels", action: "create" },
  { name: "hotels:read", description: "Allows viewing hotel listings and search", resource: "hotels", action: "read" },
  { name: "hotels:update", description: "Allows updating hotel listings", resource: "hotels", action: "update" },
  { name: "hotels:delete", description: "Allows deleting hotel listings", resource: "hotels", action: "delete" },

  // Booking Management
  { name: "bookings:create", description: "Allows creating a booking reservation", resource: "bookings", action: "create" },
  { name: "bookings:read", description: "Allows viewing booking details", resource: "bookings", action: "read" },
  { name: "bookings:cancel", description: "Allows canceling a booking reservation", resource: "bookings", action: "cancel" },

  // Review Management
  { name: "reviews:create", description: "Allows writing a review for completed stays", resource: "reviews", action: "create" },
  { name: "reviews:read", description: "Allows viewing reviews", resource: "reviews", action: "read" },
  { name: "reviews:update", description: "Allows editing reviews", resource: "reviews", action: "update" },
  { name: "reviews:delete", description: "Allows deleting reviews", resource: "reviews", action: "delete" },
];