//
// ポイント:
// - オブジェクト型やオブジェクトの配列型を定義できていること
//
type DataItem = {
  id: string;
  name: string;
  experience: {
    latestYearData: {
      total: number;
      completion: {
        count: number;
        percentage: number;
      };
      buckets: { type: string; count: number; percentage: number }[];
    };
  };
};

const exampleDataSet: DataItem[] = [
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
];

//
// ポイント:
// - 引数に型注釈を加えることで、元に与えられたコードの誤りに気づけたか
//
function filterDataset(dataSet: DataItem[]) {
  // bucketsの要素は、その技術要素を「使ったことがある, 使ったことは無いが何かは知っている, 何のことか知らない」と回答した人の人数と割合を表している
  // ここでは「何のことかしらない」と回答した人の比率が15% 以上のデータに絞り込む
  const filtered = dataSet.filter(data => {
    return data.experience.latestYearData.buckets[2].percentage >= 15;
  });

  // 降順でソート
  const sorted = filtered.sort((item1, item2) => {
    return (
      item2.experience.latestYearData.buckets[2].percentage -
      item1.experience.latestYearData.buckets[2].percentage
    );
  });

  return sorted;
}

const COLORS: string[] = ["#caf0f8", "#90e0ef", "#0096c7"];

//
// ポイント:
// - `Array.prototype.map` の使い方 (復習)
// - 返却すべき型 ( `GraphItem[]` ) を上手に活用できていたか
//
function mapToGraphItem(dataSet: DataItem[]): GraphItem[] {
  return dataSet.map(item => {
    const graphItem: GraphItem = {
      id: item.id,
      label: item.name,
      counts: item.experience.latestYearData.buckets.map((bucket, i) => ({
        color: COLORS[i % 3],
        count: bucket.count
      }))
    };
    return graphItem;
  });
}

//
// ポイント:
// - `fetch` API の使い方 (復習)
// - `data` の変数宣言時に型注釈を付与できていたか。 any を見逃していないか
//
async function fetchData() {
  const data: DataItem[] = await fetch(
    "https://raw.githubusercontent.com/Quramy/state-of-ts-example/main/data/features-data.json"
  ).then(res => res.json());
  return data;
}

async function main() {
  const dataSet = await fetchData();
  const filtered = filterDataset(dataSet);
  renderBarGraph(mapToGraphItem(filtered));
}

main();

//// 提供されるグラフ描画関数 ここから

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
//// 提供されるグラフ描画関数 ここまで
