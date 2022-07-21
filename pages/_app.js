import "../styles/globals.css"
import "../public/assets/fonts/stylesheet.css"
import "../public/assets/theme/theme.css"
import { storyblokInit, apiPlugin } from "@storyblok/react"
import Collection from "../components/General/Collection"
import Milestones from "../components/Dashboard/Milestones"
import Page from "../components/Page"
import Token from "../components/Dashboard/Token"
import Section from "../components/General/Section"
import AssetList from "../components/Dashboard/AssetList"
import Question from "../components/Education/Question"
import TeachingModule from "../components/Education/TeachingModule"
import TeachingModuleText from "../components/Education/TeachingModuleText"
import Staking from "../components/Dashboard/Staking"
import TextBlock from "../components/General/TextBlock"
import Card from "../components/General/Card"

const components = {
  collection: Collection,
  milestones: Milestones,
  token: Token,
  staking: Staking,
  asset_list: AssetList,
  section: Section,
  page: Page,
  question: Question,
  teaching_module: TeachingModule,
  teaching_module_text: TeachingModuleText,
  text_block: TextBlock,
  card: Card
};

storyblokInit({
  accessToken: "GWQZ8nicV4wbyoiQC8vUSgtt",
  use: [apiPlugin],
  components,
});

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;