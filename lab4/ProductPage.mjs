import { By, until } from 'selenium-webdriver';

class ProductPage {
    constructor(driver) {
        this.driver = driver;
        this.addToBasketButton = By.xpath('//*[@id="bx_117848907_1941_add_basket_link"]');
        this.successMessage = By.xpath('//*[@id="popup-window-titlebar-CatalogElementBasket_bx_117848907_1941"]/span');
        this.goToBasketButton = By.xpath('//*[@id="CatalogElementBasket_bx_117848907_1941"]/div[3]/span[1]');
    }

    async addToBasket() {
        await this.driver.findElement(this.addToBasketButton).click();
    }

    async getSuccessMessage() {
        const successMessageElement = await this.driver.wait(until.elementLocated(this.successMessage), 10000);
        return await successMessageElement.getText();
    }

    async goToBasket() {
        await this.driver.findElement(this.goToBasketButton).click();
    }
}

export default ProductPage;
