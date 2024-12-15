/// <reference types="cypress" />

describe("Client Summary Page", () => {
  beforeEach(() => {
    // LOGIN
    cy.visit("http://localhost:1597/signin");
    cy.get('[name="email"]').type("babak@divnotes.com");
    cy.get('[name="password"]').type("123123");
    cy.get("form").submit();
    cy.wait(2000);

    cy.visit("http://localhost:1597/clients/1");

    cy.wait(2000);
  });

  it("should add a project and check to see if it exists in the table", () => {
    cy.get('[data-cy="project-add-new"]').click();

    // WAIT FOR TOGGL DATA
    cy.wait(1500);

    cy.get('[name="name"]').type(`New Project Made By Cypress`);
    cy.get('[data-cy="project-time-tracker"]').click();
    cy.get(".ant-select-item").first().click();

    cy.get("form").submit();

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Project Successfully Created.");

    cy.get(".ant-table-tbody")
      .children()
      .last()
      .should(
        "contain.html",
        '<td class="ant-table-cell antd-table-cell-name">New Project Made By Cypress</td>',
      );
  });

  it("should change the client's status and then revert it", () => {
    cy.get('[data-cy="client-status"]').click();
    cy.get(".rc-virtual-list-holder-inner")
      .children('[aria-selected="false"]')
      .click();

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Client Successfully Updated.");

    // WAIT FOR TOAST TO DISSAPEAR AND REPEAT (SO STATUS REVERTS BACK)
    cy.wait(5500);

    cy.get('[data-cy="client-status"]').click();
    cy.get(".rc-virtual-list-holder-inner")
      .children('[aria-selected="false"]')
      .click();
    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Client Successfully Updated.");
  });
});

export {};
