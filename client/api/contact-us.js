// Function to show the success message
function showSuccessMessage(message) {
  const msgSubmit = document.getElementById("msgSubmit");
  msgSubmit.innerHTML = message;
  msgSubmit.classList.remove("hidden");

  // Hide the success message after 3 seconds
  setTimeout(function () {
    msgSubmit.classList.add("hidden");
    msgSubmit.innerHTML = "";
  }, 3000);
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone_number = document.getElementById("phone_number").value;
  const msg_subject = document.getElementById("msg_subject").value;
  const message = document.getElementById("message").value;

  // Make a POST request using Axios
  axios
    .post("http://localhost:8083/api/contact", {
      name: name,
      email: email,
      phone_number: phone_number,
      msg_subject: msg_subject, // Corrected property name
      message: message,
    })
    .then(function (response) {
      // Display the success message
      showSuccessMessage(response.data.message);

      // Reset the form
      document.getElementById("contactForm").reset();
    })
    .catch(function (error) {
      // Display the error message
      console.error(error);
      showErrorMessage("An error occurred. Please try again later."); // Corrected function name
    });
}

// Add event listener to the form's submit button
const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", handleFormSubmit);
