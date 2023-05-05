import { hexToCSSFilter } from 'hex-to-css-filter';
import { render, NODE_UL, NODE_LI } from 'storyblok-rich-text-react-renderer';
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
// import { Solver, Color } from "../../lib/css_filter"


const IHT_Card = ({ blok }) => {
  // let rgb = [250, 150, 50] // "#23e575";
  // let color = new Color(rgb[0], rgb[1], rgb[2]);
  // let solver = new Solver(color);
  // let filterResult = solver.solve();

  // console.log(result.filter)
  // let styles = { filter: filterResult.filter, ...(blok.image_height && { height: blok.image_height }), ...(blok.image_width && { width: blok.image_width }) }
  let styles = { filter: hexToCSSFilter(blok.image_color || "#000").filter.replace(";",''),...(blok.image_height && { height: blok.image_height }),...(blok.image_width && { width: blok.image_width }) }
  return (
    <div className={`rounded-lg ${blok.margins} ${blok.paddings}`} style={{ ...(blok.bg_color && { backgroundColor: blok.bg_color }) }} {...storyblokEditable(blok)}>
      <div className={`flex ${blok.distribution}`}>
        { blok.image.filename && 
          (<div className={`self-center ${blok.image_paddings}`}>
            <img suppressHydrationWarning src={blok.image.filename} alt={blok.image.alt} className='max-w-none' style={styles}/>
          </div>)
        }
        { blok.header && 
          (<div className='flex flex-wrap content-center'>
            <h2 className={`m-0 text-${blok.text_align || 'left'} text-${blok.header_size || '3xl'}`} style={{color: blok.text_color || 'black' }}>{ blok.header }</h2>
          </div>)
        }
      </div>
      <div className={`rte-styles  ${blok.text_margins || ''} text-${blok.text_align || 'left'} text-${blok.text_size || '3xl'}`}  style={{ color: blok.text_color || 'black' }}>{ render(blok.text) }</div>
    </div>
  )
};
 
export default IHT_Card;