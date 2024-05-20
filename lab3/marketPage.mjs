import { By, until } from 'selenium-webdriver';

class MarketPage {
    constructor(driver) {
        this.driver = driver;
        this.url = "https://market.yandex.ru/";
        this.catalogButton = By.xpath('/html/body/div[1]/div/div[2]/div[2]/div/header/div[1]/div/div/noindex[1]/div/div/button');
        this.gamingCategory = By.xpath('/html/body/div[7]/div/div/div/div/div/div/div[1]/div/ul/li[22]/a');
        this.consolesCategory = By.xpath('/html/body/div[7]/div/div/div/div/div/div/div[2]/div/div/div/div[1]/div/div/div/div/div/div/div/div[2]/div[3]/ul/li[1]/div/a');
        this.itemSpan = By.css('span._2za17._2POp2._1P5ct');
    }

    async open() {
        await this.driver.get(this.url);
    }

    async clickCatalogButton() {
        await this.driver.wait(until.elementLocated(this.catalogButton), 10000);
        await this.driver.findElement(this.catalogButton).click();
    }

    async hoverGamingCategory() {
        await this.driver.wait(until.elementLocated(this.gamingCategory), 10000);
        const actions = this.driver.actions({ bridge: true });
        const gamingCategoryElement = await this.driver.findElement(this.gamingCategory);
        await actions.move({ origin: gamingCategoryElement }).perform();
    }

    async clickConsolesCategory() {
        await this.driver.wait(until.elementLocated(this.consolesCategory), 10000);
        await this.driver.findElement(this.consolesCategory).click();
    }

    async getFirstFiveItems() {
        await this.driver.wait(until.elementsLocated(this.itemSpan), 10000);
        let items = await this.driver.findElements(this.itemSpan);
        let itemTexts = [];
        for (let i = 0; i < 5 && i < items.length; i++) {
            let text = await items[i].getText();
            itemTexts.push(text);
        }
        return itemTexts;
    }

    async addItemToFavorites(itemIndex) {
        let items = await this.driver.findElements(By.css('[data-apiary-widget-name="@marketfront/SerpEntity"]'));
        let favoriteButton = await items[itemIndex].findElement(By.css('.favorite-button-class')); // Замените '.favorite-button-class' на правильный CSS-селектор
        await favoriteButton.click();
    }

    async getFavoriteButtonState(itemIndex) {
        let items = await this.driver.findElements(By.css('[data-apiary-widget-name="@marketfront/SerpEntity"]'));
        let favoriteButton = await items[itemIndex].findElement(By.css('.favorite-button-class')); // Замените '.favorite-button-class' на правильный CSS-селектор
        return await favoriteButton.getAttribute('class');
    }
}

export default MarketPage;
