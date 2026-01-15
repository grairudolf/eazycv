import "../Components/Login.css";
import Navbar from "./Navbar";

export default function LoginForm() {
  return (
    <>
    
    <div className="centerwrapper">
       
      <div className="container">
        <h2>Log in to EazyCV</h2>

        <p className="auth-intro">
          Save your progress on this device so you can quickly return and update
          your CV later.
        </p>

        <hr />

        <form id="login-form">
          <label htmlFor="email" className="labels">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            required
          />

          <label htmlFor="password" className="labels">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            required
          />

          <div className="options"></div>

          <div className="center">
            <button type="submit" className="btn">
              Log In
            </button>
          </div>

          <div className="center">
            <label>You don&apos;t have an account?</label>
            <a href="./signup.html"> Sign Up</a>
          </div>
        </form>

        <p id="error-message" style={{ color: "red" }}></p>
      </div>
    </div>

    </>
  );
}
