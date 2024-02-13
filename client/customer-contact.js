document.addEventListener("DOMContentLoaded", function () {
  // Function to create a card element for each contact message
  function createContactCard(contact) {
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");

    const cardContent = `
        <div class="card-body">
          <h5 class="card-title">${contact.name}</h5>
          <p class="card-text"><strong>Email:</strong> ${contact.email}</p>
          <p class="card-text"><strong>Phone:</strong> ${contact.phone_number}</p>
          <p class="card-text"><strong>Subject:</strong> ${contact.msg_subject}</p>
          <p class="card-text"><strong>Message:</strong> ${contact.message}</p>
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
      } else {
        showError("No contact messages found.");
      }
    })
    .catch(handleFetchError);
});
