import { useEffect, useState } from 'react';
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Link from "next/link";

const getURL = (sbLink) => {
  let url = ''
  if (sbLink.linktype === 'story') {
    url = `/${sbLink.cached_url}`
  } else {
    url = sbLink.url
  }
  return url.replace('humantaskforce/', "")
}

const getHeaderStyle = (blok) => {
  let headerStyle = {}
  if (blok.bg_color) {
    headerStyle.backgroundColor = blok.bg_color
  }
  return headerStyle
}

const getTitleStyle = (blok) => {
  let titleStyle = {}
  if (blok.title_color) {
    titleStyle.color = blok.title_color
  }
  if (blok.title_size) {
    titleStyle.fontSize = blok.title_size
  }
  return titleStyle
}

const Header = ({ blok }) => {
  // State to manage the visibility of the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  let bgStyle = {};

  // Set the background color if it's provided in the blok
  if (blok.bg_color) {
    bgStyle.backgroundColor = blok.bg_color;
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Close the mobile menu if the clicked target is not a link
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu-link')) {
        closeMobileMenu();
      }
    };

    // Add event listener when the mobile menu is open
    if (isMobileMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    // Cleanup event listener on unmount or when the mobile menu is closed
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMobileMenuOpen]); // <== Effect runs when isMobileMenuOpen changes

  return (
  <header className={`${blok.heights ? blok.heights : 'h-[60px]' } bg-white ${blok.margins} flex items-center justify-center sticky top-0 left-0 z-50 w-full`} 
    style={getHeaderStyle(blok)}  {...storyblokEditable(blok)}>
    <div className={`${blok.widths ? blok.widths : 'w-full' } ${blok.paddings ? blok.paddings : '' } flex justify-between`}>
      {
        (blok.burger_breakpoint) && (
          <button onClick={toggleMobileMenu} style={{ height: '100%', width: '2rem' }} className={`burger block ${blok.burger_breakpoint}:hidden`}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 7L4 7" stroke={blok.burger_color} strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 12L4 12" stroke={blok.burger_color} strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 17L4 17" stroke={blok.burger_color} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )
      }
      <div className="flex flex-row space-x-2 items-center justify-center">
        {
          (blok.home_link.cached_url || blok.home_link.url) && (
            <div id="logo">
            <Link href={getURL(blok.home_link)}>
              <a>
                <img className={`max-w-none`} src="/images/hdao-logo.png"  width="50px" height="50px"/>
              </a>
            </Link>
          </div>
          )
        }
        <div id="text" style={getTitleStyle(blok)} className={`font-bold text-3xl ${blok.burger_breakpoint ? `hidden ${blok.burger_breakpoint}:block`: ''}`}>{blok.title}</div>
      </div>
      <div className={`rte-styles ${blok.burger_breakpoint ? `hidden ${blok.burger_breakpoint}:flex`: 'flex'} flex-row px-2 ${blok.links_gap ? blok.links_gap : ''} md:text-sm text-xs space-x-2 md:space-x-4 text-center md:text-left justify-center items-center text-[#565D6DFF]`}>
        { blok.links && (blok.links.map((link, index, array) => {
            let style = {};

            if (blok.links_color) {
                style.color = blok.links_color
            }
            if (blok.links_size) {
              style.fontSize = blok.links_size
            }
            if (blok.links_weight) {
              style.fontWeight = blok.links_weight
            }
            return (
              <div key={link._uid} {...storyblokEditable(link)}>
                <a href={getURL(link.link)} className="no-underline" style={style}>{link.name}</a>
              </div> 
            )
          }))}
      </div>
      {
        (blok.action_links?.length > 0) && (
        <div id="button" className="flex items-center justify-center">
          <StoryblokComponent blok={blok.action_links[0]} key={blok.action_links[0]._uid} />
        </div>
        )
      }
    </div>
      {/* Mobile Menu Panel */}
      <div style={bgStyle} className={`absolute top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} w-2/4 h-screen bg-white shadow-md`}>
        <div className="p-4">
          {/* Close Button */}
          <button onClick={toggleMobileMenu} className="close-button">
            {/* Add close (X) icon or text here */}
          </button>
          {/* Mobile Menu Content */}
          <nav className="ml-4">
            {blok.links && blok.links.map((link) => {
              let style = {};

              if (blok.links_color) {
                  style.color = blok.links_color
              }
              if (blok.links_size) {
                style.fontSize = blok.links_size
              }
              if (blok.links_weight) {
                style.fontWeight = blok.links_weight
              }
              return (
                <div key={link._uid} {...storyblokEditable(link)} className="mobile-menu-link">
                  <a href={getURL(link.link)} className="block no-underline py-4" style={style} onClick={closeMobileMenu}>{link.name}</a>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
  </header>
  )
};
 
export default Header;