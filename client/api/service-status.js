// Remove token retrieval
// const token = sessionStorage.getItem('token');

// Handle the close button click (cross mark)
const modal = document.getElementById("editModal");
const closeBtn = document.getElementById("closeBtn");
closeBtn.onclick = function () {
  modal.style.display = "none";
};

function fetchAndRenderData() {
  axios
    .get("http://localhost:8083/api/customer/all-reports")
    .then(function (response) {
      const reportsData = response.data;

      const customerReportsBody = document.getElementById(
        "customer-reports-body"
      );
      customerReportsBody.innerHTML = ""; // Clear existing table rows

      let totalPendingAmount = 0;
      let totalPendingStatus = 0;

      reportsData.forEach(function (customer) {
        let pendingAmount = customer.priceQuoted - customer.advancePay;
        totalPendingAmount += pendingAmount;

        if (customer.status === "pending") {
          totalPendingStatus++;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${customer.service}</td>
          <td>${customer.name}</td>
          <td>${customer.mobile}</td>
          <td>${customer.email}</td>
          <td>${customer.priceQuoted}</td>
          <td>${customer.advancePay}</td>
          <td class='pending'>${pendingAmount}</td>
          <td><a href=''>${customer.status}</a></td>
          <td>${customer.registeredDate.slice(0, 10)}</td>
          <td>${customer.expectedDeliveryDate.slice(0, 10)}</td>
        `;

        customerReportsBody.appendChild(row);

        // Add Edit and Delete buttons
        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add("button");
        editButton.onclick = function () {
          const email = document.getElementById("email");
          email.value = customer.email;
          handleEditAction(customer._id, customer.email);
        };

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("button");
        deleteButton.onclick = function () {
          handleDeleteAction(customer._id);
        };

        const actionsCell = document.createElement("td");
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);
        customerReportsBody.appendChild(row);
      });

      const totalreport = document.getElementById("totalreport");
      totalreport.innerHTML = `
       <p><b>Total Pending Amount : </b>${totalPendingAmount}</p>
       <p><b>Total Pending Status : </b> ${totalPendingStatus}</p>
      `;
    })
    .catch(function (error) {
      console.error(error);
    });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  fetchAndRenderData(startDate, endDate);
}

function handleEditAction(id, emailId) {
  // console.log(id, emailId);
  // Display the modal
  const modal = document.getElementById("editModal");
  modal.style.display = "block";

  // Additional logic to pre-fill the form fields with customer data (if needed)

  // Handle the form submission
  const editForm = document.getElementById("editForm");
  editForm.onsubmit = function (event) {
    event.preventDefault();

    // Get the updated data from the form fields
    const expectedDeliveryDate = document.getElementById(
      "expectedDeliveryDate"
    ).value;
    const serviceStatus = document.getElementById("serviceStatus").value;
    const advancePay = document.getElementById("advancePay").value;

    // Call the function to update the customer data
    handleUpdateAction(
      id,
      expectedDeliveryDate,
      serviceStatus,
      advancePay,
      emailId
    );

    // Hide the modal after updating
    modal.style.display = "none";
  };
}

// Function to handle updating the customer data
function handleUpdateAction(
  id,
  expectedDeliveryDate,
  serviceStatus,
  advancePay,
  email
) {
  const data = {
    expectedDeliveryDate,
    status: serviceStatus,
    advancePay,
    email,
  };

  axios
    .put(`http://localhost:8083/api/service/status/${id}`, data)
    .then((response) => {
      alert(response.data.message);
      fetchAndRenderData();
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Function to delete
function handleDeleteAction(id) {
  axios
    .delete(`http://localhost:8083/api/customer/${id}`)
    .then((response) => {
      alert(response.data.message);
      fetchAndRenderData();
    })
    .catch((error) => {
      console.log(error);
      alert(error.message);
    });
}

var customerReportsForm = document.getElementById("customer-reports-form");
customerReportsForm.addEventListener("submit", handleFormSubmit);

// Trigger handleFormSubmit on page load (without any dates)
window.addEventListener("load", fetchAndRenderData);
