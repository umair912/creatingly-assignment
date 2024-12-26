import DragDropPage from "../../support/pages/drag-drop/drag-dropPO";

const dragDropPage = new DragDropPage();

describe("Drag and Drop Example", () => {
  beforeEach(() => {
    cy.visit("");
    cy.get("#NotiflixLoadingMessage").should("be.visible");
    cy.get("#NotiflixLoadingMessage").should("not.exist");

    // Clicks "Yes" if present to bypass any confirmation pop-ups
    cy.get("body").then(($body) => {
      if ($body.find('a:contains("Yes")').length > 0) {
        cy.get('a:contains("Yes")').click({ force: true });
      }
    });

    // Navigates to the template creation page
    cy.get('[name="DesignArea"] [name="Create Templates"]')
      .should("be.visible")
      .click();

    // Selects the desktop view for testing
    cy.get(".widthSec .statuslabel").contains("360px").should("be.visible");
    cy.get(".fa-desktop").click();
    cy.get(".widthSec .statuslabel").contains("360px").should("not.exist");
  });

  it("Verify user can drop a chart in a container", () => {
    // Verifies chart drop functionality
    dragDropPage.dropChartIntoContainer("Artboard1", "section1");
  });

  it("Verify the user is not able to drop an element outside the artboard", () => {
    // Verifies that dropping an element outside the artboard triggers an error
    dragDropPage.dropElementOutsideArtBoard();
  });

  it("Verify the user is able to delete the artboard", () => {
    // Verifies that the artboard can be deleted
    dragDropPage.deleteArtBoard("Artboard1", "section1");
  });

  it("Verify the user is not able to delete the artboard after selecting NO", () => {
    // Verifies that the artboard is not deleted if "No" is selected in the confirmation
    dragDropPage.shouldNotDeleteArtboardWhenNoIsSelected("Artboard1", "section1");
  });
});
