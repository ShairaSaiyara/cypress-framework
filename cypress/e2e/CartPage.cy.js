import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CheckoutPage from '../pages/CheckoutPage';

describe('Cart Page Tests', () => {

    const loginPage = LoginPage;
    const inventoryPage = new InventoryPage();
    const checkoutPage = new CheckoutPage();

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

        inventoryPage.getCartBadge().should('contain', '1');
    });

    it('should update count on cart icon accurately', () => {
        inventoryPage.addBackpackToCart();
        inventoryPage.addBikeLightToCart();

        inventoryPage.getCartBadge().should('contain', '2');
    })

    it('should remove product from cart', () => {

        inventoryPage.addBackpackToCart();
        inventoryPage.removeBackpackFromCart();

        inventoryPage.getCartBadge().should('not.exist');
    });

    it('user can continue shopping from the cart', () => {
        inventoryPage.addBackpackToCart();
        inventoryPage.addBikeLightToCart();
        inventoryPage.openCart();
        inventoryPage.clickContinueShopping();
        cy.url().should('include', 'https://www.saucedemo.com/inventory.html');       
    })

    it('user can checkout products from cart', () => {
        inventoryPage.addBackpackToCart();
        inventoryPage.addBikeLightToCart();
        inventoryPage.openCart();
        checkoutPage.openCheckoutForm();
        cy.url().should('include', 'https://www.saucedemo.com/checkout-step-one.html');
    })
});
