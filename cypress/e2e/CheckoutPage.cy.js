import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CheckoutPage from '../pages/CheckoutPage';

describe('Checkout Page Tests', () => {

    const loginPage = LoginPage;
    const inventoryPage = new InventoryPage();
    const checkoutPage = new CheckoutPage();

    beforeEach(() => {
        cy.fixture('users').then((user) => {
            cy.visit('/');
            loginPage.enterUsername(user.validUser.username);
            loginPage.enterPassword(user.validUser.password);
            loginPage.clickLogin();
            checkoutPage.addProductToCart();
            inventoryPage.openCart();
            checkoutPage.openCheckoutForm();
        });
    });

    it('Clicking on checkout should open checkout page', () => {
        cy.url().should('include', 'https://www.saucedemo.com/checkout-step-one.html');
    })

    it('First Name is a required field', () => {
        checkoutPage.clickContinue();
        checkoutPage.getFormErrorMessage().should('contain', 'Error: First Name is required')
    })

    it('Last Name is a required field', () => {
        checkoutPage.enterFirstName('test');
        checkoutPage.clickContinue();
        checkoutPage.getFormErrorMessage().should('contain', 'Error: Last Name is required')
    })

    it('Zip/Postal Code is a required field', () => {
        checkoutPage.enterFirstName('test');
        checkoutPage.enterLastName('test');
        checkoutPage.clickContinue();
        checkoutPage.getFormErrorMessage().should('contain', 'Error: Postal Code is required')
    })

    it('User can go to the overview tab after filling all three fields', () => {
        checkoutPage.enterFirstName('test');
        checkoutPage.enterLastName('test');
        checkoutPage.enterPostalCode('1230');
        checkoutPage.clickContinue();
        cy.url().should('include', 'https://www.saucedemo.com/checkout-step-two.html');
    })
});
