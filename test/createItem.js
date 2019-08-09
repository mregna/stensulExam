const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');
const assert = require('assert');
const driver = new Builder().forBrowser('chrome').build();

describe("Suite test Stensul", function () {

    this.timeout(300000);

    before(async () => {
        let url = "http://immense-hollows-74271.herokuapp.com/";
        await driver.get(url);
        await driver.manage().window().maximize();
        await driver.sleep(1000);
    });

    after(() => {
        driver.quit();
    });

    it("Create new item", async () => {

        let file = path.resolve('./resource/image.png');
        let description = "New item for Stensul exam";
        try {
            let input = await driver.findElement(By.css('#inputImage'));
            await input.sendKeys(file);
            let textArea = await driver.findElement(By.css('.form-group:nth-child(3) textarea'));
            await textArea.sendKeys(description);
            let btnCreate = await driver.findElement(By.css('form .btn'));
            await btnCreate.click();
            await driver.sleep(500);
            let assertText = await driver.findElement(By.css('#content ul li:last-of-type p')).getText();
            await assert.equal(assertText, description);
        }
        catch (e) {
            console.error("test has failed:", e);
        }
    });

    it("Edit new item", async () => {

        let descEdit = "Edit - New item for Stensul exam";
        try {
            let editItem = await driver.findElement(By.css('#content ul li:last-of-type button:nth-child(1)'));
            await editItem.click();
            let textArea = await driver.findElement(By.css('.form-group:nth-child(3) textarea'));
            await textArea.clear();
            await textArea.sendKeys(descEdit);
            let btnEdit = await driver.findElement(By.css('form .btn:nth-child(2)'));
            await btnEdit.click();
            await driver.sleep(500);
            let assertNewText = await driver.findElement(By.css('#content ul li:last-of-type p')).getText();
            await assert.equal(assertNewText, descEdit);

        }
        catch (e) {
            console.error("test has failed:", e);
        }
    });

    it("Delete new item", async () => {

        let descEdit = "Edit - New item for Stensul exam";
        try {
            let deleteItem = await driver.findElement(By.css('#content ul li:last-of-type button:nth-child(2)'));
            await deleteItem.click();
            let confirmDelete = await driver.findElement(By.css('.modal .btn-primary'));
            await confirmDelete.click();
            await driver.sleep(500);
            let assertNewText = await driver.findElement(By.css('#content ul li:last-of-type p')).getText();
            await assert.notEqual(assertNewText, descEdit);
        }
        catch (e) {
            console.error("test has failed:", e);
        }
    });

    it("Check max long in description", async () => {

        let file = path.resolve('./resource/image.png');
        let description = "Text with more 300 characters Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.";
        try {
            let input = await driver.findElement(By.css('#inputImage'));
            await input.sendKeys(file);
            let textArea = await driver.findElement(By.css('.form-group:nth-child(3) textarea'));
            await textArea.sendKeys(description);
            await driver.findElement(By.css('form button[disabled="Disabled"]'));
            await textArea.clear();
            await input.clear();
        }
        catch (e) {
            console.error("test has failed:", e);
        }
    });

    it("Check if exist in the list the item with text 'Creators: Matt Duffer, Ross Duffer'", async () => {

        let searchingText = "Creators: Matt Duffer, Ross Duffer";
        try {
            let textFind = await driver.findElement(By.xpath("//*[contains(text(), '" + searchingText + "')]")).getText();
            await assert.equal(textFind, searchingText);
        }
        catch (e) {
            console.error("test has failed:", e);
        }
    });


});