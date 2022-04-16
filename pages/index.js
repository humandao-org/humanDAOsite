import Head from "next/head";
import styles from "../styles/Home.module.css"
import Link from 'next/link'

import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react"

export default function Home({ story }) {
  story = useStoryblokState(story)

  return (
    <div className={styles.container}>
      <Head>
        <title>humanDAO</title>
        <link rel="icon" href="/HDAO-logo-transp-60x60-1.png" />
      </Head>

      <Link href="/dashboard">
        <a className="no-underline hover:underline">Dashboard</a>
      </Link>
      <StoryblokComponent blok={story.content} />

      <div className="mx-auto max-w-sm">
 <h1 className="mb-6 pt-6"> Make the right choice :</h1>
 
 <div className="pl-12">
 
  <div className="flex items-center mr-4 mb-4">
    <input id="radio1" type="radio" name="radio" className="hidden" />
    <label htmlFor="radio1" className="flex items-center cursor-pointer text-xl">
     <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
     Best choice</label>
   </div>

   <div className="flex items-center mr-4 mb-4">
    <input id="radio2" type="radio" name="radio" className="hidden" />
    <label htmlFor="radio2" className="flex items-center cursor-pointer text-xl">
     <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
     Second choice</label>
   </div>
  
    <div className="flex items-center mr-4 mb-4">
    <input id="radio3" type="radio" name="radio" className="hidden" />
    <label htmlFor="radio3" className="flex items-center cursor-pointer text-xl">
     <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
     Third choice</label>
   </div>
 
 <div className="flex items-center mr-4 mb-4">
    <input id="radio4" type="radio" name="radio" className="hidden" />
    <label htmlFor="radio4" className="flex items-center cursor-pointer text-xl">
     <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
     Fourth choice</label>
   </div>
 
 <div className="flex items-center mr-4 mb-4">
    <input id="radio5" type="radio" name="radio" className="hidden" />
    <label htmlFor="radio5" className="flex items-center cursor-pointer text-xl">
     <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
    Choice Five with a longer title</label>
   </div>
 </div>
</div>

    </div>
  );
}

export async function getStaticProps() {
  let slug = "home";

  let sbParams = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}