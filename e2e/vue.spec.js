import { test, expect } from '@playwright/test';

test('in a general way', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/singboard');
  await page.locator('textarea[name="body"]').click();
  await page.locator('textarea[name="body"]').fill('playwrightTest');
  await page.locator('div').filter({ hasText: /^文字の大きさ特大大中小極小$/ }).getByRole('combobox').selectOption('larger');

  // 再現されていないみたい｡
  await page.getByTestId('fontColorPicker').locator('canvas').nth(1).click({
    position: {
      x: 12,
      y: 54
    }
  });
  await page.getByTestId('fontColorPicker').locator('canvas').first().click({
    position: {
      x: 150,
      y: 95
    }
  });


  await page.getByTestId('backgroundColorPicker').locator('canvas').nth(1).click({
    position: {
      x: 9,
      y: 52
    }
  });
  await page.getByTestId('backgroundColorPicker').locator('canvas').first().click({
    position: {
      x: 28,
      y: 26
    }
  });

  // 実行前
  await page.screenshot({ path: 'before_execuing.jpg', fullPage: false });

  // 実行中
  await page.getByRole('button', { name: '表示' }).click();
  await page.screenshot({ path: 'execuing.jpg', fullPage: false });

  await expect(page.getByText('playwrightTest', { exact: true })).toBeVisible();

  // 実行後
  await page.getByRole('button', { name: '✕ 停止' }).click();
  await page.screenshot({ path: 'after_execution.jpg', fullPage: false });
});