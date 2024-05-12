import { User } from "@/types";
import { supabase } from "./config";

//user sign-in function
export async function signInUser(user: User) {
  try {
    const session = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });

    return session;
  } catch (error) {
    console.log(error);
  }
}
