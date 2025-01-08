// Add an event listener for form submission
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    // Get form values
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;

    // Simple validation to check if fields are not empty
    if (name && email && message) {
        // Show an alert with the entered details
        alert(`Message Sent!\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
        
        // Optionally, clear the form after submission
        document.querySelector('form').reset();
    } else {
        // Show an alert if any field is empty
        alert('Please fill in all fields.');
    }
});