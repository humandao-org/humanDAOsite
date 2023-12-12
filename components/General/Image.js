import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Row = ({ blok }) => {
  let style = {}
  if (blok.height) {
    style.height = blok.height + 'px' // this is used elsewhere to am keeping height as a number and assuming 'px'
  }
  if (blok.width) {
    style.width = blok.width
  }
  return (
  <div className={`${blok.align ? ' text-' + blok.align : ''}`}>
    <img
      style={style}
      className="inline-block"
      src={blok.url.filename}
      {...storyblokEditable(blok)}
    ></img>
  </div>
  )
};
 
export default Row;