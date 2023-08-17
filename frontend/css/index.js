/**
 * Implement collapse button functionality on sidebar.
 * Add event listener to collapse button.
 * When collapse button is clicked,
 * first make sidebar's width smaller,
 * then toggle `hidden` class of sidebar button icons and texts.
 */

// when collapse button clicked
function onCollapseClick() {
  const collapseButton = document.getElementById("collapse-button");
  const sidebar = document.getElementById("sidebar");

  // toggle `collapsed` class of sidebar
  sidebar.classList.toggle("collapsed");

  // get sidebar button texts and toggle their `hidden` class
  const sidebarButtonTexts = document.getElementsByClassName(
    "sidebar-button-text"
  );
  [...sidebarButtonTexts].forEach((text) => text.classList.toggle("hidden"));

  // get sidebar button icons and toggle their `hidden` class
  const sidebarButtonIcons = document.getElementsByClassName(
    "sidebar-button-icon"
  );
  [...sidebarButtonIcons].forEach((icon) => {
    icon.classList.toggle("hidden");
    icon.classList.add("collapsed");
  });

  // change inner text of collapse button
  if (sidebar.classList.contains("collapsed")) {
    collapseButton.innerText = ">>";
  } else {
    collapseButton.innerText = "<< Collapse";
  }
}
