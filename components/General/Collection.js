import DynamicComponent from "../DynamicComponent";

const Collection = ({ blok }) => (
    blok.blocks
      ? blok.blocks.map((blok) => (
          <DynamicComponent blok={blok} key={blok._uid} />
        ))
      : null
);
 
export default Collection;