import { Builder, Browser } from 'selenium-webdriver';
import { expect } from 'chai';
import MainPage from './mainPage.mjs';
import TimetablePage from './timetablePage.mjs';

describe('Timetable Tests', function () {
    this.timeout(30000);
    let driver;
    let mainPage;
    let timetablePage;

    before(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        mainPage = new MainPage(driver);
        timetablePage = new TimetablePage(driver);
    });

    after(async function () {
        await driver.quit();
    });

    it('should navigate to timetable page and verify today is highlighted', async function () {
        // Шаг 1: Перейти по ссылке
        await mainPage.open();

        // Шаг 2: Нажать на кнопку Расписания
        await mainPage.clickTimetableButton();
        await driver.sleep(1000);

        // Шаг 3: В разделе “Расписания занятий” нажать “Смотрите на сайте”
        await timetablePage.clickScheduleLink();
        await driver.sleep(1000);

        // Переключение на новую вкладку
        let handles = await driver.getAllWindowHandles();
        await driver.switchTo().window(handles[1]);

        // Шаг 4: Ввести номер группы в поле поиска
        let groupNumber = '221-322';
        await timetablePage.enterGroupNumber(groupNumber);
        await driver.sleep(1000);

        // Шаг 5: Нажать на найденную группу в результатах поиска
        await timetablePage.clickGroupDiv(groupNumber);
        await driver.sleep(1000);

        // Проверить, что текущий день недели выделен цветом
        let isTodayHighlighted = await timetablePage.isTodayHighlighted();
        expect(isTodayHighlighted).to.be.true;
    });
});
