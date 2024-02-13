// // Update the populateDashboard function to include user information
// function populateDashboard() {
//     let token = sessionStorage.getItem("token");
//     if (!token) {
//       // Handle case when the token is not available (user not logged in)
//       return;
//     }
  
//     try {
//       // Decode the token to access user information
//       const decodedToken = jwt_decode(token);
  
//       // Check if the user role is admin
//       if (decodedToken.userRole === "admin") {
//         // Make a GET request to fetch the data for admin dashboard
//         axios
//           .get("http://localhost:8083/admin/dashboard", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           })
//           .then(function (response) {
//             // Handle the data and update the dashboard content
//             const dashboardContent = document.getElementById("dashboard-content");
//             // Update the content using the response data
//             console.log(response);
//             dashboardContent.innerHTML = `<p>${response.data.message}</p>`;
//           })
//           .catch(function (error) {
//             console.log(error);
//           });
//       } else {
//         // Handle case when the user is not an admin
//         console.log("Access denied. User is not an admin.");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
  
//   // Add event listeners
//   document.addEventListener("DOMContentLoaded", populateDashboard);



function getData(){
  const user=sessionStorage.getItem("user")
  console.log(user);
}
getData()
  