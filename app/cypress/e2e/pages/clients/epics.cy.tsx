/// <reference types="cypress" />

describe("Account Settings Token Page", () => {
  let epicsCount: number;

  beforeEach(() => {
    // LOGIN
    cy.visit("http://localhost:1597/signin");
    cy.get('[name="email"]').type("babak@divnotes.com");
    cy.get('[name="password"]').type("123123");
    cy.get("form").submit();
    cy.wait(2000);

    cy.visit("http://localhost:1597/clients/1/epics");

    cy.wait(6000);
  });

  it("should visit the page, get token count", () => {
    // FIND THE TOKEN COUNT TO DETERMINE THE TOKEN NAME
    cy.get(".ant-table-tbody")
      .children()
      .then((value) => {
        epicsCount = value.length;
      });
  });

  it("should add an epic", () => {
    cy.get('[data-cy="epics-add-new"]').click();
    cy.get('[name="key"]').type(`epic-${epicsCount + 1}`);
    cy.get('[name="title"]').type(`Epic ${epicsCount + 1}`);
    cy.get('[name="description"]').type(
      `Sample description for Epic number ${epicsCount + 1}`,
    );

    cy.get("form").submit();

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Epic Successfully Created.");
  });

  it("should edit the newly added epic", () => {
    cy.get(`[data-cy="epic-table-key-edit-${epicsCount + 1}"]`).click();
    cy.get(`[data-cy="epic-table-key-input-${epicsCount + 1}"]`).type(
      "-edited{enter}",
    );

    cy.wait(500);

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Epic Successfully Edited.");

    cy.get(`[data-cy="epic-table-title-edit-${epicsCount + 1}"]`).click();
    cy.get(`[data-cy="epic-table-title-input-${epicsCount + 1}"]`).type(
      "-edited{enter}",
    );

    cy.wait(500);

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Epic Successfully Edited.");

    cy.get(`[data-cy="epic-table-description-edit-${epicsCount + 1}"]`).click();
    cy.get(`[data-cy="epic-table-description-input-${epicsCount + 1}"]`)
      .clear()
      .type(`Edit Description for Epic #${epicsCount + 1}{enter}`);

    cy.wait(500);

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Epic Successfully Edited.");
  });

  it("should delete delete the added epic", () => {
    cy.get(`[data-cy="epic-table-delete-${epicsCount + 1}"]`).click();

    cy.get('[data-cy="epic-table-confirm-delete"]').click();

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Epic Successfully Deleted.");
  });
});

export {};
