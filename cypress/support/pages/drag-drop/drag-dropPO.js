class DragDropPage {
  getContainer() {
    return cy.get('[data-testid="Container"] > .element-box-test');
  }

  getArtBoard() {
    return cy.get("#Artboard1 > div#section1");
  }

  getContainerSizeOptions() {
    return cy.get('.size-container:contains("Width") input');
  }

  getChart() {
    return cy.get('[data-testid="Chart"] > .element-box-test');
  }

  artBoardContainer() {
    return cy.get("#Artboard1 .my-container");
  }

  chartCenterAlign() {
    return cy.get('button:contains(" C | C ")');
  }

  designOptions() {
    return cy.get(".element-separation");
  }

  dropChartIntoContainer() {
    this.getContainer().click().drag("#Artboard1 > div#section1");
    this.getArtBoard().click();
    this.getArtBoard().should("be.visible");

    this.getContainerSizeOptions().eq(0).clear().type("22");
    this.getContainerSizeOptions().eq(2).clear().type("300");

    this.getChart().click().drag("#Artboard1 .my-container");
    this.artBoardContainer().click();
    this.artBoardContainer().should("be.visible");

    cy.wait(3000);
    this.chartCenterAlign().click();
  }

  getErrorMessage(text) {
    return cy.get(`span:contains("${text}")`);
  }

  artBoardDeleteButton() {
    return cy.get('[name="Artboard Deletion"]');
  }

  artBoardDeletionConformationOption(opt) {
    return cy.get(`a:contains("${opt}")`);
  }

  dropElementOutsideArtBoard() {
    this.getContainer().click().drag(".element-separation");

    this.designOptions().eq(1).click();
    this.getErrorMessage(
      "Please Select traget section. Something is wrong."
    ).should("be.visible");
  }

  deleteArtBoard() {
    this.artBoardDeleteButton().click();
    this.artBoardDeletionConformationOption("Yes").click();

    this.getArtBoard().should("not.exist");
  }

  shouldNotDeleteArtboardWhenNoIsSelected() {
    this.artBoardDeleteButton().click();
    this.artBoardDeletionConformationOption("No").click();

    this.getArtBoard().should("be.visible");
  }
}

export default DragDropPage;
