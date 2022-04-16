import { StoryblokComponent } from "@storyblok/react";

const Collection = ({ blok }) => (
    blok.blocks
      ? blok.blocks.map((blok) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))
      : null
);
 
export default Collection;