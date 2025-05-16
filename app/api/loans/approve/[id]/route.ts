import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import LoanModel from "@/models/Loan";

export const dynamicParams = true;

export async function PUT(req: NextRequest, { params }: { params: any }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    await connectToDatabase();
    const loanId = params.id;

    const updatedLoan = await LoanModel.findOneAndUpdate(
      { _id: loanId, status: "verified" },
      { status: "approved" },
      { new: true }
    );

    if (!updatedLoan) {
      return NextResponse.json(
        { success: false, error: "Loan not found or not verified" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, loan: updatedLoan },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
