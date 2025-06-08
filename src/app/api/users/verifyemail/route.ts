import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const reqBody = await request.json(); // request body
    const { token } = reqBody; // destructuring request body
    console.log("token", token);

    // gt = greater than according token verification time is less than current time
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    // check if user is not present
    if (!user) {
      return NextResponse.json(
        { error: "Invalid or Expired Token" },
        { status: 400 }
      );
    }
    console.log("user", user);

    // set isVerified to true because by defalut it is false then we will set it to true
    user.isVerified = true;
    // remove verifyToken and verifyTokenExpiry from the user document because we don't need it anymore
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    // save the user
    const updatedUser = await user.save();
    console.log("updatedUser", updatedUser);
    // return success response
    return NextResponse.json({
      success: true,
      message: "Email Verified Successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
