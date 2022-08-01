import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Reservation({ story }) {
  const { query } = useRouter();

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
                  <a href="#" className="text-[15px] font-medium text-black hover:underline">
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
                <li>
                  <Link href="mailto:hdao.helpdesk@gmail.com" className="text-[15px] font-medium">
                    <a className="text-black hover:underline">Contact</a>
                  </Link>
                </li>
                <li className="mx-auto md:mx-0">
                  <Link href="https://ambassador.humandao.org">
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

        <section className="px-5 lg:pt-20 lg:pb-24">
          <div className="mx-auto w-full max-w-[1110px]">
            <div className="mx-auto mb-16 flex w-full max-w-[762px] flex-col items-center justify-between gap-6 rounded-[10px] bg-white px-9 pt-9 pb-14 shadow-box md:flex-row">
              <div className="w-full max-w-[391px]">
                <h3 className="mb-8 text-2xl font-semibold leading-8 -tracking-[0.45px]">Thank you for your reservation!</h3>
                <ul className="space-y-8">
                  <li className="text-sm -tracking-default">
                    <span className="mb-1 block font-bold uppercase text-dark/40">timestamp</span>
                    <span className="font-medium text-dark">December 21, 2022 8:32:34 (UTC+2)</span>
                  </li>

                  <li className="text-sm -tracking-default">
                    <span className="mb-1 block font-bold uppercase text-dark/40">owner</span>
                    <span className="break-words font-medium text-dark">0xE0De29a77c58Db586F61FAC2e019F1A0A12D6D54</span>
                  </li>

                  <li className="text-sm -tracking-default">
                    <span className="mb-1 block font-bold uppercase text-dark/40">reservation spot</span>
                    <span className="font-medium text-dark">#1234</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/panft-reservation">
                    <a className="hover:underline font-bold hover:text-blue-400">Return to homepage</a>
                  </Link>
                </div>
              </div>
              <div className="order-first w-full max-w-[400px] sm:order-none">
                <img src="https://res.cloudinary.com/daljbo1q0/image/upload/v1659339164/hdao-nft/123_kzuttx.png" alt="Checked" className="h-auto max-w-xs w-80 mx-auto object-contain" />

                <div className="mx-auto grid grid-row-2 text-center">
                  <Link href="https://ambassador.humandao.org">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="mx-auto text-center mb-2 w-2/3 rounded-full hover:bg-accent-purple hover:text-white px-2 py-2 text-base font-semibold text-black border-accent-purple border-2 transition-all duration-200 md:px-2 md:text-xs"
                    >
                      Become an Ambassador
                    </a>
                  </Link>
                  <Link href="http://twitter.com/share?text=I've reserved a PANFT thanks to @humandao. Get yours now at&url=https://reserve.humandao.org.&hashtags=panft">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="mx-auto text-center mb-2 w-2/3 rounded-full hover:bg-accent-purple hover:text-white px-2 py-2 text-base font-semibold text-black border-accent-purple border-2 transition-all duration-200 md:px-2 md:text-xs"
                    >
                      Tweet your support
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
