import Navbar from "./Navbar";
import "../Components/SignUp.css";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
<>
    <div className="SignUp">

    <div className="centerwrapper">
      <div className="container">
        <h2>Create your free EazyCV profile</h2>

        <p className="auth-intro">
          Use a basic email and password to keep your CV settings on this device.
          No external account is created.
        </p>

        <hr />

        <form id="signup-form">
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

          <label htmlFor="confirm-password" className="labels">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm password"
            required
          />

          <div className="options"></div>

          <div className="center">
            <button type="submit" className="btn">
              Sign Up
            </button>
          </div>

          <div className="center">
            <label>Already have an account?</label>
            <Link to="/login"> <a href="#"> Log In</a></Link>
           
          </div>
        </form>

        <p id="message" style={{ color: "red" }}></p>
      </div>
    </div>

    </div>
</>
  );
}