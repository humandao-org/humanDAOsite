// import { BlockList } from "net";
import React from "react";
import { sbEditable } from "@storyblok/storyblok-editable";

const Milestones = ({ blok }) => (
  <div>
      <section className="Milestones bg-purple-200 rounded md:mx-24 lg:mx-32 m-8 mt-0 p-4" {...sbEditable(blok)}>
      <h1 className="font-bungee font-bold text-3xl text-center md:text-left">
        {blok.label}
      </h1>
      <div className={`grid grid-cols-${blok.cols ? blok.cols : '1'} md:grid-cols-${blok.cols_md ? blok.cols_md : '1'} lg:grid-cols-${blok.cols_lg ? blok.cols_lg : '1'} gap-2 md:gap-5 lg:gap-2`}>
        {blok.blocks
            ? blok.blocks.map((milestone) => (
              <div className="p-2" key={milestone._uid}>
                <div className="Card-1 bg-white rounded-md p-2 w-full justify-center md:inline-flex">
                  <div className="align-center">
                  <img
                    className="mx-auto bg-white rounded-full h-20 w-20 text-center md:justify-center"
                    src={milestone.image.filename}
                  ></img>
                  </div>
                  <div className="md:ml-2 md:flex-col">
                    <p className={`font-play font-bold text-${milestone.label_size}xl text-center justify-center`}>
                      {milestone.label}
                    </p>
                    <p className="font-press-start font-bold text-3xl md:text-5xl text-center justify-center">
                      {Number(milestone.value).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
          {/* HDAO Milestones */}
          {/*
              <div className="flex p-2 flex-wrap">
                <div className="Card-1 bg-yellow-300 rounded-md p-2 w-full text-center justify-center flex-wrap md:inline-flex">
                  <img
                    className="bg-white rounded-full h-24 w-24 justify-center"
                    src="https://res.cloudinary.com/daljbo1q0/image/upload/v1647269020/hdao-dashboard/graduationcap_1_cumw3d.png"
                  ></img>
                  <div className="md:ml-2 text-center justify-center md:flex-col">
                    <p className="font-play font-bold text-3xl text-center justify-center">
                      Scholars
                    </p>
                    <p className="font-press-start font-bold text-3xl md:text-5xl text-center justify-center">
                      1000
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex p-2">
                <div className="Card-1 bg-yellow-300 rounded-md p-2 w-full text-center justify-center flex-wrap md:inline-flex">
                  <img
                    className="bg-white rounded-full h-24 w-24 justify-center"
                    src="https://res.cloudinary.com/daljbo1q0/image/upload/v1647341230/hdao-dashboard/meal_rc3bvd.png"
                  ></img>
                  <div className="md:ml-2 text-center justify-center md:flex-col">
                    <p className="font-play font-bold text-2xl text-center justify-center">
                      Meals Provided
                    </p>
                    <p className="font-press-start font-bold text-3xl md:text-5xl text-center justify-center">
                      1200
                    </p>
                  </div>
                </div>
              </div>
          */}
      </div>
    </section>
  </div>
);

export default Milestones;