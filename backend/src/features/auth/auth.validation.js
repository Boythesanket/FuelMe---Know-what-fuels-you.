import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be atleast 3 characters.")
    .max(50, "Full name cannot exceed 50 characters."),

  email: z.string().trim().toLowerCase().email("Invalid email address."),

  password: z
    .string()
    .min(8, "Password must be atleast 8 characters.")
    .max(50, "Password cannot exceed 50 characters."),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address."),

  password: z
    .string()
    .min(8, "Password must be atleast 8 characters.")
    .max(50, "Password cannot exceed 50 characters."),
});
