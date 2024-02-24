const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// Make properties of window available in Node.js global scope
Object.keys(global.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = global.window[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};

// Ensure that `document` is defined globally
global.document = dom.window.document;

// Make the JSDOM instance available for tests if needed
global.jsdom = dom;