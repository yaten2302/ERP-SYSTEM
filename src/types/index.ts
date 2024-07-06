export type student = {
  name: string;
  email: string;
  enrollment_number: number;
  academic_year: string;
  course_name: string;
  section_name: string;
};

export type teacher = {
  name: string;
  email: string;
  section_name: Array<string>;
  course_name: string;
  academic_year: string;
  subject_name: string;
};
