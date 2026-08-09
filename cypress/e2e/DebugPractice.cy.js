import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CheckoutPage from '../pages/CheckoutPage';
import PracticePage from '../pages/PracticePage';

describe('Debug Practice - Find and fix the bugs', () => {

    const loginPage = LoginPage;
    const inventoryPage = new InventoryPage();
    const checkoutPage = new CheckoutPage();
    const practicePage = new PracticePage();

    // ================================================================
    // BUG #1 - Read the error carefully
    // ================================================================
    it('Bug #1 - Should show error when password is missing', () => {
        cy.visit('/');
        loginPage.enterUsername('standard_user');
        loginPage.clickLogin();
        loginPage.getErrorMessage().should('contain', 'Epic sadface: Password is required');
    });

    // ================================================================
    // BUG #2 - The selector might not match the actual DOM
    // ================================================================
    it('Bug #2 - Should add backpack to cart', () => {
        cy.visit('/');
        loginPage.login('standard_user', 'secret_sauce');
        cy.debug();
        practicePage.addBackpackToCart();
        inventoryPage.getCartBadge().should('contain', '1');
    });

    // ================================================================
    // BUG #3 - Something is missing in the test flow
    // ================================================================
    it('Bug #3 - Should open checkout page', () => {
        cy.visit('/');
        loginPage.login('standard_user', 'secret_sauce');
        inventoryPage.openCart();
        checkoutPage.openCheckoutForm();
        cy.url().should('include', 'checkout-step-one.html');
    });

    // ================================================================
    // BUG #4 - Trace the method call through the page object
    // ================================================================
    it('Bug #4 - Should add backpack to cart and verify badge', () => {
        cy.visit('/');
        loginPage.login('standard_user', 'secret_sauce');
        inventoryPage.addBackpackToCart();
        inventoryPage.getCartBadge().should('contain', '1');
    });

    // ================================================================
    // BUG #5 - Read what the test DOES vs what it ASSERTS
    // ================================================================
    it.only('Bug #5 - Cart badge should show correct count', () => {
        cy.visit('/');
        loginPage.login('standard_user', 'secret_sauce');
        inventoryPage.addBackpackToCart();
        inventoryPage.addBikeLightToCart();
        inventoryPage.getCartBadge().should('contain', '2');
    });
});
