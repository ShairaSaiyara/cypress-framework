import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CheckoutPage from '../pages/CheckoutPage';
import PracticePage2 from '../pages/PracticePage2';

describe('Debug Practice 2 - These bugs REQUIRE cy.debug()', () => {

    const loginPage = LoginPage;
    const inventoryPage = new InventoryPage();
    const checkoutPage = new CheckoutPage();
    const practicePage2 = new PracticePage2();

    // ================================================================
    // BUG #6 - The error message LIES to you
    //
    // The test fills in the first name and clicks continue,
    // expecting to reach the next page. But it fails with a URL
    // mismatch. The error doesn't tell you WHY.
    //
    // HOW TO DEBUG:
    //   1. Add cy.debug() BEFORE checkoutPage.clickContinue()
    //   2. When execution pauses, open Chrome DevTools (Console tab)
    //   3. Run this in the console:
    //        document.querySelector('[data-test="firstName"]').value
    //        document.querySelector('[data-test="lastName"]').value
    //   4. Look at what's ACTUALLY in each field
    //   5. Ask yourself: does it match what the test intended?
    // ================================================================
    it('Bug #6 - Should fill first name and proceed to next step', () => {
        cy.visit('/');
        loginPage.login('standard_user', 'secret_sauce');
        inventoryPage.addBackpackToCart();
        inventoryPage.openCart();
        checkoutPage.openCheckoutForm();

        practicePage2.enterFirstName('John');
        // Add cy.debug() here — inspect the form fields in DevTools
        checkoutPage.clickContinue();

        cy.url().should('include', 'checkout-step-two.html');
    });

    // ================================================================
    // BUG #7 - The calculation produces NaN
    //
    // The test gets item prices, sums them, and compares to the
    // displayed subtotal. But the result is NaN. The error just says
    // "expected NaN to equal 39.98" — it doesn't tell you WHERE the
    // NaN came from.
    //
    // HOW TO DEBUG:
    //   1. Add cy.debug() INSIDE the .then() callback, right after
    //      the prices array is created
    //   2. When execution pauses, open Chrome DevTools (Console tab)
    //   3. Type:  prices
    //   4. You'll see the array of numbers — look for NaN
    //   5. That NaN came from an element that shouldn't be there
    //   6. Now check what selector getItemPrices() uses
    // ================================================================
    it('Bug #7 - Should verify subtotal matches item prices', () => {
        cy.visit('/');
        loginPage.login('standard_user', 'secret_sauce');
        inventoryPage.addBackpackToCart();
        inventoryPage.addBikeLightToCart();
        inventoryPage.openCart();
        checkoutPage.openCheckoutForm();
        checkoutPage.enterFirstName('test');
        checkoutPage.enterLastName('test');
        checkoutPage.enterPostalCode('1230');
        checkoutPage.clickContinue();

        practicePage2.getItemPrices().then((prices) => {
            // Add cy.debug() here — type "prices" in the console

            const calculatedTotal = prices.reduce((sum, price) => sum + price, 0);

            cy.get('.summary_subtotal_label').then(($subtotal) => {
                const displayedTotal = parseFloat($subtotal.text().replace('Item total: $', ''));
                expect(calculatedTotal).to.equal(displayedTotal);
            });
        });
    });

    // ================================================================
    // BUG #8 - The count is right but the VALUE is wrong
    //
    // The test adds 2 products and checks the cart badge shows "2"
    // (it does). Then it checks the cart total matches what
    // backpack + bike light should cost. But the total is wrong.
    //
    // The error says "expected 45.98 to equal 39.98" — a $6
    // difference. But WHICH product is wrong? The error doesn't say.
    //
    // HOW TO DEBUG:
    //   1. Add cy.debug() AFTER inventoryPage.openCart()
    //   2. When execution pauses, open Chrome DevTools (Console tab)
    //   3. Run this to see what's actually in the cart:
    //        document.querySelectorAll('.inventory_item_name')
    //   4. Or run:
    //        [...document.querySelectorAll('.inventory_item_name')]
    //          .map(el => el.innerText)
    //   5. Look at the actual product names — one of them is wrong
    //   6. Now check which selector addBothProductsToCart() uses
    // ================================================================
    it.only('Bug #8 - Should verify cart total for backpack and bike light', () => {
        cy.visit('/');
        loginPage.login('standard_user', 'secret_sauce');
        practicePage2.addBothProductsToCart();

        // This passes — cart badge shows "2"
        inventoryPage.getCartBadge().should('contain', '2');

        inventoryPage.openCart();
        // Add cy.debug() here — inspect the cart item names in DevTools

        // Verify the total price: backpack ($29.99) + bike light ($9.99) = $39.98
        cy.get('.inventory_item_price').then(($prices) => {
            const prices = Cypress._.map($prices, (el) =>
                parseFloat(el.innerText.replace('$', ''))
            );

            const total = prices.reduce((sum, price) => sum + price, 0);
            expect(total).to.equal(39.98);
        });
    });
});
