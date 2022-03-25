const baseUrl = Cypress.env("base_url");

describe("Update Contact", () => {
  it("creates a contact", () => {
    cy.visit(`${baseUrl}/contacts/add`);
    cy.get("[data-testid=input-name]").type("AAA");
    cy.get("[data-testid=input-lastName]").type("Test");
    cy.get("[data-testid=input-email]").type("aaa@test.com");
    cy.get("[data-testid=input-phoneNumber]").type("1234567890");
    cy.get("[data-testid=input-age]").type(25);
    cy.get("[data-testid=input-tags]").type("aaa,test,cypress");
    cy.get("[data-testid=input-avatarFile]").attachFile("avatar.gif");
    cy.get("[data-testid=input-linkToWebsite]").type("https://google.com");
    cy.get("[data-testid=input-tags]").type("aaa,test,cypress");
    cy.log("[Before] submit");
    cy.get("[type=submit").click();
    cy.url().should("eq", baseUrl + "/");
  });

  it("updates the latest contact", () => {
    cy.get("[data-testid=edit-icon]").last().click();
    cy.url().should("include", `${baseUrl}/contacts/`);
    cy.get("[data-testid=input-tags]").type(",updated");
    cy.get("[type=submit").click();
    cy.url().should("eq", baseUrl + "/");
  });

  it("deletes the latest contact", () => {
    cy.get("[data-testid=delete-icon]").last().click();
    cy.on("window:confirm", () => true);
  });
});
