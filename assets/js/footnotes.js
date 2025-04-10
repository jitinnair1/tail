//single popup element reused across all footnotes
const popup = document.getElementById('footnote-popup');
let currentFootnote = null;

//show popup with content from the given footnote link
function showPopup(footnoteLink) {
  hidePopup(); //ensure any previous popup is closed

  currentFootnote = footnoteLink;

  const footnoteId = footnoteLink.getAttribute('href').substring(1);
  const footnoteContent = document.getElementById(footnoteId);

  if (!footnoteContent) return;

  const popupText = footnoteContent.cloneNode(true);
  const backlink = popupText.querySelector('.reversefootnote');
  if (backlink) backlink.remove();

  popup.innerHTML = popupText.innerHTML;

  positionPopup(footnoteLink);
  popup.style.display = 'block';
}

//hide the popup
function hidePopup() {
  popup.style.display = 'none';
  currentFootnote = null;
}

//position popup near the footnote link
function positionPopup(footnoteLink) {
  const linkRect = footnoteLink.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const linkCenter = linkRect.left + (linkRect.width / 2);
  let popupLeft = linkCenter - 150;
  let popupTop = linkRect.bottom + 10;

  popup.style.visibility = 'hidden';
  popup.style.display = 'block';
  const popupHeight = popup.offsetHeight;

  if (popupLeft + 300 > viewportWidth - 20) popupLeft = viewportWidth - 320;
  if (popupLeft < 20) popupLeft = 20;
  if (popupTop + popupHeight > viewportHeight - 20) {
    popupTop = linkRect.top - popupHeight - 10;
    if (popupTop < 20) popupTop = 20;
  }

  popup.style.left = `${popupLeft}px`;
  popup.style.top = `${popupTop}px`;
  popup.style.visibility = 'visible';
}

//helper to detect if mouse is over an element
function isMouseOverElement(el) {
  return el.matches(':hover');
}

//apply event listeners to each footnote
document.querySelectorAll('.footnote').forEach(link => {
  //prevent default anchor jump
  link.addEventListener('click', e => {
    e.preventDefault();

    if (currentFootnote === link) {
      hidePopup();
    } else {
      showPopup(link);
    }
  });

  //hover behavior
  link.addEventListener('mouseenter', () => {
    showPopup(link);
  });

  link.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!isMouseOverElement(popup)) hidePopup();
    }, 200);
  });
});

//hide when mouse leaves popup
popup.addEventListener('mouseleave', () => {
  hidePopup();
});

//hide if clicking outside popup or footnote
document.addEventListener('pointerdown', e => {
  if (!e.target.closest('.footnote') && !e.target.closest('#footnote-popup')) {
    hidePopup();
  }
});

//reposition on resize
window.addEventListener('resize', () => {
  if (currentFootnote) positionPopup(currentFootnote);
});

