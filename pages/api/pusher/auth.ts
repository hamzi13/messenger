import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { pusherServer } from "@/app/libs/pusher";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const session = await getServerSession(request, response, authOptions);
  
  if (!session?.user?.email) {
    return response.status(401).json({ message: "Unauthorized" });
  }

  const socketId = request.body.socket_id;
  const channel = request.body.channel_name;

  if (!socketId || !channel) {
    return response.status(400).json({ message: "Bad Request: Missing socket_id or channel_name" });
  }

  const data = {
    user_id: session.user.email,
  };

  try {
    const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
    return response.status(200).json(authResponse);
  } catch (error) {
    console.error("Error authorizing channel:", error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
