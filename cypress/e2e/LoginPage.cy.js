import LoginPage from '../pages/LoginPage';

describe('Login Tests', () => {

    beforeEach(() => {
        cy.visit('/');
        cy.fixture('users').as('users');
    });

    it('Should login successfully', function () {

        LoginPage.login(
            this.users.validUser.username,
            this.users.validUser.password
        );

        cy.url().should('include', 'inventory');
    });

    it('Can not login with only username', function() {
        LoginPage.enterUsername(
            this.users.validUser.username
        )
        LoginPage.clickLogin()

        LoginPage.getErrorMessage().should('contain', 'Epic sadface: Password is required')
    })

    it('Can not login with only password', function() {
        LoginPage.enterPassword(
            this.users.validUser.password
        )
        LoginPage.clickLogin()

        LoginPage.getErrorMessage().should('contain', 'Epic sadface: Username is required')
    })



});
