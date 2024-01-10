// const baseUrl = Cypress.env("http://localhost:3000");

// describe("Delete Contact", () => {
//   before(() => {
//     cy.visit("http://localhost:3000/contacts/add");
//     // Store the initial length of the contact list
//     cy.get("tr").its("length").as("lenBefore");
//   });

//   it("creates a contact", () => {
//     // ... your existing code to create a contact
//   });

//   it("should delete a contact", () => {
//     cy.visit(baseUrl);

//     // Wait for the contact list to load
//     cy.get("tr").should("have.length.gt", 0);

//     // Get the initial length of the contact list
//     cy.get("@lenBefore").then((lenBefore) => {
//       // Click the delete button of the first contact in the list
//       cy.get("tr:first-of-type button:contains('Delete')").click();

//       // Confirm the deletion in the confirmation dialog
//       cy.on("window:confirm", () => true);

//       // Wait for the toast notification
//       cy.wait(2000); // Adjust the wait time if needed

//       // Check if the toast notification is displayed
//       cy.get(".Toastify__toast-body").should(
//         "contain.text",
//         "Contact deleted successfully"
//       );

//       // Optionally, wait for the update after deletion
//       cy.reload();

//       // Get the current length of the contact list
//       cy.get("tr").its("length").as("lenAfter");

//       // Assert that the length has decreased by 1 after deletion
//       cy.get("@lenAfter").should("eq", lenBefore - 1);
//     });
//   });
// });
