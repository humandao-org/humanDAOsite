import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

/*
import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react";
*/

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
  const { query } = useRouter();

  const copyURL = function () {
    /* Get the text field */
    var copyText = document.getElementById('affiliateURL');

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    /* Alert the copied text */
    // alert("Copied the text: " + copyText.value);
  };

  return (
    <div className="bg-[#F8F3F3]">
      <div className="relative z-10 mx-auto w-full overflow-hidden">
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
                  <Link href="https://humandao.org">
                    <a target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium text-black hover:underline">
                      HDAO
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="https://nft.humandao.org">
                    <a target="_blank" rel="noopener noreferrer" className="text-[15px] font-medium text-black hover:underline">
                      PANFT
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#faqs" className="text-[15px] font-medium">
                    <a className="text-black hover:underline">FAQs</a>
                  </Link>
                </li>
                <li>
                  <Link href="mailto:hdao.helpdesk@gmail.com?subject=PANFT Ambassadors" className="text-[15px] font-medium">
                    <a className="text-black hover:underline">Contact</a>
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

        <section className="py-20 px-5 lg:pt-24 lg:pb-56">
          <div className="mx-auto w-full max-w-[1110px]">
            <h1 className="mb-6 text-center font-primary text-4xl font-extrabold tracking-[0.46px] text-primary sm:text-5xl md:text-6xl">Become an Ambassador</h1>

            <div className="relative rounded-[10px] bg-white px-8 pt-16 pb-[75px] shadow-box">
              <ul className="mx-auto mb-16 flex w-full max-w-sm flex-wrap items-center justify-center gap-x-6 gap-y-3 pb-1 sm:justify-between">
                <li className="text-base font-semibold -tracking-default text-dark/20 open:text-dark md:text-xl md:leading-7">1. Details</li>
                <li className="text-base font-semibold -tracking-default text-dark/20 open:text-dark md:text-xl md:leading-7" open>
                  2. Ambassador Link
                </li>
              </ul>
              <p className="mb-7 text-center text-xl font-semibold -tracking-default text-dark">Here&#39;s your Ambassador link!</p>
              <div className="mx-auto w-full max-w-[597px] space-y-7 sm:space-y-9">
                <input
                  id="affiliateURL"
                  type="text"
                  defaultValue={'https://nft.humandao.org/?ambassador=' + query.id}
                  readOnly
                  className="block w-full rounded border border-[#333] px-3 py-3 font-secondary text-base font-bold text-black/90 outline-none placeholder:font-normal sm:py-4"
                />

                <div className="pt-2.5">
                  <button type="submit" className="mx-auto block w-fit rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-10 md:text-xl" onClick={copyURL}>
                    Copy
                  </button>
                </div>
              </div>

              <Link href="/">
                <a className="absolute bottom-4 left-1/2 -translate-x-1/2 transform text-sm font-semibold -tracking-default text-dark hover:underline">Return to homepage</a>
              </Link>
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
