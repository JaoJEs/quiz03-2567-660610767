import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Niphitpon Thosap",
    studentId: "6606107677777",
  });
};
