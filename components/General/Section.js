import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Section = ({ blok }) => (
  <section 
    style={{
      ...(
      blok.bg_image && {
        backgroundImage: `url(${blok.bg_image.filename})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }),
      ...(blok.bg_color && { backgroundColor: blok.bg_color })
    }}    
    className={`${blok.roundings || 'rounded-xl'} ${blok.margins || 'md:mx-24 lg:mx-32 m-8 mt-0 p-4'}`} 
    {...storyblokEditable(blok)}>
    { blok.header && (<h1 style={{color: blok.text_color || 'black' }} className="font-bold text-3xl">
      {blok.header}
    </h1>)
    }
    <div 
      style={{
        ...(blok.templateColumnStyle && { gridTemplateColumns: blok.templateColumnStyle }),
        ...(blok.min_height && { minHeight: blok.min_height }),
        ...(blok.bg_filter_opacity !== '' && { background: `rgba(0, 0, 0, ${parseFloat(blok.bg_filter_opacity)})` }),
        ...(blok.inner_bg_color && { backgroundColor: blok.inner_bg_color })
      }}
      className={`${blok.displays || 'grid'} ${blok.inner_margins} ${blok.widths} ${blok.paddings || 'py-5'}${blok.valign ? ` items-` + blok.valign : ''}${blok.gap ? ' gap-' + blok.gap : ''}${blok.gap_md ? ' md:gap-' + blok.gap_md : ''}${blok.gap_lg ? ' lg:gap-' + blok.gap_lg : ''}${blok.cols ? ' grid-cols-' + blok.cols : ''}${blok.cols_md ? ' md:grid-cols-' + blok.cols_md : ''}${blok.cols_lg ? ' lg:grid-cols-' + blok.cols_lg : ''} ${blok.orders || ''}`}
    >
      { blok.blocks
      ? blok.blocks.map((blok) => (
          <StoryblokComponent blok={blok} key={blok._uid} />
        ))
      : null} 
    </div>
  </section>
);
 
export default Section;