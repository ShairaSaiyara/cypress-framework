import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';

describe('Checkout Page Tests', () => {

    const loginPage = LoginPage;
    const inventoryPage = new InventoryPage();

    beforeEach(() => {
        cy.fixture('users').then((user) => {
            cy.visit('/');
            loginPage.enterUsername(user.validUser.username);
            loginPage.enterPassword(user.validUser.password);
            loginPage.clickLogin();
            inventoryPage.addBackpackToCart();
            inventoryPage.addBikeLightToCart();
            inventoryPage.openCart();
            cy.get('.checkout_button').click();
        });
    });

    it('Clicking on checkout should open checkout page', () => {
        cy.url().should('include', 'https://www.saucedemo.com/checkout-step-one.html');
    })

    it('First Name is a required field', () => {
        cy.get('[data-test="continue"]').click();
        cy.get('.error-message-container').should('contain', 'Error: First Name is required')
    })

    it('Last Name is a required field', () => {
        cy.get('[data-test="firstName"]').should('be.empty').type('test');
        cy.get('[data-test="continue"]').click();
        cy.get('.error-message-container').should('contain', 'Error: Last Name is required')
    })

    it('Zip/Postal Code is a required field', () => {
        cy.get('[data-test="firstName"]').should('be.empty').type('test');
        cy.get('[data-test="lastName"]').should('be.empty').type('test');
        cy.get('[data-test="continue"]').click();
        cy.get('.error-message-container').should('contain', 'Error: Postal Code is required')
    })

    it('User can go to the overview tab after filling all three fields', () => {
        cy.get('[data-test="firstName"]').should('be.empty').type('test');
        cy.get('[data-test="lastName"]').should('be.empty').type('test');
        cy.get('[data-test="postalCode"]').should('be.empty').type('1230');
        cy.get('[data-test="continue"]').click();
        cy.url().should('include', 'https://www.saucedemo.com/checkout-step-two.html');
    })
});