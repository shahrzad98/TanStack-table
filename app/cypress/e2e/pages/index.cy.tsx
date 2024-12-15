/// <reference types="cypress" />

describe("Home Page", () => {
  it("should log in the user, display the user's name, log out the user, and redirect to the sign-in page", () => {
    cy.visit("http://localhost:1597/signin");
    cy.get('[name="email"]').type("babak@divnotes.com");
    cy.get('[name="password"]').type("123123");
    cy.get("form").submit();

    cy.wait(2000);

    cy.get("h2").should("contain", "Babak Basseri");

    cy.wait(1000);

    cy.contains("Logout").click();
    cy.url().should("include", "http://localhost:1597/signin");
  });

  it("should display a notification informing the user of an error when the user attempts to log in with incorrect credentials.", () => {
    cy.visit("http://localhost:1597/signin");
    cy.get('[name="email"]').type("babak@divnotes.com");
    cy.get('[name="password"]').type("123");
    cy.get("form").submit();

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Error with your email or password");
  });
});

export {};
