const pageInteraction = require("./src/pageInteraction");
const maintenanceTypes = require("./src/selectors.json").maintenanceTypes;

try {
  pageInteraction.submitMaintenaceRequest(
    true,
    true,
    [maintenanceTypes.other],
    false
  );
} catch (error) {
  console.log(
    "Something went wrong while performing actions on the page.",
    "Possibly a mistiming of page interactions.",
    "ERROR:",
    error
  );
}
