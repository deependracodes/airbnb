import { Schema, model, Document, Types } from "mongoose";

export interface IRole extends Document {
  name: string;
  description?: string;
  permissions: Types.ObjectId[]; // References to Permission documents
  createdAt: Date;
  updatedAt: Date;
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true }, 
  description: { type: String },
  permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
}, { timestamps: true });

export const RoleModel = model<IRole>("Role", roleSchema);

/*

{
  "_id": "1",
  "name": "HOTEL_MANAGER",
  "description": "Manages hotel properties",
  "permissions": [
    "1",
    "2"
  ]
}

# Roles we can have fully fledged

1. Guest (Standard User)
   - Scope: The default role assigned upon signup.
   - Capabilities: Browses hotel listings, views room availability, creates bookings, cancels own reservations, writes and edits reviews for completed stays, and receives notification alerts.

2. Host (Property Owner)
   - Scope: Manages property portfolios and listings.
   - Capabilities: Creates and updates hotel properties, manages room inventory and pricing, views bookings associated with their specific properties, and responds to guest reviews.

3. Hotel Manager / Property Staff
   - Scope: Operational management delegated by a host.
   - Capabilities: Handles daily operations, updates availability status, and manages guest communications for without holding root ownership of the listing account.

4. Customer Support / Moderator
   - Scope: Dispute resolution and content governance.
   - Capabilities: Accesses booking records to assist with cancellations or refunds, moderates or removes flagged reviews, and handles user account disputes.

5. Super Admin (Main Admin)
   - Scope: Full system-wide control and platform governance.
   - Capabilities: Manages global system settings, assigns roles and custom permissions to users, oversees all microservice data layers, and handles system-level audits.

*/