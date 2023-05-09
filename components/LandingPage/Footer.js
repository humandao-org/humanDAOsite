import { hexToCSSFilter } from 'hex-to-css-filter';
import { render } from 'storyblok-rich-text-react-renderer';
import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import Link from "next/link";

const Footer = ({ blok }) => {
  // let rgb = [250, 150, 50] // "#23e575";
  // let color = new Color(rgb[0], rgb[1], rgb[2]);
  // let solver = new Solver(color);
  // let filterResult = solver.solve();

  // console.log(result.filter)
  // let styles = { filter: filterResult.filter, ...(blok.image_height && { height: blok.image_height }), ...(blok.image_width && { width: blok.image_width }) }
  return (
  <div 
    {...storyblokEditable(blok)}
    style={{ 
      border: 'none',
      ...( blok.divider && { borderTop: blok.divider })
    }} 
  >
    <div id="footer-container" className={`flex justify-between lg:flex-row flex-col ${blok.margins}`}>
      <div id="humandao-socials" className="flex items-center flex-col space-y-24 lg:mb-0 mb-6">
        <div id="hdao-logo" className="hover:opacity-90 hover:cursor-pointer mt-2">
          <a href="https://humandao.org/" target="_blank" rel="noreferrer">
            <img src="/images/hdao-logo.png"/>
          </a>
        </div>
        <div id="hdao-socials-link" className="flex flex-row space-x-4">
          { blok.socials && (blok.socials.map((social, index, array) => {
            let iconPath = social.local ? `/images/${social.name.toLowerCase()}.svg` : social.icon.filename
            let iconAlt = social.local ? `${social.name} icon` : social.icon.alt
            let styles = { filter: hexToCSSFilter(social.color || "#000").filter.replace(';', ''),...(social.height && { height: social.height }),...(social.width && { width: social.width }) }
            return (
              <div className="hover:cursor-pointer hover:opacity-90" key={social._uid} {...storyblokEditable(social)}>
                <a href={social.url} target="_blank" rel="noreferrer">
                  <img suppressHydrationWarning style={styles} src={iconPath} alt={iconAlt} />
                </a>
              </div>
          
            )})
          )}
        </div>
      </div>
      <div id="page-links" className="flex flex-col space-y-4 text-white lg:items-start items-center lg:mx-[10%] lg:mb-0 mb-12">
        <div className={`text-${blok.header_size} font-bold`} style={{ color: blok.links_header_color }}>{ blok.links_header }</div>
        { blok.links && (blok.links.map((link, index, array) => {
          return (
            <div key={link._uid} {...storyblokEditable(link)}>
              <Link href={link.link.url}>
                <a className="no-underline text-sm" style={{ color: blok.links_color }}>{link.name}</a>
              </Link>
            </div> 
          )
        }))}
      </div>
      <div id="subscriptions" className="flex flex-col space-y-7 items-center lg:mb-0 mb-12">
        <div className="flex flex-col items-center lg:items-start">
          <div 
            style={{ 
              ...( blok.subscribe_header_color && { color: blok.subscribe_header_color })
            }}
            className={`text-${blok.header_size || '2xl'} text-[#1BC5BDFF] font-bold mb-4`}
          >
            Subscribe to Gamechat
          </div>
          <div className="text-[#9095A1FF] text-xs pb-1">A newsletter gamers</div>
          <div>

          {
            blok.buttons?.length > 1 ? (
              <StoryblokComponent blok={blok.buttons[1]} key={blok.buttons[1]._uid} />
            ) : null
          }
          </div>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <div 
            style={{ 
              ...( blok.subscribe_header_color && { color: blok.subscribe_header_color })
            }}
            className={`text-${blok.header_size || '2xl'} text-[#1BC5BDFF] font-bold mb-4`}
          >
            Subscribe to humanDAO
          </div>
          <div className="text-[#9095A1FF] text-xs pb-1">A newsletter for nice people</div>
          <div>
          {
            blok.buttons?.length > 1 ? (
              <StoryblokComponent blok={blok.buttons[1]} key={blok.buttons[1]._uid} />
            ) : null
          }
          </div>
        </div>
      </div>
    </div>
  </div>

)
};
 
export default Footer;
/*
            <div className="relative">
              <input
                placeholder="Input your email"
                type="email"
                className="flex flex-row appearance-none bg-[#323743FF] rounded-l-md w-[100%] p-2 pl-8 text-white text-sm"
              />
              <div className="absolute left-2 bottom-[0.6rem]">
                <img
                  src="/images/email.svg"
                  alt=""
                  height="20px"
                  width="20px"
                />
              </div>
            </div>
            <button className="bg-[#8F47FFFF] hover:opacity-80 rounded-r-md px-4 text-white font-semibold">
              <div>Subscribe</div>
            </button>
            */
            /*
              <input
                placeholder="Input your email"
                type="email"
                className="flex flex-row appearance-none bg-[#323743FF] rounded-l-md w-[100%] p-2 pl-8 text-white text-sm"
              />
              <div className="absolute left-2 bottom-[0.6rem]">
                <img
                  src="/images/email.svg"
                  alt=""
                  height="20px"
                  width="20px"
                />
              </div>
            */
