import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { useRouter } from 'next/router';

function Button({ blok }) {
  const router = useRouter();
  function handleClick(url) {
    router.push(url);
  }

  return (
    <div {...storyblokEditable(blok)}
      style={{ backgroundColor: blok.bg_color, color: blok.text_color}} 
      className={`${blok.margins || ''} ${blok.display || 'inline'} text-${blok.text_size || 'md'} hover:cursor-pointer hover:opacity-80 m-auto px-4 truncate py-2 rounded-lg`}
      onClick={() => handleClick(blok.action_url.url)}  
    >
      {blok.label}
    </div>
  )
};
 
export default Button;

