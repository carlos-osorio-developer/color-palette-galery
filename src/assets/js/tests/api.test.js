import { newPalette, userAPI } from '../backend/api';

describe('Testing API functions', () => {
  test('Returns a response', () => {
    expect(newPalette()).toBeDefined();
  });

  test('userAPI returns a response', () => {
    expect(userAPI.getLikes()).toBeDefined();
  });
});