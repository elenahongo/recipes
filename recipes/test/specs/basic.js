const {assert} = require('chai');

describe('User visits root', () => {
    describe('without existing recipes', () => {
      it('page starts blank', () => {
        browser.url('/');
        const recipes = $('#recipes');
  assert.equal(recipes.getText(), '');
      });
    });
  });
  