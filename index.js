document.addEventListener("DOMContentLoaded", () => {
  toggleNavbarButtons();
});

function toggleNavbarButtons() {
  const logoutButton = document.getElementById("logoutButton");

  if (isLoggedIn()) {
    logoutButton.style.display = "block";
    loginButton.style.display = "none";
    profileButton.style.display = "block";
  } else {
    logoutButton.style.display = "none";
    loginButton.style.display = "block";
    profileButton.style.display = "none";
  }
}

function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function handleLogout() {
  const token = localStorage.getItem("token");

  fetch("https://recipenest.onrender.com/api/logout/", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      toggleNavbarButtons();
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error during logout:", error);
    });
}
