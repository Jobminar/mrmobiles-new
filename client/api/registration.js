// Function to show the success message
function showSuccessMessage(message) {
  const msgSubmit = document.getElementById("msgSubmit");
  msgSubmit.textContent = message;
  msgSubmit.classList.remove("hidden");

  // Hide the success message after 3 seconds
  setTimeout(function () {
    msgSubmit.classList.add("hidden");
    msgSubmit.textContent = "";
  }, 3000);
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  let email = document.getElementById("exampleInputEmail").value;
  let password = document.getElementById("exampleInputPassword").value;

  let passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordPattern.test(password)) {
    // Display error message for invalid password
    showSuccessMessage(
      "Invalid password! Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
    );
    return;
  }

  // Make a POST request using Axios
  axios
    .post("http://localhost:8083/api/register", {
      email,
      password,
    })
    .then(function (response) {
      // Display success message
      // console.log(response);
      showSuccessMessage(response.data.message);

      // Reset the form
      document.getElementById("register-form").reset();

      // Navigate to login.html
      window.location.href = "login.html";
    })
    .catch(function (error) {
      // Display error message
      // console.log(error);
      showSuccessMessage(error.response.data.error);
    });
}

// Add event listener to the form's submit button
var registerForm = document.getElementById("register-form");
registerForm.addEventListener("submit", handleFormSubmit);
