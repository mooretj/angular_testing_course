describe('Home page', () => {

  beforeEach(() => {

    cy.fixture("courses.json").as("coursesJSON");
    cy.server();
    cy.route("api/courses", "@coursesJSON").as("courses");
    cy.visit('/');
    cy.wait("@courses");

  });

  it("Should display a list of courses", () => {

    cy.contains("All Courses");
    cy.get("mat-card").should("have.length",9);

  });

  it("Should display the advanced courses", () => {

    cy.get(".mat-mdc-tab").should("have.length", 2);
    cy.get(".mat-mdc-tab").last().click();
    cy.get(".mat-mdc-tab-body-active .mat-mdc-card-title").its("length").should("be.gt", 1);
    cy.get(".mat-mdc-tab-body-active .mat-mdc-card-title").first()
      .should("contain", "Angular Security Course");

  });



});
