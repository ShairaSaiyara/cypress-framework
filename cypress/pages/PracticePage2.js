import BasePage from './BasePage';
import InventoryPage from './InventoryPage';

class PracticePage2 extends BasePage {
    // --- Locators ---
    FIRST_NAME_FIELD = '[data-test="firstName"]';
    LAST_NAME_FIELD = '[data-test="lastName"]';
    ADD_BACKPACK_BTN = '[data-test="add-to-cart-sauce-labs-backpack"]';
    ADD_BIKE_LIGHT_BTN = '[data-test="add-to-cart-sauce-labs-bike-light"]';
    PRICE_ELEMENTS = '.inventory_item_price';

    constructor() {
        super();
        this.inventoryPage = new InventoryPage();
    }

    /**
     * Types the given first name into the first name field.
     * @param {string} firstName - The first name to enter.
     */
    enterFirstName(firstName) {
        cy.get(this.FIRST_NAME_FIELD).should('be.empty').type(firstName);
    }

    /**
     * Types the given last name into the last name field.
     * @param {string} lastName - The last name to enter.
     */
    enterLastName(lastName) {
        cy.get(this.LAST_NAME_FIELD).should('be.empty').type(lastName);
    }

    /**
     * Adds both the backpack and bike light to the cart.
     */
    addBothProductsToCart() {
        cy.get(this.ADD_BACKPACK_BTN).click();
        cy.get(this.ADD_BIKE_LIGHT_BTN).click();
    }

    /**
     * Returns all item prices from the current page as numbers.
     * @returns {Cypress.Chainable} Array of price numbers.
     */
    getItemPrices() {
        return cy.get(this.PRICE_ELEMENTS).then(($els) => {
            return Cypress._.map($els, (el) => {
                return parseFloat(el.innerText.replace('$', ''));
            });
        });
    }
}

export default PracticePage2;
