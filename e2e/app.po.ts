import { browser, by, element } from 'protractor';

export class FirstAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('jigsaw-app h1')).getText();
  }
}
