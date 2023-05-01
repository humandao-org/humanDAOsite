import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Row = ({ blok }) => (

<div className={`${blok.align ? ' text-' + blok.align : ''}`}>
  <img
    style={{ height: blok.height + 'px' }}
    className="inline-block"
    src={blok.url.filename}
    {...storyblokEditable(blok)}
  ></img>
</div>
);
 
export default Row;