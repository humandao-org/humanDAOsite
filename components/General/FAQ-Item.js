import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const FAQItem = ({ blok }) => (
<div>
  <div className="flex flex-row border-2 border-r-0 border-l-0 border-b-0 border-solid border-[#DEE1E6FF]">
    <div className="flex flex-col py-7 space-y-3 relative w-full">
      <div className="question-title text-xl font-bold pr-12">
        { blok.question }
      </div>
      <input type="checkbox" className="peer absolute right-[2px] top-3 h-[36px] w-[36px] opacity-0 cursor-pointer z-10"/>
      <div className="bg-[#ececec] p-3 rounded-full transition-transform duration-500 rotate-0 peer-checked:rotate-180 absolute right-[1.5px] top-3">
        <img
          src="/images/arrow-down.svg"
          style={{ width:'16px', height: '16px'}}
        />
      </div>
      <div className="text-[#919191FF] !mt-0 peer-checked:!mt-3 max-h-0 overflow-hidden transition-all duration-300 ease-in-out peer-checked:max-h-[30rem] max-w-[80%]">
        { blok.answer }
      </div>
    </div>
  </div>
</div>
);
 
export default FAQItem;

