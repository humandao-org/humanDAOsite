import Head from "next/head";
import { useState } from "react";
// import { Router } from "react-router-dom";
import { registerAffiliate } from "../lib/affiliate"; 
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
// import {createBrowserHistory} from 'history';

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
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [organization, setorganization] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(() => ({ success: true, emailMmessage: '' }))

  const handleSubmit = async (event) => {
    setError({ success: true, emailMmessage: '' }) // Resetting a previous error if any
    event.preventDefault();
    let affiliate = { 
      affiliate: {
        name, email, organization
      }
    }
    let result = await registerAffiliate(affiliate)
    if (!result.success) {
      setError({ success: false, emailMmessage: result.message })
    } else {
      setError({ success: true, emailMmessage: '' })
      const url = '/ambassador-link?id=' + result.id
      console.log(url)
      router.push(url);
    }
    console.log(result)
  }

  return (
    <div className="bg-[#F8F3F3]">
      <div className="relative z-10 mx-auto w-full overflow-hidden">
        <nav className="relative z-50 px-6 py-6">
          <div
            className="mx-auto flex w-full max-w-[1100px] items-center justify-between gap-5"
          >
            <a href="#" className="block w-full max-w-[250px] lg:max-w-[300px]"
              ><img
                src="assets/images/logo-main.svg"
                alt="Logo main"
                className="block h-auto w-full object-contain"
            /></a>

            <div className="nav-list">
              <ul
                className="flex flex-col gap-4 md:flex-row md:items-center md:gap-12"
              >
                <li>
                  <a
                    href="#"
                    className="text-[15px] font-medium text-black hover:underline"
                    >PANFT site</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[15px] font-medium text-black hover:underline"
                    >FAQs</a
                  >
                </li>
                <li className="mx-auto md:mx-0">
                  <a
                    href="#"
                    className="block rounded bg-secondary/[0.04] py-2 px-3 text-[15px] font-medium leading-6 tracking-[0.46px] text-secondary"
                    >Become an ambassador</a
                  >
                </li>
              </ul>
            </div>

            <button className="btn-nav group md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="h-7 w-7 fill-current group-open:hidden"
              >
                <path
                  d="M0 88C0 74.75 10.75 64 24 64H424C437.3 64 448 74.75 448 88C448 101.3 437.3 112 424 112H24C10.75 112 0 101.3 0 88zM0 248C0 234.7 10.75 224 24 224H424C437.3 224 448 234.7 448 248C448 261.3 437.3 272 424 272H24C10.75 272 0 261.3 0 248zM424 432H24C10.75 432 0 421.3 0 408C0 394.7 10.75 384 24 384H424C437.3 384 448 394.7 448 408C448 421.3 437.3 432 424 432z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className="hidden h-7 w-7 fill-current group-open:block"
              >
                <path
                  d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                />
              </svg>
            </button>
          </div>
        </nav>

        <section className="py-20 px-5 lg:pt-24 lg:pb-56">
          <div className="mx-auto w-full max-w-[1110px]">
            <h1
              className="mb-7 text-center font-primary text-4xl font-extrabold tracking-[0.46px] text-primary sm:text-5xl md:text-6xl"
            >
              Become an ambassador
            </h1>

            <div className="rounded-[10px] bg-white px-8 pt-16 pb-[75px] shadow-box">
              <ul
                className="mx-auto mb-16 flex w-full max-w-sm flex-wrap items-center justify-center gap-x-6 gap-y-3 pb-1 sm:justify-between"
              >
                <li
                  className="text-base font-semibold -tracking-default text-dark/20 open:text-dark md:text-xl md:leading-7"
                  open
                >
                  1. Details
                </li>
                <li
                  className="text-base font-semibold -tracking-default text-dark/20 open:text-dark md:text-xl md:leading-7"
                >
                  2. Ambassador Link
                </li>
              </ul>

              <form
                className="mx-auto w-full max-w-[597px] space-y-7 sm:space-y-9"
                onSubmit={handleSubmit}
              >
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    className="peer block w-full rounded border border-[#333] px-3 py-3 font-secondary text-base font-bold text-black/90 outline-none placeholder:font-normal sm:py-4"
                    onChange={(event) => { setName(event.target.value)}}
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-0 block -translate-y-1/2 transform bg-white p-1 font-secondary text-xs font-normal leading-none tracking-[0.15px] text-black/90 opacity-100 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:font-bold peer-placeholder-shown:opacity-0"
                    >Name</label
                  >
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="Email"
                    placeholder="Email Address"
                    className="peer block w-full rounded border border-[#333] px-3 py-3 font-secondary text-base font-bold text-black/90 outline-none placeholder:font-normal sm:py-4"
                    onChange={(event) => { setEmail(event.target.value)}}
                  />
                  <label
                    htmlFor="Email"
                    className="absolute left-4 top-0 block -translate-y-1/2 transform bg-white p-1 font-secondary text-xs font-normal leading-none tracking-[0.15px] text-black/90 opacity-100 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:font-bold peer-placeholder-shown:opacity-0"
                    >Email Address</label
                  >
                  { !error.success ? 
                  <span className="inline-flex text-sm text-red-700">{ error.emailMmessage }</span>
                  : null }
                </div>

                <div className="relative">
                  <input
                    type="text"
                    id="organization"
                    placeholder="Organization Name"
                    className="peer block w-full rounded border border-[#333] px-3 py-3 font-secondary text-base font-bold text-black/90 outline-none placeholder:font-normal sm:py-4"
                    onChange={(event) => { setorganization(event.target.value)}}
                  />
                  <label
                    htmlFor="organization"
                    className="absolute left-4 top-0 block -translate-y-1/2 transform bg-white p-1 font-secondary text-xs font-normal leading-none tracking-[0.15px] text-black/90 opacity-100 transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:bg-transparent peer-placeholder-shown:font-bold peer-placeholder-shown:opacity-0"
                    >Organization Name</label
                  >
                </div>
                <div className="pt-2.5">
                  <button
                    type="submit"
                    className="mx-auto block w-fit rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-10 md:text-xl"
                  >
                    Get your affiliate link
                  </button>
                </div>
              </form>
              { !error.success ? 
                <div className="bg-red-100 rounded-lg py-5 px-6 mt-7 text-base text-red-700 mb-3" role="alert">
                  The submission was unsuccessful. See text in red above.
                </div>
              : null }
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