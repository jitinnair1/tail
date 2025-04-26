window.addEventListener("DOMContentLoaded", () => {
  new PagefindUI({
    element: "#search",
    showImages: false
  });

  const modal = document.getElementById("search-modal");
  const toggle = document.getElementById("search-toggle");
  const close = document.getElementById("close-search");
  const overlay = modal.querySelector(".modal-overlay");

  function toggleModal() {
    const isHidden = modal.classList.contains("hidden");
    modal.classList.toggle("hidden");
    if (isHidden) {
      modal.querySelector("input").focus(); // Focus input when opening
    }
  }

  // Toggle modal on button click
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    toggleModal();
  });

  // Close modal on close button click
  close.addEventListener("click", toggleModal);

  // Close modal on overlay click
  overlay.addEventListener("click", toggleModal);

  // Toggle modal on Cmd/Ctrl + K, close on Escape
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      toggleModal();
    } else if (e.key === "Escape") {
      modal.classList.add("hidden");
    }
  });
});
