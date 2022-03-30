import StoryblokClient from "storyblok-js-client";
 
const Storyblok = new StoryblokClient({
  accessToken: "GWQZ8nicV4wbyoiQC8vUSgtt",
  cache: {
    clear: "auto",
    type: "memory",
  },
});
 
export default Storyblok;