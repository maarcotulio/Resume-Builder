"use server";

import { signOut } from "@/lib/auth";

export default async function logoutAction() {
  await signOut();
}
