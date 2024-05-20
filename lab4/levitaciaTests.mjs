import { Builder } from 'selenium-webdriver';
import { expect } from 'chai';
import { describe, it, after, before } from 'mocha';

import HomePage from './HomePage.mjs';
import ProductPage from './ProductPage.mjs';
import BasketPage from './BasketPage.mjs';
import SupportPage from './SupportPage.mjs';

describe('Levitacia Website Test', function () {
    this.timeout(120000);
    let driver;
    let homePage;
    let productPage;
    let basketPage;
    let supportPage;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        homePage = new HomePage(driver);
        productPage = new ProductPage(driver);
        basketPage = new BasketPage(driver);
        supportPage = new SupportPage(driver);
    });

    after(async () => {
        await driver.quit();
    });

    it('Добавление товара в корзину и подтвердить сообщение об успешном завершении', async () => {
        await homePage.open();
        await driver.sleep(3000);

        await homePage.clickOnProduct();
        await driver.sleep(3000);

        await productPage.addToBasket();
        await driver.sleep(3000);

        const successMessage = await productPage.getSuccessMessage();
        expect(successMessage).to.equal('Товар добавлен в корзину!');
        await driver.sleep(3000);
    });

    it('Перейти в корзину, удалить товар и убедиться, что общая цена равна нулю', async () => {
        await productPage.goToBasket();
        await driver.sleep(3000);

        await basketPage.deleteProduct();
        await driver.sleep(3000);

        const totalPrice = await basketPage.getTotalPrice();
        expect(totalPrice).to.equal('0 ₽');
        await driver.sleep(3000);
    });

    it('Далее продолжить покупки, добавить другой товар в корзину и перейти к оформлению заказа', async () => {
        await basketPage.continueShopping();
        await driver.sleep(3000);

        await homePage.clickOnProduct();
        await driver.sleep(3000);

        await productPage.addToBasket();
        await driver.sleep(3000);

        await productPage.goToBasket();
        await driver.sleep(3000);

        await basketPage.checkout();
        await driver.sleep(3000);
    });

    it('Далее открыть службу поддержки, ввести сообщение и отправить его', async () => {
        await supportPage.openSupport();
        await driver.sleep(3000);

        await supportPage.enterMessage('Мне нужна помощь');
        await driver.sleep(3000);

        await supportPage.sendMessage();
        await driver.sleep(3000);
    });
});
