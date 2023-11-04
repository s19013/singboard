import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/singboard');
  await page.locator('textarea[name="body"]').click();
  await page.locator('textarea[name="body"]').fill('playwrightTest');
  await page.locator('div').filter({ hasText: /^文字の大きさ特大大中小極小$/ }).getByRole('combobox').selectOption('larger');

  // 再現されていないみたい｡
  await page.locator('div').filter({ hasText: /^文字の色HEXRGBA$/ }).locator('canvas').first().click({
    button: 'left',
    position: {
      x: 147,
      y: 74
    }
  });
  await page.locator('div').filter({ hasText: /^背景の色HEXRGBA$/ }).locator('canvas').first().click({
    button: 'left',
    position: {
      x: 65,
      y: 9
    }
  });

  // 実行前
  await page.screenshot({ path: 'before_execuing.jpg', fullPage: false });

  // 実行中
  await page.getByRole('button', { name: '表示' }).click();
  await page.screenshot({ path: 'execuing.jpg', fullPage: false });
  await expect(page.getByText('playwrightTest')).toBeVisible();

  // 実行後
  await page.getByRole('button', { name: '✕ 停止' }).click();
  await page.screenshot({ path: 'after_execution.jpg', fullPage: false });
});