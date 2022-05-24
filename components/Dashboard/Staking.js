// import { BlockList } from "net";
// import React from "react";
import { storyblokEditable } from "@storyblok/react";

const Staking = ({ blok }) => (
  <div {...storyblokEditable(blok)}>
    <p className="text-xl">{blok.header_ethereum}</p>
    <div className="grid grid-cols-2 gap-2 md:gap-5 lg:gap-2">
      <div className="p-2">
        <div className="Card-2 bg-white rounded-md p-2 w-full md:inline-flex">
          <div className="md:ml-2 flex-col inline-flex">
            <p className="font-play uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl">
              APR HDAO-USDC LP     
            </p>
            <p className="font-press-start font-bold text-lg sm:text-xl lg:text-3xl -tracking-24">
              {blok.lp_ethereum}
            </p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <div className="Card-2 bg-white rounded-md p-2 w-full md:inline-flex">
          <div className="md:ml-2 flex-col inline-flex">
            <p className="font-play uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl">
              APR SINGLE SIDED
            </p>
            <p className="font-press-start font-bold text-lg sm:text-xl lg:text-3xl -tracking-24">
              {blok.single_ethereum}
            </p>
          </div>
        </div>
      </div>
    </div>
    <p className="text-xl">{blok.header_polygon}</p>
    <div className="grid grid-cols-2 gap-2 md:gap-5 lg:gap-2">
      <div className="p-2">
        <div className="Card-2 bg-white rounded-md p-2 w-full md:inline-flex">
          <div className="md:ml-2 flex-col inline-flex">
            <p className="font-play uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl">
              APR HDAO-ETH LP    
            </p>
            <p className="font-press-start font-bold text-lg sm:text-xl lg:text-3xl -tracking-24">
              {blok.lp_polygon}
            </p>
          </div>
        </div>
      </div>
      <div className="p-2">
        <div className="Card-2 bg-white rounded-md p-2 w-full md:inline-flex">
          <div className="md:ml-2 flex-col inline-flex">
            <p className="font-play uppercase text-lg sm:text-xl md:text-2xl lg:text-3xl">
              APR SINGLE SIDED
            </p>
            <p className="font-press-start font-bold text-lg sm:text-xl lg:text-3xl -tracking-24">
              {blok.single_polygon}
            </p>
          </div>
        </div>
      </div>
      <p className="italic">{blok.note}</p>
      <p className="text-lg">Stake HDAO here: <a className="text-white font-bold" href={blok.url} rel="noreferrer" target="_blank">humanDAO staking platform.</a></p>
    </div>
  </div>
);

export default Staking;