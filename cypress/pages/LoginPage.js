import BasePage from './BasePage';

class LoginPage extends BasePage {
    // --- Locators ---
    USERNAME_FIELD = '[data-test="username"]';
    PASSWORD_FIELD = '[data-test="password"]';
    LOGIN_BUTTON = '[data-test="login-button"]';

    /**
     * Returns the username input field element.
     * @returns {Cypress.Chainable} The username input element.
     */
    usernameField() {
        return cy.get(this.USERNAME_FIELD);
    }

    /**
     * Returns the password input field element.
     * @returns {Cypress.Chainable} The password input element.
     */
    passwordField() {
        return cy.get(this.PASSWORD_FIELD);
    }

    /**
     * Returns the login button element.
     * @returns {Cypress.Chainable} The login button element.
     */
    loginButton() {
        return cy.get(this.LOGIN_BUTTON);
    }

    /**
     * Types the given username into the username field.
     * @param {string} username - The username to enter.
     */
    enterUsername(username) {
        this.usernameField().type(username);
    }

    /**
     * Types the given password into the password field.
     * @param {string} password - The password to enter.
     */
    enterPassword(password) {
        this.passwordField().type(password);
    }

    /**
     * Clicks the login button.
     */
    clickLogin() {
        this.loginButton().click();
    }

    /**
     * Performs a complete login by entering credentials and clicking the login button.
     * @param {string} username - The username to enter.
     * @param {string} password - The password to enter.
     */
    login(username, password) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLogin();
    }
}

export default new LoginPage();
