
// Function to handle the form submission for resetting the password
function handleResetPassword(event) {
    event.preventDefault();
  
    const email = document.getElementById('resetPasswordEmail').value;
    const newPassword = document.getElementById('resetPasswordPassword').value;
    const confirmPassword = document.getElementById('resetPasswordConfirmPassword').value;
  
    // Validate if the passwords match
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please re-enter your new password.');
      return;
    }
  
    // Send the reset password request to the server
    axios
      .post('http://localhost:8083/api/reset-password', { email, newPassword })
      .then(function (response) {
        alert(response.data.message);
        window.location.href='login.html'
      })
      .catch(function (error) {
        console.error(error);
        alert('An error occurred while resetting your password. Please try again later.');
      });
  }
  
  // Add event listener to the form submit
  const resetPasswordForm = document.querySelector('#resetPasswordForm');
  resetPasswordForm.addEventListener('submit', handleResetPassword);
  