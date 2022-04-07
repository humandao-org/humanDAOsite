import Head from "next/head"
// import styles from "../styles/Dashboard.module.css"
 
// The Storyblok Client
import Storyblok from "../lib/storyblok"
import DynamicComponent from '../components/DynamicComponent'

export default function Dashboard(props) {
  const story = props.story
  
  // className={'styles.container'}
  return (
    <div className="bg-fixed pt-20 pb-20" style={{ height: '100%', backgroundImage: `url(${story.content.bg_image.filename})` }}> 
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="Title text-center font-press-start text-4xl text-white mb-8" >humanDAO Dashboard V1</h1>
      <DynamicComponent blok={story.content} /> 
    </div>
  )
}
 
export async function getStaticProps({ preview = false }) {
  // home is the default slug for the homepage in Storyblok
  let slug = "dashboard";
  // load the published content outside of the preview mode
  let sbParams = {
    version: "draft", // or 'published'
  };
 
  if (preview) {
    // load the draft version inside of the preview mode
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }
 
  let { data } = await Storyblok.get(`cdn/stories/${slug}`, sbParams);
 
  return {
    props: {
      story: data ? data.story : null,
      preview,
    },
    revalidate: 3600, // revalidate every hour
  };
}

/*
const dashboard = () => {
  return <div>dashboard</div>
}

export default dashboard
*/