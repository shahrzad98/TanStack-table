/// <reference types="cypress" />

describe("Clients Page", () => {
  let clientsCount: number;

  beforeEach(() => {
    // LOGIN

    cy.visit("http://localhost:1597/signin");
    cy.get('[name="email"]').type("babak@divnotes.com");
    cy.get('[name="password"]').type("123123");
    cy.get("form").submit();
    cy.wait(2000);

    cy.visit("http://localhost:1597/clients");

    cy.wait(2000);
  });

  it("Should visit the page, get clients count", () => {
    cy.get(".ant-table-tbody")
      .children()
      .then((value) => {
        clientsCount = value.length;
      });
  });

  it("Should add a client and check to see if it exists in the table", () => {
    cy.intercept("/api/v1/companies/*").as("getClients");

    cy.get('[data-cy="create-client-action"]').click();

    cy.get('[data-cy="client-name"]').type("Sample Client");
    cy.get('[data-cy="client-code"]').type("XYZ");
    cy.get('[data-cy="client-color"]').click();

    cy.get(".chrome-picker #rc-editable-input-2").clear().type("#e89623");

    cy.wait(500);

    cy.get('[data-cy="issue-tracker"]').click();
    cy.wait(500);
    cy.get(
      ".issue-tracker-select .rc-virtual-list-holder-inner .ant-select-item-option",
    )
      .first()
      .click();

    cy.get('[data-cy="time-tracker"]').click();
    cy.wait(500);
    cy.get(
      ".time-tracker-select .rc-virtual-list-holder-inner .ant-select-item-option",
    )
      .first()
      .click();

    cy.get('[data-cy="client-contact-name"]').type(`Sample Contact Name`);
    cy.get('[data-cy="client-contact-email"]').type(`Sample Contact Email`);
    cy.get('[data-cy="client-contact-phone"]').type(`Sample Contact Phone`);

    cy.intercept("/api/v1/clients").as("clientAddRequest");

    cy.get('[data-cy="create-client-submit"]').click();

    cy.wait("@clientAddRequest");

    cy.get(".ant-notification").should("be.visible");
    cy.get(".ant-notification-notice-description").should(
      "contain.text",
      "Client Successfully Created.",
    );
  });

  it("Should edit the Client", () => {
    cy.get('[data-cy="client-table-item-actions"]').first().click();
    cy.get(".ant-dropdown .ant-dropdown-menu-item").eq(1).click();

    cy.wait(500);

    cy.get('[data-cy="client-name"]').type(` Edited`);
    cy.get('[data-cy="create-client-submit"]').click();

    cy.get(".ant-notification").should("be.visible");
    cy.get(".ant-notification-notice-description").should(
      "contain.text",
      "Client Successfully Updated.",
    );

    cy.get('[data-cy="table-client-name"]')
      .first()
      .should("include.text", " Edited");
  });

  it("Should delete an client and check if it exists", () => {
    cy.get('[data-cy="client-table-item-actions"]').first().click();
    cy.get(".ant-dropdown .ant-dropdown-menu-item").last().click();

    cy.intercept("/api/v1/clients/*").as("clientDeleteRequest");

    cy.get(".ant-modal-footer")
      .children()
      .contains("button", "Confirm Delete")
      .click();

    cy.wait("@clientDeleteRequest");

    cy.get(".ant-notification").should("be.visible");
    cy.get(".ant-notification-notice-description").should(
      "contain.text",
      "Client Successfully Deleted.",
    );

    cy.get(".ant-table-tbody").children().should("have.length", clientsCount);
  });
});

export {};
