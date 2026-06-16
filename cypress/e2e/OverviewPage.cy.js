import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CheckoutPage from '../pages/CheckoutPage';
import OverviewPage from '../pages/OverviewPage';

describe('Checkout Page Tests', () => {

    const loginPage = LoginPage;
    const inventoryPage = new InventoryPage();
    const checkoutPage = new CheckoutPage();
    const overviewPage = new OverviewPage();

    beforeEach(() => {
        cy.fixture('users').then((user) => {
            cy.visit('/');
            loginPage.enterUsername(user.validUser.username);
            loginPage.enterPassword(user.validUser.password);
            loginPage.clickLogin();
            overviewPage.submitCheckoutForm();
        });
    });

    it('Verify if overview tab is visible', () => {
        cy.get('.title').should('contain', 'Checkout: Overview');
    })

    it('Verify if payment information section is present', () => {
        cy.get('[data-test="payment-info-label"]').should('contain', 'Payment Information:');
    })

    it('Verify if shipping information section is present', () => {
        cy.get('[data-test="shipping-info-label"]').should('contain', 'Shipping Information:');
    })

    it('Verify if price total section is present', () => {
        cy.get('[data-test="total-info-label"]').should('contain', 'Price Total');
    })

    it('Verify if total price is calculated accurately', () => {
        cy.get('.inventory_item_price').then(($prices) => {
            const itemPrices = Cypress._.map($prices, (priceElement) => {
            return parseFloat(priceElement.innerText.replace('$', ''));
        });
        const calculatedTotal = itemPrices.reduce((sum, price) => sum + price, 0);

        cy.get('.summary_subtotal_label').then(($subtotal) => {
            const displayedTotalText = $subtotal.text();
            const displayedTotal = parseFloat(displayedTotalText.replace('Item total: $', ''));
            expect(calculatedTotal).to.equal(displayedTotal);
        });
        });
    })

    it('Verify if tax is calculated accurately', () => {
        cy.get('.summary_subtotal_label').then(($subtotal) => {
            const subtotal = parseFloat($subtotal.text().replace('Item total: $', ''));
            const expectedTax = parseFloat((subtotal * 0.08).toFixed(2));// .toFixed(2) to round to 2 decimal places, then parseFloat to turn it back into a number
        cy.get('.summary_tax_label').then(($tax) => {
            const actualTax = parseFloat($tax.text().replace('Tax: $', ''));
            expect(actualTax).to.equal(expectedTax);
        });
    });
    })

    it('Verify if total amount is displayed accurately', () => {
        cy.get('.summary_subtotal_label').then(($subtotal) => {
            const subtotal = parseFloat($subtotal.text().replace('Item total: $', ''));
            cy.get('.summary_tax_label').then(($tax) => {
                const actualTax = parseFloat($tax.text().replace('Tax: $', ''));
                const calculatedTotal = actualTax + subtotal;
                cy.get('.summary_total_label').then(($actualTotal) => {
                    const actualTotal = parseFloat($actualTotal.text().replace('Total: $',''));
                    expect(actualTotal).to.equal(calculatedTotal);
                })
            })
        })
    })
    
});