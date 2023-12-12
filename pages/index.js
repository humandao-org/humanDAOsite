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
    <div style={getStyle()}> 
      <Head>
        <title>{story ? story.name : "My Site"}</title>
        <link rel="icon" href="/HDAO-logo-transp-60x60-1.png" />
        <style>
          {`body { font-family: ${story.content.font_body || 'Play' } !important } `}
          {`h1, h2, h3, h4, h5 { font-family: ${story.content.font_headers || 'Bungee' } } `}
          {story.content.h1_styles && `.rte-styles h1 { ${story.content.h1_styles} } ` }
          {story.content.h2_styles && `.rte-styles h2 { ${story.content.h2_styles} } ` }
          {story.content.h3_styles && `.rte-styles h3 { ${story.content.h3_styles} } ` }
          {story.content.p_styles && `.rte-styles p:not(:last-of-type) { ${story.content.p_styles} } ` }
          {story.content.a_styles && `.rte-styles a { ${story.content.a_styles} } ` }
          {story.content.a_hover_styles && `.rte-styles a:hover { ${story.content.a_hover_styles} } ` }
          {story.content.a_button_styles && `.rte-styles a.button:hover { ${story.content.a_button_styles} } ` }
        </style>
      </Head>
 
      <StoryblokComponent blok={story.content} />
    </div>
  );
}
 
export async function getStaticProps({ preview = false }) {
  //let slug = params.slug ? params.slug.join("/") : "home";
 
  let sbParams = {
    version: 'published',
  };

  if (preview) {
    // load the draft version inside of the preview mode
    sbParams.version = "draft";
  }
 
  const storyblokApi = getStoryblokApi();
  const rootFolder = process.env.ROOT_FOLDER
  console.log('get story at index from: ', `cdn/stories/${rootFolder}/`)
  let { data } = await storyblokApi.get(`cdn/stories/${rootFolder}/`, sbParams);
  // console.log(data)
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}
 
/*
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
*/