import mongoose, { Schema, Document, mongo } from "mongoose";

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    avatar: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    role: "patient" | "doctor" | "admin";
    phone?: string;
    dateOfBirth?: Date;
    gender?: "male" | "female" | "other";
    profilePicture?: string;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address",
            ],
        },
        password: {
            type: String,
            minlength: [8, "Password must be at least 6 characters long"],
        },
        avatar:{
            type: String
        },
        verifyCode: {
            type: String,
            required: [true, "Verification code is required"],
        },
        verifyCodeExpiry: {
            type: Date,
            required: [true, "Verification Expiry code is required"],
        },
        isVerified:{
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            required: [true, "User role is required"],
            enum: {
                values: ["patient", "doctor", "admin"],
                message: "Role must be either 'patient', 'doctor', or 'admin'",
            },
            default: "patient",
        },
        phone: {
            type: String,
            trim: true,
            match: [
                /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                "Please enter a valid phone number",
            ],
        },
        dateOfBirth: {
            type: Date,
            validate: {
                validator: function (this: IUser, value: Date) {
                    return value < new Date();
                },
                message: "Date of birth must be in the past",
            },
        },
        gender: {
            type: String,
            enum: {
                values: ["male", "female", "other"],
                message: "Gender must be either 'male', 'female', or 'other'",
            },
        },
        profilePicture: {
            type: String,
        },
        lastLogin: {
            type: Date,
        },
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

const UserModel = mongoose.models.User as mongoose.Model<IUser> ||
mongoose.model<IUser>("User", UserSchema);

export default UserModel;
