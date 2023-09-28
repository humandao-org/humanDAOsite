import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const FAQSection = ({ blok }) => (
  <div className={`${blok.margins}`} {...storyblokEditable(blok)}>
    {
      blok.title && (
        <h2 id="title" className={`text-${blok.title_color || 'black'} text-${blok.title_size || '3xl'} flex justify-center text-center font-bold pt-10 pb-16`}>
          {blok.title}
        </h2>
      )
    }
    <div className="flex flex-col" id="body-container">
      { blok.items && (blok.items.map((item, index, array) => (
            <StoryblokComponent blok={item} parent={blok} last={index === array.length - 1} key={item._uid} />
          ))
        )
      }
    </div>
  </div>
);
 
export default FAQSection;