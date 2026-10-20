import { Schema, model, Document, Types } from "mongoose";

export type UserRole = "admin" | "host" | "guest";

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  roles: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "host", "guest"],
      default: "guest",
      required: true,
    },
    roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
  },
  { timestamps: true },
);

export const UserModel = model<IUser>("User", userSchema);

/*

{
  "_id": "670f1c4d5e6f7a8b9c010203",
  "username": "alex_manager",
  "email": "alex@airbnb-clone.com",
  "passwordHash": "$2b$10$e8fY...",
  "role" : "host"
  "roles": [
    "1"
  ]

  by defualt he has some permissions hotel:create hotel:read hotel:update hotle:delete etc...
}

*/
