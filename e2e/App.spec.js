import { test, expect } from '@playwright/test';
const baseUrl = 'http://127.0.0.1:5173/singboard'

// 条件:初期状態
// 期待:設定コンポーネントだけが表示されているか
test('default', async ({page}) => {
  await page.goto(baseUrl);
  await expect( page.getByTestId('Setting')).toBeVisible()
  await expect( page.getByTestId('Singboard')).toBeHidden();
})

// 条件:実行中
// 期待:看板コンポーネントだけが表示されているか
test('executing', async ({page}) => {
  await page.goto(baseUrl);
  await page.getByRole('button', { name: '表示' }).click();
  
  await expect( page.getByTestId('Singboard')).toBeVisible()
  await expect( page.getByTestId('Setting')).toBeHidden();
})

// 条件:実行停止
// 期待:設定コンポーネントだけが表示されているか
test('stopExecution', async({page}) => {
  await page.goto(baseUrl);

  await page.getByRole('button', { name: '表示' }).click();
  await page.getByRole('button', { name: '✕ 停止' }).click();

  await expect( page.getByTestId('Setting')).toBeVisible()
  await expect( page.getByTestId('Singboard')).toBeHidden()
})


