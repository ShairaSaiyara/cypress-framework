import BasePage from './BasePage';
import InventoryPage from "./InventoryPage";
import CheckoutPage from "./CheckoutPage";

class OverviewPage extends BasePage {
    // --- Locators ---
    TITLE = '.title';
    PAYMENT_INFO_LABEL = '[data-test="payment-info-label"]';
    SHIPPING_INFO_LABEL = '[data-test="shipping-info-label"]';
    TOTAL_INFO_LABEL = '[data-test="total-info-label"]';
    SUMMARY_SUBTOTAL_LABEL = '.summary_subtotal_label';
    SUMMARY_TAX_LABEL = '.summary_tax_label';
    SUMMARY_TOTAL_LABEL = '.summary_total_label';
    INVENTORY_ITEM_PRICE = '.inventory_item_price';

    /**
     * Initializes the OverviewPage and creates instances of InventoryPage and CheckoutPage.
     */
    constructor(){
        super();
        this.inventoryPage = new InventoryPage();
        this.checkoutPage = new CheckoutPage();
    }

    /**
     * Completes the full checkout flow: adds products to cart, opens the cart,
     * fills in the checkout form, and clicks continue to reach the overview page.
     */
    submitCheckoutForm(){
        this.checkoutPage.addProductToCart();
        this.inventoryPage.openCart();
        this.checkoutPage.openCheckoutForm();
        this.checkoutPage.enterFirstName('test');
        this.checkoutPage.enterLastName('test');
        this.checkoutPage.enterPostalCode('1230');
        this.checkoutPage.clickContinue();
    }

    /**
     * Returns the page title element.
     * @returns {Cypress.Chainable} The title element.
     */
    getTitle() {
        return cy.get(this.TITLE);
    }

    /**
     * Returns the payment information label element.
     * @returns {Cypress.Chainable} The payment info label element.
     */
    getPaymentInfoLabel() {
        return cy.get(this.PAYMENT_INFO_LABEL);
    }

    /**
     * Returns the shipping information label element.
     * @returns {Cypress.Chainable} The shipping info label element.
     */
    getShippingInfoLabel() {
        return cy.get(this.SHIPPING_INFO_LABEL);
    }

    /**
     * Returns the price total label element.
     * @returns {Cypress.Chainable} The total info label element.
     */
    getTotalInfoLabel() {
        return cy.get(this.TOTAL_INFO_LABEL);
    }

    /**
     * Returns the summary subtotal label element.
     * @returns {Cypress.Chainable} The summary subtotal label element.
     */
    getSummarySubtotalLabel() {
        return cy.get(this.SUMMARY_SUBTOTAL_LABEL);
    }

    /**
     * Returns the summary tax label element.
     * @returns {Cypress.Chainable} The summary tax label element.
     */
    getSummaryTaxLabel() {
        return cy.get(this.SUMMARY_TAX_LABEL);
    }

    /**
     * Returns the summary total label element.
     * @returns {Cypress.Chainable} The summary total label element.
     */
    getSummaryTotalLabel() {
        return cy.get(this.SUMMARY_TOTAL_LABEL);
    }

    /**
     * Returns all inventory item price elements on the overview page.
     * @returns {Cypress.Chainable} The inventory item price elements.
     */
    getInventoryItemPrices() {
        return cy.get(this.INVENTORY_ITEM_PRICE);
    }
}

export default OverviewPage;
