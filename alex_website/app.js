document.addEventListener("DOMContentLoaded", function () {
  // Array of images for the Next Picture button
  const images = [
    // "mothers-day2.jpg",
    // "alex_snake.jpg",
    // "amy_birthday.jpg",
    // "dad_birthday.jpg",
    // "koungkoung_birthday.jpg",
    // "graduation.jpg",
    "banana_tart.jpg",
  ];

  // Current image index
  let currentImageIndex = 0;

  // Get the image element
  const imageElement = document.querySelector(".my-image");

  // Get the confetti button
  const confettiButton = document.getElementById("confetti-button");

  // Get or create the next picture button
  const nextPictureButton = document.getElementById("next-picture-button");

  // Add click event listener to the confetti button
  confettiButton.addEventListener("click", function () {
    createConfetti();
  });

  // Add click event listener to the next picture button
  nextPictureButton.addEventListener("click", function () {
    // Increment the image index
    currentImageIndex = (currentImageIndex + 1) % images.length;

    // Update the image source
    imageElement.src = images[currentImageIndex];

    // Add a small confetti celebration for the new image
    createSmallConfetti();
  });

  // Get the form element
  const messageForm = document.querySelector("form");

  // Add submit event listener to the form
  messageForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const textarea = document.querySelector("textarea");
    alert(textarea.value + "\nThank you for your lovely message! ❤️");
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

  // Function to create a smaller confetti effect for image change
  function createSmallConfetti() {
    const confettiContainer = document.createElement("div");
    confettiContainer.className = "confetti-container";
    document.body.appendChild(confettiContainer);

    // Create fewer confetti pieces for a subtle effect
    const colors = ["#ff99c8", "#fcb6d0", "#ffb6c1", "#ffd1dc", "#ffc0cb"];

    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDuration = Math.random() * 2 + 1 + "s";
      confetti.style.animationDelay = Math.random() * 1 + "s";
      confettiContainer.appendChild(confetti);
    }

    // Remove confetti container after animation
    setTimeout(function () {
      confettiContainer.remove();
    }, 3000);
  }
});