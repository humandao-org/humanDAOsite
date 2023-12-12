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
  let imgstyles = { ...(blok.image_color && { filter: hexToCSSFilter(blok.image_color || "#000").filter.replace(";",'') }), ...(blok.image_height && { height: blok.image_height }), ...(blok.image_width && { width: blok.image_width }) }
  let styles = {}
  if (blok.borders && blok.borders.includes('border-3')) { // hack to allow for 3px borders since tailwin 2.x does not support this
    styles.borderWidth = '3px'
  }
  return (
    <div 
      className={`${blok.roundings || 'rounded-lg'} ${blok.margins} ${blok.borders} ${blok.paddings}`} 
      style={{ ...(blok.bg_color && { backgroundColor: blok.bg_color }), ...(blok.border_color && { borderColor: blok.border_color }), ...styles }} 
      {...storyblokEditable(blok)}
    >
      <div className={`flex flex-row flex-wrap ${blok.distribution} ${blok.header_gap}`}>
        { blok.image.filename && 
          (<div className={`self-center ${blok.image_paddings}`}>
            <img suppressHydrationWarning src={blok.image.filename} alt={blok.image.alt} className='max-w-none' style={imgstyles}/>
          </div>)
        }
        { blok.header && 
          (<div className='flex flex-wrap content-center'>
            <h2 
              className={`${blok.header_margins} text-${blok.text_align || 'left'} text-${blok.header_size || '3xl'}`} 
              style={{color: blok.header_color || blok.text_color || 'black' }}>{ blok.header }</h2>
          </div>)
        }
      </div>
      <div 
        className={`rte-styles  ${blok.text_margins || ''} text-${blok.text_align || 'left'} text-${blok.text_size || '3xl'} ${blok.text_height}`}  
        style={{ color: blok.text_color || 'black' }}
          >{ render(blok.text, {
            defaultBlokResolver: (name, props) => {
              const blok = { ...props, component: name };
              return <StoryblokComponent blok={blok} key={props._uid} />;
            }
          })
       }</div>
    </div>
  )
};
 
export default IHT_Card;