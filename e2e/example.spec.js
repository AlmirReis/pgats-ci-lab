// @ts-check
import { test, expect } from '@playwright/test';

test.describe(`user rides`, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 90000 });
    await expect(page.getByRole('heading', { name: 'Robo Coasters' })).toBeVisible();


  });

  test('user should be able to ride', async ({ page }) => {
    await page.getByRole('link', { name: 'Choose Roba Swings' }).click();
    await page.getByLabel('Amount of people').selectOption('2');
    await page.getByRole('button', { name: 'Next' }).click();

    expect(page.url()).toContain(`#ride/swings`);
  });

  test('user above height should not be allowed', async ({ page }) => {
    await page
      .getByRole('link', { name: 'Choose Robo Coaster Of Doom' })
      .click();
    await page.getByLabel('Amount of people').selectOption('1');
    await page.getByLabel('Height for person').click();
    await page.getByLabel('Height for person').fill('139');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(
      page.getByText('Person 1 is too short for this ride'),
    ).toBeVisible();
  });

  test('user with minimum height should be allowed', async ({ page }) => {
    await page
      .getByRole('link', { name: 'Choose Robo Coaster Of Doom' })
      .click();
    await page.getByLabel('Amount of people').selectOption('1');
    await page.getByLabel('Height for person').click();
    await page.getByLabel('Height for person').fill('141');
    await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('1 person (>= 141 cm) for the')).toBeVisible();
  });
});
