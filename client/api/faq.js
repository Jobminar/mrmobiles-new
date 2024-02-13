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
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("faq-form");
  const alertMessage = document.getElementById("alert-message");

  function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const number = document.getElementById("number").value;
    const question = document.getElementById("question").value;
    const message = document.getElementById("message").value;

    // Create a JavaScript object with the form data
    const formData = {
      name: name,
      email: email,
      number: parseInt(number), // Convert to a number if needed
      question: question,
      message: message,
    };

    // Make the API request using fetch
    fetch("http://localhost:8083/api/faq", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Convert the object to JSON
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response here
        alertMessage.textContent = "Question sent successfully!";
        alertMessage.classList.remove("hide");
      })
      .catch((error) => {
        // Handle any errors here
        alertMessage.textContent = "Error sending question. Please try again.";
        alertMessage.classList.remove("hide");
      });
  }

  // Attach the handleFormSubmit function to the form's submit event
  form.addEventListener("submit", handleFormSubmit);
});
