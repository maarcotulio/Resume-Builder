import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password have to contain at least 8 digits"),
});

export const registerSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email("Use a valid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password have to contain at least 8 digits"),
});
