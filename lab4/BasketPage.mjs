import { By } from 'selenium-webdriver';

class BasketPage {
    constructor(driver) {
        this.driver = driver;
        this.deleteButton = By.xpath('//*[@id="Layer_1"]');
        this.totalPrice = By.xpath('//*[@id="basket-items-list-wrapper"]/div[2]/div[1]/div');
        this.continueShoppingButton = By.xpath('//*[@id="basket-items-list-wrapper"]/div[3]/a[1]');
        this.checkoutButton = By.xpath('//*[@id="basket-items-list-wrapper"]/div[3]/a[2]');
    }

    async deleteProduct() {
        await this.driver.findElement(this.deleteButton).click();
    }

    async getTotalPrice() {
        const totalPriceElement = await this.driver.findElement(this.totalPrice);
        return await totalPriceElement.getText();
    }

    async continueShopping() {
        await this.driver.findElement(this.continueShoppingButton).click();
    }

    async checkout() {
        await this.driver.findElement(this.checkoutButton).click();
    }
}

export default BasketPage;
