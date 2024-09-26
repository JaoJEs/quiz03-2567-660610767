import { DB, readDB, writeDB } from "@lib/DB";
import { checkToken } from "@lib/checkToken";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  readDB();
  return NextResponse.json({
    ok: true,
    rooms:DB.rooms,//rooms:
    totalRoom:DB.rooms.length,//totalRooms:
  });
};

export const POST = async (request: NextRequest) => {
  const payload = checkToken();
  if(payload === null)
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid token",
      },
      { status: 401 }
    );

  readDB();
    const body = await request.json();
    const { roomName } = body;
    for(const room of DB.rooms)
      if(room.roomName === roomName)
        return NextResponse.json(
          {
            ok: false,
            message: `Room ${roomName} already exists`,
          },
          { status: 400 }
        );

  const roomId = nanoid();
  DB.rooms.push({
    roomID:roomId,
    roomName : roomName,
  });

  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${roomName} has been created`,
  });
};
