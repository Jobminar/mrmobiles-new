function showSuccessMessage(message) {
  const msgSubmit = document.getElementById("msgSubmit");
  msgSubmit.textContent = message;
  msgSubmit.classList.remove("hidden");

  // Hide the success message after 3 seconds
  setTimeout(function () {
    msgSubmit.classList.add("hidden");
    msgSubmit.textContent = "";
  }, 5000);
}

function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const email = document.getElementById("exampleInputEmail1").value;
  const password = document.getElementById("exampleInputPassword1").value;
  console.log("Email:", email);
  console.log("Password:", password);

  axios
    .post("http://localhost:8083/api/login", {
      email,
      password,
    })
    .then(function (response) {
      // Check if response is defined
      if (response) {
        console.log("Response from login API:", response);

        // Check if response.data is defined
        if (response.data) {
          showSuccessMessage(response.data.message);

          // Reset the form
          document.getElementById("login-form").reset();

          // Check if user and user.email are defined before accessing
          if (response.data.user && response.data.user.email) {
            // Store the user information in sessionStorage
            sessionStorage.setItem("user", JSON.stringify(response.data.user));

            // Navigation
            if (response.data.user.email === "mrmobilesandpcs@admin.com") {
              console.log("Redirecting to admin dashboard");
              window.location.href = "admin-dashboard.html";
            } else {
              console.log("Redirecting to user dashboard");
              window.location.href = "userdashboard.html";
            }
          } else {
            console.error(
              "Error: User or user.email is undefined in the response"
            );
          }
        } else {
          console.error("Error: response.data is undefined");
        }
      } else {
        console.error("Error: Response is undefined");
      }
    })
    .catch(function (error) {
      console.error(
        "Error from login API:",
        error.response ? error.response.data.error : error.message
      );
      showSuccessMessage(
        error.response ? error.response.data.error : error.message
      );
    });
}

// Add event listener to the form's submit button
var loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", handleFormSubmit);
