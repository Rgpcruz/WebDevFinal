document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get form values
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  // Check if all fields are filled
  if (name && email && message) {
    // Show success alert
    alert("Message Sent Successfully!");

    // Optionally, clear the form
    document.querySelector("form").reset();
  } else {
    // Alert if fields are empty
    alert("Please fill in all fields.");
  }
});