import { By } from 'selenium-webdriver';

class HomePage {
    constructor(driver) {
        this.driver = driver;
        this.productLink = By.xpath('//*[@id="bx_3966226736_1941_7e1b8e3524755c391129a9d7e6f2d206"]/a');
    }

    async open() {
        await this.driver.get('https://levitacia.co/');
    }

    async clickOnProduct() {
        await this.driver.findElement(this.productLink).click();
    }
}

export default HomePage;
