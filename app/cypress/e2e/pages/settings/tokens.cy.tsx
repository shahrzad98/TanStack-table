/// <reference types="cypress" />

describe("Account Settings Token Page", () => {
  let tokensCount: number;

  beforeEach(() => {
    // LOGIN
    cy.visit("http://localhost:1597/signin");
    cy.get('[name="email"]').type("babak@divnotes.com");
    cy.get('[name="password"]').type("123123");
    cy.get("form").submit();
    cy.wait(2000);

    cy.visit("http://localhost:1597/settings/tokens");

    cy.wait(2000);
  });

  it("should visit the page, get token count", () => {
    // FIND THE TOKEN COUNT TO DETERMINE THE TOKEN NAME
    cy.get(".ant-tabs")
      .next()
      .children()
      .then((value) => {
        tokensCount = value.length;
      });
  });

  it("should add a token and check to see if it exists in the table", () => {
    cy.get('[data-cy="token-add-new"]').click();
    cy.get('[name="name"]').type(`token${tokensCount + 1}`);
    cy.get('[data-cy="token-account-type"]').click();
    cy.get(".ant-select-item-option").contains("Toggl Token").click();
    cy.get('[name="token"]').type("exampletoken123456");
    cy.get('[name="email"]').type("sample@divnotes.com");
    cy.get('[name="domain"]').type("https://divnotes.com");

    cy.get("form").submit();

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Token Successfully Created.");

    cy.wait(500);

    cy.get(".ant-tabs")
      .next()
      .children()
      .should("include.html", `<h4>token${tokensCount + 1}</h4>`);
  });

  it("should edit the added token and check to see if it exists in the table with the new name", () => {
    cy.get(`[data-cy="token-edit-token${tokensCount + 1}"]`).click();
    cy.get('[name="name"]').type(`-edited`);

    cy.get("form").submit();

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Token Successfully Edited.");

    cy.wait(500);

    cy.get(".ant-tabs")
      .next()
      .children()
      .should("include.html", `<h4>token${tokensCount + 1}-edited</h4>`);
  });

  it("should delete added the token and check so it doesn't exist anymore", () => {
    cy.get(`[data-cy="token-delete-token${tokensCount + 1}-edited"]`).click();

    cy.get(".ant-modal-footer")
      .children()
      .contains("button", "Confirm Delete")
      .click();

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Token Successfully Deleted.");

    cy.wait(500);

    cy.get(".ant-tabs")
      .next()
      .children()
      .should("not.include.html", `<h4>token${tokensCount + 1}-edited</h4>`);
  });
});

export {};
