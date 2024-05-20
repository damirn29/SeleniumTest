import { By } from 'selenium-webdriver';

class MainPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://market.yandex.ru';
        this.timetableButton = By.xpath('/html/body/div[1]/div/div[2]/div[2]/div/header/div[1]/div/div/noindex[1]/div');
    }

    async open() {
        await this.driver.get(this.url);
    }

    async clickTimetableButton() {
        await this.driver.findElement(this.timetableButton).click();
    }
}

export default MainPage;
