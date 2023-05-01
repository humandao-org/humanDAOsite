import Head from "next/head";
 
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
 
export default function Page({ story }) {
  story = useStoryblokState(story);
 
  const getStyle = () => {
    const style = { 
      height: '100%', 
    }
    if (story.content.bg_image) {
      style.backgroundImage = `url(${story.content.bg_image.filename})`
    }
    if (story.content.bg_color) {
      style.backgroundColor = story.content.bg_color
    }
    return style
  }

  return (
    <div className="bg-fixed pt-20 pb-20" style={getStyle()}> 
      <Head>
        <title>{story ? story.name : "My Site"}</title>
        <link rel="icon" href="/favicon.ico" />
        <style>
          {`body { font-family: ${story.content.font_body || 'Play' } }`}
          {` h1, h2, h3, h4, h5 { font-family: ${story.content.font_headers || 'Bungee' } }`}
        </style>
      </Head>
 
      <StoryblokComponent blok={story.content} />
    </div>
  );
}
 
export async function getStaticProps({ params }) {
  let slug = params.slug ? params.slug.join("/") : "home";
 
  let sbParams = {
    version: "draft", // or 'published'
  };
 
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  // console.log(data)
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}
 
export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links/");
 
  let paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home" || data.links[linkKey].slug === "dashboard") {
      return;
    }
 
    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split("/");
 
    paths.push({ params: { slug: splittedSlug } });
  });
 
  return {
    paths: paths,
    fallback: false,
  };
}