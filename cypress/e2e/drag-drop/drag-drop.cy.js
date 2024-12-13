import DragDropPage from "../../support/pages/drag-drop/drag-dropPO";

const dragDropPage = new DragDropPage();
describe("Drag and Drop Example", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/public").as("pageLoad");
    cy.visit("");
    cy.wait("@pageLoad").wait(5000);

    cy.get("body").then(($body) => {
      if ($body.find('a:contains("Yes")').length > 0) {
        cy.get('a:contains("Yes")').click({ force: true });
      }
    });
    cy.get('[name="DesignArea"] [name="Create Templates"]')
      .should("be.visible")
      .click();

    cy.get(".fa-desktop").click();
    cy.wait(5000);
  });

  it("Verify user can drop a chart in a container", () => {
    dragDropPage.dropChartIntoContainer();
  });

  it("Verify the user is not able to drop an element outside the artboard", () => {
    dragDropPage.dropElementOutsideArtBoard();
  });

  it("Verify the user is able to delete the artboard", () => {
    dragDropPage.deleteArtBoard();
  });

  it("Verify the user is not able to delete the artboard after selecting NO", () => {
    dragDropPage.shouldNotDeleteArtboardWhenNoIsSelected();
  });
});
