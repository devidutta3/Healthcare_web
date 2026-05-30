/* ===============================
   IMPORTS (MODULE)
=============================== */
import { animate, hover } from "https://cdn.jsdelivr.net/npm/motion@12.34.0/+esm";

/* ===============================
   CONFIG
=============================== */
const API_BASE = "http://127.0.0.1:8000/auth";

/* ===============================
   LANDING PAGE
=============================== */
document.getElementById("getStartedBtn")?.addEventListener("click", () => {
  window.location.href = "auth.html";
});

/* ===============================
   LOGIN ROLE SELECTION
=============================== */
document.querySelectorAll(".login-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    window.location.href = "auth.html";
  });
});

/* ===============================
   PATIENT SIGN IN
=============================== */
document.getElementById("patientSignin")?.addEventListener("click", async () => {
  const phoneInput = document.getElementById("patientPhone");

  if (!phoneInput || !phoneInput.value) {
    alert("Enter patient phone number");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/patient/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: phoneInput.value })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("patientName", data.name || "Patient");
      window.location.href = "patient.html";
    } else {
      alert(data.detail || "Patient not found");
    }
  } catch {
    alert("Backend not reachable");
  }
});

/* ===============================
   DOCTOR SIGN IN
=============================== */
document.getElementById("doctorSignin")?.addEventListener("click", async () => {
  const doctorInput = document.getElementById("doctorId");

  if (!doctorInput || !doctorInput.value) {
    alert("Enter doctor ID");
    return;
  }

  // Check Local Storage (Mock DB) for the doctor
  const mockDoctors = JSON.parse(localStorage.getItem("mock_doctors") || "[]");
  const foundDoc = mockDoctors.find(d => d.doctor_id === doctorInput.value.trim());

  if (foundDoc) {
    localStorage.setItem("doctorName", foundDoc.name);
    localStorage.setItem("doctorSpec", foundDoc.specialization);
    window.location.href = "doctor.html";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/doctor/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctor_id: doctorInput.value })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("doctorName", data.name || "Doctor");
      localStorage.setItem("doctorSpec", data.specialization || "General");
      window.location.href = "doctor.html";
    } else {
      alert(data.detail || "Doctor not found");
    }
  } catch {
    alert("Backend not reachable");
  }
});

/* ===============================
   SIGN UP (PATIENT & DOCTOR)
   ✅ FIXED INPUT INDEXING BUG
=============================== */
document.querySelectorAll(".auth-box .btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const text = btn.innerText.trim();
    const inputs = btn.parentElement?.querySelectorAll("input");

    if (!inputs || inputs.length < 3) return;

    try {
      /* -------- PATIENT SIGN UP -------- */
      if (text === "Register Patient") {
        const payload = {
          name: inputs[0].value,
          phone: inputs[1].value,
          // ✅ FIX: email is LAST input (after age, height, weight)
          email: inputs[inputs.length - 1].value
        };

        if (!payload.name || !payload.phone || !payload.email) {
          alert("Fill all patient details");
          return;
        }

        const res = await fetch(`${API_BASE}/patient/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("patientName", payload.name);
          alert("Patient registered successfully");
          window.location.href = "patient.html";
        } else {
          alert(data.detail || "Patient already exists");
        }
      }

      /* -------- DOCTOR SIGN UP -------- */
      if (text === "Register Doctor") {
        // inputs: 0=Name, 1=Phone, 2=Specialization, 3=Email
        const payload = {
          doctor_id: "DOC" + Date.now(),
          name: inputs[0].value,
          phone: inputs[1].value,
          specialization: inputs[2].value,
          email: inputs[3].value
        };

        if (!payload.name || !payload.phone || !payload.email) {
          alert("Fill all doctor details");
          return;
        }

        // Save to Local Storage (Mock DB)
        const mockDoctors = JSON.parse(localStorage.getItem("mock_doctors") || "[]");
        mockDoctors.push(payload);
        localStorage.setItem("mock_doctors", JSON.stringify(mockDoctors));

        localStorage.setItem("doctorName", payload.name);
        localStorage.setItem("doctorSpec", payload.specialization);
        alert(`Doctor registered successfully!\n\nIMPORTANT: Your Login ID is: ${payload.doctor_id}\nPlease save this ID to login.`);
        window.location.href = "doctor.html";
      }
    } catch {
      alert("Backend not reachable");
    }
  });
});

/* ===============================
   BUTTON HOVER ANIMATION
=============================== */
hover(".btn", (el) => {
  animate(el, { scale: 1.1 });
  return () => animate(el, { scale: 1 });
});

/* ===============================
   SERVICES SCROLL VISIBILITY FIX
   (NO STYLE CHANGE)
=============================== */
document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".services .card");

  if (!serviceCards.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );

  serviceCards.forEach(card => observer.observe(card));
});

/* ===============================
   EXERCISE SEARCH FUNCTIONALITY
=============================== */
document.getElementById("exerciseSearch")?.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const sections = document.querySelectorAll(".exercises");

  sections.forEach(section => {
    const cards = section.querySelectorAll(".card");
    let hasVisibleCards = false;

    cards.forEach(card => {
      const title = card.querySelector("h4")?.innerText.toLowerCase();
      const isMatch = title && title.includes(searchValue);
      card.style.display = isMatch ? "block" : "none";
      if (isMatch) hasVisibleCards = true;
    });

    section.style.display = hasVisibleCards ? "block" : "none";
  });
});

/* ===============================
   DOCTOR: AI REPORT VERIFICATION
=============================== */
const approveBtn = document.getElementById("approveReportBtn");
if (approveBtn) {
  approveBtn.addEventListener("click", () => {
    const suggestion = document.getElementById("aiSuggestionText").innerHTML;
    
    // Simulate saving to backend by using localStorage
    localStorage.setItem("verified_report", suggestion);
    
    approveBtn.innerText = "Verified & Sent ✅";
    approveBtn.style.backgroundColor = "#10b981"; // Green color
    approveBtn.disabled = true;
    
    alert("Report verified and sent to patient dashboard.");
  });
}

/* ===============================
   PATIENT: CHECK REPORT STATUS
=============================== */
const reportContainer = document.getElementById("patientReportContainer");
if (reportContainer) {
  const verifiedReport = localStorage.getItem("verified_report");
  
  if (verifiedReport) {
    reportContainer.innerHTML = `
      <p style="color: #10b981; font-weight: 600; margin-bottom: 8px;">✅ Doctor Verified Result</p>
      <div style="color: #1f2937; font-size: 14px;">${verifiedReport}</div>
    `;
  }
}

/* ===============================
   DISPLAY USER INFO ON DASHBOARD
=============================== */
document.addEventListener("DOMContentLoaded", () => {
  // Patient Dashboard
  const patientNameDisplay = document.getElementById("patientNameDisplay");
  if (patientNameDisplay) {
    const name = localStorage.getItem("patientName");
    if (name) patientNameDisplay.innerText = name;
  }

  // Doctor Dashboard
  const doctorNameDisplay = document.getElementById("doctorNameDisplay");
  const doctorSpecDisplay = document.getElementById("doctorSpecDisplay");
  if (doctorNameDisplay && localStorage.getItem("doctorName")) {
    doctorNameDisplay.innerText = localStorage.getItem("doctorName");
  }
  if (doctorSpecDisplay && localStorage.getItem("doctorSpec")) {
    doctorSpecDisplay.innerText = localStorage.getItem("doctorSpec");
  }
});
