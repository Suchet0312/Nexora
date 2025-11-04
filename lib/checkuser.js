import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkuser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const email = user.emailAddresses[0]?.emailAddress;

  try {
    // Check if user exists by clerkUserId or email
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { clerkUserId: user.id },
          { email: email }
        ]
      }
    });

    if (existingUser) {
      // Update existing user's details if needed
      const updatedUser = await db.user.update({
        where: { id: existingUser.id },
        data: {
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          imageUrl: user.imageUrl,
          clerkUserId: user.id
        }
      });
      return updatedUser;
    }

    // Create new user if not found
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        imageUrl: user.imageUrl,
        email: email,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error checking/creating user:", error);
    throw error;
  }
};
