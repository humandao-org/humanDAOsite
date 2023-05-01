import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Section = ({ blok }) => (
  <div>
    <section className="Section rounded md:mx-24 lg:mx-32 m-8 mt-0 p-4" style={Object.assign({}, blok.bg_color && { backgroundColor: blok.bg_color })} {...storyblokEditable(blok)}>
      { blok.header && (<h1 className="font-bold text-3xl">
        {blok.header}
      </h1>)
      }
      <div className={`grid py-5${blok.valign ? ` items-` + blok.valign : ''}${blok.gap ? ' gap-' + blok.gap : ''}${blok.gap_md ? ' md:gap-' + blok.gap_md : ''}${blok.gap_lg ? ' lg:gap-' + blok.gap_lg : ''}${blok.cols ? ' grid-cols-' + blok.cols : ''}${blok.cols_md ? ' md:grid-cols-' + blok.cols_md : ''}${blok.cols_lg ? ' lg:grid-cols-' + blok.cols_lg : ''}`}>
        { blok.blocks
        ? blok.blocks.map((blok) => (
            <StoryblokComponent blok={blok} key={blok._uid} />
          ))
        : null} 
      </div>
    </section>
  </div>
);
 
export default Section;