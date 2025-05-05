document.addEventListener("DOMContentLoaded", function () {
  // Get the confetti button
  const confettiButton = document.getElementById("confetti-button");

  // Add click event listener to the button
  confettiButton.addEventListener("click", function () {
    createConfetti();
  });

  // Get the form element
  const messageForm = document.querySelector("form");

  // Add submit event listener to the form
  messageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const textarea = document.querySelector("textarea");
    alert("Message sent: " + textarea.value);
    textarea.value = "";

    // Show confetti on form submission too
    createConfetti();
  });

  // Function to create confetti effect
  function createConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.className = "confetti-container";
    document.body.appendChild(confettiContainer);

    // Create multiple confetti pieces
    const colors = ["#ff99c8", "#fcb6d0", "#ffb6c1", "#ffd1dc", "#ffc0cb"];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
      confetti.style.animationDelay = Math.random() * 2 + "s";
      confettiContainer.appendChild(confetti);
    }

    // Remove confetti container after animation
    setTimeout(function () {
      confettiContainer.remove();
    }, 5000);
  }
});
