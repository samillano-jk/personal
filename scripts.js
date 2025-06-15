// TYPING TEXT FUNCTION --------------------------------------------------------------------
// Select all paragraphs with the class 'typed-paragraph'
const typedParagraphs = document.querySelectorAll('.profile-desc');

// Function to start typing animation on a single paragraph
function startTypingAnimation(paragraph) {
  return new Promise((resolve) => {
    // Reset the animation by removing and adding the class again
    paragraph.classList.remove('typing');
    paragraph.style.width = "0"; // Reset width to 0
    void paragraph.offsetWidth; // Trigger reflow to restart the animation
    paragraph.classList.add('typing'); // Add typing class to restart animation
    
    // Listen for the end of the animation and resolve the promise
    paragraph.addEventListener('animationend', () => {
      resolve(); // Resolve the promise when the animation finishes
    });
  });
}

// Function to handle sequential typing
async function sequentialTyping() {
  // Loop through all paragraphs and type them sequentially
  for (let i = 0; i < typedParagraphs.length; i++) {
    const paragraph = typedParagraphs[i];
    // Wait for the current paragraph's animation to finish before starting the next
    await startTypingAnimation(paragraph);
  }
}

// Create an intersection observer to detect when any paragraph is in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // If the paragraph is in view
    if (entry.isIntersecting) {
      // Reset typing for all paragraphs
      typedParagraphs.forEach(paragraph => {
        paragraph.classList.remove('typing'); // Remove the typing class
        paragraph.style.width = "0"; // Reset the width to restart typing
      });
      
      sequentialTyping(); // Start the typing animations sequentially
    }
  });
}, { threshold: .50 }); // Paragraph needs to be at least 50% in view

// Observe each typed paragraph
typedParagraphs.forEach(paragraph => {
  observer.observe(paragraph);
});



// Detect Scroll and Show Navbar When Scrolling Up
window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop === 0) {
        // At the top of the page → Always show navbar
        navbar.style.top = "0";
        navbar.style.display = "flex";
    } else if (scrollTop > lastScrollTop) {
        // Scrolling down → Hide navbar
        navbar.style.top = "-100px"; 
    } else {
        // Scrolling up → Show navbar (INCLUDING hamburger menu)
        navbar.style.top = "0";
        navbar.style.display = "flex"; 
    }

    lastScrollTop = scrollTop;
});
  
