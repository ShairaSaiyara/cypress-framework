import BasePage from './BasePage';

class InventoryPage extends BasePage {
    // --- Locators ---
    ADD_BACKPACK_BTN = '[data-test="add-to-cart-sauce-labs-backpack"]';
    ADD_BIKE_LIGHT_BTN = '[data-test="add-to-cart-sauce-labs-bike-light"]';
    REMOVE_BACKPACK_BTN = '#remove-sauce-labs-backpack';
    SORT_DROPDOWN = '[data-test="product-sort-container"]';
    INVENTORY_LIST = '.inventory_list';
    INVENTORY_ITEM_NAME = '.inventory_item_name';
    INVENTORY_ITEM_PRICE = '.inventory_item_price';
    CART_LIST = '.cart_list';
    CONTINUE_SHOPPING_BTN = '#continue-shopping';

    /**
     * Adds the Sauce Labs Backpack to the shopping cart.
     */
    addBackpackToCart() {
        cy.get(this.ADD_BACKPACK_BTN).click();
    }

    /**
     * Adds the Sauce Labs Bike Light to the shopping cart.
     */
    addBikeLightToCart() {
        cy.get(this.ADD_BIKE_LIGHT_BTN).click();
    }

    /**
     * Navigates to the cart and removes the Sauce Labs Backpack from the cart.
     */
    removeBackpackFromCart() {
        this.openCart();
        cy.get(this.REMOVE_BACKPACK_BTN).click();
    }

    /**
     * Selects a sorting option from the product sort dropdown.
     * @param {string} option - The visible text of the sort option to select (e.g., 'Price (low to high)').
     */
    sortBy(option) {
        cy.get(this.SORT_DROPDOWN).select(option);
    }

    /**
     * Verifies that the inventory page has loaded by checking the URL.
     */
    verifyInventoryPageLoaded() {
        cy.url().should('include', '/inventory.html');
    }

    /**
     * Returns the inventory list element.
     * @returns {Cypress.Chainable} The inventory list element.
     */
    getInventoryList() {
        return cy.get(this.INVENTORY_LIST);
    }

    /**
     * Returns all inventory item name elements.
     * @returns {Cypress.Chainable} The inventory item name elements.
     */
    getInventoryItemNames() {
        return cy.get(this.INVENTORY_ITEM_NAME);
    }

    /**
     * Returns all inventory item price elements.
     * @returns {Cypress.Chainable} The inventory item price elements.
     */
    getInventoryItemPrices() {
        return cy.get(this.INVENTORY_ITEM_PRICE);
    }

    /**
     * Returns the cart list element on the cart page.
     * @returns {Cypress.Chainable} The cart list element.
     */
    getCartList() {
        return cy.get(this.CART_LIST);
    }

    /**
     * Returns the add-to-cart button for the backpack (used for assertions after removal).
     * @returns {Cypress.Chainable} The add-to-cart backpack button element.
     */
    getAddBackpackButton() {
        return cy.get(this.ADD_BACKPACK_BTN);
    }

    /**
     * Returns the remove button for the backpack.
     * @returns {Cypress.Chainable} The remove backpack button element.
     */
    getRemoveBackpackButton() {
        return cy.get(this.REMOVE_BACKPACK_BTN);
    }

    /**
     * Clicks the continue shopping button to return to the inventory page from the cart.
     */
    clickContinueShopping() {
        cy.get(this.CONTINUE_SHOPPING_BTN).click();
    }
}

export default InventoryPage;
