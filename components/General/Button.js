import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { useRouter } from 'next/router';

function Button({ blok, methodToCall }) {
  const router = useRouter();
  
  function removeFolderPath(url) {
    return url.replace(/humantaskforce\/|humandao\//, "");
  }
  
  function handleClick() {
    if (methodToCall) {
      // If methodToCall is provided, call it instead of handling the click itself
      methodToCall();
    } else if (blok.action_url) {
      // Check if the linktype is 'story' or 'url'
      if (blok.action_url.linktype === 'story') {
        // use router to navigate to the internal page
        router.push(removeFolderPath(blok.action_url.cached_url));
      } else if (blok.action_url.linktype === 'url') {
        // open the link in a new window/tab
        window.open(blok.action_url.url, '_blank');
      }
    }
  }

  return (
    <div {...storyblokEditable(blok)}
      style={{ 
        backgroundColor: blok.bg_color, color: blok.text_color, 
        ...( blok.border_color && { borderColor: blok.border_color, borderStyle: 'solid', borderWidth: blok.border_thickness || '1px', fontWeight: blok.weight || '500' })
      }} 
      className={`${blok.margins || ''} ${blok.display || 'inline'} text-${blok.text_size || 'md'} hover:cursor-pointer hover:opacity-80 m-auto px-4 truncate py-2 ${blok.rounded ? blok.rounded : 'rounded-lg' } `}
      onClick={handleClick}  
    >
      {blok.label}
    </div>
  )
};
 
export default Button;

