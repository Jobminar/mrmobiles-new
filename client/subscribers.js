document.addEventListener("DOMContentLoaded", function () {
  // Function to create a card element for each subscriber
  function createSubscriberCard(user) {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-4");

    const cardContent = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${user.email}</h5>
            <p class="card-text"><strong>Role:</strong> ${user.role}</p>
          </div>
        </div>
      `;

    card.innerHTML = cardContent;
    return card;
  }

  // Function to create the container and heading
  function createContainer() {
    const container = document.createElement("div");
    container.classList.add("container");

    const heading = document.createElement("h2");
    heading.classList.add("mt-4", "mb-4");
    heading.textContent = "Subscribers List";

    const subMainElement = document.createElement("div");
    subMainElement.classList.add("sub-main", "row");

    container.appendChild(heading);
    container.appendChild(subMainElement);

    return container;
  }

  // Function to show an error message
  function showError(message) {
    const subMainElement = document.getElementById("sub-main");
    subMainElement.innerHTML = `<p>${message}</p>`;
  }

  // Function to handle API fetch errors
  function handleFetchError(error) {
    console.error("Error fetching subscribers:", error);
    showError("Failed to load subscribers. Please try again later.");
  }

  // Fetch data from the API
  fetch("http://localhost:8083/api/get-all-users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const users = data.users;

      // Create container and heading
      const container = createContainer();
      document.body.appendChild(container);

      // Display the subscribers in cards
      const subMainElement = document.getElementById("sub-main");
      if (users.length > 0) {
        users
          .filter((user) => user.role === "user")
          .forEach((user) => {
            const card = createSubscriberCard(user);
            subMainElement.appendChild(card);
          });
      } else {
        showError("No subscribers found.");
      }
    })
    .catch(handleFetchError);
});
