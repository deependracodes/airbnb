import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  roles: Types.ObjectId[]; // References to Role documents
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  roles: [{ type: Schema.Types.ObjectId, ref: "Role" }],
}, { timestamps: true });

export const UserModel = model<IUser>("User", userSchema);

/*

{
  "_id": "670f1c4d5e6f7a8b9c010203",
  "username": "alex_manager",
  "email": "alex@airbnb-clone.com",
  "passwordHash": "$2b$10$e8fY...",
  "roles": [
    "1"
  ]

  by defualt he has 2 permissions hotel:create hotle:delete
}

*/