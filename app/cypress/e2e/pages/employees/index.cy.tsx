/// <reference types="cypress" />

describe("Employee Page", () => {
  let employeesCount: number;

  beforeEach(() => {
    // LOGIN

    cy.visit("http://localhost:1597/signin");
    cy.get('[name="email"]').type("babak@divnotes.com");
    cy.get('[name="password"]').type("123123");
    cy.get("form").submit();
    cy.wait(2000);

    cy.visit("http://localhost:1597/employees");

    cy.wait(2000);
  });

  it("Should visit the page, get employees count", () => {
    cy.get(".ant-table-tbody")
      .children()
      .then((value) => {
        employeesCount = value.length;
      });
  });

  it("Should add an employee and check to see if it exists in the table", () => {
    cy.intercept("/employees/employee-add").as("employeeAddPage");
    cy.visit("http://localhost:1597/employees/employee-add");
    cy.wait("@employeeAddPage");

    cy.get('[data-cy="first_name"] .ant-input').type("First Name");
    cy.get('[data-cy="last_name"] .ant-input').type("Last Name");

    cy.get('[data-cy="role_id"] .ant-select-selector').click();
    cy.wait(500);
    cy.get(".rc-virtual-list-holder-inner .ant-select-item-option")
      .first()
      .click();

    cy.get('[data-cy="role_id"] .ant-select-selector').click();
    cy.wait(500);
    cy.get(".rc-virtual-list-holder-inner .ant-select-item-option")
      .first()
      .click();

    cy.get('[data-cy="email"] .ant-input').type(
      `example-${Date.now()}@company.net`,
    );

    cy.get('[data-cy="jira_account"] .ant-select-selector').click();
    cy.wait(500);
    cy.get(".rc-virtual-list-holder-inner .ant-select-item-option")
      .last()
      .click();

    cy.intercept("/api/v1/employees").as("employeeAddRequest");

    cy.get('[data-cy="employee_submit"]').click();

    cy.wait("@employeeAddRequest");

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Employee Successfully Created.");
  });

  it("Should edit the Employee", () => {
    cy.get('[data-cy="divo-employee-table-edit"]').click();

    cy.wait(5000);

    cy.get('[data-cy="first_name"]').type(` Edited`);
    cy.get("form").submit();

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Employee Successfully Updated.");

    cy.get('[data-cy="table_first_name"]').should("include.text", " edited");
  });

  it("Should delete an employee and check if it exists", () => {
    cy.get(`[data-cy="divo-employee-table-delete"]`).last().click();

    cy.intercept("/api/v1/employees/*").as("employeeDeleteRequest");

    cy.get(".ant-modal-footer")
      .children()
      .contains("button", "Confirm Delete")
      .click();

    cy.wait("@employeeDeleteRequest");

    cy.get(".ant-notification-notice")
      .should("be.visible")
      .and("contain.text", "Employee Successfully Deleted.");

    cy.get(".ant-table-tbody").children().should("have.length", employeesCount);
  });
});

export {};
