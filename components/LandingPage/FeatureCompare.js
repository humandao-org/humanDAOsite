import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const FeatureCompare = ({ blok }) => (
<div className={`${blok.margins}`} {...storyblokEditable(blok)}>
  <h2 id="title" className={`text-${blok.title_color || 'black'} text-${blok.title_size || '3xl'} flex justify-center text-center font-bold pt-10 pb-16`}>
    {blok.title}
  </h2>
  <div className={`text-${blok.product_color || 'black'} grid grid-cols-1 gap-y-0 pt-2 pb-4 relative`}>
    <div className={`${blok.column_gaps} grid grid-cols-3 z-10`} id="label">
        <div>&nbsp;</div>
        <h4 
          style={{ ...(blok.product1_bg_color && { backgroundColor: blok.product1_bg_color  })}} 
          className={`${blok.product_sizes || 'text-lg'} ${blok.product_paddings} flex justify-center items-center font-bold uppercase text-center rounded-t-lg`}
          dangerouslySetInnerHTML={{__html: blok.product1}}
        />
        <h4 
          style={{ ...(blok.product2_bg_color && { backgroundColor: blok.product2_bg_color  })}} 
          className={`${blok.product_sizes || 'text-lg'} ${blok.product_paddings} flex justify-center items-center font-bold uppercase text-center rounded-t-lg`}
          dangerouslySetInnerHTML={{__html: blok.product2}}
        />
    </div>
    <div className={`${blok.column_gaps} grid grid-cols-3 z-10`} id="sub-label">
        <div className={`${blok.feature_sizes || 'text-lg'} font-bold grid-label-item`}>
            {blok.feature_header}
        </div>
        <div className="text-lg font-bold uppercase grid-item" style={{ ...(blok.product1_bg_color && { backgroundColor: blok.product1_bg_color  })}}>
            &nbsp;
        </div>
        <div className="text-lg font-bold uppercase grid-item" style={{ ...(blok.product2_bg_color && { backgroundColor: blok.product2_bg_color  })}}>
            &nbsp;
        </div>
    </div>
    { blok.items && (blok.items.map((item, index, array) => (
          <StoryblokComponent blok={item} parent={blok} last={index === array.length - 1} key={item._uid} />
        ))
      )
    }
  </div>
</div>
);
 
export default FeatureCompare;