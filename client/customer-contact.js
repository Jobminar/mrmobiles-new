document.addEventListener("DOMContentLoaded", function () {
  // Function to create a card element for each contact message
  function createContactCard(contact) {
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");

    // Destructure the contact object into variables
    const { name, email, phone_number, msg_subject, message } = contact;

    // Use template literals to create the card content string
    const cardContent = `
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text"><strong>Email:</strong> ${email}</p>
          <p class="card-text"><strong>Phone:</strong> ${phone_number}</p>
          <p class="card-text"><strong>Subject:</strong> ${msg_subject}</p>
          <p class="card-text"><strong>Message:</strong> ${message}</p>
          <button class="btn btn-primary call-button" data-phone="${phone_number}">Call</button>
          <button class="btn btn-primary mail-button" data-email="${email}">Mail</button>
        </div>
      `;

    card.innerHTML = cardContent;
    return card;
  }

  // Function to show an error message
  function showError(message) {
    const contactMainElement = document.querySelector(".contact-main");
    contactMainElement.innerHTML = `<p>${message}</p>`;
  }

  // Function to handle API fetch errors
  function handleFetchError(error) {
    console.error("Error fetching contact messages:", error);
    showError("Failed to load contact messages. Please try again later.");
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
  fetch("http://localhost:8083/api/get-contact-messages")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const contactMessages = data.contactMessages;

      // Display the contact messages in cards
      const contactMainElement = document.querySelector(".contact-main");
      if (contactMessages.length > 0) {
        const contactCards = contactMessages.map((contact) =>
          createContactCard(contact)
        );
        contactCards.forEach((card) => contactMainElement.appendChild(card));
        // Add an event listener to the contact-main element for button clicks
        contactMainElement.addEventListener("click", handleButtonClick);
      } else {
        showError("No contact messages found.");
      }
    })
    .catch(handleFetchError);
});
