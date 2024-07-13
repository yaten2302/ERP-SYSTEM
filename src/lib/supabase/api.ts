import { teacher_type } from "@/types";
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
      .eq("student_email", loggedInUser);

    if (data?.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
}

//get details of signed in student/teacher from database
export async function getUserFromDB(user: string, isStudent: boolean) {
  try {
    // isStudent - check if the signed in user is a student, if true, then set student details
    if (isStudent) {
      const { data } = await supabase
        .from("Students")
        .select(
          `
        student_name,
        student_email,
        student_enroll_num,
        Sections(
          section_name,
          Courses(
            course_name
          ),
          AcademicYear(
            year_name
          )
        )`,
        )
        .eq("student_email", user);

      return data;
    } else {
      // if isStudent is false, then fetch teacher details
      const { data } = await supabase
        .from("TeacherSubject")
        .select(
          `
          Teachers!inner(
            teacher_name,
            teacher_email
          ),
          Subjects!inner(
            subject_name
          ),
          Sections!inner(
            section_name,
            Courses(
              course_name
            ),
            AcademicYear(
              year_name
            )
          )
          `,
        )
        .eq("Teachers.teacher_email", user);

      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

// add all the sections of a teacher into sections(Array<string>)
export async function concatTeacherSections(teacher_data: teacher_type) {
  const section_array = [];
  for (let i = 0; i < teacher_data?.length; i++) {
    section_array.push(teacher_data[0].Sections.section_name);
  }
  return section_array;
}
