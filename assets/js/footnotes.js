// A simplified approach with a single, reliable tooltip

// Create only one popup that we'll reuse
const popup = document.getElementById('footnote-popup');
let currentFootnote = null;

// Function to safely show the popup
function showPopup(footnoteLink) {
  // Safety check - if there's already a popup showing, hide it first
  hidePopup();

  // Update current footnote reference
  currentFootnote = footnoteLink;

  // Get footnote content from the corresponding footnote at the bottom
  const footnoteId = footnoteLink.getAttribute('href').substring(1);
  const footnoteContent = document.getElementById(footnoteId);

  // Remove back link from popup text
  const popupText = footnoteContent.cloneNode(true);

  //remove backlink for popup only
  const backlink = popupText.querySelector('.reversefootnote');
  if (backlink) backlink.remove();

  // Set popup content
  popup.innerHTML = popupText.innerHTML;

  // Position the popup
  positionPopup(footnoteLink);

  // Show the popup
  popup.style.display = 'block';
}

// Function to safely hide the popup
function hidePopup() {
  popup.style.display = 'none';
  currentFootnote = null;
}

// Function to position the popup relative to the footnote link
function positionPopup(footnoteLink) {
  // Get dimensions and position of the footnote link
  const linkRect = footnoteLink.getBoundingClientRect();

  // Get dimensions of the viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Calculate initial position (centered below the footnote)
  const linkCenter = linkRect.left + (linkRect.width / 2);
  let popupLeft = linkCenter - 150; // 150px is half the popup width
  let popupTop = linkRect.bottom + 10;

  // Adjust horizontal position if needed
  if (popupLeft + 300 > viewportWidth - 20) {
    // Too close to right edge
    popupLeft = viewportWidth - 320; // 300px width + 20px margin
  }
  if (popupLeft < 20) {
    // Too close to left edge
    popupLeft = 20;
  }

  // Check if popup would go below viewport
  // We need to measure the height, which means we need to make it visible briefly
  popup.style.visibility = 'hidden';
  popup.style.display = 'block';
  const popupHeight = popup.offsetHeight;

  if (popupTop + popupHeight > viewportHeight - 20) {
    // Not enough room below, try to position above
    popupTop = linkRect.top - popupHeight - 10;

    // If still no room, position at top of viewport
    if (popupTop < 20) {
      popupTop = 20;
    }
  }

  // Set the position
  popup.style.left = `${popupLeft}px`;
  popup.style.top = `${popupTop}px`;
  popup.style.visibility = 'visible';
}

// Set up event listeners for all footnote links
document.querySelectorAll('.footnote').forEach(link => {
  // Mouse enter - show popup
  link.addEventListener('mouseenter', function() {
    showPopup(this);
  });

  // Mouse leave - hide popup after delay
  link.addEventListener('mouseleave', function() {
    // Add a small delay to allow mouse to move to the popup
    setTimeout(() => {
      // Only hide if mouse isn't over the popup
      if (!isMouseOverElement(popup)) {
        hidePopup();
      }
    }, 300);
  });

  // Click handler - for mobile devices
  link.addEventListener('click', function(event) {
    // Only use special handling on mobile screens
    if (window.innerWidth <= 768) {
      event.preventDefault(); // Prevent jumping to footnote
      event.stopPropagation(); // Stop the event from bubbling to the document

      // Toggle popup if clicking the same footnote
      if (currentFootnote === this) {
        hidePopup();
      } else {
        showPopup(this);
      }
    }
  });
});

// Helper function to check if mouse is over an element
function isMouseOverElement(element) {
  return element.matches(':hover');
}

// Add listener to the popup itself
popup.addEventListener('mouseleave', function() {
  hidePopup();
});

// Hide popup when clicking anywhere else on the page
document.addEventListener('click', function(event) {
  if (!event.target.closest('.footnote') && !event.target.closest('#footnote-popup')) {
    hidePopup();
  }
});

// Handle window resize events
window.addEventListener('resize', function() {
  if (currentFootnote) {
    positionPopup(currentFootnote);
  }
});
