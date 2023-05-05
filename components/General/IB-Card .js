import { hexToCSSFilter } from 'hex-to-css-filter';
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Link from 'next/link';

const IB_Card = ({ blok }) => {
  //let styles = { filter: hexToCSSFilter(blok.image_color || "#000").filter,...(blok.image_height && { height: blok.image_height }),...(blok.image_width && { width: blok.image_width }) }
  return (
    <div id="blog-card" style={{ borderColor: blok.border_color }} className="flex flex-col bg-[#8F47FFFF] border-solid border-[1px] rounded-lg hover:opacity-90 hover:scale-[1.04] ease-in-out duration-300" {...storyblokEditable(blok)}>
      <img src={blok.image.filename} alt={blok.image.alt} className="rounded-t-lg object-fill w-full" />
      <div id="blog-description" className="flex grow flex-row justify-between p-3 px-4 items-center">
        <h4 id="blog-title" className={`font-bold text-2xl`} style={{ color: blok.text_color }}>{blok.title}</h4>
        <div id="blog-button" className=''>
          <a href={blok.button_url.url} className='no-underline pb-1 flex items-center border-solid border-[1px] rounded-full px-2 text-xs hover:cursor-pointer hover:opacity-80 pt-1' style={{ color: blok.text_color, borderColor: blok.text_color }}>{blok.button_label}</a>
        </div>
      </div>
    </div>
  )
};
 
export default IB_Card;