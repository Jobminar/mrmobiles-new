// Function to show the alert message
function showAlert(message, type) {
  const alertMessage = document.getElementById("alert-message");
  const alertClass = `alert alert-${type} alert-dismissible fade show`;
  alertMessage.innerHTML = `
      <div class="${alertClass}" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;

  // Show the alert
  alertMessage.classList.remove("hide");

  // Hide the alert after 2 seconds
  setTimeout(function () {
    const alertDiv = alertMessage.querySelector(".alert");
    alertDiv.classList.add("hide");
    alertDiv.remove(); // Remove the alert from the DOM after hiding
  }, 5000);
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const nameInput = document.querySelector('#signup-form input[type="text"]');
  const numberInput = document.querySelector(
    '#signup-form input[type="number"]'
  );
  const emailInput = document.querySelector('#signup-form input[type="email"]');
  // const checkbox = document.querySelector('#signup-form input[type="checkbox"]');
  const name = nameInput.value;
  const mobile = numberInput.value;
  const email = emailInput.value;

  // Make a POST request using Axios
  axios
    .post("http://localhost:8083/api/service-schedule", {
      name,
      email,
      mobile,
    })
    .then(function (response) {
      // Display the success message using the popup
      console.log(response);
      showAlert(response.data.message, "success");

      // Empty the form fields
      nameInput.value = "";
      emailInput.value = "";
      numberInput.value = "";
      // checkbox.checked = false;
    })
    .catch(function (error) {
      // Display the error message using the popup
      console.log(error);
      showAlert(error.response.data.error, "danger");
    });
}

// Add event listener to the form's submit button
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", handleFormSubmit);
