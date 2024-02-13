function handleFormSubmit(event) {
  event.preventDefault();

  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  axios
    .get("http://localhost:8083/api/customer/reports", {
      params: {
        startDate,
        endDate,
      },
    })
    .then(function (response) {
      const reportsData = response.data;
      console.log(reportsData);
      const customerReportsBody = document.getElementById(
        "customer-reports-body"
      );
      customerReportsBody.innerHTML = ""; // Clear existing table rows

      let totalPendingAmount = 0; // Variable to store the total pending amount
      let totalPendingStatus = 0; // Variable to store the count of pending statuses

      // Loop through the reports data and create table rows
      reportsData.forEach(function (customer) {
        let pendingamount = customer.priceQuoted - customer.advancePay;
        totalPendingAmount += pendingamount;
        if (customer.status === "pending") {
          totalPendingStatus++;
        }

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.serviceId}</td>
            <td>${customer.name}</td>
            <td>${customer.mobile}</td>
            <td>${customer.email}</td>
            <td>${customer.mobileMake}</td>
            <td>${customer.mobileModel}</td>
            <td>${customer.imeiNumber}</td>
            <td>${customer.reference}</td>
            <td>${customer.issue}</td>
            <td>${customer.priceQuoted}</td>
            <td>${customer.advancePay}</td>
            <td class='pending'>${pendingamount}</td>
            <td><a href='service-status.html'>${customer.status}</a></td>
            <td>${customer.registeredDate.slice(0, 10)}</td>
            <td>${customer.expectedDeliveryDate.slice(0, 10)}</td>
            <td>${customer.comments}</td>
            
          `;
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

var customerReportsForm = document.getElementById("customer-reports-form");
customerReportsForm.addEventListener("submit", handleFormSubmit);

// Trigger handleFormSubmit on page load (without any dates)
window.addEventListener("load", handleFormSubmit);

// Function to export table data to Excel
function exportToExcel() {
  const reportsTableHeders = document.getElementById(
    "customer-reports-headers"
  );
  const reportsTable = document.getElementById("customer-reports-body");
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;

  const headers = Array.from(reportsTableHeders.querySelectorAll("th")).map(
    (header) => header.innerText
  );
  const data = Array.from(reportsTable.querySelectorAll("tr")).map((row) =>
    Array.from(row.querySelectorAll("td")).map((cell) => cell.innerText)
  );

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Customer_Reports");

  // Generate the Excel file and trigger the download
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const dataBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  const excelFileName = `customer_reports(${startDate} to ${endDate}).xlsx`;

  if (typeof window.navigator.msSaveBlob === "function") {
    // For IE and Edge browsers
    window.navigator.msSaveBlob(dataBlob, excelFileName);
  } else {
    // For other modern browsers
    const url = window.URL.createObjectURL(dataBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = excelFileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

// Add event listener to the Excel button
const excelButton = document.getElementById("excelBtn");
excelButton.addEventListener("click", exportToExcel);
