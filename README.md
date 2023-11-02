# きっかけなど
ちょうどよいアプリがなかった  
なぜかストアにあるのはLED点字看板を再現したようなのばかりでシンプルなのが欲しかった｡  
スマホの落書きアプリを使う方法もあるが､文字が汚くて読めなかったりする  
訳あって今はアンドロイドスタジオを開けないからwebアプリで代用  
vitestにリベンジしたい  
1ヶ月ほどコードを一切書いていなかったのでこのままだとまずいと思いリハビリとして作りたかった


# 利点
webアプリだからダウンロードする手間がない  
↑  
今のところこれしか利点ない  

# 機能

# 工夫した点
一番大きい文字の場合､一番長い行を折り返さず表示できる一番大きい文字を計算で実装した

# 今後
アンドロイドスタジオで作り直してストアに出す  
-> pwaで出す?

# ぶっちゃけ
紙があるなら紙で良いし  
パソコンならパワーポイントなどのスライドを使えば十分  
-> むしろパワポの方が自由度が高い  

vitestをしてる時canvas周りでエラーが出たので､参考サイトの通りにしたらエラーは出なくなった｡しかし､本当にこれで良いのか不安｡ -> 後々大きなエラーを起こす時限爆弾ではないかと心配  
`vitest-canvas-mock`は不要で`npm i canvas` と`npm rebuild canvas --update-binary`を実行すればよかったのではと思う｡  
こんなことまでわざわざテストする必要があるのかと疑問があるが､テストの書き方とかを取得するのが目的  

# 参考サイト
[escape()とencodeURI()とencodeURIComponent()の違い](http://site.m-bsys.com/code/javascripr-encodeuri)  
[JavaScript で文字列を全角２，半角１でカウントする](https://mistymagich.wordpress.com/2022/02/18/javascript-%E3%81%A7%E6%96%87%E5%AD%97%E5%88%97%E3%82%92%E5%85%A8%E8%A7%92%EF%BC%92%EF%BC%8C%E5%8D%8A%E8%A7%92%EF%BC%91%E3%81%A7%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E3%81%99%E3%82%8B/)  
[【Javascript】テキストエリアの文字列のバイト数を数える](https://www.softel.co.jp/blogs/tech/archives/3318)  
[JavaScriptで半角を0.5、全角を1で文字数を計算する方法](https://zenn.dev/koojy/articles/javascript-2byte-length)  
[Sassなしで入れ子が可能に。CSSネストが全ブラウザ対応](https://zenn.dev/moneyforward/articles/css-nesting-without-sass)  
[javascript 全角文字は2文字で半角文字は1文字としてカウントする](https://mebee.info/2020/12/21/post-26346/)
[Javascript：文字数を全角/半角別にカウントしてはみ出し処理。](https://fuuno.net/web02/hankaku/hankaku.html)
[.getContext() が実装されていないため、単体テストでエラーが発生する](https://stackoverflow.com/questions/48828759/unit-test-raises-error-because-of-getcontext-is-not-implemented)
[Vitest キャンバスをモックする方法](https://www.the-koi.com/projects/vitest-how-to-mock-a-canvas/)
[HTMLCanvasElement: getContext() メソッド](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext)