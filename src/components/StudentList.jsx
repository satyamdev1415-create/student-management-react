import { useState, useEffect } from "react";
import StudentCard from "./StudentCard";

function StudentList({
  students,
  onDeleteStudent,
  onEditStudent,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const studentsPerPage = 5;

  // Unique courses
  const courses = [
    ...new Set(students.map((student) => student.course)),
  ].filter(Boolean);

  // Search and filter
  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      (student.name || "").toLowerCase().includes(search) ||
      (student.email || "").toLowerCase().includes(search) ||
      (student.course || "").toLowerCase().includes(search);

    const matchesCourse =
      selectedCourse === "All" ||
      student.course === selectedCourse;

    return matchesSearch && matchesCourse;
  });

  // Sorting
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    }

    if (sortOrder === "desc") {
      return b.name.localeCompare(a.name);
    }

    return 0;
  });

  // Pagination
  const totalStudents = sortedStudents.length;
  const totalPages = Math.ceil(totalStudents / studentsPerPage);

  useEffect(() => {
    setCurrentPage((page) =>
      Math.min(page, Math.max(totalPages, 1))
    );
  }, [totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCourse, sortOrder]);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = sortedStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Clear filters
  function clearFilters() {
    setSearchTerm("");
    setSelectedCourse("All");
    setSortOrder("default");
    setCurrentPage(1);
  }

  const startStudent =
    totalStudents === 0 ? 0 : indexOfFirstStudent + 1;

  const endStudent = Math.min(indexOfLastStudent, totalStudents);

  const hasActiveFilters =
    searchTerm !== "" ||
    selectedCourse !== "All" ||
    sortOrder !== "default";

  return (
    <section id="students" className="dashboard-glass mt-4">

      {/* Section Heading */}
      <div className="glass-panel-heading mb-4">
        <div>
          <span className="glass-label">
            <i className="bi bi-grid-1x2 me-2"></i>
            STUDENT DIRECTORY
          </span>

          <h2 className="fw-bold mt-2 mb-2">
            Student Management
          </h2>

          <p className="glass-muted mb-0">
            Search, filter, sort and manage your student records.
          </p>
        </div>

        <div className="glass-total-badge">
          <i className="bi bi-people-fill me-2"></i>
          {totalStudents} Students
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-panel glass-filter-panel mb-4">
        <div className="glass-filter-heading">
          <div className="glass-small-icon">
            <i className="bi bi-sliders"></i>
          </div>

          <div>
            <h5 className="fw-bold mb-1">Find Students</h5>
            <p className="glass-muted small mb-0">
              Use the filters below to find a specific record.
            </p>
          </div>
        </div>

        <div className="row g-3 mt-1">

          {/* Search */}
          <div className="col-12 col-lg-5">
            <label
              htmlFor="studentSearch"
              className="glass-form-label"
            >
              Search Student
            </label>

            <div className="glass-search-box">
              <i className="bi bi-search"></i>

              <input
                id="studentSearch"
                type="search"
                className="glass-input"
                placeholder="Search name, email or course..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  className="glass-clear-search"
                  aria-label="Clear search"
                  onClick={() => setSearchTerm("")}
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              )}
            </div>
          </div>

          {/* Course Filter */}
          <div className="col-12 col-sm-6 col-lg-3">
            <label
              htmlFor="courseFilter"
              className="glass-form-label"
            >
              Filter by Course
            </label>

            <select
              id="courseFilter"
              className="glass-input glass-select"
              value={selectedCourse}
              onChange={(event) =>
                setSelectedCourse(event.target.value)
              }
            >
              <option value="All">All Courses</option>

              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div className="col-12 col-sm-6 col-lg-2">
            <label
              htmlFor="studentSort"
              className="glass-form-label"
            >
              Sort by Name
            </label>

            <select
              id="studentSort"
              className="glass-input glass-select"
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(event.target.value)
              }
            >
              <option value="default">Default</option>
              <option value="asc">A to Z</option>
              <option value="desc">Z to A</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="col-12 col-lg-2 d-flex align-items-end">
            <button
              type="button"
              className="glass-clear-button w-100"
              onClick={clearFilters}
              disabled={!hasActiveFilters}
            >
              <i className="bi bi-arrow-counterclockwise me-2"></i>
              Reset Filters
            </button>
          </div>

        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="glass-active-filters mt-3">
            <span className="glass-muted small me-2">
              Active filters:
            </span>

            {searchTerm && (
              <span className="glass-filter-chip">
                Search: {searchTerm}
              </span>
            )}

            {selectedCourse !== "All" && (
              <span className="glass-filter-chip">
                Course: {selectedCourse}
              </span>
            )}

            {sortOrder !== "default" && (
              <span className="glass-filter-chip">
                {sortOrder === "asc" ? "A to Z" : "Z to A"}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Student Records Heading */}
      <div className="glass-records-heading mb-3">
        <div>
          <h4 className="fw-bold mb-1">Student Records</h4>
          <p className="glass-muted small mb-0">
            Your student information at a glance.
          </p>
        </div>

        <span className="glass-record-count">
          <i className="bi bi-person-lines-fill me-2"></i>
          {totalStudents} records
        </span>
      </div>

      {/* Empty State */}
      {totalStudents === 0 ? (
        <div className="glass-empty-state">
          <div className="glass-empty-icon">
            <i className="bi bi-people"></i>
          </div>

          <h5 className="fw-bold mt-3">
            {students.length === 0
              ? "No Students Yet"
              : "No Matching Students"}
          </h5>

          <p className="glass-muted mb-3">
            {students.length === 0
              ? "Your student directory is empty. Add your first student to get started."
              : "We couldn't find any students matching your search. Try changing your filters."}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              className="glass-primary-btn"
              onClick={clearFilters}
            >
              <i className="bi bi-arrow-counterclockwise me-2"></i>
              Clear All Filters
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Student Cards */}
          <div className="glass-student-list">
            {currentStudents.map((student) => (
              <StudentCard
                key={student.id}
                id={student.id}
                name={student.name}
                age={student.age}
                email={student.email}
                course={student.course}
                onDeleteStudent={onDeleteStudent}
                onEditStudent={onEditStudent}
              />
            ))}
          </div>

          {/* Pagination Information */}
          <div className="glass-pagination-info mt-4">
            <p className="glass-muted mb-0">
              Showing{" "}
              <strong>{startStudent}-{endStudent}</strong>
              {" "}of{" "}
              <strong>{totalStudents}</strong> students
            </p>

            <span className="glass-page-indicator">
              Page {currentPage} of {Math.max(totalPages, 1)}
            </span>
          </div>

          {/* Pagination Buttons */}
          {totalPages > 1 && (
            <nav
              className="mt-3"
              aria-label="Student list pagination"
            >
              <ul className="pagination glass-pagination justify-content-center flex-wrap">

                <li
                  className={`page-item ${
                    currentPage === 1 ? "disabled" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="page-link"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) => page - 1)
                    }
                  >
                    <i className="bi bi-chevron-left me-1"></i>
                    Previous
                  </button>
                </li>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <li
                    key={page}
                    className={`page-item ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      aria-current={
                        currentPage === page ? "page" : undefined
                      }
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="page-link"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) => page + 1)
                    }
                  >
                    Next
                    <i className="bi bi-chevron-right ms-1"></i>
                  </button>
                </li>

              </ul>
            </nav>
          )}
        </>
      )}
    </section>
  );
}

export default StudentList;