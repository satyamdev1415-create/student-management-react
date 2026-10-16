function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-glass sticky-top">
      <div className="container-fluid px-3 px-lg-5">

        {/* Brand */}
        <a className="navbar-brand fw-bold fs-3" href="#home">
          <span className="brand-icon">
            <i className="bi bi-mortarboard-fill"></i>
          </span>

          Student<span className="brand-highlight">Hub</span>
        </a>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler glass-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#studentNavbar"
          aria-controls="studentNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="studentNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2 py-3 py-lg-0">

            <li className="nav-item">
              <a className="nav-link navbar-glass-link active" href="#home">
                <i className="bi bi-house-door me-2"></i>
                Home
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link navbar-glass-link" href="#students">
                <i className="bi bi-people me-2"></i>
                Students
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link navbar-glass-link" href="#add-student">
                <i className="bi bi-person-plus me-2"></i>
                Add Student
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link navbar-glass-link" href="#about">
                <i className="bi bi-info-circle me-2"></i>
                About
              </a>
            </li>

            <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
              <a className="btn navbar-glass-button" href="#add-student">
                Get Started
                <i className="bi bi-arrow-up-right ms-2"></i>
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;