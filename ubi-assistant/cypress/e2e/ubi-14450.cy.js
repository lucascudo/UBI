describe("ubi-14450", () => {
  const env = Cypress.env("14450")

  it("navigates to the curricular unit homepage", () => {
    const getCuElement = () => cy.get("ul.ul-dates").eq(env.CU_ROW).children("li").eq(1)

    cy.visit(env.TEACHER_URL)
    cy.get("ul#navigation").children("li").eq(2).contains("Teaching").click()
    getCuElement().contains(env.CLASS_NAME)
    getCuElement().children("div.content").children("p").children("a")
        .should("have.attr", "href", "./" + env.CLASS_URL)
  })

  it("verifies the latest news", () => {
    cy.visit(env.TEACHER_URL + env.CLASS_URL)
    cy.get("div#News > ul").contains("li", env.NEWS_TEXT).should(elem => {
      expect(elem.text().trim()).to.equal(env.NEWS_TEXT)
    })
  })

  it("confirms the inexistence of new lectures", () => {
    cy.visit(env.TEACHER_URL + env.CLASS_URL)
    cy.get("button").contains("Lecture Notes").click()
    cy.get("div#LectureNotes > table > tbody > tr")
        .eq(env.LAST_LECTURE.row).children("td")
        .eq(env.LAST_LECTURE.column).should("be.empty")
  })

  it("confirms that the grades are TBD", () => {
    cy.visit(env.TEACHER_URL + env.CLASS_URL)
    cy.get("button").contains("Grades").click()
    cy.get("div#Grades").contains("TBD").should(elem => {
      expect(elem.text().trim()).to.equal("TBD")
    })
  })
})