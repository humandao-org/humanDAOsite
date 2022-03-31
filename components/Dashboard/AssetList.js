// import { BlockList } from "net";
import React from "react";
import { sbEditable } from "@storyblok/storyblok-editable";

const AssetList = ({ blok }) => (
  <div className="flex flex-wrap text-base rounded-xl p-2" {...sbEditable(blok)}>
    <div className="Card-1 bg-yellow-300 rounded-md p-2 w-full md:inline-flex">
      <div className="md:ml-2 flex-col inline-flex w-full">
        <p className="font-play uppercase text-2xl text-center md:text-left">
          {blok.label}
        </p>
        <div className="overflow-auto rounded-lg shadow-md">
          <table className="w-full divide-y divide-gray-200 text-center">
            <thead className="bg-gray-50">  
              <tr className="">
                <th>Project</th>
                <th>Investment Ratio</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blok.entries
                ? blok.entries.map((entry) => (
                  <tr key={entry._uid}>
                    <td>{entry.label}</td>
                    <td>{entry.ratio}%</td>
                    <td>${Number(entry.value).toLocaleString()}</td>
                  </tr>
                ))
              : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>                      
);

export default AssetList;