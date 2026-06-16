import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';

describe('Remove From Cart', () => {

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

    it('should remove product from cart', () => {

        inventoryPage.addBackpackToCart();
        inventoryPage.removeBackpackFromCart();

        cy.get('.shopping_cart_badge').should('not.exist');
        // cy.get('.cart_list').should('be.empty')
    });

});