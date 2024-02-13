// Function to handle form submission

function generateRandomString(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get form values
  const name = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;
  const mobileMake = document.getElementById("mobileMake").value;
  const mobileModel = document.getElementById("mobileModel").value;
  const imeiNumber = document.getElementById("imeiNumber").value;
  const reference = document.getElementById("reference").value;
  const issue = document.getElementById("issue").value;
  const priceQuoted = document.getElementById("priceQuoted").value;
  const advancePay = document.getElementById("advancePay").value;
  const registeredDate = document.getElementById("registeredDate").value;
  const expectedDeliveryDate = document.getElementById(
    "expectedDeliveryDate"
  ).value;
  const comments = document.getElementById("comments").value;
  const serviceId = generateRandomString(6);
  // Make a POST request using Axios
  axios
    .post("http://localhost:8083/api/customer/onboarding", {
      serviceId,
      name,
      mobile,
      email,
      mobileMake,
      mobileModel,
      imeiNumber,
      reference,
      issue,
      priceQuoted,
      advancePay,
      registeredDate,
      expectedDeliveryDate,
      comments,
    })
    .then(function (response) {
      // Display success message
      const ptag = document.getElementById("response");
      ptag.innerText = response.data.message;

      setTimeout(() => {
        window.location.href = "customer-report.html";
      }, 5000);

      // Reset the form
      document.getElementById("customer-onboarding-form").reset();
    })
    .catch(function (error) {
      // Display error message
      console.log(error);
      const ptag = document.getElementById("response");
      ptag.innerText = error.response.data.error;
      ptag.innerText = "Session expired, please Login again";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 2000);
    });
}

// Add event listener to the form's submit button
var customerOnboardingForm = document.getElementById(
  "customer-onboarding-form"
);
customerOnboardingForm.addEventListener("submit", handleFormSubmit);
