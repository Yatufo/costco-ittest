const pages = require('./pages/Pages.js');
const _ = require('lodash');


const selectors = {
  SEARCH_BAR: "#js-site-search-input",
  SEARCH_BUTTON: "#searchBoxContainer > div > form > span > button",
  COMPARE_CHECK: "#list-view-id div.product-info-wrapper > div.product-compare-checkbox",
  COMPARE_HIDE_BUTTON: "div. product-compare-widget__toggle",
  COMPARE_BUTTON: "button.product-compare-widget__compare-btn",
  BAZAAR_COMPONENT: "div.bv_inline_rating"
}
describe('bazaar voice plugin', () => {

  it('Verifies that all the elements have the reviews in place in the compare page', () => {
    browser.get('/')

    // Searches for elements with reviews
    const searchBox = toElement(selectors.SEARCH_BAR);
    searchBox.sendKeys('cameras');

    waitAndClick(selectors.SEARCH_BUTTON);


    browser.executeScript('window.scrollTo(0,600);');

    // Click on the compare checks for all the elements with reviews.

    const compareChecks = element.all(by.css(selectors.COMPARE_CHECK));

    compareChecks.each(waitAndClick);

    expect(compareChecks.count()).toEqual(3);

    waitAndClick(selectors.COMPARE_BUTTON);

    // Verifies that all the elements have the reviews in place in the compare page.

    const bazaarComponents = element.all(by.css(selectors.BAZAAR_COMPONENT))

    bazaarComponents.each(waitFor);

    expect(bazaarComponents.count()).toEqual(3);

  });

});
