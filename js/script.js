// =========================================
// UNIVERSAL SCRIPT (Signup + Login + Home)
// =========================================

// ========== Utility Functions ==========
function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
// SIGNUP PAGE LOGIC (Untouched)
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

    if (!name || !email || !password) { alert("Please fill in all fields!"); return; }
    if (!validateEmail(email) && !validatePhone(email)) { alert("Enter a valid email or phone number!"); return; }
    if (password.length < 4 || password.length > 60) { alert("Password must be 4–60 characters long!"); return; }

    alert(`Welcome ${name}! This is a practice project — no real data is saved.\n\nYou'll be redirected to the Home page now.`);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("netflixUserName", name);
    window.location.href = "home.html";
  });
}

// =========================================
// LOGIN PAGE LOGIC (Untouched)
// =========================================
function handleLoginPage() {
  const loginBtn = document.getElementById("loginBtn");
  const inputEmail = document.getElementById("inputEmail");
  const inputPassword = document.getElementById("inputPassword");

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();

    if (!email || !password) { alert("Please fill in all fields!"); return; }
    alert("Login successful! (Demo only — no real authentication)");
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "home.html";
  });
}

// =========================================
// HOME PAGE LOGIC (HEAVILY UPGRADED)
// =========================================
function handleHomePage() {
  const profilePic = document.querySelector(".profile-pic");
  const logoutBtn = document.getElementById("logout-btn");
  const userName = localStorage.getItem("netflixUserName") || "Guest";
  const navbar = document.querySelector(".site-navbar");

  // 1. Auth Check
  if (!localStorage.getItem("isLoggedIn")) {
    window.location.href = "login.html";
    return;
  }

  // 2. User Greeting
  if (profilePic) {
    const greeting = document.createElement("span");
    greeting.textContent = `Hello, ${userName}`;
    greeting.classList.add("user-greeting");
    greeting.style.cssText = "color: #fff; margin-left: 10px; font-weight: bold; font-size: 0.9rem;";
    profilePic.insertAdjacentElement("afterend", greeting);
  }

  // 3. Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "login.html";
    });
  }

  // 4. Premium Search Toggle
  const searchIcon = document.querySelector(".search-icon");
  const searchInput = document.getElementById("search");

  if (searchIcon && searchInput) {
    searchIcon.addEventListener("click", () => {
      searchInput.classList.toggle("active");
      if (searchInput.classList.contains("active")) {
        searchInput.focus();
      } else {
        searchInput.value = ''; // clear when closing
      }
    });

    // Close search if clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-wrap") && searchInput.classList.contains("active")) {
        searchInput.classList.remove("active");
      }
    });
  }

  // 5. Navbar Scroll Effect (Solid black on scroll)
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // 6. Staggered Row Load Animation
  setTimeout(() => {
    document.querySelector(".rows").classList.add("loaded");
  }, 100);

  // 7. Carousel Arrow Logic
  const wrappers = document.querySelectorAll(".movie-row-wrapper");
  wrappers.forEach(wrapper => {
    const row = wrapper.querySelector(".movie-row");
    const leftBtn = wrapper.querySelector(".carousel-btn.left");
    const rightBtn = wrapper.querySelector(".carousel-btn.right");

    // Calculate scroll distance based on card width + gap
    const scrollAmount = 220 * 3; // roughly 3 cards

    if (leftBtn) {
      leftBtn.addEventListener("click", () => {
        row.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });
    }
    if (rightBtn) {
      rightBtn.addEventListener("click", () => {
        row.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });
    }
  });

  // 8. The "Holy Grail" Netflix Hover Delay
  const movies = document.querySelectorAll(".movie");
  let hoverTimeout;

  movies.forEach(movie => {
    movie.addEventListener("mouseenter", () => {
      // Small delay prevents flashing when moving mouse fast across the row
      hoverTimeout = setTimeout(() => {
        movie.classList.add("active");
      }, 300);
    });

    movie.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimeout); // Cancel hover if mouse leaves before 300ms
      movie.classList.remove("active");
    });

    // Keep card open if user moves mouse directly onto the expanded info box
    const hoverInfo = movie.querySelector(".movie-hover-info");
    if (hoverInfo) {
      hoverInfo.addEventListener("mouseenter", () => clearTimeout(hoverTimeout));
      hoverInfo.addEventListener("mouseleave", () => movie.classList.remove("active"));
    }
  });

  // 9. Movie Click Fallback (if they click the image itself)
  const movieImages = document.querySelectorAll(".movie img");
  movieImages.forEach((img) => {
    img.addEventListener("click", () => {
      alert("🎬 Demo only: Movie playback not available yet!");
    });
  });
}

// =========================================
// UNIVERSAL NAVIGATION HANDLER
// =========================================
document.addEventListener("click", (e) => {
  if (e.target.matches(".back-home")) {
    e.preventDefault();
    window.location.href = "home.html";
  }
});
