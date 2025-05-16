import mongoose, { Document } from "mongoose";

export interface ILoan extends Document {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  amount: number;
  loanTenure: number;
  employmentStatus: string;
  employmentAddress: string;
  reason: string;
  status: "pending" | "approved" | "verified";
  appliedDate: Date;
  verifiedAt?: { type: Date; default: null };
  approvedAt?: { type: Date; default: null };
}

const LoanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: { type: String, required: true },
  amount: { type: Number, required: true },
  loanTenure: { type: Number, required: true },
  employmentStatus: { type: String, required: true },
  employmentAddress: { type: String, required: true },
  reason: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "verified"],
    default: "pending",
  },
  appliedDate: { type: Date, default: Date.now },
  verifiedAt: { type: Date, default: null },
  approvedAt: { type: Date, default: null },
});

const LoanModel =
  mongoose.models?.Loan || mongoose.model<ILoan>("Loan", LoanSchema);

export default LoanModel;
