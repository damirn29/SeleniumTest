import { Builder, Browser } from 'selenium-webdriver';
import { expect } from 'chai';
import TodoPage from './todoPage.mjs';

describe('Todo App Tests', function () {
    this.timeout(30000);
    let driver;
    let todoPage;
    const total = 5;
    let remaining = 5;

    before(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        todoPage = new TodoPage(driver);
    });

    after(async function () {
        await driver.quit();
    });

    it('should navigate to todo app and verify items', async function () {
        await todoPage.open();
        await driver.sleep(1000);

        for (let i = 1; i <= total; i++) {
            let text = await todoPage.getRemainingText();
            let expectedText = `${remaining} of ${total} remaining`;
            expect(text).to.equal(expectedText);

            let itemClass = await todoPage.getItemClass(i);
            expect(itemClass).to.equal("done-false");

            await todoPage.clickItem(i);
            remaining--;
            await driver.sleep(1000);

            itemClass = await todoPage.getItemClass(i);
            expect(itemClass).to.equal("done-true");
        }

        await todoPage.addItem("New Item");
        await driver.sleep(1000);

        let itemText = await todoPage.getItemText(6);
        let itemClass = await todoPage.getItemClass(6);
        expect(itemText).to.equal("New Item");
        expect(itemClass).to.equal("done-false");

        await todoPage.clickItem(6);
        await driver.sleep(1000);
        itemClass = await todoPage.getItemClass(6);
        expect(itemClass).to.equal("done-true");

        await driver.sleep(3000);
    });
});
