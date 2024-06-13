import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define an interface for the User model
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

// Create the schema
const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  terms: { type: Boolean, required: true },
});

// Hash the password before saving the user model
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

// Create and export the model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
