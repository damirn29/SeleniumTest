import { By } from 'selenium-webdriver';

class SupportPage {
    constructor(driver) {
        this.driver = driver;
        this.supportButton = By.xpath('//*[@id="jvlabelWrap"]/jdiv[1]');
        this.supportInput = By.xpath('//*[@id="jcont"]/jdiv[3]/jdiv[3]/jdiv/jdiv[1]/jdiv/jdiv[1]/textarea');
        this.sendButton = By.xpath('//*[@id="jcont"]/jdiv[3]/jdiv[3]/jdiv/jdiv[1]/jdiv/jdiv[2]/jdiv');
    }

    async openSupport() {
        await this.driver.findElement(this.supportButton).click();
    }

    async enterMessage(message) {
        await this.driver.findElement(this.supportInput).sendKeys(message);
    }

    async sendMessage() {
        await this.driver.findElement(this.sendButton).click();
    }
}

export default SupportPage;
