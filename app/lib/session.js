// lib/session.js
import { useUser } from "@clerk/nextjs"; // if using Clerk
// If you are using NextAuth, this will be different.

export async function getCurrentUser() {
  const {user} = useUser();
  if (!user) return null;

  return {
    id: user.id,
    name: user.firstName + (user.lastName ? ` ${user.lastName}` : ""),
    email: user.emailAddresses[0].emailAddress,
  };
}
