// import { BlockList } from "net";
import React from "react";
import { sbEditable } from "@storyblok/storyblok-editable";

const AssetList = ({ blok }) => (
  <div className="flex flex-wrap text-base rounded-xl" {...sbEditable(blok)}>
    <div className="Card-1 rounded-md w-full md:inline-flex">
      <div className="md:ml-2 flex-col inline-flex w-full">
        <p className="font-sans uppercase text-2xl font-semibold text-center md:text-left">
          {blok.label}
        </p>
        <div className="overflow-auto rounded-lg">
          <table className="bg-white w-full divide-y divide-gray-200 text-center">
            <thead className="">  
              <tr className="text-left">
                <th className="px-2">Asset</th>
                <th className="px-2">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blok.entries
                ? blok.entries.map((entry) => (
                  <tr key={entry._uid} className="text-left">
                    <td className="px-2">{entry.label}</td>
                    <td className="px-2">{Number(entry.value).toLocaleString()}</td>
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