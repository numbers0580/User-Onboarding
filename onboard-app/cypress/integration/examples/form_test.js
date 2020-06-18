describe('Testing User Onboarding Form', () => {
    /*
    it('', () => {
        cy.visit()
    })
    */

    it('Open page found at port 3000', () => {
        cy.visit('http://localhost:3000/')
    })

    it('Enters a name', () => {
        cy.get('input[name="uName"]')
            .type('Spiderman')
            .should('have.value', 'Spiderman')
    })

    it('Enters an email', () => {
        cy.get('input[name="uEmail"]')
            .type('notPeterParker@daily-bugle.com')
            .should('have.value', 'notPeterParker@daily-bugle.com')
    })

    it('Enters a password', () => {
        cy.get('input[name="uPass"]')
            .type('friendlyWebcrawler!')
            .should('have.value', 'friendlyWebcrawler!')
    })

    it('Checks the ToS box', () => {
        cy.get('input[name="tosAccept"]')
            .check()
    })

    it('Clicks the Submit button', () => {
        //Went to https://docs.cypress.io/api/commands/click.html#Syntax to figure out this part
        cy.contains('Submit')
            .click()
    })

    it('Checking form validation if an input is empty', () => {
        cy.get('input[name="uName"]')
        .should('have.value', '')
    })
})