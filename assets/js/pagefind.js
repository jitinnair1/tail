  window.addEventListener("DOMContentLoaded", () => {
    new PagefindUI({ element: "#search" });

    const modal = document.getElementById("search-modal");
    const toggle = document.getElementById("search-toggle");
    const close = document.getElementById("close-search");

    function openModal() {
      modal.classList.remove("hidden");
      setTimeout(() => {
        modal.querySelector("input").focus();
      }, 100);
    }

    function closeModal() {
      modal.classList.add("hidden");
    }

    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });

    close.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openModal();
      }
      if (e.key === "Escape") {
        closeModal();
      }
    });
  });
