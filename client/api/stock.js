// Remove token retrieval
// let token = sessionStorage.getItem("token");

// Get the addStockModal element and the closeBtn element
const addStockModal = document.getElementById("addStockModal");
const closeBtn = document.getElementById("closeBtn");

// Function to open the add stock modal
function openAddStockModal() {
  addStockModal.style.display = "block";
}

// Function to close the add stock modal
function closeAddStockModal() {
  addStockModal.style.display = "none";
}

// Add event listener to the "Add Stock" button
const addStockButton = document.querySelector(".button");
addStockButton.addEventListener("click", openAddStockModal);

// Add event listener to the "X" button
closeBtn.addEventListener("click", closeAddStockModal);

const addStockBtn = document.getElementById("addBtn");
addStockBtn.onclick = function (event) {
  event.preventDefault();
  addStock();
};

// Get the updateStockModal element and the closeUpdateBtn element
const updateStockModal = document.getElementById("updateStockModal");
const closeUpdateBtn = document.getElementById("closeUpdateBtn");

let currentStockId;
// Function to open the add stock modal
function openUpdateStockModal(stockId) {
  currentStockId = stockId;
  updateStockModal.style.display = "block";
}

// Function to close the update stock modal
function closeUpdateStockModal() {
  updateStockModal.style.display = "none";
}

// Add event listener to the "X" button in the update stock modal
closeUpdateBtn.addEventListener("click", closeUpdateStockModal);

// Add event listener to the "Update Stock" button
const updateStockBtn = document.getElementById("updateBtn");
updateStockBtn.addEventListener("click", function (event) {
  event.preventDefault();
  updateStock(currentStockId); // Pass the stock ID to the updateStock function
  closeUpdateStockModal(); // Close the modal after updating
});

// Function to fetch and render stock data
function fetchAndRenderStock() {
  axios
    .get("http://localhost:8083/api/stocks")
    .then(function (response) {
      const stockData = response.data;
      // Generate the stock table dynamically
      const stockTable = document.getElementById("stock-table");
      stockTable.innerHTML = `
          <table class='table-bordered w-100'>
            <thead>
              <tr>
                <th>Item name</th>
                <th>Item model</th>
                <th>Quantity</th>
                <th>Item type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${stockData
                .map(
                  (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.model}</td>
                  <td>${item.quantity}</td>
                  <td>${item.type}</td>
                  <td>
                    <button onclick="openUpdateStockModal('${item._id}')" class='button'><i class="fas fa-edit"></i></button>
                    <button onclick="deleteStock('${item._id}')" class='button'><i class="fas fa-trash"></i></button>
                  </td>
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        `;
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Function to add stock
function addStock() {
  const itemName = document.getElementById("itemName").value;
  const itemModel = document.getElementById("itemModel").value;
  const itemType = document.getElementById("itemType").value;
  const quantity = parseInt(document.getElementById("quantity").value);
  const data = {
    name: itemName,
    model: itemModel,
    type: itemType,
    quantity: quantity,
  };
  // console.log(data);
  axios
    .post("http://localhost:8083/api/stocks", data)
    .then(function (response) {
      alert(response.data.message);
      fetchAndRenderStock();
      closeAddStockModal();
    })
    .catch(function (error) {
      alert(error.response.data.error);
    });
}

// Function to update stock
function updateStock(stockId) {
  const itemName = document.getElementById("updateItemName").value;
  const itemModel = document.getElementById("updateItemModel").value;
  const itemType = document.getElementById("updateItemType").value;
  const quantity = parseInt(document.getElementById("updateQuantity").value);
  const data = {
    name: itemName,
    model: itemModel,
    type: itemType,
    quantity: quantity,
  };
  console.log(stockId);
  axios
    .put(`http://localhost:8083/api/stocks/${stockId}`, data)
    .then(function (response) {
      alert(response.data.message);
      fetchAndRenderStock();
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Function to delete stock
function deleteStock(stockId) {
  axios
    .delete(`http://localhost:8083/api/stocks/${stockId}`)
    .then(function (response) {
      alert(response.data.message);
      fetchAndRenderStock();
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Trigger fetchAndRenderStock on page load
window.addEventListener("load", fetchAndRenderStock);
