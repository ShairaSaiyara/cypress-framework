import InventoryPage from "./InventoryPage";
import CheckoutPage from "./CheckoutPage";

class OverviewPage {
    constructor(){
        this.inventoryPage = new InventoryPage();
        this.checkoutPage = new CheckoutPage();
    }

    submitCheckoutForm(){
        this.checkoutPage.addProductToCart();
        this.inventoryPage.openCart();
        this.checkoutPage.openCheckoutForm();
        this.checkoutPage.enterFirstName('test');
        this.checkoutPage.enterLastName('test');
        this.checkoutPage.enterPostalCode('1230');
        cy.get('[data-test="continue"]').click();
    }
}

export default OverviewPage