function StudentCard({
  id,
  name,
  email,
  course,
  age,
  onDeleteStudent,
  onEditStudent,
}) {
  // Generate student initials
  const initials = (name || "Student")
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Course badge colors
  const courseColors = {
    Python: "python",
    Java: "java",
    React: "react",
    Django: "django",
    "Data Science": "data-science",
  };

  const badgeColor = courseColors[course] || "default";

  return (
    <article className="glass-student-card">

      {/* Student Avatar */}
      <div className={`glass-student-avatar avatar-${badgeColor}`}>
        {initials || "S"}
      </div>

      {/* Student Information */}
      <div className="glass-student-info">

        <div className="glass-student-name-row">
          <h5 className="glass-student-name">
            {name || "Unnamed Student"}
          </h5>

          <span className="glass-status-badge">
            <span className="glass-status-dot"></span>
            Active
          </span>
        </div>

        <p className="glass-student-email">
          <i className="bi bi-envelope"></i>
          <span>{email || "No email provided"}</span>
        </p>

        {/* Student Details */}
        <div className="glass-student-meta">

          <span className={`glass-course-badge course-${badgeColor}`}>
            <i className="bi bi-book-half"></i>
            {course || "No course"}
          </span>

          <span className="glass-detail-badge">
            <i className="bi bi-person"></i>
            Age: {age ?? "N/A"}
          </span>

          <span className="glass-detail-badge">
            <i className="bi bi-hash"></i>
            ID: {id}
          </span>

        </div>
      </div>

      {/* Action Buttons */}
      <div className="glass-student-actions">

        <button
          type="button"
          className="glass-action-btn glass-edit-btn"
          onClick={() =>
            onEditStudent({
              id,
              name,
              email,
              course,
              age,
            })
          }
          aria-label={`Edit ${name}`}
        >
          <i className="bi bi-pencil-square"></i>
          <span>Edit</span>
        </button>

        <button
          type="button"
          className="glass-action-btn glass-delete-btn"
          onClick={() => onDeleteStudent(id)}
          aria-label={`Delete ${name}`}
        >
          <i className="bi bi-trash3"></i>
          <span>Delete</span>
        </button>

      </div>
    </article>
  );
}

export default StudentCard;