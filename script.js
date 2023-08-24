const themeSwitch = document.getElementById("theme-switch");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");

  const cardElements = document.querySelectorAll(".card, .card-header, .card-body input");
  cardElements.forEach((element) => {
    element.classList.toggle("dark-theme", document.body.classList.contains("dark-theme"));
  });

  // Apply dark theme to specific pages
  applyDarkThemeToPage("create-account");
  applyDarkThemeToPage("forgot-password");
});

// Function to apply dark theme to a specific page
function applyDarkThemeToPage(pageClassName) {
  const pageBody = document.querySelector(`body.${pageClassName}`);
  if (pageBody) {
    pageBody.classList.toggle("dark-theme", document.body.classList.contains("dark-theme"));
  }
}

// Restore dark theme state from local storage
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeSwitch.checked = true;

  const cardElements = document.querySelectorAll(".card, .card-header, .card-body input");
  cardElements.forEach((element) => {
    element.classList.add("dark-theme");
  });

  applyDarkThemeToPage("create-account");
  applyDarkThemeToPage("forgot-password");
} else {
  document.body.classList.remove("dark-theme");
  themeSwitch.checked = false;

  const cardElements = document.querySelectorAll(".card, .card-header, .card-body input");
  cardElements.forEach((element) => {
    element.classList.remove("dark-theme");
  });

  applyDarkThemeToPage("create-account");
  applyDarkThemeToPage("forgot-password");
}

const loginForm = document.querySelector('form');
const forgotPasswordLink = document.getElementById("forgot-password-link");
const createAccountLink = document.getElementById("create-account-link");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Validate email
  if (!email) {
    alert("Please enter your email.");
    return;
  }

  // Validate password
  if (!password) {
    alert("Please enter your password.");
    return;
  }

  // Send login request to server
  window.location.href = "dashboard.html";
});

forgotPasswordLink.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "forgot-password.html";
});

createAccountLink.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Create account link clicked");
  window.location.href = "create-account.html";
});

const themeToggle = document.getElementById("theme-toggle");
const container = document.querySelector(".container");

themeToggle.addEventListener("click", () => {
  container.classList.toggle("dark-theme");
});

