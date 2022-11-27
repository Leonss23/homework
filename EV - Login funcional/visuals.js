let switchElements = document.querySelectorAll(".switch");
function SwitchTabs() {
  switchElements.forEach((node) => {
    node.classList.toggle("hidden");
  });
}