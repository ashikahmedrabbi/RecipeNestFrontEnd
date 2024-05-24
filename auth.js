document.getElementById('registrationForm').addEventListener('submit', handleRegistration);

async function handleRegistration(event) {
    event.preventDefault(); // Prevent default form submission behavior

    const name = getValue('name');
    const username = getValue('username');
    const email = getValue('email');
    const bio = getValue('bio');
    const password = getValue('password');

    const info = { name, username, email, bio, password };

    // Password validation regex
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    
    if (passwordRegex.test(password)) {
        console.log("Registration info:", info);

        try {
            const response = await fetch("https://recipenest.onrender.com/api/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(info),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const data = await response.json();
            console.log("Server response:", data);

            if (data.success) {
                showToast(); // Display toast notification upon successful registration
                window.location.href = "login.html"; // Redirect to login page
            } else {
                displayError(data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            displayError("An error occurred during registration. Please try again.");
        }
    } else {
        displayError("Password must contain eight characters, at least one letter, one number, and one special character.");
    }
}

function getValue(id) {
    const value = document.getElementById(id).value;
    console.log(`Value of ${id}:`, value); // Debugging line to check values
    return value;
}

function showToast() {
    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

function displayError(message) {
    const errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('d-none');
    } else {
        console.error("Error element not found in the DOM.");
    }
}
