const pageInteraction = require("./src/pageInteraction");

try {
  pageInteraction.submitMaintenaceRequest(true, true);
} catch (error) {
  console.log(
    "Something went wrong while accessing the page.",
    "Probably a timeout navigating to page.",
    "ERROR:",
    error
  );
}
