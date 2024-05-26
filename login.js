document.getElementById("loginForm").addEventListener("submit", handleLogin);

async function handleLogin(event) {
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
      localStorage.setItem("isLoggedIn", "true");
      //toggleNavbarButtons();
      window.location.href = "index.html";
    } else {
      displayError(
        "Login failed. Please check your credentials and try again."
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    displayError("An error occurred during login. Please try again.");
  }
}

function getValue(id) {
  return document.getElementById(id).value;
}

function displayError(message) {
  const errorElement = document.getElementById("loginError");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.classList.remove("d-none");
  } else {
    console.error("Error element not found in the DOM.");
  }
}

// document.addEventListener("DOMContentLoaded", toggleNavbarButtons);

// function toggleNavbarButtons() {

//   const logoutButton = document.getElementById("logoutButton");

//   if (isLoggedIn()) {
//     logoutButton.style.display = "block";
//     loginButton.style.display = "none";
//   } else {
//     logoutButton.style.display = "none";
//     loginButton.style.display = "block";
//   }
// }

// function isLoggedIn() {
//   return localStorage.getItem("isLoggedIn") === "true";
// }
