document.addEventListener("DOMContentLoaded", function () {
  // Function to create a card element for each FAQ
  function createFAQCard(faq) {
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");

    const cardContent = `
        <div class="card-body">
          <h5 class="card-title">${faq.name}</h5>
          <p class="card-text"><strong>Email:</strong> ${faq.email}</p>
          <p class="card-text"><strong>Phone:</strong> ${faq.phone}</p>
          <p class="card-text"><strong>Question:</strong> ${faq.question}</p>
          <p class="card-text"><strong>Message:</strong> ${
            faq.message ? faq.message : "N/A"
          }</p>
          <button class="btn btn-primary" onclick="callContact('${
            faq.phone
          }')">Call</button>
          <button class="btn btn-primary" onclick="sendMail('${
            faq.email
          }')">Mail</button>
        </div>
      `;

    card.innerHTML = cardContent;
    return card;
  }

  // Function to show an error message
  function showError(message) {
    const faqMainElement = document.querySelector(".faq-main");
    faqMainElement.innerHTML = `<p>${message}</p>`;
  }

  // Function to handle API fetch errors
  function handleFetchError(error) {
    console.error("Error fetching FAQs:", error);
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

  // Fetch data from the API
  fetch("http://localhost:8083/api/get-faq")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const faqs = data.faqs;

      // Display the FAQs in cards
      const faqMainElement = document.querySelector(".faq-main");
      if (faqs.length > 0) {
        const faqCards = faqs.map((faq) => createFAQCard(faq));
        faqCards.forEach((card) => faqMainElement.appendChild(card));
      } else {
        showError("No FAQs found.");
      }
    })
    .catch(handleFetchError);
});
