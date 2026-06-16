import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';

describe('Cart Page Tests', () => {

    const loginPage = LoginPage;
    const inventoryPage = new InventoryPage();

    beforeEach(() => {
        cy.fixture('users').then((user) => {
            cy.visit('/');
            loginPage.enterUsername(user.validUser.username);
            loginPage.enterPassword(user.validUser.password);
            loginPage.clickLogin();
        });
    });

    it('should add backpack to cart', () => {

        inventoryPage.addBackpackToCart();

        cy.get('.shopping_cart_badge').should('contain', '1');
    });

    it('should update count on cart icon accurately', () => {
        inventoryPage.addBackpackToCart();
        inventoryPage.addBikeLightToCart();

        cy.get('.shopping_cart_badge').should('contain', '2');
    })

    it('should remove product from cart', () => {

        inventoryPage.addBackpackToCart();
        inventoryPage.removeBackpackFromCart();

        cy.get('.shopping_cart_badge').should('not.exist');
    });

    it('user can continue shopping from the cart', () => {
        inventoryPage.addBackpackToCart();
        inventoryPage.addBikeLightToCart();
        inventoryPage.openCart();
        cy.get('#continue-shopping').should('exist').click();
        cy.url().should('include', 'https://www.saucedemo.com/inventory.html');       
    })

    it('user can checkout products from cart', () => {
        inventoryPage.addBackpackToCart();
        inventoryPage.addBikeLightToCart();
        inventoryPage.openCart();
        cy.get('.checkout_button').click();
        cy.url().should('include', 'https://www.saucedemo.com/checkout-step-one.html');
    })
});