import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getProseMirrorInstanceValue(): Promise<string> {
    return element(by.css('app-root .ProseMirror')).getText();
  }
}
