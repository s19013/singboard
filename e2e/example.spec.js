const { test, expect } = require('@playwright/test');

test('ラクスのサイトが表示されているか', async ({ page }) => {
    // Google検索エンジンを開く
    await page.goto('https://www.google.com/');
    // 検索欄に「株式会社ラクス」を入力
    await page.getByRole('combobox', { name: '検索' }).click();
    await page.getByRole('combobox', { name: '検索' }).fill('株式会社ラクス');
    // Enterを押す
    await page.getByRole('combobox', { name: '検索' }).press('Enter');
    // 検索結果から公式サイトをクリック
    await page.getByRole('link', { name: '企業の成長を支援するクラウドサービス | 株式会社ラクス ラクス https://www.rakus.co.jp' }).click();
    // テスト：公式サイトが表示されているか
    await expect(page).toHaveURL("https://www.rakus.co.jp/");
})

test('別タブでラクスのサイトが表示されているか', async ({ browser }) => {
    // 最初のタブを開く
    const page = await browser.newPage()
    // 別タブを開く
    const newPage = await browser.newPage();
    // 別タブでGoogle検索エンジンを開く
    await newPage.goto("https://www.google.com");
    // 検索欄に「株式会社ラクス」を入力
    await newPage.getByRole('combobox', { name: '検索' }).click();
    await newPage.getByRole('combobox', { name: '検索' }).fill('株式会社ラクス');
    // 検索ボタンを押す
    await newPage.getByRole('combobox', { name: '検索' }).press('Enter');
    // 検索結果から公式サイトをクリック
    await newPage.getByRole('link', { name: '企業の成長を支援するクラウドサービス | 株式会社ラクス ラクス https://www.rakus.co.jp' }).click();
    // テスト：公式サイトが表示されているか
    await expect(newPage).toHaveURL("https://www.rakus.co.jp/");
  })

  test('別タブで楽楽精算のページが開かれているか', async ({ page }) => {
    // 最初のタブでラクスの公式サイトを開く
    await page.goto('https://www.rakus.co.jp/');
    // ヘッダーのリンクをホバーする
    await page.locator('.p-header__menu__item').getByText("事業内容").hover();
    // 新しいページを開くイベントを待つ
    const newPagePromise = page.waitForEvent('popup');
    // 楽楽精算のリンクをクリックする(新しいページを開くイベント)
    await page.getByRole('link', { name: '楽楽精算', exact: true }).click();
    // イベントを解決する
    const rakurakuseisanPage = await newPagePromise;
    
    // テスト：新しいページのURLが楽楽精算のページと一致するか
    await expect(rakurakuseisanPage).toHaveURL(/^https:\/\/www\.rakurakuseisan\.jp\/.*$/);
  })

  test('「Playwright」と検索されているか', async ({ page }) => {
    // Google検索エンジンを開く
    await page.goto('https://www.google.com/');
    // 検索欄に「Playwright」を入力
    await page.getByRole('combobox', { name: '検索' }).click();
    await page.getByRole('combobox', { name: '検索' }).fill('Playwright');

    // リクエスト・レスポンスを取得
    const [request, response] = await Promise.all([
      page.waitForRequest(request => request.url().includes('search?q=Playwright')),
      page.waitForResponse(response => response.url().includes('search?q=Playwright')),
      // 検索を実行
      page.getByRole('combobox', { name: '検索' }).press('Enter')
    ])

    // リクエストのParamに「Playwright」が含まれているか
    expect(request.url()).toContain('search?q=Playwright');
    // レスポンスのステータスが200かどうか
    expect(response.status()).toBe(200);
})

test("ラクスのページをモックする", async ({page}) => {
    // モックするためのルートハンドラを作成
    const rakusRouteHandler = (route, request) => {
      const url = request.url();
      if (url.includes("about")) {
        // レスポンスの内容
        route.fulfill({
          status: 404,
        });
      } else {
        // about以外は通常のレスポンスを返す
        route.continue();
      }
    };
  
    // ラクスのトップページを開く
   await page.goto('https://www.rakus.co.jp/');
    // トップページ以下のリクエストをモックする
    await page.route('https://www.rakus.co.jp/**', rakusRouteHandler);
    // 「ラクスの思い」をクリック
    await page.locator('.p-header__menu__item').getByText("ラクスの思い").first().click();
  
    // テスト:404ページが表示されていること
    await expect(page.locator('h1')).toHaveText("この www.rakus.co.jp ページが見つかりません")
    await page.screenshot({ path: 'playwright-report/sampleimage.jpg', fullPage: false });
  }) 