import { By } from 'selenium-webdriver';

class TodoPage {
    constructor(driver) {
        this.driver = driver;
        this.url = "https://lambdatest.github.io/sample-todo-app/";
        this.remainingSpan = By.xpath("//span[@class='ng-binding']");
        this.inputField = By.id("sampletodotext");
        this.addButton = By.id("addbutton");
    }

    async open() {
        await this.driver.get(this.url);
        await this.driver.manage().window().maximize();
    }

    async getRemainingText() {
        let element = await this.driver.findElement(this.remainingSpan);
        return await element.getText();
    }

    async clickItem(index) {
        let checkbox = await this.driver.findElement(By.name("li" + index));
        await checkbox.click();
    }

    async getItemClass(index) {
        let item = await this.driver.findElement(By.xpath(`//input[@name='li${index}']/following-sibling::span`));
        return await item.getAttribute("class");
    }

    async addItem(text) {
        let inputField = await this.driver.findElement(this.inputField);
        await inputField.sendKeys(text);
        let addButton = await this.driver.findElement(this.addButton);
        await addButton.click();
    }

    async getItemText(index) {
        let item = await this.driver.findElement(By.xpath(`//input[@name='li${index}']/following-sibling::span`));
        return await item.getText();
    }
}

export default TodoPage;
