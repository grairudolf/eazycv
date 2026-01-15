import { Link, useNavigate } from "react-router-dom";
import "../Components/CVForm.css";
export default function CVForm() {
 
  const navigate = useNavigate();
  const handleSubmit = (e)=>{
    e.preventDefault();
    navigate("/cv");
  }

  return (
    <div className="CVform">

   
    <div className="container">
      <form className="form" id="cv-form">
        <Link to="/" className="form__back-link">
        &#8592; Back to Home
        </Link>
    

        <h1>Build Your CV in Minutes</h1>
        <p>Enter your details to create your CV</p>

        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="John"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="secondName">Second Name</label>
          <input
            type="text"
            id="secondName"
            placeholder="Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="name@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            placeholder="+237 677 000 123"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="e.g. Douala"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            placeholder="e.g. Cameroon"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="education">Education Level</label>
          <input
            id="education"
            list="levels"
            placeholder="Select Your Level Of Education"
            required
          />
          <datalist id="levels">
            <option value="O/L" />
            <option value="A/L" />
            <option value="Undergraduate" />
            <option value="Postgraduate" />
            <option value="PhD" />
          </datalist>
        </div>

        <div className="form-group">
          <label htmlFor="school">School / University</label>
          <input
            type="text"
            id="school"
            placeholder="e.g. University of Buea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <textarea
            id="skills"
            placeholder="e.g. JavaScript, HTML, CSS"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="bio">Short Bio</label>
          <textarea
            id="bio"
            placeholder="A few lines about who you are and what you do..."
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="exp">Experience</label>
          <textarea
            id="exp"
            placeholder="Summarize your experience..."
            required
          ></textarea>
        </div>

        <div className="form__btn">
         <button type="submit" onClick={handleSubmit}> 
           Generate CV</button>
        </div>

      </form>
    </div>
 </div>
  );
}