import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const FAQItem = ({ blok, parent, first, last, itemno }) => {
  let borderClasses = "border-2 border-solid border-r-0 border-l-0 border-b-0 border-[#DEE1E6FF]";
  let styles = { }
  if (first){
    borderClasses += " border-t-0";
  }

 return (
   <div>
     <div className={`flex flex-row ${borderClasses}`} style={styles}>
       <div className={`flex flex-col relative w-full ${parent.item_classes || 'py-7 space-y-3' }`}>
         <label htmlFor={`checkboxInput${itemno}`}>
            <input type="checkbox" id={`checkboxInput${itemno}`} className={`peer absolute right-[2px] top-3 ${parent.button_sizes || 'h-[36px] w-[36px]'} opacity-0 cursor-pointer z-10`}/>
            <div className={`question-title cursor-pointer ${parent.q_text_classes || 'text-xl font-bold'} pr-12`}>
              { blok.question }
            </div>
            <div className={`${parent.button_classes || 'bg-[#ececec] rounded-full' } ${parent.button_sizes || 'p-3'} transition-transform duration-500 rotate-0 peer-checked:rotate-180 absolute right-[1.5px] top-3`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 256 256">
                  <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" style={{ fill: 'currentColor', width: '100%', height: '100%' }}></path>
                </svg>
                <img
                src="/images/arrow-down.svg"
                style={{ display: 'none', width:'16px', height: '16px'}}
                />
            </div>
            <div className={`${parent.a_text_classes || 'text-[#919191FF]'} !mt-0 peer-checked:!mt-3 max-h-0 overflow-hidden transition-all duration-300 ease-in-out peer-checked:max-h-[30rem] max-w-[80%]`}>
              { blok.answer }
            </div>
          </label>
       </div>
     </div>
   </div>
 );
}

export default FAQItem;

