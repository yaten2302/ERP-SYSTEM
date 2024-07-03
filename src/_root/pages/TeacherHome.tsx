import { useEffect } from "react";

const TeacherHome = () => {
  useEffect(() => {
    document.title = "Teacher";
  });
  return <div>Teacher Home</div>;
};

export default TeacherHome;
