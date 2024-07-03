import { supabase } from "./config";

//sign-in
export async function signInUser(user: { email: string; password: string }) {
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

//get current logged in user(from client side)
export async function getAccount() {
  try {
    const currentAccount = await supabase.auth.getSession();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

//sign-out
export async function signOutUser() {
  try {
    const session = await supabase.auth.signOut();

    return session;
  } catch (error) {
    console.log(error);
  }
}

//check if user is a student or teacher
export async function checkStudentOrTeacher(loggedInUser: string) {
  try {
    const { data } = await supabase
      .from("Students")
      .select("student_email")
      .match({ student_email: loggedInUser });

    if (data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}
