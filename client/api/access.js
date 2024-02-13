// Check if the user is authenticated and has the 'admin' role
if (!isAuthenticated()) {
  // Redirect to the login page or display an access denied message
  window.location.href = "login.html";
}

// Function to check if the user is authenticated
function isAuthenticated() {
  // Check if sessionStorage has an item called 'user'
  const userString = sessionStorage.getItem("user");

  // If 'user' is not null or undefined, parse it to a JavaScript object
  const user = userString ? JSON.parse(userString) : null;

  return !!user; // Convert to boolean
}

// Function to check if the user has the 'admin' role
function hasAdminRole() {
  // Check if sessionStorage has an item called 'user'
  const userString = sessionStorage.getItem("user");

  // If 'user' is not null or undefined, parse it to a JavaScript object
  const user = userString ? JSON.parse(userString) : null;

  return user && user.role === "admin";
}

// Function to logout
function logout() {
  sessionStorage.removeItem("user");
  window.location.href = "login.html";
}
