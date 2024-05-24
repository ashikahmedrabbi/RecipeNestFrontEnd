const handleLogin = async (event) => {
  event.preventDefault();
  const username = getValue("username");
  const password = getValue("password");

  if (!username || !password) {
    displayError("Please enter both username and password.");
    return;
  }

  try {
    const response = await fetch("https://recipenest.onrender.com/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Network response was not ok: ${errorText}`);
    }

    const data = await response.json();

    if (data.jwt) {
      localStorage.setItem("token", data.jwt);
      toggleNavbarButtons(); // Call this function to update the button display
      window.location.href = "index.html";
    } else {
      displayError("Login failed. Please check your credentials and try again.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    displayError("An error occurred during login. Please try again.");
  }
};

const getValue = (id) => {
  return document.getElementById(id).value;
};

const displayError = (message) => {
  const errorElement = document.getElementById("loginError");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove("d-none");
  } else {
    console.error("Error element not found in the DOM.");
  }
};

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

const toggleNavbarButtons = () => {
  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");

  if (isLoggedIn()) {
    logoutButton.style.display = "block";
    loginButton.style.display = "none";
  } else {
    logoutButton.style.display = "none";
    loginButton.style.display = "block";
  }
};
document.addEventListener("DOMContentLoaded", toggleNavbarButtons);

// Call toggleNavbarButtons after successful login
// Example: After setting the token in localStorage
localStorage.setItem("token", "your_token_here");
toggleNavbarButtons()

const handleLogout = () => {
  localStorage.removeItem("token");
  toggleNavbarButtons(); // Call this function to update the button display
  window.location.href = "index.html";
};

document.addEventListener("DOMContentLoaded", toggleNavbarButtons);
