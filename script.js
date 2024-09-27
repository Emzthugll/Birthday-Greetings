let highestZ = 1;
let musicPlaying = false; // Flag to track if music is currently playing

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  prevMouseX = 0;
  prevMouseY = 0;

  audio = new Audio("music/PALAGI.mp3"); // Make sure the path is correct

  init(paper, index) {
    // Set the initial position of the paper based on its index
    const initialX = 50 * (index % 3); // Adjust spacing and arrangement
    const initialY = 50 * Math.floor(index / 3); // Adjust spacing and arrangement
    paper.style.transform = `translate(${initialX}px, ${initialY}px)`;

    document.addEventListener("mousemove", (e) => {
      if (this.holdingPaper) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate the new position of the paper
        const deltaX = mouseX - this.prevMouseX;
        const deltaY = mouseY - this.prevMouseY;

        // Update the position of the paper based on the mouse movement
        const currentTransform = getComputedStyle(paper).transform;
        let currentPaperX = 0;
        let currentPaperY = 0;

        if (currentTransform !== "none") {
          const matrix = currentTransform
            .match(/matrix.*\((.+)\)/)[1]
            .split(", ");
          currentPaperX = parseFloat(matrix[4]);
          currentPaperY = parseFloat(matrix[5]);
        }

        paper.style.transform = `translate(${currentPaperX + deltaX}px, ${
          currentPaperY + deltaY
        }px)`;

        // Update previous mouse position
        this.prevMouseX = mouseX;
        this.prevMouseY = mouseY;
      }
    });

    paper.addEventListener("mousedown", (e) => {
      if (this.holdingPaper) return; // Prevent multiple clicks while holding
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      if (e.button === 0) {
        // Left mouse button
        // Play music only if it's not already playing and the paper is the topmost
        if (!musicPlaying && this.isTopmostPaper(paper)) {
          this.startMusic();
        }

        this.prevMouseX = e.clientX;
        this.prevMouseY = e.clientY;
      }
    });

    window.addEventListener("mouseup", () => {
      this.holdingPaper = false;
    });
  }

  startMusic() {
    this.audio.currentTime = 0; // Reset the audio to the beginning
    this.audio.play(); // Play the audio
    musicPlaying = true; // Set the flag to true
    this.audio.addEventListener("ended", () => {
      musicPlaying = false; // Reset when the audio ends
    });
  }

  isTopmostPaper(currentPaper) {
    // Check if the current paper is the topmost by comparing zIndex
    return currentPaper.style.zIndex == highestZ - 1;
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));

papers.forEach((paper, index) => {
  const p = new Paper();
  p.init(paper, index); // Pass the index to the init method
});
