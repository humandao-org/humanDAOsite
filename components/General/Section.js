import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Section = ({ blok }) => (
  <div>
    <section className="Section rounded md:mx-24 lg:mx-32 m-8 mt-0 p-4" style={Object.assign({}, blok.bg_color && { backgroundColor: blok.bg_color })} {...storyblokEditable(blok)}>
      { blok.header && (<h1 className="font-bungee font-bold text-3xl text-center md:text-left">
        {blok.header}
      </h1>)
      }
      <div className={`grid gap-${blok.gap || '2'} md:gap-${blok.gap_md || '3'} lg:gap-${blok.gap_lg || '4'} grid-cols-${blok.cols ? blok.cols : '1'} md:grid-cols-${blok.cols_md ? blok.cols_md : '1'} lg:grid-cols-${blok.cols_lg ? blok.cols_lg : '1'} py-5`}>
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