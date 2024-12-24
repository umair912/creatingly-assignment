class DragDropPage {
  /**
   * Simulates the drag and drop operation between two elements.
   * @param {Cypress.Chainable} source - The source element to drag.
   * @param {Cypress.Chainable} target - The target element to drop onto.
   */
  dragAndDrop(source, target) {
    source
      .click()
      .trigger("pointerdown", { which: 1 }) // Simulates pressing down the mouse pointer.
      .trigger("mousedown", { which: 1 }) // Simulates a mouse down event.
      .trigger("dragstart", {
        dataTransfer: {},
        eventConstructor: "DragEvent",
      }); // Initiates the drag operation.

    target
      .trigger("dragover", { dataTransfer: {}, eventConstructor: "DragEvent" }) // Simulates dragging over the target.
      .trigger("mousemove", {}) // Simulates mouse movement over the target.
      .trigger("pointermove", {}) // Simulates pointer movement.
      .click(); // Finalizes the drop action.
  }

  /**
   * Retrieves an element based on its `data-testid` attribute.
   * @param {string} testId - The `data-testid` value to locate the element.
   * @returns {Cypress.Chainable}
   */
  getElementByTestId(testId) {
    return cy.get(`[data-testid="${testId}"] > .element-box-test`);
  }

  /**
   * Retrieves an element using a generic selector.
   * @param {string} selector - The CSS selector for the element.
   * @returns {Cypress.Chainable}
   */
  getElement(selector) {
    return cy.get(selector);
  }

  /**
   * Retrieves a specific section or container within an artboard.
   * @param {string} artBoard - The ID of the artboard.
   * @param {string} section - The ID of the section within the artboard.
   * @returns {Cypress.Chainable}
   */
  getArtBoard(artBoard, section) {
    return this.getElement(`#${artBoard} > div#${section}`);
  }

  /**
   * Retrieves the container element within an artboard.
   * @param {string} artBoard - The ID of the artboard.
   * @returns {Cypress.Chainable}
   */
  artBoardContainer(artBoard) {
    return this.getElement(`#${artBoard} .my-container`);
  }

  /**
   * Retrieves input fields for container size adjustments.
   * @returns {Cypress.Chainable}
   */
  getContainerSizeOptions() {
    return this.getElement('.size-container:contains("Width") input');
  }

  /**
   * Retrieves the button used for centering the chart alignment.
   * @returns {Cypress.Chainable}
   */
  chartCenterAlignButton() {
    return this.getElement('button:contains(" C | C ")');
  }

  /**
   * Retrieves the button for deleting an artboard.
   * @returns {Cypress.Chainable}
   */
  artBoardDeleteButton() {
    return this.getElement('[name="Artboard Deletion"]');
  }

  /**
   * Retrieves the confirmation option for artboard deletion.
   * @param {string} option - The confirmation option text (e.g., "Yes" or "No").
   * @returns {Cypress.Chainable}
   */
  artBoardDeletionConformationOption(option) {
    return this.getElement(`a:contains("${option}")`);
  }

  /**
   * Performs actions to drop a chart into a container and configure its size and alignment.
   * @param {string} artBoard - The ID of the artboard.
   * @param {string} section - The section within the artboard.
   */
  dropChartIntoContainer(artBoard, section) {
    // Drag and drop a container into the artboard section.
    this.dragAndDrop(
      this.getElementByTestId("Container"),
      this.getArtBoard(artBoard, section)
    );

    // Configure container size.
    this.getContainerSizeOptions().eq(0).clear().type("22"); // Set the width.
    this.getContainerSizeOptions().eq(2).clear().type("300"); // Set the height.

    // Drag and drop a chart into the container.
    this.dragAndDrop(
      this.getElementByTestId("Chart"),
      this.artBoardContainer(artBoard)
    );

    // Align the chart to the center.
    this.chartCenterAlignButton().click();
  }

  /**
   * Handles invalid drop scenarios and validates error messages.
   */
  dropElementOutsideArtBoard() {
    // Attempt to drop a container outside the artboard.
    this.dragAndDrop(
      this.getElementByTestId("Container"),
      this.getElement(".element-separation").eq(1)
    );

    // Validate the error message is displayed.
    this.getElement(
      `span:contains("Please Select traget section. Something is wrong.")`
    ).should("be.visible");
  }

  /**
   * Deletes an artboard and validates its removal.
   * @param {string} artBoard - The ID of the artboard.
   * @param {string} section - The section within the artboard.
   */
  deleteArtBoard(artBoard, section) {
    this.artBoardDeleteButton().click(); // Click the delete button.
    this.artBoardDeletionConformationOption("Yes").click(); // Confirm deletion.
    this.getArtBoard(artBoard, section).should("not.exist"); // Validate the artboard no longer exists.
  }

  /**
   * Ensures that selecting "No" during artboard deletion does not delete the artboard.
   * @param {string} artBoard - The ID of the artboard.
   * @param {string} section - The section within the artboard.
   */
  shouldNotDeleteArtboardWhenNoIsSelected(artBoard, section) {
    this.artBoardDeleteButton().click(); // Click the delete button.
    this.artBoardDeletionConformationOption("No").click(); // Cancel deletion.
    this.getArtBoard(artBoard, section).should("be.visible"); // Validate the artboard still exists.
  }
}

export default DragDropPage;
