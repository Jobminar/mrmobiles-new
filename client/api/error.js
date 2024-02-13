// JavaScript to Handle 404 Error
document.addEventListener('DOMContentLoaded', () => {
    // Check if the current URL is valid (status 200)
    fetch(document.location.href)
      .then(response => {
        console.log(response);
        if (response.status ==404) {
          // If the URL is not valid, redirect to the custom 404 page
          window.location.href = '404.html';
        }
      })
      .catch(error => {
        // If there is an error, redirect to the custom 404 page
        if(error)
        window.location.href = '404.html';
      });
  });
  