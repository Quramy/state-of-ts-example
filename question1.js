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
