import { Builder, Browser } from 'selenium-webdriver';
import { expect } from 'chai';
import MarketPage from './marketPage.mjs';
import fs from 'fs';
import path from 'path';

describe('Вариант 6 (проверка добавления товара в избранное)', function () {
    this.timeout(60000);
    let driver;
    let marketPage;

    before(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        marketPage = new MarketPage(driver);
    });

    after(async function () {
        await driver.quit();
    });

    it('should verify adding an item to favorites', async function () {
        try {
            console.log('Шаг 1: Переход по ссылке');
            await marketPage.open();

            console.log('Шаг 2: В меню "Каталог" выбрать категорию: Все для гейминга -> Xbox -> Игровые приставки');
            await marketPage.clickCatalogButton();
            await driver.sleep(2000);
            await marketPage.hoverGamingCategory();
            await driver.sleep(2000);
            await marketPage.clickConsolesCategory();
            await driver.sleep(2000);

            console.log('Шаг 3: Вывести в лог первые 5 найденных товаров');
            let items = await marketPage.getFirstFiveItems();
            items.forEach((item, index) => {
                console.log(`Товар ${index + 1}: ${item}`);
            });

            console.log('Шаг 4: Запомнить первую позицию из списка товаров');
            let firstItem = items[0];

            console.log('Шаг 5: У первого товара в списке нажать кнопку с белым сердечком (Добавить в избранное)');
            await marketPage.addItemToFavorites(0);
            await driver.sleep(2000);

            let favoriteButtonState = await marketPage.getFavoriteButtonState(0);
            expect(favoriteButtonState).to.include('selected'); // Замените 'selected' на класс, указывающий, что товар добавлен в избранное

            console.log('Проверка прошла успешно, товар добавлен в избранное.');
        } catch (err) {
            console.error('Тест упал по причине ошибки:', err);
            let screenshotPath = path.join(__dirname, `test-failure-${new Date().toISOString()}.png`);
            await driver.takeScreenshot().then((image) => {
                fs.writeFileSync(screenshotPath, image, 'base64');
            });
            throw err;
        }
    });
});
