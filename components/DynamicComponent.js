//import Teaser from "./Teaser";
//import Grid from "./Grid";
import Collection from "./General/Collection";
import Milestones from "./Dashboard/Milestones";
import Feature from "./Feature";
import Page from "./Page";
import Token from "./Dashboard/Token";
import Section from "./General/Section";
import AssetList from "./Dashboard/AssetList";
 
// resolve Storyblok components to Next.js components
const Components = {
  //teaser: Teaser,
  //grid: Grid,
  collection: Collection,
  feature: Feature,
  milestones: Milestones,
  token: Token,
  asset_list: AssetList,
  section: Section,
  page: Page,
};
 
const DynamicComponent = ({ blok }) => {
  // check if component is defined above
  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component];
 
    return <Component blok={blok} key={blok._uid} />;
  }
 
  // fallback if the component doesn't exist
  return (
    <p>
      The component <strong>{blok.component}</strong> has not been created yet.
    </p>
  );
};
 
export default DynamicComponent;