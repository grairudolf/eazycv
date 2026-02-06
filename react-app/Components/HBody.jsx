import { Link } from "react-router-dom";

export default function HBody() {
  return (
    <>
      <div className="HBody">
        <main>
          <section className="hero">
            <div className="hero__content">
              <h1 className="hero__title">
                Build a standout CV in minutes with EazyCV.
              </h1>
              <p className="hero__subtitle">
                EazyCV helps you generate clean, professional CVs with simple
                templates. Focus on your story, and let us handle the design.
              </p>
              <div className="hero__actions">
                <a href="#" className="btn btn--primary">
                  View templates
                </a>

                <Link to="/cvform"> <a href="form.html" className="btn btn--ghost">
                  Generate my CV
                </a>
                </Link>
               
              </div>
            </div>

            <div className="hero__visual">
              <div className="hero-card">
                <div className="hero-card__header">
                  <span className="hero-card__title">EazyCV Preview</span>
                  <span className="hero-card__dot hero-card__dot--blue"></span>
                  <span className="hero-card__dot hero-card__dot--light"></span>
                </div>
                <div className="hero-card__body">
                  <div className="hero-card__line hero-card__line--name"></div>
                  <div className="hero-card__line hero-card__line--short"></div>
                  <div className="hero-card__line"></div>
                  <div className="hero-card__line"></div>
                  <div className="hero-card__line hero-card__line--faded"></div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* LOGIN MODAL */}
        <div className="auth-modal" id="login-modal" aria-hidden="true">
          <div className="auth-modal__backdrop" data-close-modal></div>
          <div
            className="auth-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
          >
            <button
              className="auth-modal__close"
              type="button"
              data-close-modal
            >
              &times;
            </button>

            <h2 id="login-title">Log In</h2>
            <hr />

            <form action="/submit_login" method="POST" className="auth-modal__form">
              <label htmlFor="login-username" className="labels">
                Username
              </label>
              <input
                type="text"
                id="login-username"
                name="username"
                placeholder="Enter Username"
                required
              />

              <label htmlFor="login-email" className="labels">
                Email
              </label>
              <input
                type="email"
                id="login-email"
                name="email"
                placeholder="Enter Email"
              />

              <label htmlFor="login-password" className="labels">
                Password
              </label>
              <input
                type="password"
                id="login-password"
                name="password"
                placeholder="Enter Password"
                required
              />

              <button type="submit" className="btn">
                Log In
              </button>

              <p className="auth-modal__switch">
                You don't have an account?{" "}
                <button
                  type="button"
                  className="auth-modal__link"
                  id="switch-to-signup"
                >
                  Signup
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* SIGNUP MODAL */}
        <div className="auth-modal" id="signup-modal" aria-hidden="true">
          <div className="auth-modal__backdrop" data-close-modal></div>
          <div
            className="auth-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="signup-title"
          >
            <button
              className="auth-modal__close"
              type="button"
              data-close-modal
            >
              &times;
            </button>

            <h2 id="signup-title">Sign Up</h2>
            <hr />

            <form action="/submit_Signup" method="POST" className="auth-modal__form">
              <label htmlFor="signup-firstname" className="labels">
                First Name
              </label>
              <input
                type="text"
                id="signup-firstname"
                name="Firstname"
                placeholder="Enter First name"
                required
              />

              <label htmlFor="signup-lastname" className="labels">
                Last Name
              </label>
              <input
                type="text"
                id="signup-lastname"
                name="Lastname"
                placeholder="Enter Last name"
                required
              />

              <label htmlFor="signup-email" className="labels">
                Email
              </label>
              <input
                type="email"
                id="signup-email"
                name="email"
                placeholder="Enter Email"
              />

              <label htmlFor="signup-password" className="labels">
                Password
              </label>
              <input
                type="password"
                id="signup-password"
                name="password"
                placeholder="Enter Password"
                required
              />

              <label htmlFor="signup-confirm" className="labels">
                Confirm Password
              </label>
              <input
                type="password"
                id="signup-confirm"
                name="confirmPassword"
                placeholder="Confirm password"
                required
              />

              <button type="submit" className="btn">
                Sign Up
              </button>

              <p className="auth-modal__switch">
                Already have an account?{" "}
                <button
                  type="button"
                  className="auth-modal__link"
                  id="switch-to-login"
                >
                  Log In
                </button>
              </p>
            </form>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="site-footer">
          <div className="site-footer__inner">
            <span className="site-footer__brand">EazyCV</span>
            <span className="site-footer__copy">
              &copy; <span id="year"></span> EazyCV. All rights reserved.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}
