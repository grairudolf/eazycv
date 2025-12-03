;(function () {
  const STORAGE_KEY = "eazycv-data";

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

  function handleSubmit(event) {
    event.preventDefault();

    const firstName = getValue("firstName");
    const secondName = getValue("secondName");
    const email = getValue("email");
    const phone = getValue("phone");
    const city = getValue("city");
    const country = getValue("country");
    const educationLevel = getValue("education");
    const skillsRaw = getValue("skills");
    const bio = getValue("bio");
    const experienceText = getValue("exp");

    const fullName = [firstName, secondName].filter(Boolean).join(" ");

    const location = [city, country].filter(Boolean).join(", ");

    const data = {
      personal: {
        name: fullName || "",
        title: "",
        email,
        phone,
        location,
        website: "",
        summary: bio || "",
      },
      experience: experienceText
        ? [
            {
              role: "Experience",
              company: "",
              startDate: "",
              endDate: "",
              description: experienceText,
            },
          ]
        : [],
      education: educationLevel
        ? [
            {
              degree: educationLevel,
              institution: "",
              startDate: "",
              endDate: "",
              description: "",
            },
          ]
        : [],
      skills: parseSkills(skillsRaw),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.location.href = "cv.html";
    } catch (e) {
      console.error("Failed to save CV data", e);
      alert("Could not save your CV data. Please check your browser settings.");
    }
  }

  function init() {
    const form = document.getElementById("cv-form");
    if (!form) return;
    form.addEventListener("submit", handleSubmit);
  }

  window.addEventListener("DOMContentLoaded", init);
})();

