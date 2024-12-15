/// <reference types="cypress" />

describe("Project Page", () => {
  let projectsCount: number;

  beforeEach(() => {
    // LOGIN
    cy.visit("http://localhost:1597/signin");
    cy.get('[name="email"]').type("babak@divnotes.com");
    cy.get('[name="password"]').type("123123");
    cy.get("form").submit();
    cy.wait(2000);

    cy.visit(
      "http://localhost:1597/clients/1/projects/0c32639f-5403-4753-8a53-9eeedd65a19f",
    );

    cy.wait(2000);
  });

  it("should visit the page, get Schedule Cs count", () => {
    cy.get(".ant-table-tbody")
      .children()
      .then((value) => {
        projectsCount = value.length;
      });
  });

  it("should upload a Schedule B and check to see if it exists in the table", () => {
    cy.get('[data-cy="schedule-c-upload-input"]').selectFile(
      "./cypress/e2e/pages/clients/assets/sampleschedulec.html",
      { force: true },
    );

    cy.wait(500);

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Schedule C Successfully Added.");

    cy.get(".ant-table-tbody")
      .children()
      .should("have.length", projectsCount + 1);

    cy.get(".ant-table-tbody")
      .children()
      .last()
      .should(
        "contain.html",
        '<td class="ant-table-cell antd-table-cell-name">sampleschedulec</td>',
      );
  });

  it("should delete added the Schedule C and check so it doesn't exist anymore", () => {
    cy.get(`[data-cy="schedule-c-delete-${projectsCount + 1}"]`).click();

    cy.get(".ant-modal-footer")
      .children()
      .contains("button", "Confirm Delete")
      .click();

    cy.wait(500);

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Schedule C Successfully Deleted.");

    cy.get(".ant-table-tbody").children().should("have.length", projectsCount);
  });

  it("should edit the project", () => {
    cy.get('[data-cy="project-edit"]').click();

    // WAIT FOR TOGGL & JIRA DATA
    cy.wait(2500);

    cy.get('[name="name"]').type(` Edited`);
    cy.get("form").submit();

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Project Successfully Edited.");

    cy.get('[data-cy="project-name"]').should("include.text", " Edited");

    cy.get('[data-cy="project-edit"]').click();

    // WAIT FOR TOGGL & JIRA DATA
    cy.wait(2500);

    cy.get('[name="name"]').type(
      "{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}",
    );
    cy.get("form").submit();
  });
});

export {};
