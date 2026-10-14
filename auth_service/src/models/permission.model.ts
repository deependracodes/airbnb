import { Schema, model, Document } from "mongoose";

export interface IPermission extends Document {
  name: string;
  description?: string;
  resource: string;
  action: string;
  createdAt: Date;
  updatedAt: Date;
}

const permissionSchema = new Schema<IPermission>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  resource: { type: String, required: true }, // e.g., 'hotel', 'booking'
  action: { type: String, required: true },     // e.g., 'create', 'read', 'delete'
}, { timestamps: true });

export const PermissionModel = model<IPermission>("Permission", permissionSchema);

/*
{
  "_id": "1",
  "name": "hotels:create",
  "description": "Allows creating a new hotel listing",
  "resource": "hotels",
  "action": "create"
}

{
  "_id": "2",
  "name": "hotels:delete",
  "description": "Allows deleting a hotel listing",
  "resource": "hotels",
  "action": "delete"
}
*/