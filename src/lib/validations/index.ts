import { z } from "zod";

export const SignInValidiation = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters." }),
});
