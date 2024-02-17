document.addEventListener("DOMContentLoaded", () => {
  // Function to create a card element for each FAQ
  function createFAQCard(faq) {
    // Destructure the faq object into variables
    const { name, email, phone, question, message } = faq;

    // Create a div element and add the card and mb-3 classes
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");

    // Use template literals to create the card content string
    const cardContent = `
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text"><strong>Email:</strong> ${email}</p>
        <p class="card-text"><strong>Phone:</strong> ${phone}</p>
        <p class="card-text"><strong>Question:</strong> ${question}</p>
        <p class="card-text"><strong>Message:</strong> ${
          message ? message : "N/A"
        }</p>
        <button class="btn btn-primary call-button" data-phone="${phone}">Call</button>
        <button class="btn btn-primary mail-button" data-email="${email}">Mail</button>
      </div>
    `;

    // Set the innerHTML of the card element to the card content string
    card.innerHTML = cardContent;

    // Return the card element
    return card;
  }

  // Function to show an error message
  function showError(message) {
    // Get the faq-main element and set its innerHTML to the message
    const faqMainElement = document.querySelector(".faq-main");
    faqMainElement.innerHTML = `<p>${message}</p>`;
  }

  // Function to handle API fetch errors
  function handleFetchError(error) {
    // Log the error to the console
    console.error("Error fetching FAQs:", error);
    // Show an error message to the user
    showError("Failed to load FAQs. Please try again later.");
  }

  // Function to initiate a phone call
  function callContact(phone) {
    window.location.href = `tel:${phone}`;
  }

  // Function to initiate a mail
  function sendMail(email) {
    window.location.href = `mailto:${email}`;
  }

  // Function to handle button clicks
  function handleButtonClick(event) {
    // Get the target element of the event
    const target = event.target;
    // Check if the target element is a button
    if (target.tagName === "BUTTON") {
      // Check if the target element has the call-button class
      if (target.classList.contains("call-button")) {
        // Get the phone value from the data attribute
        const phone = target.dataset.phone;
        // Call the contact
        callContact(phone);
      }
      // Check if the target element has the mail-button class
      if (target.classList.contains("mail-button")) {
        // Get the email value from the data attribute
        const email = target.dataset.email;
        // Mail the contact
        sendMail(email);
      }
    }
  }

  // Fetch data from the API
  fetch("http://localhost:8083/api/get-faq")
    .then((response) => {
      // Check if the response is ok, otherwise throw an error
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Return the response as JSON
      return response.json();
    })
    .then((data) => {
      // Get the faqs array from the data
      const faqs = data.faqs;

      // Display the FAQs in cards
      const faqMainElement = document.querySelector(".faq-main");
      // Check if the faqs array is not empty
      if (faqs.length > 0) {
        // Map each faq object to a card element
        const faqCards = faqs.map((faq) => createFAQCard(faq));
        // Append each card element to the faq-main element
        faqCards.forEach((card) => faqMainElement.appendChild(card));
        // Add an event listener to the faq-main element for button clicks
        faqMainElement.addEventListener("click", handleButtonClick);
      } else {
        // Show a message that no FAQs were found
        showError("No FAQs found.");
      }
    })
    .catch(handleFetchError); // Catch any errors and handle them
});
