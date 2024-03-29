import Head from "next/head";
 
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
import { root } from "postcss";
 
export default function Page({ story }) {
  story = useStoryblokState(story);
  const getStyle = () => {
    const style = { 
    }
    if (story.content && story.content.bg_image.filename) {
      style.backgroundImage = `url(${story.content.bg_image.filename})`
    }
    if (story.content && story.content.bg_color) {
      style.backgroundColor = story.content.bg_color
    }
    return style
  }
  let bodyColor = story.content.text_color ? `color: ${story.content.text_color}` : ''
  return (
    <div style={getStyle()} className="min-h-screen"> 
      <Head>
        <title>{story ? story.name : "My Site"}</title>
        <link rel="icon" href="/HDAO-logo-transp-60x60-1.png" />
        <style>
          {`body { font-family: ${story.content?.font_body || 'Play' } !important; ${bodyColor} }`}
          {`h1, h2, h3, h4, h5 { font-family: ${story.content.font_headers || 'Bungee' } } `}
          {story.content.h1_styles && `.rte-styles h1 { ${story.content.h1_styles} } ` }
          {story.content.h2_styles && `.rte-styles h2 { ${story.content.h2_styles} } ` }
          {story.content.h3_styles && `.rte-styles h3 { ${story.content.h3_styles} } ` }
          {story.content.p_styles && `.rte-styles p:not(:last-of-type) { ${story.content.p_styles} } ` }
          {story.content.anchor_styles && `.rte-styles a { ${story.content.anchor_styles} } ` }
          {story.content.anchor_hover_styles && `.rte-styles a:hover { ${story.content.anchor_hover_styles} } ` }
          {story.content.a_button_styles && `a.button:hover { ${story.content.a_button_styles} } ` }
          { `.rte-styles img { display: inline-block }`}
        </style>
      </Head>
 
      <StoryblokComponent blok={story.content} />
    </div>
  );
}
 
export async function getStaticProps({ params, preview = false }) {
  let slug = params.slug ? params.slug.join("/") : "home";
  let sbParams = {
    version: 'published'
  };
 
  if (preview) {
    // load the draft version inside of the preview mode
    sbParams.version = "draft";
  }
  const storyblokApi = getStoryblokApi();
  const rootFolder = process.env.ROOT_FOLDER
  console.log('get story from: ', `cdn/stories/${rootFolder}/${slug}`)
  console.log(sbParams)
  let { data } = await storyblokApi.get(`cdn/stories/${rootFolder}/${slug}`, sbParams);
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
  const rootFolder = process.env.ROOT_FOLDER
  //console.log("getting static paths")
  let { data } = await storyblokApi.get(`cdn/links/`);
  // console.log(data)
  let paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    try {
      if (data.links[linkKey].is_folder || ['/buyhdao', '/dashboard'].includes(data.links[linkKey].path)) {
        return;
      } else if (data.links[linkKey].slug.indexOf(rootFolder) === -1) {
        // console.log('root folder not there', data.links[linkKey].slug)
        return
      }
   
      const slug = data.links[linkKey].slug.replace(rootFolder + '/','');
      if (slug === '') {
        return
      }
      //const slug = data.links[linkKey].real_path;
      let splittedSlug = slug.split("/")
      //console.log({ slug: splittedSlug })
      paths.push({ params: { slug: splittedSlug } });
    } catch(e) {
      console.error(e)
    }
  });
  return {
    paths: paths,
    fallback: false,
  };
}