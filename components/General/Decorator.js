import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

function Decorator({ blok }) {

  return (
    <div {...storyblokEditable(blok)}
      style={{...(blok.grid_column && { gridColumn: blok.grid_column })}} 
      className={`${blok.alignment || ''} ${blok.paddings || ''} ${blok.margins || ''}`}
    >
        { blok.blocks && blok.blocks.map((blok) => (
            <StoryblokComponent blok={blok} key={blok._uid} />
          ))
        } 
    </div>
  )
};
 
export default Decorator;

