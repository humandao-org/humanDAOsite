import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Link from "next/link";

const Header = ({ blok, parent, last }) => (
  <header className={`${blok.margins} bg-white h-[60px] px-4 flex justify-between items-center sticky top-0 left-0 w-full z-50`} {...storyblokEditable(blok)}>
    <div className="flex flex-row space-x-2 items-center justify-center">
      <div id="logo">
      <Link href="/">
        <a>
          <img className="max-w-none" src="/images/hdao-logo.png"  width="50px" height="50px"/>
        </a>
      </Link>
      </div>
      <div id="text" className="font-bold text-3xl hidden md:block">humanDAO</div>
    </div>
    <div className="flex flex-row px-2 md:text-sm text-xs space-x-2 md:space-x-4 text-center md:text-left justify-center items-center text-[#565D6DFF]">
      { blok.links && (blok.links.map((link, index, array) => {
          return (
            <div key={link._uid} {...storyblokEditable(link)}>
              <a href={link.link.url} className="no-underline" style={{ color: blok.links_color }}>{link.name}</a>
            </div> 
          )
        }))}
    </div>
    {
      blok.action_links && (
      <div id="button" className="flex items-center justify-center">
        <div 
          className={`py-2 px-3 md:text-sm text-xs text-center rounded-md hover:cursor-pointer hover:opacity-90`}
          style={{...(blok.action_links[0]?.bg_color && { backgroundColor: blok.action_links[0]?.bg_color}), ...(blok.action_links[0]?.text_color && { color: blok.action_links[0]?.text_color}) }}
        >
            { blok.action_links[0]?.name || 'button name' }
        </div>
      </div>
      )
    }
  </header>
);
 
export default Header;