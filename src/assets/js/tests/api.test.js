import {newPalette, newApp} from "../api";

describe('Testing API functions', () => {

  test('Returns a response', () => {
    expect(newPalette()).toBeDefined();
  });  
}) 