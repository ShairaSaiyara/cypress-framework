import BasePage from './BasePage';

class PracticePage extends BasePage {
    // --- Locators ---
    ADD_BACKPACK_BTN = '[data-test="add-to-cart-sauce-labs-backpack"]';

    /**
     * Adds the Sauce Labs Backpack to the shopping cart.
     */
    addBackpackToCart() {
        cy.get(this.ADD_BACKPACK_BTN).click();
    }
}

export default PracticePage;
