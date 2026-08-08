import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';


describe('Inventory Page Tests', () => {
    
    const loginPage = LoginPage;
    const inventoryPage = new InventoryPage;

    beforeEach(() => {
        cy.fixture('users').then((user) => {
            cy.visit('/');
            loginPage.enterUsername(user.validUser.username);
            loginPage.enterPassword(user.validUser.password);
            loginPage.clickLogin();
        });
    });

    it('Inventort page loads after login', () => {
        inventoryPage.verifyInventoryPageLoaded();
    })

    it('Inventory page shows list of products', () => {
        inventoryPage.getInventoryList().should('not.be.empty');
    })

    it('users can add product to cart from inventory page', () => {
        inventoryPage.addBackpackToCart();
        inventoryPage.openCart();
        inventoryPage.getCartList().should('contain', 'Sauce Labs Backpack');
    })

    it('users can remove product from cart from inventory page', () => {
        inventoryPage.addBackpackToCart();
        inventoryPage.getRemoveBackpackButton().click();
        inventoryPage.getAddBackpackButton().should('contain','Add to cart');
    })

    it('clicking on product card takes user to the product profile', () => {
        inventoryPage.getInventoryItemNames().eq(0).should('contain','Sauce Labs Backpack').click();
        cy.url().should('include', 'https://www.saucedemo.com/inventory-item.html?id=4');
    })

    it('users can sort the product list by low to high price', () => {
        inventoryPage.sortBy('Price (low to high)');
        inventoryPage.getInventoryItemPrices().then(($prices) => {
            const actualPrices = Cypress._.map($prices, (priceElement) => {
                return parseFloat(priceElement.innerText.replace('$', ''));
            });
            const expectedSortedPrices = [...actualPrices].sort((a, b) => a - b);
            expect(actualPrices).to.deep.equal(expectedSortedPrices);
        })
    })

    it('users can sort the product list by high to low price', () => {
        inventoryPage.sortBy('Price (high to low)');
        inventoryPage.getInventoryItemPrices().then(($prices) => {
            const actualPrices = Cypress._.map($prices, (priceElement) => {
                return parseFloat(priceElement.innerText.replace('$', ''));
            });
            const expectedSortedPrices = [...actualPrices].sort((a, b) => b - a);
            expect(actualPrices).to.deep.equal(expectedSortedPrices);
        })
    })

    
})
