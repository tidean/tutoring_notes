// Array of flower emojis to randomly choose from
const flowers = ["🌸", "🌹", "🌺", "🌻", "🌼", "💐", "🌷", "🪷"];

// Form submission handling
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const textarea = document.querySelector("textarea");
    const message = textarea.value.trim();

    if (message) {
      // Show thank you message
      alert("Thank you for your lovely message! ❤️");
      textarea.value = "";

      // Create lots of flowers for successful submission
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          createFlower(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }, i * 100);
      }
    } else {
      alert("Please write a message before submitting.");
    }
  });

  // Click anywhere to create flowers
  document.addEventListener("click", (e) => {
    // Create 3 flowers at once at the clicked location
    for (let i = 0; i < 3; i++) {
      // Add slight randomness to position
      const offsetX = (Math.random() - 0.5) * 50;
      const offsetY = (Math.random() - 0.5) * 50;

      setTimeout(() => {
        createFlower(e.clientX + offsetX, e.clientY + offsetY);
      }, i * 150);
    }
  });
});

// Function to create a flower at the specified position
function createFlower(x, y) {
  // Create a new div element for the flower
  const flower = document.createElement("div");

  // Randomly select a flower emoji
  const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];

  // Set the flower properties
  flower.className = "flower";
  flower.textContent = randomFlower;
  flower.style.left = `${x}px`;
  flower.style.top = `${y}px`;

  // Add some randomness to the animation
  const rotation = Math.random() * 360;
  const duration = 2 + Math.random() * 2;

  flower.style.transform = `rotate(${rotation}deg)`;
  flower.style.animationDuration = `${duration}s`;

  // Add the flower to the body
  document.body.appendChild(flower);

  // Remove the flower from the DOM after animation completes
  setTimeout(() => {
    flower.remove();
  }, duration * 1000);
}
