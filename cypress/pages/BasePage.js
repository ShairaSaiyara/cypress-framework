class BasePage {
    // --- Shared locators ---
    CART_LINK = '.shopping_cart_link';
    CART_BADGE = '.shopping_cart_badge';
    ERROR_CONTAINER = '[data-test="error"]';
    ERROR_MESSAGE_CONTAINER = '.error-message-container';
    CONTINUE_BUTTON = '[data-test="continue"]';

    /**
     * Opens the shopping cart page by clicking the cart link.
     */
    openCart() {
        cy.get(this.CART_LINK).click();
    }

    /**
     * Returns the cart badge element showing the item count.
     * @returns {Cypress.Chainable} The cart badge element.
     */
    getCartBadge() {
        return cy.get(this.CART_BADGE);
    }

    /**
     * Returns the error message container element.
     * @returns {Cypress.Chainable} The error message container element.
     */
    getErrorMessage() {
        return cy.get(this.ERROR_CONTAINER);
    }

    /**
     * Returns the error message container element from checkout/login forms.
     * @returns {Cypress.Chainable} The error message container element.
     */
    getFormErrorMessage() {
        return cy.get(this.ERROR_MESSAGE_CONTAINER);
    }

    /**
     * Waits for any loading spinner on the page to disappear before proceeding.
     */
    waitForSpinnerToDisappear() {
        cy.waitForSpinnerToDisappear();
    }
}

export default BasePage;
