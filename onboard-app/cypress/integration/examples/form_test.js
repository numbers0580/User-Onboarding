describe('Testing User Onboarding Form', () => {
    /*
    it('', () => {
        cy.visit()
    })
    */

    it('Open page found at port 3000', () => {
        cy.visit('http://localhost:3000/')
    })

    it('Checking form validation if name is too short', () => {
        cy.get('input[name="uName"]').type('S')
            .should('have.value', 'S')

            cy.get('.errorMessages')
                .contains('Username must be at least 4 characters')
                .should('exist')
    })

    it('Enters a name', () => {
        cy.get('input[name="uName"]').type('piderman')
            .should('have.value', 'Spiderman')
    })

    it('Checking form validation if email is incomplete', () => {
        cy.get('input[name="uEmail"]').type('n')
            .should('have.value', 'n')

            cy.get('.errorMessages')
                .contains('Please enter a valid email address')
                .should('exist')
    })

    it('Enters an email', () => {
        cy.get('input[name="uEmail"]')
            .type('otPeterParker@daily-bugle.com')
            .should('have.value', 'notPeterParker@daily-bugle.com')
    })

    it('Checking form validation if password is too short', () => {
        cy.get('input[name="uPass"]').type('f')
            .should('have.value', 'f')

            cy.get('.errorMessages')
                .contains('Passwords must be at least 8 characters long')
                .should('exist')
    })

    it('Enters a password', () => {
        cy.get('input[name="uPass"]')
            .type('riendlyWebcrawler!')
            .should('have.value', 'friendlyWebcrawler!')
    })

    it('Checks the ToS box', () => {
        cy.get('input[name="tosAccept"]').check()
    })

    it('Clicks the Submit button', () => {
        //Went to https://docs.cypress.io/api/commands/click.html#Syntax to figure out this part
        cy.get('button').click()
    })
})