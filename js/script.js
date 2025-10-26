// =========================================
// UNIVERSAL SCRIPT (Signup + Login + Home)
// =========================================

// ========== Utility Functions ==========
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(String(phone).toLowerCase());
}

// =========================================
// MAIN PAGE CHECK
// =========================================
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".signup-button")) handleSignupPage();
  if (document.getElementById("loginBtn")) handleLoginPage();
  if (document.querySelector(".home-page")) handleHomePage();
});

// =========================================
// SIGNUP PAGE LOGIC
// =========================================
function handleSignupPage() {
  const signupBtn = document.querySelector(".signup-button");
  const nameInput = document.getElementById("inputName");
  const emailInput = document.getElementById("inputEmail");
  const passwordInput = document.getElementById("inputPassword");

  signupBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const name = nameInput?.value.trim();
    const email = emailInput?.value.trim();
    const password = passwordInput?.value.trim();

    if (!name || !email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    if (!validateEmail(email) && !validatePhone(email)) {
      alert("Enter a valid email or phone number!");
      return;
    }

    if (password.length < 4 || password.length > 60) {
      alert("Password must be 4–60 characters long!");
      return;
    }

    // Save details in localStorage
    localStorage.setItem("netflixUserName", name);
    localStorage.setItem("netflixUserEmail", email);
    localStorage.setItem("netflixUserPassword", password);
    localStorage.setItem("isLoggedIn", "true"); // automatically log in

    alert(`Welcome ${name}! Your account has been created successfully.`);
    window.location.href = "home.html"; // redirect directly to home
  });
}

// =========================================
// LOGIN PAGE LOGIC
// =========================================
function handleLoginPage() {
  const loginBtn = document.getElementById("loginBtn");
  const inputEmail = document.getElementById("inputEmail");
  const inputPassword = document.getElementById("inputPassword");

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();

    const savedEmail = localStorage.getItem("netflixUserEmail");
    const savedPassword = localStorage.getItem("netflixUserPassword");

    if (!email || !password) {
      alert("Please fill in all fields!");
      return;
    }

    if (email === savedEmail && password === savedPassword) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Login successful!");
      window.location.href = "home.html";
    } else {
      alert("Invalid email or password!");
    }
  });
}

// =========================================
// HOME PAGE LOGIC
// =========================================
function handleHomePage() {
  const profilePic = document.querySelector(".profile-pic");
  const logoutBtn = document.getElementById("logout-btn");
  const userName = localStorage.getItem("netflixUserName");

  // Redirect if user not logged in
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "login.html";
    return;
  }

  // Display greeting beside profile icon
  if (profilePic && userName) {
    const greeting = document.createElement("span");
    greeting.textContent = `Hello, ${userName}`;
    greeting.classList.add("user-greeting");
    greeting.style.color = "#fff";
    greeting.style.marginLeft = "10px";
    greeting.style.fontWeight = "bold";
    profilePic.insertAdjacentElement("afterend", greeting);
  }

  // Logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "login.html";
    });
  }

  // Movie click interaction
  const movies = document.querySelectorAll(".movie img");
  movies.forEach((movie) => {
    movie.addEventListener("click", () => {
      alert("🎬 Demo only: Movie playback not available yet!");
    });
  });
}
