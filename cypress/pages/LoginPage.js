class LoginPage {

    usernameField() {
        return cy.get('[data-test="username"]');
    }

    passwordField() {
        return cy.get('[data-test="password"]');
    }

    loginButton() {
        return cy.get('[data-test="login-button"]');
    }

    enterUsername(username) {
        this.usernameField().type(username);
    }

    enterPassword(password) {
        this.passwordField().type(password);
    }

    clickLogin() {
        this.loginButton().click();
    }

    login(username, password) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLogin();
    }
}

export default new LoginPage();