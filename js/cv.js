// Expected localStorage key and structure:
// localStorage.setItem("eazycv-data", JSON.stringify({
//   personal: {
//     name: "Jane Doe",
//     title: "Software Engineer",
//     email: "jane.doe@example.com",
//     phone: "+1 555 000 1111",
//     location: "Berlin, Germany",
//     website: "janedoe.dev",
//     summary: "Short professional summary..."
//   },
//   experience: [
//     {
//       role: "Senior Developer",
//       company: "Tech Corp",
//       startDate: "2019",
//       endDate: "Present",
//       description: "Did some great things here..."
//
//     }
//   ],
//   education: [
//     {
//       degree: "BSc Computer Science",
//       institution: "University of Somewhere",
//       startDate: "2014",
//       endDate: "2017",
//       description: "Relevant courses..."
//     }
//   ],
//   skills: ["JavaScript", "HTML", "CSS"]
// }));

(function () {
  const STORAGE_KEY = "eazycv-data";

  function getElement(id) {
    return document.getElementById(id);
  }

  function loadDataFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.error("Failed to parse CV data from localStorage:", e);
      return null;
    }
  }

  function populatePersonal(personal) {
    if (!personal) return;

    const nameEl = getElement("cv-name");
    const titleEl = getElement("cv-title");
    const emailEl = getElement("cv-email");
    const phoneEl = getElement("cv-phone");
    const locationEl = getElement("cv-location");
    const websiteEl = getElement("cv-website");
    const summaryEl = getElement("cv-summary");

    if (personal.name && nameEl) nameEl.textContent = personal.name;
    if (personal.title && titleEl) titleEl.textContent = personal.title;
    if (personal.email && emailEl) emailEl.textContent = personal.email;
    if (personal.phone && phoneEl) phoneEl.textContent = personal.phone;
    if (personal.location && locationEl) locationEl.textContent = personal.location;
    if (personal.website && websiteEl) websiteEl.textContent = personal.website;
    if (personal.summary && summaryEl) summaryEl.textContent = personal.summary;
  }

  function createItemElement(item, type) {
    const wrapper = document.createElement("div");
    wrapper.className = "cv-item";

    const header = document.createElement("div");
    header.className = "cv-item-header";

    const title = document.createElement("div");
    title.className = "cv-item-title";

    const subtitle = document.createElement("div");
    subtitle.className = "cv-item-subtitle";

    const dates = document.createElement("div");
    dates.className = "cv-item-dates";

    if (type === "experience") {
      title.textContent = item.role || "";
      subtitle.textContent = item.company || "";
    } else {
      title.textContent = item.degree || "";
      subtitle.textContent = item.institution || "";
    }

    let dateText = "";
    if (item.startDate) dateText += item.startDate;
    if (item.endDate) dateText += (dateText ? " – " : "") + item.endDate;
    dates.textContent = dateText;

    header.appendChild(title);
    header.appendChild(dates);

    const subtitleContainer = document.createElement("div");
    subtitleContainer.appendChild(subtitle);

    const description = document.createElement("p");
    description.className = "cv-item-description";
    description.textContent = item.description || "";

    wrapper.appendChild(header);
    wrapper.appendChild(subtitleContainer);
    if (item.description) wrapper.appendChild(description);

    return wrapper;
  }

  function populateExperience(experience) {
    const container = getElement("cv-experience-list");
    if (!container) return;
    container.innerHTML = "";

    if (!Array.isArray(experience) || experience.length === 0) return;

    experience.forEach((item) => {
      const el = createItemElement(item, "experience");
      container.appendChild(el);
    });
  }

  function populateEducation(education) {
    const container = getElement("cv-education-list");
    if (!container) return;
    container.innerHTML = "";

    if (!Array.isArray(education) || education.length === 0) return;

    education.forEach((item) => {
      const el = createItemElement(item, "education");
      container.appendChild(el);
    });
  }

  function populateSkills(skills) {
    const list = getElement("cv-skills-list");
    if (!list) return;
    list.innerHTML = "";

    if (!Array.isArray(skills) || skills.length === 0) return;

    skills.forEach((skill) => {
      const li = document.createElement("li");
      li.className = "cv-skill-pill";
      li.textContent = skill;
      list.appendChild(li);
    });
  }

  function setupPrintButton() {
    const btn = getElement("print-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      window.print();
    });
  }

  function init() {
    const data = loadDataFromStorage();
    if (data) {
      populatePersonal(data.personal || {});
      populateExperience(data.experience || []);
      populateEducation(data.education || []);
      populateSkills(data.skills || []);
    } else {
      console.warn(
        "No CV data found in localStorage under key",
        STORAGE_KEY
      );
    }
    setupPrintButton();
  }

  window.addEventListener("DOMContentLoaded", init);
})();