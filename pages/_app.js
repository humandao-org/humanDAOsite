import "../styles/globals.css"
import { storyblokInit, apiPlugin } from "@storyblok/react"
import Collection from "../components/General/Collection"
import Milestones from "../components/Dashboard/Milestones"
import Page from "../components/Page"
import Token from "../components/Dashboard/Token"
import Section from "../components/General/Section"
import Row from "../components/General/Row"
import Image from "../components/General/Image"
import AssetList from "../components/Dashboard/AssetList"
import Question from "../components/Education/Question"
import TeachingModule from "../components/Education/TeachingModule"
import TeachingModuleText from "../components/Education/TeachingModuleText"
import Staking from "../components/Dashboard/Staking"
import TextBlock from "../components/General/TextBlock"
import Card from "../components/General/Card"
import IHT_Card from "../components/General/IHT-Card"
import IB_Card from "../components/General/IB-Card "
import FeatureCompare from "../components/LandingPage/FeatureCompare"
import FeatureCompareItem from "../components/LandingPage/FeatureCompareItem"
import Footer from "../components/LandingPage/Footer"
import Header from "../components/LandingPage/Header"
import Button from "../components/General/Button"
import Decorator from "../components/General/Decorator"

const components = {
  collection: Collection,
  milestones: Milestones,
  token: Token,
  staking: Staking,
  asset_list: AssetList,
  section: Section,
  row: Row,
  image: Image,
  page: Page,
  question: Question,
  teaching_module: TeachingModule,
  teaching_module_text: TeachingModuleText,
  text_block: TextBlock,
  card: Card,
  iht_card: IHT_Card,
  ib_card: IB_Card,
  feature_compare: FeatureCompare,
  feature_compare_item: FeatureCompareItem,
  footer: Footer,
  header: Header,
  button: Button,
  decorator: Decorator
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