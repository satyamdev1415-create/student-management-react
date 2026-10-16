import "./App.css";

import { useState, useEffect } from "react";

import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {

  const [editingStudent, setEditingStudent] = useState(null);
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");

    return savedStudents ? JSON.parse(savedStudents) : [];
  });



// Save students whenever the state changes
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);



  // Create student
  function addStudent(newStudent) {
    setStudents((previousStudents) => [
      ...previousStudents,
      newStudent,
    ]);
  }

  // DELETE student
  function deleteStudent(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this student?"
  );


  if (confirmDelete) {
    setStudents((previousStudents) =>
      previousStudents.filter((student) => student.id !== id)
    );
  }
}



 // UPDATE STUDENT
function updateStudent(updatedStudent) {
  setStudents((previousStudents) =>
    previousStudents.map((student) =>
      student.id === updatedStudent.id
        ? updatedStudent
        : student
    )
  );
}




  return (
    <>
      <Navbar/>

      <Dashboard students={students}/>
    <div className="container py-5">


      
      <div className="text-center mb-5">
        <h1 className="fw-bold">Student Management System</h1>

        <p className="text-secondary">
          React CRUD Practice Project
        </p>
      </div>

      <div className="row">
        <div className="col-md-5">
          <div id="add-student" className="mb-5">
          <StudentForm
        onAddStudent={addStudent}
        onUpdateStudent={updateStudent}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
        students={students}
/>
        </div>
        </div>

        <div className="col-md-7">
          <div id="students">
          <StudentList students={students}  onDeleteStudent={deleteStudent} onEditStudent={setEditingStudent}  />
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default App;