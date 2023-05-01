import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Row = ({ blok }) => (
  <div className={`grid grid-cols-${blok.cols} ${blok.cols_md ? 'md:grid-cols-' + blok.cols_md : ''}`}>
    { blok.blocks
      ? blok.blocks.map((blok) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))
      : null} 
  </div>
);
 
export default Row;