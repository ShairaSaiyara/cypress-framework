import InventoryPage from "./InventoryPage"

class CheckoutPage {
    
    constructor(){
        this.inventoryPage = new InventoryPage();
    }

    addProductToCart(){
        this.inventoryPage.addBackpackToCart();
        this.inventoryPage.addBikeLightToCart();
    }

    openCheckoutForm(){
        cy.get('.checkout_button').click();
    }

    enterFirstName(firstName){
        cy.get('[data-test="firstName"]').should('be.empty').type(firstName);
    }

    enterLastName(lastName){
        cy.get('[data-test="lastName"]').should('be.empty').type(lastName);
    }

    enterPostalCode(postalCode){
        cy.get('[data-test="postalCode"]').should('be.empty').type(postalCode);
    }

    
}

export default CheckoutPage