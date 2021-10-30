describe("home page e2e", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/api/books/graphql").as("gqlQuery");
    cy.visit("http://localhost:4000");
  });

  it("should assert that books app works as expected", () => {
    // Check home page loads
    cy.get("div.ant-card-head-title").should(
      "have.text",
      "List of books in your catalog:"
    );

    // Check list of books is loaded as expected in snapshot
    cy.wait("@gqlQuery").should(({ request, response }) => {
      expect(request.body.operationName).to.equal("GetAllBooks");
      expect(response.statusCode).to.equal(200);
      cy.wrap(response.body).snapshot();
    });

    // Click on book from list to navigate to book detail page
    cy.get("div.ant-card-grid")
      .first()
      .should("have.text", "Things Fall Apart")
      .click();
    cy.url().should("match", /http:\/\/localhost:4000\/book\/.*/);

    // Check book details are fetched correctly
    const getBook = cy.wait("@gqlQuery");
    getBook.should(({ request, response }) => {
      expect(request.body.operationName).to.equal("GetBookById");
      expect(response.statusCode).to.equal(200);
      cy.wrap(response.body).snapshot();
    });

    // Check book detail page loads correctly
    cy.contains("div.ant-card-meta-title", "Things Fall Apart");

    // Click on books breadcrumb to navigate to books list page
    cy.get("span.ant-breadcrumb-link > span.cursor-pointer")
      .contains("Books")
      .click();
    cy.url().should("eq", "http://localhost:4000/");

    // Check that sidebar can collapse on click
    const trigger = "div.ant-layout-sider-trigger";
    cy.get(trigger).invoke("css", "width").should("eq", "200px");
    cy.get(trigger).click().invoke("css", "width").should("eq", "80px");
  });
});
