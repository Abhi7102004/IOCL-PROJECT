document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtn = document.getElementById("dropdown-btn");
  const dropdownContent = document.getElementById("dropdown-content");
  const submitBtn = document.getElementById("submit-btn");
  const selectedOptionDisplay = document.getElementById("selected-option");

  function toggleDropdown(button, content) {
    content.classList.toggle("show");
  }

  dropdownBtn.addEventListener("click", function () {
    toggleDropdown(dropdownBtn, dropdownContent);
  });

  function selectOption(button, content) {
    content.querySelectorAll("a").forEach(function (option) {
      option.addEventListener("click", function (event) {
        event.preventDefault(); 
        button.textContent = option.textContent;
        content.classList.remove("show");
        updateSelectedOptionDisplay(option.textContent);
      });
    });
  }

  function updateSelectedOptionDisplay(optionText) {
    if (optionText !== "Select an option") {
    } else {
      selectedOptionDisplay.textContent = "Please select an option.";
    }
    setTimeout(function () {
      selectedOptionDisplay.textContent = "";
    }, 3000);
  }
  selectOption(dropdownBtn, dropdownContent);

  submitBtn.addEventListener("click", function () {
    const selectedOptionText = dropdownContent.querySelector(".show a");
    if (selectedOptionText) {
      updateSelectedOptionDisplay(selectedOptionText.textContent);
    } else {
      updateSelectedOptionDisplay("Select an option");
    }
  });

  document.addEventListener("click", function (event) {
    if (!dropdownBtn.contains(event.target)) {
      dropdownContent.classList.remove("show");
    }
  });
});