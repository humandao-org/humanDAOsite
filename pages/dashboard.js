import Head from "next/head"
// import styles from "../styles/Dashboard.module.css"
import { useStoryblokState, storyblokEditable, StoryblokComponent } from "@storyblok/react";
 
// The Storyblok Client
// import Storyblok from "../lib/storyblok"
// import DynamicComponent from '../components/DynamicComponent'
import { getStoryblokApi } from "@storyblok/react"

export default function Dashboard({ story }) {
  // const story = props.story
  story = useStoryblokState(story);
  // console.log(story)
  return (
    <div className="bg-fixed pt-20 pb-20" style={{ height: '100%', backgroundImage: `url(${story.content.bg_image.filename})` }}> 
      <Head>
        <title>Dashboard - humanDAO</title>
        <link rel="icon" href="/HDAO-logo-transp-60x60-1.png" />
      </Head>

      <h1 className="Title text-center font-press-start font-bold text-3xl lg:text-4xl mx-2 text-white" {...storyblokEditable(story.content)}>humanDAO Dashboard V1.1</h1>
      <div className="italic text-white mb-8 text-center">Last updated: {new Date(story.content.last_updated).toLocaleDateString()}</div>
      <StoryblokComponent blok={story.content} /> 
    </div>
  )
}
 
export async function getStaticProps({ preview = false }) {
  // home is the default slug for the homepage in Storyblok
  let slug = "dashboard";
  // load the published content outside of the preview mode
  let sbParams = {
    version: "published",
    cv: Date.now() // Avoid the dashboard being cached
  };
 
  if (preview) {
    // load the draft version inside of the preview mode
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }
 
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
 
  return {
    props: {
      story: data ? data.story : null,
      key: data ? data.story.id : false,
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