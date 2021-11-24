# 演習 1

---

## はじめに

---

ある穏やかな日のこと、社内でも指折りの敏腕フロントエンジニアであるあなたは、今日のランチに何を食べようかと思いを巡らせていました。

---

そこへボスから突然リモートミーティングの Call が。コイツがいきなり Call してきて良い話をしたためしがありません。

あなたは居留守を使いたい気持ちを懸命にこらえつつ、ボスとのミーティングを開始しました。

---

**ボス: 「なんかさー、最近の JavaScript 機能がどれくらい利用されてるかについて、レポート書いてくれって言われちゃったんだよー」**

---

**ボス: 「調査データは何とかなりそうなんだけど、レポートに貼り付けるグラフを作らなきゃいけなくって。そういうの得意でしょ？チャチャっとやっちゃってくんない？」**

---

**ボス: 「細かい要件は後でチャットするから。大丈夫大丈夫、俺が集計用のスクリプトほとんど書いておいたから、あと残りちょっと書き足すだけだし！」**

---

こういう場合に限って、「残りちょっと」であったことは無いのですが、ボスに歯向かっても仕方ありませんね。

---

**ボス: 「あ、言い忘れてた。30 分で終わらせてね。すぐ使いたいから」**

---

それだけ言うと、一方的にボスは通話を切ってしまいました。

---

無茶振りもいいところですが、幸いにも別の案件で利用した TypeScript 製のグラフライブラリが利用できそうです。

これを使って、このタスクをとっとと終わらせて美味しいランチに向かうことにしましょう。

---

さぁ今すぐに JSON に色をつける仕事に取り掛かるんだ！

---

## やりたいこと

ボスがミーティング中に表示していた「こんなのが欲しいんだよねー」という雑イメージです。

---

<img src="https://raw.githubusercontent.com/Quramy/state-of-ts-example/main/question1_image.png" />

---

## 進め方

演習は TypeScript Playground 上で実施してください。

---

この演習は以下の 3 ステップから構成されています。

- Step 1: ボスの書きかけ集計スクリプトを TypeScript 化する
- Step 2: 与えられたグラフライブラリを使って、集計結果をグラフ化できるようにする
- Step 3: 非同期通信で調査データを取得する

1 ~ 3 まですべてを完了すると、ボスに提出するグラフが手に入ります。

---

## Step 1

