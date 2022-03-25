const baseUrl = Cypress.env("base_url");

describe("Delete Contact", () => {
  let lenBefore;

  it("creates a contact", () => {
    cy.visit(`${baseUrl}/contacts/add`);
    cy.get("[data-testid=input-name]").type("DeleteMe");
    cy.get("[data-testid=input-lastName]").type("Test");
    cy.get("[data-testid=input-email]").type("delete.me@test.com");
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

  it("get the number of contacts before delete", () => {
    cy.visit(baseUrl);
    cy.get("table")
      .find("[data-testid=delete-icon]")
      .its("length")
      .then((len) => {
        lenBefore = len;
      });
  });

  it("should not delete when user does not confirm", () => {
    cy.visit(baseUrl);
    cy.get("[data-testid=delete-icon]").first().click();
    cy.on("window:confirm", () => false);
    cy.get("[data-testid=delete-icon]").should("have.length", lenBefore);
  });

  it("should delete when user confirms", () => {
    cy.visit(baseUrl);
    cy.get("[data-testid=delete-icon]").last().click();
    cy.on("window:confirm", () => true);
    cy.get("[data-testid=delete-icon]").should("have.length", lenBefore - 1);
  });
});
