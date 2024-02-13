document.addEventListener("DOMContentLoaded", function () {
  const serviceBookingModal = document.getElementById("serviceBookingModal");
  const closeServiceBookingBtn = document.getElementById(
    "closeServiceBookingBtn"
  );
  const serviceBookingForm = document.getElementById("service-booking-form");
  const bookingMessage = document.getElementById("bookingMessage");
  const bookNowBtn = document.getElementById("bookNowBtn");

  // Open the service booking modal
  function openServiceBookingModal() {
    serviceBookingModal.style.display = "block";
  }

  // Close the service booking modal
  function closeServiceBookingModal() {
    serviceBookingModal.style.display = "none";
  }

  // Clear form fields and display success message
  function showBookingSuccessMessage() {
    serviceBookingForm.reset();
    bookingMessage.classList.remove("hidden");

    // Hide the success message after 2 seconds
    setTimeout(function () {
      bookingMessage.classList.add("hidden");
    }, 2000);
  }

  // Submit service function
  // Submit service function
  function submitServiceFunction() {
    // Get input values
    const serviceType = document.getElementById("serviceType").value;
    const deviceName = document.getElementById("deviceName").value;
    const deviceType = document.getElementById("itemType").value;
    const make = document.getElementById("make").value;
    const itemModel = document.getElementById("itemModel").value;
    const customerName = document.getElementById("customerName").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const description = document.getElementById("description").value;

    // Create request body
    const requestBody = {
      serviceType: serviceType,
      deviceName: deviceName,
      deviceType: deviceType,
      make: make,
      itemModel: itemModel,
      customerName: customerName,
      phoneNumber: phoneNumber,
      description: description,
    };

    // Log the request body to console (for demonstration purposes)
    console.log("Request Body:", requestBody);

    // Simulate API call using fetch
    fetch(`http://localhost:8083/api/book-service`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle API response as needed
        console.log("API Response:", data);

        // Assuming your API returns a success status, you can show the success message
        showBookingSuccessMessage();

        // Close the modal after a successful API call
        closeServiceBookingModal();
      })
      .catch((error) => {
        console.error("Error:", error);

        // Handle errors or show an error message if needed
      });
  }

  // Event listener for closing the modal
  closeServiceBookingBtn.addEventListener("click", closeServiceBookingModal);

  // Event listener for submitting the form
  serviceBookingForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // Call the submit service function
    submitServiceFunction();
  });

  // Event listener for opening the modal
  bookNowBtn.addEventListener("click", openServiceBookingModal);
});
