import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const Card = ({ blok }) => (
  <div className="flex justify-center" {...storyblokEditable(blok)}>
    <div 
      className={`block rounded-lg shadow-lg text-${blok.text_align || 'left'} w-${blok.width || 'auto'} ${blok.max_width || 'max-w-none'}`}
      style={Object.assign({}, blok.bg_color && { backgroundColor: blok.bg_color })}
    >
      { blok.header ? (
        <div className={`p-${blok.padding || '2'} border-b border-gray-300`}>
          {blok.header}
        </div>) : null
      }
      { blok.blocks
        ? blok.blocks.map((childblok) => (
          <div className={`p-${blok.padding || '2'}`} key={childblok._uid}>
            <StoryblokComponent blok={childblok} />
          </div>
          ))
        : null
      } 
      { blok.footer.length ? (
        <div className={`p-${blok.padding || '2'} border-t border-gray-300 text-gray-600`}>
            <StoryblokComponent blok={blok.footer[0]} key={blok.footer[0]._uid} />
        </div>) : null
      }
    </div>
  </div>
);
 
export default Card;