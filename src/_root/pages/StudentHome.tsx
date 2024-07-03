import { useEffect } from "react";

const StudentHome = () => {
  useEffect(() => {
    document.title = "Student";
  });
  return <div>Student Home</div>;
};

export default StudentHome;
