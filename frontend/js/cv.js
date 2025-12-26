;(function () {
  const API_URL = "/cvs/";

  function getElement(id) {
    return document.getElementById(id);
  }

  async function loadCvData() {
    const cvId = localStorage.getItem('eazycv_current_cv_id');
    const sessionData = JSON.parse(localStorage.getItem('supabase.auth.token'));
    if (!cvId || !sessionData || !sessionData.access_token) {
        window.location.href = 'login.html';
        return;
    }

    const token = sessionData.access_token;

    try {
      const response = await fetch(`${API_URL}${cvId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const cvData = await response.json();
        renderCv(cvData);
      } else {
        const error = await response.json();
        alert(`Error: ${error.detail}`);
      }
    } catch (e) {
      console.error("Failed to load CV data", e);
      alert("Could not load your CV data. Please try again.");
    }
  }

  function renderCv(data) {
    populatePersonal(data.personal || {});
    populateExperience(data.experience || []);
    populateEducation(data.education || []);
    populateSkills(data.skills || []);
  }

  function populatePersonal(personal) {
    getElement("cv-name").textContent = personal.name;
    getElement("cv-title").textContent = personal.title;
    getElement("cv-email").textContent = personal.email;
    getElement("cv-phone").textContent = personal.phone;
    getElement("cv-location").textContent = personal.location;
    getElement("cv-website").textContent = personal.website || '';
    getElement("cv-summary").textContent = personal.summary;
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
    container.innerHTML = "";
    experience.forEach((item) => {
      container.appendChild(createItemElement(item, "experience"));
    });
  }

  function populateEducation(education) {
    const container = getElement("cv-education-list");
    container.innerHTML = "";
    education.forEach((item) => {
      container.appendChild(createItemElement(item, "education"));
    });
  }

  function populateSkills(skills) {
    const list = getElement("cv-skills-list");
    list.innerHTML = "";
    skills.forEach((skill) => {
      const li = document.createElement("li");
      li.className = "cv-skill-pill";
      li.textContent = skill;
      list.appendChild(li);
    });
  }

  async function handleOptimize() {
    const cvId = localStorage.getItem('eazycv_current_cv_id');
    const sessionData = JSON.parse(localStorage.getItem('supabase.auth.token'));
    if (!cvId || !sessionData || !sessionData.access_token) {
        window.location.href = 'login.html';
        return;
    }

    const token = sessionData.access_token;

    try {
        const response = await fetch(`${API_URL}${cvId}/optimize`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const result = await response.json();
            getElement("cv-summary").textContent = result.optimized_cv;
        } else {
            const error = await response.json();
            alert(`Error: ${error.detail}`);
        }
    } catch (e) {
        console.error("Failed to optimize CV", e);
        alert("Could not optimize your CV. Please try again.");
    }
  }

  function setupButtons() {
    const printBtn = getElement("print-btn");
    printBtn.addEventListener("click", () => window.print());

    const optimizeBtn = document.createElement('button');
    optimizeBtn.id = 'optimize-btn';
    optimizeBtn.className = 'btn-secondary';
    optimizeBtn.textContent = 'Optimize with AI';
    printBtn.parentElement.insertBefore(optimizeBtn, printBtn);
    optimizeBtn.addEventListener('click', handleOptimize);
  }

  function init() {
    loadCvData();
    setupButtons();
  }

  window.addEventListener("DOMContentLoaded", init);
})();
