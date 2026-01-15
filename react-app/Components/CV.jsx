
import "../Components/CV.css";
export default function CVPreview() {
  return (
    <div className="cv-wrapper">
      <div className="cv-page" id="cv-page">
        <header className="cv-header">
          <div className="cv-header-main">
            <h1 id="cv-name" className="cv-name">
              Your Name
            </h1>
            <p id="cv-title" className="cv-title">
              Job Title
            </p>
          </div>

          <div className="cv-header-contact">
            <p id="cv-email">email@example.com</p>
            <p id="cv-phone">+00 000 000000</p>
            <p id="cv-location">City, Country</p>
            <p id="cv-website">website.com</p>
          </div>
        </header>

        <main className="cv-content">
          <section className="cv-section cv-summary">
            <h2 className="cv-section-title">Profile</h2>
            <p id="cv-summary" className="cv-summary-text">
              Short professional summary will appear here.
            </p>
          </section>

          <section className="cv-section cv-experience">
            <h2 className="cv-section-title">Experience</h2>
            <div id="cv-experience-list" className="cv-list">
            </div>
          </section>

          <section className="cv-section cv-education">
            <h2 className="cv-section-title">Education</h2>
            <div id="cv-education-list" className="cv-list">
            </div>
          </section>

          <section className="cv-section cv-skills">
            <h2 className="cv-section-title">Skills</h2>
            <ul id="cv-skills-list" className="cv-skills-list">
            </ul>
          </section>
        </main>

        <div className="cv-watermark" aria-hidden="true">
          <img
            src="src/assets/logowc.png"
            alt="EazyCV logo"
            className="cv-watermark-logo"
          />
        </div>
      </div>

      <footer className="cv-footer no-print">
        <button
          id="print-btn"
          className="btn-primary"
          type="button"
        >
          Download / Print PDF
        </button>
      </footer>
    </div>
  );
}
