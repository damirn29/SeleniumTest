import { By } from 'selenium-webdriver';

class TimetablePage {
    constructor(driver) {
        this.driver = driver;
        this.scheduleLink = By.xpath('//*[@id="bx_3777608605_2811"]/div[3]/div/div[1]/a');
        this.searchField = By.xpath('/html/body/div/div[1]/div[1]/div[3]/input[1]');
        this.scheduleWeek = By.className('schedule-week');
    }

    async clickScheduleLink() {
        await this.driver.findElement(this.scheduleLink).click();
    }

    async enterGroupNumber(groupNumber) {
        await this.driver.findElement(this.searchField).sendKeys(groupNumber);
    }

    async clickGroupDiv(groupNumber) {
        const groupDiv = By.xpath(`//*[@id="${groupNumber}"]`);
        await this.driver.findElement(groupDiv).click();
    }

    async isTodayHighlighted() {
        const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const today = new Date().getDay();
        const todayName = daysOfWeek[today];

        const weekElement = await this.driver.findElement(this.scheduleWeek);
        const dayElements = await weekElement.findElements(By.className('schedule-day'));

        for (let dayElement of dayElements) {
            const titleElement = await dayElement.findElement(By.className('schedule-day__title'));
            const dayName = await titleElement.getText();
            const className = await dayElement.getAttribute('class');

            if (dayName.includes(todayName) && className.includes('schedule-day_today')) {
                const style = await dayElement.getCssValue('background-color');
                if (style === 'rgba(226, 255, 217, 1)') {
                    return true;
                }
            }
        }
        return false;
    }
}

export default TimetablePage;
