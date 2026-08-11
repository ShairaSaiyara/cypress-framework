import BasePage from './BasePage';
import InventoryPage from "./InventoryPage";

class CheckoutPage extends BasePage {
    // --- Locators ---
    CHECKOUT_BUTTON = '.checkout_button';
    FIRST_NAME_FIELD = '[data-test="firstName"]';
    LAST_NAME_FIELD = '[data-test="lastName"]';
    POSTAL_CODE_FIELD = '[data-test="postalCode"]';

    /**
     * Initializes the CheckoutPage and creates an instance of InventoryPage for cart interactions.
     */
    constructor(){
        super();
        this.inventoryPage = new InventoryPage();
    }

    /**
     * Adds the backpack and bike light products to the cart via the InventoryPage.
     */
    addProductToCart(){
        this.inventoryPage.addBackpackToCart();
        this.inventoryPage.addBikeLightToCart();
    }

    /**
     * Opens the checkout form by clicking the checkout button on the cart page.
     */
    openCheckoutForm(){
        cy.get(this.CHECKOUT_BUTTON).click();
    }

    /**
     * Types the given first name into the first name field.
     * @param {string} firstName - The first name to enter.
     */
    enterFirstName(firstName){
        cy.get(this.FIRST_NAME_FIELD).should('be.empty').type(firstName);
    }

    /**
     * Types the given last name into the last name field.
     * @param {string} lastName - The last name to enter.
     */
    enterLastName(lastName){
        cy.get(this.LAST_NAME_FIELD).should('be.empty').type(lastName);
    }

    /**
     * Types the given postal code into the postal code field.
     * @param {string} postalCode - The postal code to enter.
     */
    enterPostalCode(postalCode){
        cy.get(this.POSTAL_CODE_FIELD).should('be.empty').type(postalCode);
    }

    /**
     * Clicks the continue button to proceed to the next checkout step.
     */
    clickContinue() {
        cy.get(this.CONTINUE_BUTTON).click();
    }
}

export default CheckoutPage;
