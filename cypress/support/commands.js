// ***********************************************
// Custom Cypress commands
// ***********************************************

/**
 * Waits for a loading spinner to appear and then disappear.
 * If no spinner is present, the command resolves immediately.
 * @param {number} timeout - Maximum time to wait in milliseconds (default: 10000).
 */
Cypress.Commands.add('waitForSpinnerToDisappear', (timeout = 10000) => {
    cy.get('body').then(($body) => {
        // Check if a spinner element exists on the page
        if ($body.find('.loading_spinner, .spinner, .loading, #loading').length > 0) {
            cy.get('.loading_spinner, .spinner, .loading, #loading', { timeout })
                .should('not.be.visible');
        }
    });
});
