import DynamicComponent from "../DynamicComponent";
import { sbEditable } from "@storyblok/storyblok-editable";

const Section = ({ blok }) => (
  <div>
    <section className="Section bg-purple-200 rounded md:mx-24 lg:mx-32 m-4 mt-0 p-4" {...sbEditable(blok)}>
      <h1 className="font-bungee font-bold text-3xl text-center md:text-left">
        {blok.header}
      </h1>
      <div className={`grid grid-cols-${blok.cols ? blok.cols : '1'} md:grid-cols-${blok.cols_md ? blok.cols_md : '1'} lg:grid-cols-${blok.cols_lg ? blok.cols_lg : '1'} gap-2 md:gap-5 lg:gap-2 p-5`}>
        {blok.blocks
        ? blok.blocks.map((blok) => (
            <DynamicComponent blok={blok} key={blok._uid} />
          ))
        : null}
      </div>
    </section>
  </div>
);
 
export default Section;