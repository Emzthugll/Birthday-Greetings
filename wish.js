// Initialize EmailJS
(function () {
  emailjs.init("YOUR_USER_ID");
})();

// Handle form submission
document
  .getElementById("wishForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const wish = document.getElementById("wish").value;

    // Send email using EmailJS
    emailjs
      .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        wish: wish,
      })
      .then(
        function (response) {
          document.getElementById("responseMessage").innerText =
            "Birthday wish sent successfully!";
          document.getElementById("wishForm").reset();
        },
        function (error) {
          document.getElementById("responseMessage").innerText =
            "Failed to send wish. Please try again.";
          console.error("Error:", error);
        }
      );
  });
