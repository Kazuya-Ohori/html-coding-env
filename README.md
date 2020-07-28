# HTML/CSS コーディングガイドライン

## 本コーディングガイドラインについて

* 本コーディングガイドラインは、複数人でコーディングを実行した場合であっても１人の人間が書いたかの
ようにスタイルが同一であることを目標とする。
* コーディングガイドライン内で、プロジェクトにそぐわないもの、また実行が難しいものに関しては
プロジェクト内で相談の上、共通のルールを明確に定義できればガイドラインに沿ってなくてもよい

## HTMLについて

原則、htmlを直接書かず、[pug](https://pugjs.org) を利用を推奨します。
なので、フォーマットについては[pug](https://pugjs.org)のドキュメントを参考にし、それに準拠するようにしてください。



##### ⚠️ pugを推奨するため以下のフォーマットについての章は割愛します ⚠️

<details>
  <summary>HTMLフォーマットについて</summary>

### 基本

* インデントは原則、タブ文字を使わず、**スペース2つ**を利用してください
* 可読性をあげるように適切な場所に改行を入れてください
* 改行を入れる場合は必ず１つのタグの最後（`>`のあと） に入れてください
* 行末にスペースを入れないなようにしてください（テキストエディタの表示文字の設定をしてください）

NG
```html
<!-- インデントは揃えてください -->
<header class="header">
<h1>タイトル</h1>
    <p>サブタイトル</p>
</header>

<!-- 適切な位置に改行を入れてください -->
<li><a href="#">リンク</a>
</li>
```

OK

```html
<header class="header">
  <h1>タイトル</h1>
  <p>サブタイトル</>
</header>

<li>
  <a href="#">リンク</a>
</li>

<!-- 長くなければ1行でもよいです -->
<li><a href="#">リンク</a></li>

```

### フォーマットについて

* タグ名、属性名は**常に小文字**を利用してください
* 1行に一つの要素を記述するようにしてください
* 入れ子になった要素ごとにインデントを一つ追加してください
* 属性値には**ダブルクォーテーション**を利用してください
* 自己閉じタグにはスラッシュを入れないようにしてください（`<img>`, `<br>`など）
* インラインスタイル、インラインスクリプト（onClick等）は原則記述しないでください。
  * ただし、background-imageなど動的に変更されるような部分は除く

フォーマット例

```html
<div class="tweet">
  <a href="path/to/somewhere">
    <img src="path/to/image.png" alt="">
  </a>
  <p>[tweet text]</p>
  <button disabled>Reply</button>
</div>
```

* 多くの属性を持つ場合は1属性につき1つの改行を入れ、可読性をあげるようにしてください

```html
<div
  class="tweet"
  id="user-icon"
  data-bind="tweet-action"
  data-action="action"
  >
  <button disabled>Reply</button>
</div>
```
</details>



### HTMLタグについて

#### HTML5 で廃止になったタグは利用しないでください

`<acronym>`
`<applet>`
`<basefont>`
`<big>`
`<center>`
`<dir>`
`<font>`
`<frame>`
`<frameset>`
`<isindex>`
`<noframes>`
`<s>`
`<strike>`
`<tt>`
`<u>`


#### SEOやクロールに強くするため、コード自体の可読性アップのため、セマンティックなHTMLとなるように心がけてください
その為、HTML5で追加されたタグを積極的に利用するようにしてください

`<article>`
`<aside>`
`<bdi>`
`<details>`
`<dialog>`
`<figcaption>`
`<figure>`
`<footer>`
`<header>`
`<main>`
`<mark>`
`<menuitem>`
`<meter>`
`<nav>`
`<progress>`
`<rp>`
`<rt>`
`<ruby>`
`<section>`
`<summary>`
`<time>`
`<wbr>`



NG

```html
<div class="footer">footer contents</div>
```

OK

```html
<footer class="footer">footer contents</footer>
```

#### `（スタイルシートを読み込むための）<link>`, `<style>`, `<script>`に関しては`type`属性は省略して構いません

NG

```html
<link rel="stylesheet" href="/css/master.css" type="text/css">
```

OK
```html
<link rel="stylesheet" href="/css/master.css">
```

## CSSについて

### 基本

* インデントは原則、タブ文字を使わず、**スペース2つ**を利用してください
* 可読性をあげるように`{}`やセミコロンの前後に適切なスペース、改行を入れてください
* プロパティが一つである場合は、1行で記述しても構いません
* 行末にスペースを入れないなようにしてください（テキストエディタの表示文字の設定をしてください）

NG

```css
/* 改行・スペースを揃える */
.tweet{ display: inline-block;
  font-size:12px; }
```

OK

```css
.tweet {
  display: inline-block;
  font-size: 12px;
}

/* プロパティが一つの場合、一行で書いても可 */
.reply { font-weight: bold; }
```

### フォーマットについて

推奨するフォーマットは以下の通りです

* セレクタがカンマで区切られる場合は1セレクタを1行とする
* ルールセット同士は1行あけること
* ルールセットないに不必要な空行を入れないこと
* スペースについては以下
  * セレクターの後、`{`の前にスペースを入れる
  * `{`（オープニングブレース)の後に改行をいれること
  * プロパティ名とセミコロンの間にはスペースを入れない
  * セミコロンの後にスペース入れる
  * `}`（クロージングブレース）の後に改行をいれる
* rgbaなどの値にカンマが入る場合はカンマの後にスペースを１ついれること

例

```css
html,
body {
  overflow: hidden;
}

.tweet {
  display: inline-block;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.5);
}

.reply {
  display: block;
  position: absolute;
}
```

### CSSのセレクタについて

* CSSのセレクタは**クラスセレクタ**を利用し、**idやHTMLタグは利用しないでください**。(ただし、リセット系のスタイルは除く）
* どうしてもidやHTMLタグを利用する場合はその旨をコメントで書いてください

NG

```css
header { /* HTMLタグは利用しないでください */
}

#header { /* セレクタにidは利用しないでください */
}
```

OK

```css
.header {
}

/* JavaScriptで利用するため必要 */
#header {
}
```

* `!important`はやむを得ない場合を除き、極力使わないでください

### id, クラス名の命名規則について

* id名, class名は基本的にはキャメルケースを使わず小文字のみ、ハイフン繋ぎにしてください。
* BEMを利用する場合は`__`を区切りとし、modifierの場合は`--`を接頭辞にしてください。
* `btn`, `kwd`など単語を省略する名称は、読み解き方が人それぞれ違う可能性あるので、出来る限り使わないでください。

NG

```css
.listItem { /* キャメルケースは利用しないでください */
}
.list_item { /* アンダースコアはBEMを表記するときのみ利用してください */
}

.list-item_button { /* BEM表記を区切る場合はアンダースコアを２つしてください */
}
.list-item__btn { /* 省略した単語はできるだけ使わないでください */
}
```

OK

```css
.list-item {
}

.list-item__button {
}

.list-item__button--active {
}
```

## CSSその他

### より良いCSSの書き方

#### Block要素がないElement要素は記述しないこと

NG

```html
<div class="list-block">
  <h2 class="list-block__text">title</h2>
  <div class="tab__item"></div>  <!-- bad -->
</div>
```

OK

```html
<div class="list-block tab">
  <h2 class="list-block__text">title</h2>
  <div class="tab__item"></div>  <!-- ok -->
</div>
```
### cssnextを利用する場合

#### @applyについて

@applyを利用する場合、原則@applyで元のスタイルを上書かないように最上部に記述してください。

NG

```css
.button {
  margin-top: 10px;
  @apply --some-theme;
}
```

OK
```css
.button {
  @apply --some-theme;
  margin-top: 10px;
}
```


#### メディアクエリについて
* 画面幅の数値は直接書かず、custom media queriesおよび、media queries rangesを利用して下さい
  * http://cssnext.io/features/#custom-media-queries
  * http://cssnext.io/features/#media-queries-ranges

* メディアクエリはグローバルに書かず、各セレクタ内で定義するようにしてください。

NG

```css
.pc {
  display: block;
}

@media (--mediaquery-smartphone) {
  .pc {
    display: none;
  }
}
```
OK

```css
.pc {
  display: block;
  @media (--mediaquery-smartphone) {
    display: none;
  }
}
```


