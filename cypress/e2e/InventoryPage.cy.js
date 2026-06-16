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
        cy.get('.inventory_list').should('not.be.empty');
    })

    it('users can add product to cart from inventory page', () => {
        inventoryPage.addBackpackToCart();
        inventoryPage.openCart();
        cy.get('.cart_list').should('contain', 'Sauce Labs Backpack');
    })

    it('users can remove product from cart from inventory page', () => {
        inventoryPage.addBackpackToCart();
        cy.get('#remove-sauce-labs-backpack').click();
        cy.get('#add-to-cart-sauce-labs-backpack').should('contain','Add to cart');
    })

    it('clicking on product card takes user to the product profile', () => {
        cy.get('.inventory_item_name').eq(0).should('contain','Sauce Labs Backpack').click();
        cy.url().should('include', 'https://www.saucedemo.com/inventory-item.html?id=4');
    })

    it('users can sort the product list by low to high price', () => {
        inventoryPage.sortBy('Price (low to high)');
        cy.get('.inventory_item_price').then(($prices) => {
            const actualPrices = Cypress._.map($prices, (priceElement) => {
                return parseFloat(priceElement.innerText.replace('$', ''));
            });
            const expectedSortedPrices = [...actualPrices].sort((a, b) => a - b);
            expect(actualPrices).to.deep.equal(expectedSortedPrices);
        })
    })

    it('users can sort the product list by high to low price', () => {
        inventoryPage.sortBy('Price (high to low)');
        cy.get('.inventory_item_price').then(($prices) => {
            const actualPrices = Cypress._.map($prices, (priceElement) => {
                return parseFloat(priceElement.innerText.replace('$', ''));
            });
            const expectedSortedPrices = [...actualPrices].sort((a, b) => b - a);
            expect(actualPrices).to.deep.equal(expectedSortedPrices);
        })
    })

    
})