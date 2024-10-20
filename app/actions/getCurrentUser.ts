/* eslint-disable @typescript-eslint/no-unused-vars */
import getSession from "./getSession";
import prisma from "../libs/prismadb";

const getCurrentUser = async () => {
  try {
    const session = await getSession();
    if (!session?.user?.email) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if(!currentUser) {
      return null;
    }

    return currentUser
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;