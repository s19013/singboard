# 機能
#### 文字色
カラーパレットで選べるように  
#を使った16進数で  
`vue-color``vue-color-kit`ってやつを使えばできる?  
`vue-color-kit`の方が新しいではあるが

なにかおしたらカラーピッカーが開くようにしたい

#### 大きさ 
##### 定形
* 特大
* 大
* 中
* 小
の4段階で十分  

定形は画面の横幅から計算して割り振るか?  
激しく動かさないからそれで大丈夫かと思う  

##### カスタム
後から実装  
ユーザーが任意の値を指定できる  
単位はpx固定

#### 背景色
カラーパレットで選べるように
##### グラデーション
後から実装  
２色グラデーションと3色グラデーション  
グラデーションの方向


##### 写真投稿
優先度:低  
背景をユーザーが持っている画像にする  
しかし､文字が見えにくくなるかもなので文字背景を追加する必要があるかも

##### 寄せ
* 左寄せ
* 右寄せ
* 中央寄せ


#### 全画面表示
全画面終了ボタンをどこにおくか?  
4隅のどこかだよな  
ダブルクリックとかでも良いかもだけど､ユーザーに伝わりにくいかな?  
一度クリックしたら｢ダブルクリックで閉じます｣って表示させればよいかな?  
でもやはり閉じるボタンのほうがわかりやすいだろう

※全画面にするかどうかも任意で良いかな

#### 装飾
後から実装  
よくあるフレームとか  
-> フリー素材サイトから適当に持ってくれば十分でしょ

#### フォント
後から実装  
適当にgoogle fontsとかから引っ張ってくればok  
まあ､多すぎても選びきれなくて困るだろうし最大でも大きく違うやつ5つくらいかな｡

## 実行ボタンは大きく目立つように


# 使用用途 
イラスタやで解説  
案内 一組 会場はこちら  
看板 テーブルの上にちょこんと  
筆談にどうぞ 

パワポで良くない問題はある  
紙で良くない問題もある  
-> ぶっちゃけ紙が無い時に一時的にちょっとだけ使うのが目的  

# 作る順番
* フリー
* 文字の大きさ(定形)
* 文字色(単色)
* 背景色(単色)
* 全画面で実際に表示
---

---
スマホアプリ化もする  

フリーのパターンと  
３行に分けれるようにして｡  
行ごとに色や大きさ変えられるようにする  
色々面倒なので3行固定  

最初はフリーだけ  
カスタム系はあとから  

vitestとかplayなんとかをやってみたい気持ちもある  
uiフレームはvitestとかに影響を与えないか?  
↓の記事を見る限り多少は影響を与えそう  
https://v2.vuetifyjs.com/ja/getting-started/unit-testing  
というわけで最初はuiフレームワークを入れずに作ってみる  
そして､テストを一通り作れたらuiフレームワークを入れて必要に応じて編集する  
vuetify3はまだまだ開発途中らしいので`Quasar`を使ってみる  


こんな小さいアプリなのにいちいち細かくコンポーネント化する必要はあるのだろうか?

* カラーパレット
* ラジオボタン

--- 
そうえば､改行でpを分けたいな  

スマホだとラジオボタンを縦に並べる  
-> そもそもプルダウンでよくない?  
-> スマホとかだと特にプルダウンの方が好ましい?  