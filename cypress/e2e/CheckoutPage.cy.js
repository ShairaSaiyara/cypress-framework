import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import { should } from 'chai';

describe('Checkout Page Tests', () => {

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

    it('', () => {

    })
});