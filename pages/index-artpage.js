import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import SiteMenuArt from "../components/SiteMenu";

export default function Artpage({ story }) {

  return (
    <div className="">
      <Head>
        <meta property="og:title" content="The biggest art contest in Web3" />
        <meta property="og:site_name" content="humanDAO" />
        <meta property="og:image" content="https://res.cloudinary.com/daljbo1q0/image/upload/v1659948101/hdao%20art%20contest/Screen_Shot_2022-08-08_at_4.22.07_PM_dlnubs.png" />
        <meta name="description" content="Craft the design and art for the humanDAO's Pocket Assistant NFTs." />
        <meta name="twitter:image" content="https://res.cloudinary.com/daljbo1q0/image/upload/v1659948101/hdao%20art%20contest/Screen_Shot_2022-08-08_at_4.22.07_PM_dlnubs.png" />
        <meta name="twitter:description" content="Craft the design and art for the humanDAO's Pocket Assistant NFTs." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#c5bcff" />
        <link rel="icon" href="/HDAO-logo-transp-60x60-1.png" />
        <title>The biggest art contest in Web3</title>
      </Head>
      <SiteMenuArt>
          <li className="mx-auto md:mx-0">
            <Link href="https://forms.gle/4bqRcFNwGrWkWjoe7">
              <a target="_blank" rel="noopener noreferrer" className="block rounded bg-secondary/[0.04] py-2 px-3 text-[15px] font-medium leading-6 tracking-[0.46px] text-secondary">Enter Contest</a>
            </Link>
          </li>
        </SiteMenuArt>
      <section className="h-[500px] bg-heroimg bg-cover bg-center">
        <div className="grid min-h-full place-items-center -space-y-20 text-center">
          <div className="max-w-[1000px] px-2">
            <p className="lg:text-7.5xl pt-12 text-4xl font-extrabold text-rose-400 drop-shadow-xl sm:px-20 sm:text-5xl md:text-7xl">The Biggest Art Contest In Web3</p>
            <p className="mt-2 px-2 md:px-36 text-black lg:text-xl">Craft the design and art for humanDAO&#39;s Pocket Assistant NFTs</p>
            <p className="mt-2 px-2 md:px-36 text-black lg:text-xl">Ends midnight UTC on Sunday July 24th</p>
            <div className="mt-8 text-center">
              <a href="https://forms.gle/4bqRcFNwGrWkWjoe7" target="_blank" rel="noreferrer noopener" className="w-12 rounded-full bg-white px-8 py-4 font-semibold text-black hover:bg-red-400 hover:text-white">
                {" "}
                Enter Contest{" "}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fff6fb]">
        <div className="mx-auto max-w-[400px] md:max-w-[800px] lg:max-w-[1200px] space-y-[32px] px-2">
          <h1 className="pt-12 px-8 text-center text-3xl font-bold text-black drop-shadow-sm sm:text-5xl">Rewards Pool</h1>
          <div className="grid grid-cols-1 gap-[32px] md:grid-cols-3 bg-red-100/80 shadow-xs rounded-lg px-4 py-8">
            <div className="flex flex-col items-center space-y-[12px] text-center md:space-y-[24px]">
              <Image width="200" height="200" className="max-w-[200px]" src="https://res.cloudinary.com/daljbo1q0/image/upload/v1659712040/hdao%20art%20contest/60_mmehr3.png"></Image>
              <p className="text-xl font-semibold">$1000 USDC each for the Top 10 Contestants</p>
            </div>
            <div className="flex flex-col items-center space-y-[12px] text-center md:space-y-[24px]">
              <img className="max-w-[200px] px-8 py-8 rounded-full" src="https://lh3.googleusercontent.com/M3yJrT9TRLmE8sZb8TjyAbDJYBCoCWFFXGXd61G7d5pDESUPfGVocjmg4V9JlyGCr9ENri36cisKdagm6h86548W5hmCva2kQ2rC_Q=s0"></img>
              <p className="text-xl font-semibold">Moonbirds Oddities NFT for Top 5 Contestants</p>
            </div>
            <div className="flex flex-col items-center space-y-[12px] text-center md:space-y-[24px]">
              <Image width="200" height="200" className="max-w-[200px]" src="https://res.cloudinary.com/daljbo1q0/image/upload/v1659712040/hdao%20art%20contest/59_k8qzkm.png"></Image>
              <p className="text-xl font-semibold">$10,000 USDC prize to the winner</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fff6fb]">
        <div className="mx-auto max-w-[1200px] space-y-[32px] px-2">
          <h1 className="pt-12 px-8 text-center text-3xl font-bold text-black drop-shadow-sm sm:text-5xl">Why join?</h1>
          <div className="grid grid-cols-1 gap-[32px] md:grid-cols-2">
            <div className="flex flex-col items-center space-y-[12px] text-center md:space-y-[24px]">
              <Image width="500" height="500" className="max-w-250 lg:max-w-[500px]" src="https://res.cloudinary.com/daljbo1q0/image/upload/v1659949993/hdao%20art%20contest/4-frame_ob18yt.png"></Image>
            </div>
            <div className="px-4 text-left flex items-center flex-col space-y-[12px] md:pt-12 lg:pt-32">
              <p className="text-xl md:text-2xl font-normal">Your art style can spotlight Pocket Assistants, who are people in underserved communities with the opportunities enabled by crypto, web3, and humanDAO.</p>
              <p className="text-xl md:text-2xl font-normal">Whether it&#39;s a PFP, GIF, or object design, your goal is to make art that is desirable to hold for aesthetics and functionality.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="criteria" className="bg-[#fff6fb]">
        <div className="mx-auto max-w-[1200px] space-y-[32px] px-2">
          <h1 className="pt-12 px-8 text-center text-3xl font-bold text-black drop-shadow-sm sm:text-5xl">Judging Criteria</h1>
          <div className="px-4 text-left flex mx-a flex-col space-y-[12px] ">
            <p className="text-xl md:text-2xl mx-auto font-normal">We are searching for a design that will bring together the ideas of:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[32px] max-w-[400px] md:max-w-[800px] lg:max-w-[1200px] mx-auto bg-red-100/80 shadow-xs rounded-lg px-12 py-8">
            <div className="flex flex-col items-center space-y-[12px] text-center md:space-y-[24px]">
              <img className="max-w-[200px] max-h-[150px]" src="https://res.cloudinary.com/daljbo1q0/image/upload/v1652688154/hdao-nft/13_ytevpe.png"></img>
              <p className="text-xl font-semibold">NFT-as-a-service, a productivity tool and membership</p>
            </div>
            <div className="flex flex-col items-center space-y-[12px] text-center md:space-y-[24px]">
              <img className="max-w-[200px] max-h-[150px]" src="https://res.cloudinary.com/daljbo1q0/image/upload/v1655789504/hdao-nft/19_yhdazc.png"></img>
              <p className="text-xl font-semibold">Time saving tool for busy DAOs and entrepreneurs</p>
            </div>
            <div className="flex flex-col items-center space-y-[12px] text-center md:space-y-[24px]">
              <img className="max-w-[200px] max-h-[150px]" src="https://res.cloudinary.com/daljbo1q0/image/upload/v1653369892/hdao-nft/18_ta8pvr.png"></img>
              <p className="text-xl font-semibold">A fair and inclusive opportunity</p>
            </div>
            <div className="flex flex-col items-center space-y-[12px] text-center md:space-y-[24px]">
              <img className="max-w-[250px] max-h-[150px]" src="https://res.cloudinary.com/daljbo1q0/image/upload/v1652625195/hdao-nft/22_rekqjr.png"></img>
              <p className="text-xl font-semibold">Pathway for new people to enter web3 and crypto</p>
            </div>
          </div>
        </div>
      </section>

      <section id="enter" className="bg-[#fff6fb]">
        <div className="mx-auto max-w-[1200px] space-y-[32px] px-2">
          <h1 className="pt-12 px-8 text-center text-3xl font-bold text-black drop-shadow-sm sm:text-5xl">How to enter</h1>
          <div className="px-4 text-left flex mx-a flex-col space-y-12">
            <p className="text-xl md:text-2xl mx-auto font-normal">
              Submissions must done through our Google form together with your Twitter handle. Successful entries will receive a confirmation e-mail and may be shared on social media (with artist credit).
            </p>
            <ul className="text-xl md:text-2xl mx-auto font-normal list-disc px-8">
              <li>
                <strong>Format:</strong> still image or animation
              </li>
              <li>
                <strong>Deadline:</strong> midnight UTC on Sunday July 24th
              </li>
              <li>
                Further reading: The details, motivations and impact of the project are explored in a series of Medium posts:{" "}
                <span className="underline hover:text-blue-600">
                  <a href="https://medium.com/@TheHumanDAO/a-truly-human-nft-6efb92e5d47a" target="_blank" rel="noreferrer noopener">
                    Project Overview
                  </a>
                </span>
                ,{" "}
                <span className="underline hover:text-blue-600">
                  <a href="https://mirror.xyz/adamdawson.eth/BTE1Iea9AiMkMD3vAM8DS4SfFGORxiT8jUf2cK9ASSk" target="_blank" rel="noreferrer noopener">
                    Project Motivation
                  </a>
                </span>
                ,{" "}
                <span className="underline hover:text-blue-600">
                  <a href="https://medium.com/@TheHumanDAO/a-web3-reimagining-of-the-gig-economy-88c90c7e3524" target="_blank" rel="noreferrer noopener">
                    Project Outcomes
                  </a>
                </span>
                .
              </li>
            </ul>
            <p className="text-xl md:text-2xl mx-auto font-normal">
              Participants are also encouraged to{" "}
              <span className="underline hover:text-blue-600">
                <a href="https://discord.gg/humandao" target="_blank" rel="noreferrer noopener">
                  {" "}
                  join us on Discord
                </a>
              </span>{" "}
              to ask questions, discuss the Pocket Assistants project, and explore the mission and community of humanDAO.
            </p>
          </div>
        </div>
      </section>

      <section id="faqs" className="px-5 bg-[#fff6fb]">
        <h1 className="pt-12 px-8 text-center text-3xl font-bold text-black drop-shadow-sm sm:text-5xl space-y-[12px] py-20">FAQs</h1>

        <div className="mx-auto w-full max-w-[1000px] space-y-12 md:space-y-20 bg-[#fff6fb] text-xl md:text-2xl">
          <div className="faq-box group bg-[#fff6fb]">
            <button
              className="faq-btn cursor-pointer grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-black md:text-3.5xl"
              onClick={(evt) => {
                evt.target.parentNode.parentNode.toggleAttribute("open");
              }}
            >
              <span>How many submissions can each contestant make?</span>
              <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-black opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
              <p>Each person can submit up to 3 pieces of art or designs.</p>
            </div>
          </div>

          <div className="faq-box group bg-[#fff6fb]">
            <button
              className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-black md:text-3.5xl"
              onClick={(evt) => {
                evt.target.parentNode.parentNode.toggleAttribute("open");
              }}
            >
              <span>Where will rewards be distributed?</span>
              <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-black opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
              <p>On Polygon. Please make sure to add your POLYGON address to receive USDC.</p>
            </div>
          </div>

          <div className="faq-box group">
            <button
              className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-black md:text-3.5xl"
              onClick={(evt) => {
                evt.target.parentNode.parentNode.toggleAttribute("open");
              }}
            >
              <span>Are there royalties for the winner?</span>
              <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-black opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
              <p className="">No. The winners will receive prizes, but by submitting your designs you allow us free use of it through CC0. If this is not ideal for you please DO NOT submit and entries. Ultimately, the design/art of the PANFT will be CC0, so you must relinquish any rights once you submit, just as we will when we release the NFT.</p>
            </div>
          </div>

          <div className="faq-box group">
            <button
              className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-black md:text-3.5xl"
              onClick={(evt) => {
                evt.target.parentNode.parentNode.toggleAttribute("open");
              }}
            >
              <span>Which format would you like the NFT submissions in?</span>
              <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-black opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
              <p className="">As the designer, you have the option to select the format you believe works best for the contest. It could be single images, multiple images, but JPEG, PNG, and GIF for image, MP4, MPEG, and AVI for video.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact pt-32 pb-12 bg-[#fff6fb]">
        <div className="mx-auto flex w-full max-w-[900px] flex-wrap px-5">
          <div className="min-w-[250px] flex-1 overflow-hidden rounded-lg px-5 pt-8 pb-8 text-center bg-red-100/80">
            <h3 className="mb-12 text-3.5xl font-bold leading-none text-black">Make art for PANFT and win rewards</h3>
            <a href="https://forms.gle/4bqRcFNwGrWkWjoe7" target="_blank" rel="noreferrer noopener" className="w-12 rounded-full bg-white px-8 py-4 font-semibold text-black hover:bg-red-400 hover:text-white">
              {" "}
              Enter Contest{" "}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
