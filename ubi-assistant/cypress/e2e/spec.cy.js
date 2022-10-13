describe('ubi-assistant', () => {
  it('verify ngpombo\'s homepage', () => {
    const examText = 'Frequência: 04.01.2023, 18h00, sala 6.26'
    const index = {
      row: 6,
      column: 1,
    }

    cy.visit('~ngpombo/')
    cy.get('ul#navigation').children('li').eq(2).contains('Teaching').click()
    cy.get('ul.ul-dates').eq(2).children('li').eq(1).contains('div.content > h4', 'Qualidade de Software')
    cy.get('ul.ul-dates').eq(2).children('li').eq(1).children('div.content').children('p').children('a')
        .should('have.attr', 'href', './units/sq.html').invoke('removeAttr', 'target').click()

    cy.get('div#News > ul').contains('li', examText).should(elem => {
      expect(elem.text().trim()).to.equal(examText)
    })
    cy.get('button').eq(2).contains('Lecture Notes').click()
    cy.get('div#LectureNotes > table > tbody > tr').eq(index.row).children('td').eq(index.column).should('be.empty')
    cy.get('button').eq(3).contains('Grades').click()
    cy.get('div#Grades').contains('TBD').should(elem => {
      expect(elem.text().trim()).to.equal('TBD')
    })
  })
})