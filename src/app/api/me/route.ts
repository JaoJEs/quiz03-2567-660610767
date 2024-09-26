import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    ok: true,
    fullName: "Niphitpon Thosap",
    studentId: "660610767",
  });
};
