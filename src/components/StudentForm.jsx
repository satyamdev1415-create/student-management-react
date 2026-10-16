import { useEffect, useState } from "react";

function StudentForm({
  onAddStudent,
  onUpdateStudent,
  editingStudent,
  setEditingStudent,
  students,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});

  // Load existing student data during editing
  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setEmail(editingStudent.email);
      setCourse(editingStudent.course);
      setAge(String(editingStudent.age));
      setErrors({});
    } else {
      clearForm();
    }
  }, [editingStudent]);

  // Reset form
  function clearForm() {
    setName("");
    setEmail("");
    setCourse("");
    setAge("");
    setErrors({});
  }

  // Validate form
  function validateForm() {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must contain at least 3 characters.";
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(normalizedEmail)) {
      newErrors.email = "Enter a valid email address.";
    } else {
      const duplicateEmail = students.some(
        (student) =>
          student.email.trim().toLowerCase() === normalizedEmail &&
          student.id !== editingStudent?.id
      );

      if (duplicateEmail) {
        newErrors.email = "This email is already registered.";
      }
    }

    // Age validation
    const numericAge = Number(age);

    if (age.trim() === "") {
      newErrors.age = "Age is required.";
    } else if (
      !Number.isInteger(numericAge) ||
      numericAge < 18 ||
      numericAge > 100
    ) {
      newErrors.age = "Age must be a whole number between 18 and 100.";
    }

    // Course validation
    if (!course) {
      newErrors.course = "Please select a course.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  // Submit form
  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const studentData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      course,
      age: Number(age),
    };

    if (editingStudent) {
      onUpdateStudent({
        ...studentData,
        id: editingStudent.id,
      });

      alert("Student updated successfully!");
      setEditingStudent(null);
    } else {
      onAddStudent({
        ...studentData,
        id: Date.now(),
      });

      alert("Student added successfully!");
    }

    clearForm();
  }

  // Cancel editing
  function handleCancelEdit() {
    setEditingStudent(null);
    clearForm();
  }

  return (
    <section className="glass-form-card mb-4" id="add-student">
      <div className="glass-form-header">
        <div className="glass-form-heading-icon">
          <i
            className={`bi ${
              editingStudent ? "bi-pencil-square" : "bi-person-plus-fill"
            }`}
          ></i>
        </div>

        <div>
          <h3 className="fw-bold mb-1">
            {editingStudent ? "Update Student" : "Add New Student"}
          </h3>

          <p className="glass-muted mb-0">
            {editingStudent
              ? "Update the student's information below."
              : "Fill in the details to register a new student."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-4">
          {/* Full Name */}
          <div className="col-md-6">
            <label htmlFor="studentName" className="glass-form-label">
              <i className="bi bi-person me-2"></i>
              Full Name
            </label>

            <input
              id="studentName"
              type="text"
              className={`form-control glass-input ${
                errors.name ? "is-invalid" : ""
              }`}
              placeholder="Enter student name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setErrors((previous) => ({
                  ...previous,
                  name: "",
                }));
              }}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "nameError" : undefined}
            />

            {errors.name && (
              <div id="nameError" className="invalid-feedback">
                {errors.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label htmlFor="studentEmail" className="glass-form-label">
              <i className="bi bi-envelope me-2"></i>
              Email Address
            </label>

            <input
              id="studentEmail"
              type="email"
              className={`form-control glass-input ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder="student@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((previous) => ({
                  ...previous,
                  email: "",
                }));
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "emailError" : undefined}
            />

            {errors.email && (
              <div id="emailError" className="invalid-feedback">
                {errors.email}
              </div>
            )}
          </div>

          {/* Age */}
          <div className="col-md-6">
            <label htmlFor="studentAge" className="glass-form-label">
              <i className="bi bi-calendar3 me-2"></i>
              Age
            </label>

            <input
              id="studentAge"
              type="number"
              min="18"
              max="100"
              step="1"
              className={`form-control glass-input ${
                errors.age ? "is-invalid" : ""
              }`}
              placeholder="Enter age"
              value={age}
              onChange={(event) => {
                setAge(event.target.value);
                setErrors((previous) => ({
                  ...previous,
                  age: "",
                }));
              }}
              aria-invalid={Boolean(errors.age)}
              aria-describedby={errors.age ? "ageError" : undefined}
            />

            {errors.age && (
              <div id="ageError" className="invalid-feedback">
                {errors.age}
              </div>
            )}
          </div>

          {/* Course */}
          <div className="col-md-6">
            <label htmlFor="studentCourse" className="glass-form-label">
              <i className="bi bi-book me-2"></i>
              Select Course
            </label>

            <select
              id="studentCourse"
              className={`form-select glass-input ${
                errors.course ? "is-invalid" : ""
              }`}
              value={course}
              onChange={(event) => {
                setCourse(event.target.value);
                setErrors((previous) => ({
                  ...previous,
                  course: "",
                }));
              }}
              aria-invalid={Boolean(errors.course)}
              aria-describedby={errors.course ? "courseError" : undefined}
            >
              <option value="">Choose a course</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="React">React</option>
              <option value="Django">Django</option>
              <option value="Data Science">Data Science</option>
            </select>

            {errors.course && (
              <div id="courseError" className="invalid-feedback">
                {errors.course}
              </div>
            )}
          </div>
        </div>

        {/* Form Buttons */}
        <div className="glass-form-actions mt-4 pt-4">
          <button type="submit" className="btn glass-form-submit">
            <i
              className={`bi ${
                editingStudent ? "bi-check-circle" : "bi-person-plus"
              } me-2`}
            ></i>

            {editingStudent ? "Update Student" : "Add Student"}
          </button>

          {editingStudent && (
            <button
              type="button"
              className="btn glass-form-cancel"
              onClick={handleCancelEdit}
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default StudentForm;