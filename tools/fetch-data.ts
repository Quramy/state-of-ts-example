import path from "path";
import fs from "fs/promises";
import { request, gql } from "graphql-request";
import { GetSurvey } from "./__generated__/get-survey";

const ToolExperienceFragment = gql`
  fragment ToolExperienceFragment on ToolExperience {
    allYearDataList: all_years {
      year
      awarenessUsageInterestSatisfaction {
        awareness
        usage
        interest
        satisfaction
      }
      completion {
        total
        count
        percentage
      }
    }
  }
`;

const FeatureExpeienceFragment = gql`
  fragment FeatureExpeienceFragment on FeatureExperience {
    latestYearData: year(year: 2020) {
      total
      completion {
        count
        percentage
      }
      buckets {
        type: id
        count
        percentage
      }
    }
  }
`;

const query = gql`
  ${FeatureExpeienceFragment}
  ${ToolExperienceFragment}
  query GetSurvey {
    survey(survey: state_of_js) {
      totals {
        year(year: 2020)
      }
      featuresData: features(
        ids: [
          arrow_functions
          destructuring
          spread_operator
          nullish_coalescing
          optional_chaining
          private_fields
          proxies
          async_await
          promises
          decorators
          promise_all_settled
          dynamic_import
          maps
          sets
          typed_arrays
          array_prototype_flat
          big_int
          service_workers
          local_storage
          intl
          web_audio
          webgl
          web_animations
          webrtc
          web_speech
          webvr
          websocket
          wasm
          pwa
          fetch
          custom_elements
        ]
      ) {
        id
        name
        experience {
          ...FeatureExpeienceFragment
        }
      }
      toolsData: tools(
        ids: [
          typescript
          reason
          elm
          clojurescript
          purescript
          react
          vuejs
          angular
          preact
          ember
          svelte
          alpinejs
          litelement
          stimulus
          redux
          apollo
          graphql
          mobx
          relay
          xstate
          vuex
          express
          nextjs
          koa
          meteor
          sails
          feathers
          nuxt
          gatsby
          nest
          strapi
          fastify
          hapi
          jest
          mocha
          storybook
          cypress
          enzyme
          ava
          jasmine
          puppeteer
          testing_library
          playwright
          webdriverio
          webpack
          parcel
          gulp
          rollup
          browserify
          tsc
          rome
          snowpack
          swc
          esbuild
          electron
          reactnative
          nativeapps
          cordova
          ionic
          nwjs
          expo
          capacitor
          quasar
        ]
      ) {
        entity {
          id
          name
          category
          description
        }
        experience {
          ...ToolExperienceFragment
        }
      }
    }
  }
`;

const bucketOrder = {
  used: 0,
  heard: 1,
  never_heard: 2
};

async function fetchData() {
  const data = await request<GetSurvey>(
    "http://api.stateofjs.com/graphql",
    query
  );
  const featuresData = data?.survey?.featuresData;
  const toolsData = data?.survey?.toolsData;
  featuresData?.forEach(d =>
    d?.experience?.latestYearData?.buckets?.sort(
      (b1, b2) => bucketOrder[b1?.type!] - bucketOrder[b2?.type!]
    )
  );
  await fs.writeFile(
    path.resolve(__dirname, "../data/features-data.json"),
    JSON.stringify(featuresData, null, 2),
    "utf8"
  );
  await fs.writeFile(
    path.resolve(__dirname, "../data/tools-data.json"),
    JSON.stringify(toolsData, null, 2),
    "utf8"
  );
}

fetchData();
