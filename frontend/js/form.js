;(function () {
  const API_URL = "/cvs/";

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function parseSkills(raw) {
    if (!raw) return [];
    return raw
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const sessionData = JSON.parse(localStorage.getItem('supabase.auth.token'));
    if (!sessionData || !sessionData.access_token) {
        window.location.href = 'login.html';
        return;
    }

    const token = sessionData.access_token;

    const firstName = getValue("firstName");
    const secondName = getValue("secondName");
    const email = getValue("email");
    const phone = getValue("phone");
    const city = getValue("city");
    const country = getValue("country");
    const educationLevel = getValue("education");
    const school = getValue("school");
    const skillsRaw = getValue("skills");
    const bio = getValue("bio");
    const experienceText = getValue("exp");

    const fullName = [firstName, secondName].filter(Boolean).join(" ");
    const location = [city, country].filter(Boolean).join(", ");

    const cvData = {
      personal: {
        name: fullName,
        title: "Professional", // Placeholder title
        email: email,
        phone: phone,
        location: location,
        summary: bio,
      },
      experience: [
        {
          role: "Experience",
          company: "N/A",
          startDate: "N/A",
          endDate: "N/A",
          description: experienceText,
        },
      ],
      education: [
        {
          degree: educationLevel,
          institution: school,
          startDate: "N/A",
          endDate: "N/A",
        },
      ],
      skills: parseSkills(skillsRaw),
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(cvData),
      });

      if (response.ok) {
        const result = await response.json();
        // Store the new CV's ID to be used in cv.html
        localStorage.setItem('eazycv_current_cv_id', result.id);
        window.location.href = "cv.html";
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail}`);
      }
    } catch (e) {
      console.error("Failed to submit CV data", e);
      alert("Could not submit your CV data. Please try again.");
    }
  }

  function init() {
    const form = document.getElementById("cv-form");
    if (!form) return;
    form.addEventListener("submit", handleSubmit);
  }

  window.addEventListener("DOMContentLoaded", init);
})();
