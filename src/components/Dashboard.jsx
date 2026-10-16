

function Dashboard({ students }) {
  const totalStudents = students.length;

  const courses = [
    ...new Set(students.map((student) => student.course).filter(Boolean)),
  ];

  const totalCourses = courses.length;

  const recentStudents = [...students]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .slice(0, 5);

  const courseStats = courses.map((course) => ({
    name: course,
    count: students.filter((student) => student.course === course).length,
  }));

  const averageAge =
    totalStudents > 0
      ? (
          students.reduce(
            (total, student) => total + (Number(student.age) || 0),
            0
          ) / totalStudents
        ).toFixed(1)
      : "—";

  return (
    <main className="container-fluid dashboard-glass py-4 px-3 px-lg-4" id="home">
      {/* Welcome Banner */}
      <section className="glass-welcome p-4 p-lg-5 mb-4">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <span className="glass-label">
              STUDENT MANAGEMENT SYSTEM
            </span>

            <h1 className="display-5 fw-bold mt-3 mb-3">
              Welcome to StudentHub! 👋
            </h1>

            <p className="lead mb-4">
              Manage your students, track courses and organize your academic
              records in one place.
            </p>

            <a href="#add-student" className="btn glass-primary-btn">
              <i className="bi bi-person-plus me-2"></i>
              Add New Student
            </a>
          </div>

          <div className="col-lg-4 text-center mt-4 mt-lg-0">
            <i className="bi bi-mortarboard-fill glass-cap-icon"></i>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="row g-3 g-lg-4 mb-4">
        <div className="col-sm-6 col-xl-4">
          <div className="glass-stat-card h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="glass-muted mb-2">Total Students</p>
                <h2 className="fw-bold mb-0">{totalStudents}</h2>
              </div>

              <div className="glass-icon icon-blue">
                <i className="bi bi-people-fill"></i>
              </div>
            </div>

            <p className="glass-caption mt-3 mb-0">
              <i className="bi bi-check-circle me-1"></i>
              Registered student records
            </p>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="glass-stat-card h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="glass-muted mb-2">Total Courses</p>
                <h2 className="fw-bold mb-0">{totalCourses}</h2>
              </div>

              <div className="glass-icon icon-green">
                <i className="bi bi-book-half"></i>
              </div>
            </div>

            <p className="glass-caption mt-3 mb-0">
              <i className="bi bi-journal-check me-1"></i>
              Unique courses selected
            </p>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="glass-stat-card h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="glass-muted mb-2">Average Age</p>
                <h2 className="fw-bold mb-0">{averageAge}</h2>
              </div>

              <div className="glass-icon icon-purple">
                <i className="bi bi-person-badge"></i>
              </div>
            </div>

            <p className="glass-caption mt-3 mb-0">
              Average age of registered students
            </p>
          </div>
        </div>
      </section>

      {/* Course Statistics and Recent Students */}
      <section className="row g-3 g-lg-4 mb-4">
        {/* Course Statistics */}
        <div className="col-lg-6">
          <div className="glass-panel h-100">
            <div className="glass-panel-heading">
              <div className="d-flex align-items-center gap-3">
                <div className="glass-small-icon">
                  <i className="bi bi-bar-chart-fill"></i>
                </div>

                <div>
                  <h5 className="fw-bold mb-1">Course Statistics</h5>
                  <p className="glass-muted mb-0">
                    Student distribution by course
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 pt-2">
              {courseStats.length === 0 ? (
                <p className="glass-muted mb-0">
                  No course data available yet.
                </p>
              ) : (
                courseStats.map((item, index) => {
                  const percentage =
                    totalStudents > 0
                      ? (item.count / totalStudents) * 100
                      : 0;

                  return (
                    <div className="mb-4" key={item.name}>
                      <div className="d-flex justify-content-between align-items-center gap-2 mb-2">
                        <span className="fw-semibold">{item.name}</span>

                        <span className="glass-muted small text-end">
                          {item.count}{" "}
                          {item.count === 1 ? "student" : "students"} (
                          {percentage.toFixed(0)}%)
                        </span>
                      </div>

                      <div
                        className="progress glass-progress"
                        role="progressbar"
                        aria-label={`${item.name} students`}
                        aria-valuenow={percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className={`progress-bar glass-progress-${index % 4}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Recent Students */}
        <div className="col-lg-6">
          <div className="glass-panel h-100">
            <div className="glass-panel-heading d-flex justify-content-between align-items-center gap-2">
              <div className="d-flex align-items-center gap-3">
                <div className="glass-small-icon">
                  <i className="bi bi-clock-history"></i>
                </div>

                <div>
                  <h5 className="fw-bold mb-1">Recent Students</h5>
                  <p className="glass-muted mb-0">
                    Latest student records
                  </p>
                </div>
              </div>

              <a href="#students" className="btn glass-outline-btn btn-sm">
                View All
              </a>
            </div>

            <div className="px-4 pb-4">
              {recentStudents.length === 0 ? (
                <div className="text-center py-4">
                  <i className="bi bi-people glass-empty-icon"></i>
                  <p className="glass-muted mt-2 mb-0">
                    No students added yet.
                  </p>
                </div>
              ) : (
                recentStudents.map((student) => {
                  const initials = (student.name || "?")
                    .trim()
                    .split(/\s+/)
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <div
                      key={student.id}
                      className="glass-student-row"
                    >
                      <div className="glass-avatar">{initials}</div>

                      <div className="flex-grow-1 overflow-hidden">
                        <h6 className="fw-bold mb-1 text-truncate">
                          {student.name}
                        </h6>

                        <p className="glass-muted small mb-0 text-truncate">
                          {student.email}
                        </p>
                      </div>

                      <span className="glass-course-badge">
                        {student.course}
                      </span>
                    </div>
                  );
                })
              )}

              <a
                href="#students"
                className="btn glass-outline-btn w-100 mt-3"
              >
                View All Students
                <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="glass-quick-actions p-4">
        <h5 className="fw-bold mb-3">
          <i className="bi bi-lightning-charge-fill text-warning me-2"></i>
          Quick Actions
        </h5>

        <div className="d-flex flex-wrap gap-2">
          <a href="#add-student" className="btn glass-primary-btn">
            <i className="bi bi-person-plus me-2"></i>
            Add Student
          </a>

          <a href="#students" className="btn glass-outline-btn">
            <i className="bi bi-search me-2"></i>
            Search Students
          </a>

          <a href="#students" className="btn glass-outline-btn">
            <i className="bi bi-people me-2"></i>
            View All Students
          </a>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;