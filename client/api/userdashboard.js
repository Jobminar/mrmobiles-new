document.addEventListener("DOMContentLoaded", function () {
  // Assuming you have the user object in sessionStorage
  const user = JSON.parse(sessionStorage.getItem("user"));

  // Get the email from sessionStorage user object
  const userEmail = user ? user.email : "";

  // Call the API to get the serviceId based on the email
  fetch(`http://localhost:8083/api/customer/serviceId/${userEmail}`)
    .then((response) => {
      console.log("API Response:", response);
      return response.json();
    })
    .then((data) => {
      console.log("Data:", data);

      // Display the serviceId in the paragraph tag
      const resultParagraph = document.getElementById("serviceIdPrint");
      resultParagraph.textContent = `Service ID: ${data.serviceId}`;
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle error if necessary
    });
});

function getDetails(e) {
  e.preventDefault();
  const serviceID = document.getElementById("serviceId").value;
  axios
    .get(`http://localhost:8083/api/customer/requests/${serviceID}`)
    .then((response) => {
      const responseContainer = document.getElementById("responseContainer");
      // Clear any previous content in the container
      responseContainer.innerHTML = "";

      if (response.data.error) {
        // Display an error message if the request returned an error
        const errorMessage = document.createElement("p");
        errorMessage.textContent = response.data.error;
        responseContainer.appendChild(errorMessage);
      } else {
        // Display the response details in the container
        const details = response.data;
        console.log(details);
        let dueAmount = details.priceQuoted - details.advancePay;
        responseContainer.innerHTML = `
          <h3>Your Details</h3>
          <ul>
            <li>Device Model : ${details.mobileModel}</li>
            <li>Issue : ${details.issue}</li>
            <li>Service Status : <b> ${details.status} </b></li>
            <li>Registered date : ${details.registeredDate}</li>
            <li>Delivery date : ${details.expectedDeliveryDate}</li>
            <li>Price Quoted : ${details.priceQuoted}</li>
            <li>Advance Paid : ${details.advancePay}</li>
            <li>Due Amount : ${dueAmount}</li>
          </ul>
        `;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
