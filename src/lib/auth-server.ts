import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function requireUserId() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const userEmail = session?.user?.email;

  if (!userId && userEmail) {
    const dbUser = await prisma.user.upsert({
      where: { email: userEmail },
      update: { name: session.user?.name ?? userEmail },
      create: { email: userEmail, name: session.user?.name ?? userEmail, image: "" },
    });
    return dbUser.id;
  }

  if (!userId) {
    throw new Error("Unauthorized");
  }
  return userId;
}
