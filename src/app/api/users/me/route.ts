import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB();

export async function GET(request: NextRequest) {
  // extract data from token
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");

  // check if user is not present
  if (!user) {
    return NextResponse.json({ error: "User does not exist" }, { status: 400 });
  }

  return NextResponse.json({ user }, { status: 200 });
}
