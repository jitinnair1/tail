/**
 * Enhanced Footnote Popup System
 * This script creates popup footnotes that work reliably on both desktop and mobile devices
 * without flickering or display issues.
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create popup element if it doesn't exist
  let popup = document.getElementById('footnote-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'footnote-popup';
    popup.className = 'footnote-popup';
    popup.style.display = 'none';
    document.body.appendChild(popup);
  }

  // Variables to track state
  let currentFootnote = null;
  let isPopupVisible = false;
  let hoverTimer = null;
  
  // Process all footnotes on the page
  const footnoteLinks = document.querySelectorAll('.footnote');
  footnoteLinks.forEach(link => {
    // Clean up any existing event listeners
    const newLink = link.cloneNode(true);
    link.parentNode.replaceChild(newLink, link);
    
    // Add new event listeners
    newLink.addEventListener('click', handleFootnoteClick);
    newLink.addEventListener('mouseenter', handleFootnoteHover);
    newLink.addEventListener('mouseleave', handleFootnoteLeave);
  });
  
  // Event handlers
  function handleFootnoteClick(event) {
    event.preventDefault();
    
    const footnoteLink = event.currentTarget;
    if (currentFootnote === footnoteLink && isPopupVisible) {
      hidePopup();
    } else {
      showPopup(footnoteLink);
    }
  }
  
  function handleFootnoteHover(event) {
    // Clear any existing timers
    if (hoverTimer) clearTimeout(hoverTimer);
    
    // Show the popup
    showPopup(event.currentTarget);
  }
  
  function handleFootnoteLeave() {
    // Delay hiding to allow moving to popup
    if (hoverTimer) clearTimeout(hoverTimer);
    hoverTimer = setTimeout(() => {
      if (!isMouseOverElement(popup)) {
        hidePopup();
      }
    }, 200);
  }
  
  // Show popup with content from footnote
  function showPopup(footnoteLink) {
    // First, record which footnote we're showing
    currentFootnote = footnoteLink;
    
    // Get the target footnote content (without displaying yet)
    const footnoteId = footnoteLink.getAttribute('href').substring(1);
    const footnoteContent = document.getElementById(footnoteId);
    if (!footnoteContent) return;
    
    // Prepare popup content by extracting only the text content
    // This avoids the backlink issue completely
    let content = '';
    
    // Clone all child nodes except the backlink
    const children = footnoteContent.childNodes;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      // Skip the backlink element
      if (child.nodeType === 1 && child.classList && child.classList.contains('reversefootnote')) {
        continue;
      }
      // Clone the node (whether it's text or element)
      content += child.nodeType === 3 ? child.textContent : child.outerHTML;
    }
    
    // Apply content to the hidden popup
    popup.style.display = 'none';
    popup.innerHTML = content;
    
    // Position popup while still hidden
    const linkRect = footnoteLink.getBoundingClientRect();
    positionPopup(linkRect);
    
    // Now show the fully prepared popup
    popup.style.display = 'block';
    isPopupVisible = true;
    
    // Add popup event listeners
    popup.addEventListener('mouseleave', handlePopupLeave);
  }
  
  // Hide the popup
  function hidePopup() {
    popup.style.display = 'none';
    isPopupVisible = false;
    currentFootnote = null;
    
    // Remove popup event listeners to prevent memory leaks
    popup.removeEventListener('mouseleave', handlePopupLeave);
  }
  
  function handlePopupLeave() {
    hidePopup();
  }
  
  // Position popup optimally based on viewport
  function positionPopup(linkRect) {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Get popup dimensions
    // We need to temporarily make it visible but off-screen to measure it
    popup.style.visibility = 'hidden';
    popup.style.display = 'block';
    popup.style.left = '-9999px';
    popup.style.top = '-9999px';
    
    const popupWidth = popup.offsetWidth;
    const popupHeight = popup.offsetHeight;
    
    // Calculate optimal position
    const linkCenter = linkRect.left + (linkRect.width / 2);
    let left = linkCenter - (popupWidth / 2);
    let top = linkRect.bottom + 10;
    
    // Adjust if popup would go off screen
    if (left + popupWidth > viewportWidth - 20) {
      left = viewportWidth - popupWidth - 20;
    }
    if (left < 20) {
      left = 20;
    }
    
    // If popup would go below viewport, position it above the link
    if (top + popupHeight > viewportHeight - 20) {
      top = linkRect.top - popupHeight - 10;
      
      // If it would now go above the viewport, just position it at the top
      if (top < 20) {
        top = 20;
      }
    }
    
    // Apply position
    popup.style.left = `${left}px`;
    popup.style.top = `${top}px`;
    popup.style.visibility = 'visible';
  }
  
  // Helper to detect if mouse is over an element
  function isMouseOverElement(el) {
    return el.matches(':hover');
  }
  
  // Close popup when clicking outside
  document.addEventListener('pointerdown', (e) => {
    if (isPopupVisible && 
        !e.target.closest('.footnote') && 
        !e.target.closest('#footnote-popup')) {
      hidePopup();
    }
  });
  
  // Update position if window resizes
  window.addEventListener('resize', () => {
    if (currentFootnote && isPopupVisible) {
      const linkRect = currentFootnote.getBoundingClientRect();
      positionPopup(linkRect);
    }
  });
});
