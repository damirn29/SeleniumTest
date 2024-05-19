import { By } from 'selenium-webdriver';

class MainPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://mospolytech.ru/';
        this.timetableButton = By.xpath('/html/body/header/nav/div[1]/div[2]/div[1]/div/ul/li[3]/a');
    }

    async open() {
        await this.driver.get(this.url);
    }

    async clickTimetableButton() {
        await this.driver.findElement(this.timetableButton).click();
    }
}

export default MainPage;
