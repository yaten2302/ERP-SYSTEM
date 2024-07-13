import { useEffect } from "react";

const TeacherHome = () => {
  useEffect(() => {
    document.title = "Teacher";
  });

  return <>Teacher Home</>;
};

export default TeacherHome;
