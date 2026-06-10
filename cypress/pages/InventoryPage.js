class InventoryPage {

    addBackpackToCart() {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }

    addBikeLightToCart() {
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    }

    removeBackpackFromCart() {
        cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    }

    openCart() {
        cy.get('.shopping_cart_link').click();
    }

    sortBy(option) {
        cy.get('[data-test="product-sort-container"]').select(option);
    }

    verifyInventoryPageLoaded() {
        cy.url().should('include', '/inventory.html');
    }
}

export default InventoryPage;