まずは[ボスの書きかけた集計スクリプト](https://tsplay.dev/Nn6QaN)を完成させてください。

コンソールに下記が出力されるよう、コードを修正しましょう。

```json
["Proxies", "Custom Elements"]
```

---

**注意! ボスの書いたスクリプトはどうやらエラーがあるようで、実行してもちゃんと動きません！**

こういうときこそ「急がば回れ」です。まずはこのコードを TypeScript 化して型をつけて、エラーがこれ以上発生しないようにしましょう。

---

```js
const exampleDataSet = [
  {
    id: "custom_elements",
    name: "Custom Elements",
    experience: {
      latestYearData: {
        total: 23765,
        completion: {
          count: 21952,
          percentage: 92.4
        },
        buckets: [
          {
            type: "used",
            count: 7342,
            percentage: 33.4
          },
          {
            type: "heard",
            count: 7728,
            percentage: 35.2
          },
          {
            type: "never_heard",
            count: 6882,
            percentage: 31.4
          }
        ]
      }
    }
  },
  {
    id: "proxies",
    name: "Proxies",
    experience: {
      latestYearData: {
        total: 23765,
        completion: {
          count: 22279,
          percentage: 93.7
        },
        buckets: [
          {
            type: "used",
            count: 4974,
            percentage: 22.3
          },
          {
            type: "heard",
            count: 8701,
            percentage: 39.1
          },
          {
            type: "never_heard",
            count: 8604,
            percentage: 38.6
          }
        ]
      }
    }
  },
  {
    id: "fetch",
    name: "Fetch",
    experience: {
      latestYearData: {
        total: 23765,
        completion: {
          count: 21957,
          percentage: 92.4
        },
        buckets: [
          {
            type: "used",
            count: 19121,
            percentage: 87.1
          },
          {
            type: "heard",
            count: 1853,
            percentage: 8.4
          },
          {
            type: "never_heard",
            count: 983,
            percentage: 4.5
          }
        ]
      }
    }
  }
]; // 後で本物のデータに差し替える

function filterDataset(dataSet) {
  // bucketsの要素は、その技術要素を「使ったことがある, 使ったことは無いが何かは知っている, 何のことか知らない」と回答した人の人数と割合を表している
  // ここでは「何のことかしらない」と回答した人の比率が15% 以上のデータに絞り込む
  const filtered = dataSet.filter(data => {
    return data.experience.latestYearData.bucket[2].percentage >= 15;
  });

  // TODO 後でソートする
  // ソート条件は、「何のことか知らない」の割合が大きい順で！
  return filtered;
}

function fetchData() {
  // TODO 後で調査データを fetch API で取得するように書き換える！！
  return exampleDataSet;
}

function main() {
  const dataSet = fetchData();

  console.log(filterDataset(dataSet).map(item => item.name));
}

main();
```

<Playground>
const exampleDataSet = [
  {
    id: "custom_elements",
    name: "Custom Elements",
    experience: {
      latestYearData: {
        total: 23765,
        completion: {
          count: 21952,
          percentage: 92.4
        },
        buckets: [
          {
            type: "used",
            count: 7342,
            percentage: 33.4
          },
          {
            type: "heard",
            count: 7728,
            percentage: 35.2
          },
          {
            type: "never_heard",
            count: 6882,
            percentage: 31.4
          }
        ]
      }
    }
  },
  {
    id: "proxies",
    name: "Proxies",
    experience: {
      latestYearData: {
        total: 23765,
        completion: {
          count: 22279,
          percentage: 93.7
        },
        buckets: [
          {
            type: "used",
            count: 4974,
            percentage: 22.3
          },
          {
            type: "heard",
            count: 8701,
            percentage: 39.1
          },
          {
            type: "never_heard",
            count: 8604,
            percentage: 38.6
          }
        ]
      }
    }
  },
  {
    id: "fetch",
    name: "Fetch",
    experience: {
      latestYearData: {
        total: 23765,
        completion: {
          count: 21957,
          percentage: 92.4
        },
        buckets: [
          {
            type: "used",
            count: 19121,
            percentage: 87.1
          },
          {
            type: "heard",
            count: 1853,
            percentage: 8.4
          },
          {
            type: "never_heard",
            count: 983,
            percentage: 4.5
          }
        ]
      }
    }
  }
]; // 後で本物のデータに差し替える

function filterDataset(dataSet) {
// buckets の要素は、その技術要素を「使ったことがある, 使ったことは無いが何かは知っている, 何のことか知らない」と回答した人の人数と割合を表している
// ここでは「何のことかしらない」と回答した人の比率が 15% 以上のデータに絞り込む
const filtered = dataSet.filter(data => {
return data.experience.latestYearData.bucket[2].percentage >= 15;
});

// TODO 後でソートする
// ソート条件は、「何のことか知らない」の割合が大きい順で！
return filtered;
}

function fetchData() {
// TODO 後で調査データを fetch API で取得するように書き換える！！
return exampleDataSet;
}

function main() {
const dataSet = fetchData();

console.log(filterDataset(dataSet).map(item => item.name));
}

main();
</Playground>

---

## Step 2

集計したデータを、グラフライブラリで描画できるようにしましょう。

---

- 実際のライブラリの代わりに、以降のコードを書き足してください
- `renderBarGraph` 関数の中身を気にする必要はありません。**型定義だけを読みましょう**
- `(dataSet: DataItem[]) => GraphItem[]` となるような関数 `mapToGraphItem` を作成してください
- グラフの色には CSS で利用可能な文字列（e.g. `red`, `#ee0000` ）を代入できます。好きな色を指定してください

---

```ts
/**
 *
 * 棒グラフ1つ分の情報を格納します
 *
 */
type GraphItem = {
  id: string;
  label: string;
  counts: {
    color: string;
    count: number;
  }[];
};

/**
 *
 * 与えられたデータを元に割合を棒グラフとして描画します。
 *
 * @param data: @see GraphItem 型の配列。この配列の要素の個数分の棒グラフを描画します。
 *
 **/
function renderBarGraph(data: GraphItem[]) {
  const renderItems = data.map(d => {
    const allCounts = d.counts.reduce((s, r) => s + r.count, 0);
    if (allCounts === 0) throw new Error(`invalid data: ${d.label}`);
    return {
      ...d,
      rates: d.counts.map(r => ({ ...r, rate: r.count / allCounts }))
    };
  });
  const groups = renderItems
    .map((item, i) => {
      const rects = item.rates.reduce(
        ([svg, w], { rate, color }) =>
          [
            `${svg}<rect x="${w}" y="${i * 40}" height="25" width="${
              rate * 100
            }" fill="${color}" />`,
            w + rate * 100
          ] as [string, number],
        ["", 0] as [string, number]
      );
      return `
        <g>
          <g transform="scale(3.0,1.0)">
            ${rects}
          </g>
          <text x="340" y="${i * 40 + 18}" fill="currentColor">${
        item.label
      }</text>
        </g>
      `;
    })
    .join("");
  const svg = `<svg height="${
    renderItems.length * 40
  }" width="100%">${groups}</svg>`;
  const logItem = document.createElement("div");
  logItem.innerHTML = svg;
  setTimeout(() => document.getElementById("log")!.append(logItem), 32);
}
```

---

## Step 3

`exampleDataSet` の代わりに、本物のデータを利用するようにしましょう。

---

`fetch` API を使って、以下の URL から JSON データを取得するように変更してください。

- JSON データの格納先: https://raw.githubusercontent.com/Quramy/state-of-ts-example/main/data/features-data.json

---

JSON データを取得できるようになったら、 取得したデータに `filterDataset` 関数, `mapToGraphItem` を作用させてグラフを描画してみましょう！

```ts
const filtered = filterDataset(dataSet);
renderBarGraph(mapToGraphItem(filtered));
```

---

無事グラフが描画されましたか？

最後に Playground の URL をボスに送りつけてやりましょう。

---

## お疲れさまでした！

---

## (余力がある人向け)

---

あなたの仕事の出来にボスも大変満足しています。

しかし、予定よりも速くボスにグラフを提出してしまったがために、ボスからさらなる仕事を押し付けられてしまいまた。。。

---

JavaScript 製のさまざまなライブラリについてのサーベイ結果について、追加問題で与えられる要件を読み、グラフ化してください。

グラフの描画には `renderBarGraph` 関数をそのまま使ってください。

---

ライブラリサーベイのデータ格納先:

https://raw.githubusercontent.com/Quramy/state-of-ts-example/main/data/tools-data.json

---

追加問題 1

各年度に対して、TypeScript を利用しているユーザーの満足度をグラフ化してください。

- ヒント: 満足度は `satisfaction` に格納されています

---

追加問題 2

React, Vue.js, Angular について、利用者人数の比率をグラフ化してください。

- ヒント: ライブラリの利用率は `usage` に格納されています
