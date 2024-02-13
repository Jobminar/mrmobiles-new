// Remove token retrieval
// const token = sessionStorage.getItem("token");

const updatePasswordModal = document.getElementById("updatePasswordModal");
const closeUpdateBtn = document.getElementById("closeUpdateBtn");

// Function to open the add stock modal
function openUpdatePasswordModal() {
  updatePasswordModal.style.display = "block";
}

// Function to close the update Password modal
function closeUpdatePasswordModal() {
  updatePasswordModal.style.display = "none";
}

// Add event listener to the "X" button in the update stock modal
closeUpdateBtn.addEventListener("click", closeUpdatePasswordModal);

// Add event listener to the "Update Stock" button
const updatePasswordBtn = document.getElementById("updateBtn");
updatePasswordBtn.addEventListener("click", function (event) {
  event.preventDefault();
  updatePassword();
  closeUpdatePasswordModal();
});

// Function to update the password
function updatePassword() {
  const currentPassword = document.getElementById("currentPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const confirmNewPassword =
    document.getElementById("confirmNewPassword").value;

  if (newPassword !== confirmNewPassword) {
    alert("New password and confirm password do not match.");
    return;
  }
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user || !user._id) {
    alert("User information is missing.");
    return;
  }
  // Send the request to the server to update the password
  axios
    .post("http://localhost:8083/api/update-password", {
      userId: user._id,
      currentPassword: currentPassword,
      newPassword: newPassword,
    })
    .then(function (response) {
      alert(response.data.message);
      hideChangePasswordModal();
    })
    .catch(function (error) {
      alert(error);
    });
}
