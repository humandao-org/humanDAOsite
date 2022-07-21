import Head from "next/head";
import Link from "next/link";

import { useStoryblokState, getStoryblokApi, StoryblokComponent } from "@storyblok/react";

export default function Ambassador({ story }) {
  /*
  story = useStoryblokState(story);
 
  const getStyle = () => {
    const style = { 
      height: '100%', 
    }
    if (story.content.bg_image) {
      style.backgroundImage = `url(${story.content.bg_image.filename})`
    }
    if (story.content.bg_color) {
      style.backgroundColor = story.content.bg_color
    }
    return style
  }
  */

  return (
    <div className="bg-[#F8F3F3]">
      <div className="relative z-10 mx-auto w-full">
        <nav className="sticky z-20 top-0 px-6 py-6 bg-[#F8F3F3]">
          <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between gap-5">
            <a className="block w-full max-w-[250px] lg:max-w-[300px]">
              <object type="image/svg+xml" data="assets/images/logo-main.svg" alt="Logo main" className="w-full h-auto object-contain">
                svg-animation
              </object>
            </a>

            <div className="nav-list">
              <ul className="flex flex-col gap-4 md:flex-row md:items-center md:gap-12">
                <li>
                  <a href="https://ambassador.humandao.org" className="text-[15px] font-medium text-black hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="https://nft.humandao.org" className="text-[15px] font-medium text-black hover:underline">
                    PANFT site
                  </a>
                </li>
                <li>
                  <Link href="#faqs" className="text-[15px] font-medium">
                    <a className="text-black hover:underline">FAQs</a>
                  </Link>
                </li>
                <li className="mx-auto md:mx-0">
                  <Link href="/ambassador-registration">
                    <a className="block rounded bg-secondary/[0.04] py-2 px-3 text-[15px] font-medium leading-6 tracking-[0.46px] text-secondary">Become an Ambassador</a>
                  </Link>
                </li>
              </ul>
            </div>

            <button className="btn-nav group md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-7 w-7 fill-current group-open:hidden">
                <path d="M0 88C0 74.75 10.75 64 24 64H424C437.3 64 448 74.75 448 88C448 101.3 437.3 112 424 112H24C10.75 112 0 101.3 0 88zM0 248C0 234.7 10.75 224 24 224H424C437.3 224 448 234.7 448 248C448 261.3 437.3 272 424 272H24C10.75 272 0 261.3 0 248zM424 432H24C10.75 432 0 421.3 0 408C0 394.7 10.75 384 24 384H424C437.3 384 448 394.7 448 408C448 421.3 437.3 432 424 432z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="hidden h-7 w-7 fill-current group-open:block">
                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
              </svg>
            </button>
          </div>
        </nav>

        <header className="py-32 px-5 lg:pt-52 lg:pb-80">
          <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-between gap-16 lg:flex-row lg:gap-5">
            <div className="w-full max-w-[548px] text-center lg:text-left">
              <h1 className="mb-7 font-primary text-4xl font-extrabold tracking-[0.46px] text-primary sm:text-5xl md:text-6xl lg:mb-3">
                Join the PANFT
                <br className="hidden sm:inline-block" />
                Ambassadors
              </h1>
              <p className="mb-7 text-xl font-semibold leading-[30px] -tracking-default text-dark md:text-2xl lg:mb-3">Support the underserved and get paid to help spread the word about this novel NFT project.</p>
              <Link href="/ambassador-registration">
                <a className="mx-auto block w-fit rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-10 md:text-xl lg:mx-0">Become an Ambassador</a>
              </Link>
            </div>
            <div className="w-full max-w-[552px]">
              <img src="assets/images/panft-ambassador.png" alt="Panft Ambassador" className="h-auto w-full origin-left object-contain lg:scale-125 lg:transform" />
            </div>
          </div>
        </header>

        <section className="mb-40 px-5 md:mb-80">
          <h2 className="mb-14 pb-1 text-center text-3.5xl font-extrabold leading-none text-primary md:mb-24 md:text-5xl">Anyone can join!</h2>

          <div className="mx-auto flex w-full max-w-[1100px] flex-wrap gap-8">
            <div className="min-w-[250px] flex-1 overflow-hidden rounded-lg bg-card bg-cover px-5 pt-8 pb-14 text-center shadow-circle">
              <div className="mx-auto mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#F8F8F8] text-2xl font-extrabold leading-none shadow-circle">✏️</div>
              <h3 className="mb-6 text-3.5xl font-bold leading-none text-black">1. Sign up️</h3>
              <p className="mx-auto w-full max-w-[230px] text-xl font-medium text-black">Start by filling out the form to get your Ambassador link</p>
            </div>

            <div className="min-w-[250px] flex-1 overflow-hidden rounded-lg bg-card bg-cover px-5 pt-8 pb-14 text-center shadow-circle">
              <div className="mx-auto mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#F8F8F8] text-2xl font-extrabold leading-none shadow-circle">✨</div>
              <h3 className="mb-6 text-3.5xl font-bold leading-none text-black">2. Work your magic</h3>
              <p className="w-full text-xl font-medium text-black">Utilize PANFT as something new to share with your community</p>
            </div>

            <div className="min-w-[250px] flex-1 overflow-hidden rounded-lg bg-card bg-cover px-5 pt-8 pb-14 text-center shadow-circle">
              <div className="mx-auto mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#F8F8F8] text-2xl font-extrabold leading-none shadow-circle">💸</div>
              <h3 className="mb-6 text-3.5xl font-bold leading-none text-black">3. Earn and grow</h3>
              <p className="mx-auto w-full max-w-[267px] text-xl font-medium text-black">Earn fees for every person using your link to mint a PANFT</p>
            </div>
          </div>
          <Link href="/ambassador-registration">
            <a href="#" className="mx-auto mt-[72px] block w-fit rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none sm:px-10 md:text-xl">
              Become an Ambassador
            </a>
          </Link>
        </section>

        <section id="faqs" className="faqs px-5 pb-40 md:pb-96">
          <h2 className="mb-14 text-center text-3.5xl font-extrabold leading-none text-primary md:mb-28 md:text-5xl">FAQs</h2>

          <div className="mx-auto w-full max-w-[870px] space-y-12 md:space-y-20">
            <div className="faq-box group" open>
              <button className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-black md:text-3.5xl">
                <span>
                  What is an Ambassador?
                  <img src="assets/images/saluting-face.png" className="inline-block h-7 w-7 object-contain align-middle" alt="" />
                </span>
                <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-black opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                <p>
                  Anyone who wants to spread the word about the Pocket Assistant NFT project to their audience, followers, community, or friends. This is a novel web3 project, giving real-world utility to the holder and also benefits underserved
                  communities. Why wouldn&#39;t you want to share it? 🙃
                </p>
              </div>
            </div>

            <div className="faq-box group" open>
              <button className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-black md:text-3.5xl">
                <span>How does an Ambassador earn? 📣</span>
                <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-black opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                <p>
                  The Ambassador shares their unique PANFT link with their community. Everyone that reserves AND ends up minting a PANFT will earn the Ambassador a % of the mint fee. REMEMBER, just because someone reserves a spot does NOT mean they
                  ended up minting an NFT. People who place reservations can withdraw their funds and give up their spot in line any time before the 400th reservation and the subsequent mint.
                  <strong>PANFT will only launch and be minted after receiving 400 reservations.</strong>
                </p>
              </div>
            </div>

            <div className="faq-box group" open>
              <button className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-black md:text-3.5xl">
                <span>
                  What does an Ambassador earn?
                  <img src="assets/images/coin.png" className="inline-block h-6 w-6 object-contain align-middle" alt="" />
                </span>
                <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-black opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                <p>
                  For every reservation that ends up minting a PANFT through an Ambassador link,
                  <strong>the Ambassador will receive 10% of the mint fee in the underlying token.</strong> For example, if the reservation/mint cost is 3,333 USDC, the referring Ambassadors will receive 333 USDC.
                </p>
              </div>
            </div>

            <div className="faq-box group" open>
              <button className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-black md:text-3.5xl">
                <span>When does an Ambassador get paid? 🤑 </span>
                <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-black opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                <p>Keep in mind that we don&#39;t know when the mint and launch of PANFT will happen. It could be in 3 days, 3 weeks, or 3 months. It depends on reaching 400 reservations.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/*
export async function getStaticProps({ params }) {
  let slug = params.slug ? params.slug.join("/") : "home";
 
  let sbParams = {
    version: "draft", // or 'published'
  };
 
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
  // console.log(data)
  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}
*/

/*
export async function getStaticPaths() {
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get("cdn/links/");
 
  let paths = [];
  Object.keys(data.links).forEach((linkKey) => {
    if (data.links[linkKey].is_folder || data.links[linkKey].slug === "home" || data.links[linkKey].slug === "dashboard") {
      return;
    }
 
    const slug = data.links[linkKey].slug;
    let splittedSlug = slug.split("/");
 
    paths.push({ params: { slug: splittedSlug } });
  });
 
  return {
    paths: paths,
    fallback: false,
  };
}
*/
