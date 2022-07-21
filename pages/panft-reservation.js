import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Reservation({ story }) {
  const { query } = useRouter();

  return (
    <div className="bg-[#F8F3F3]">
    <div className="relative z-10 mx-auto w-full overflow-hidden">
        <nav className="relative z-50 px-6 py-6">
            <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between gap-5">
                <a href="#" className="block w-full max-w-[250px] lg:max-w-[300px]"><img src="assets/images/logo-main.svg"
                        alt="Logo main" className="block h-auto w-full object-contain" /></a>

                <a href="#"
                    className="hidden rounded bg-secondary/[0.04] py-2 px-3 text-[15px] font-medium leading-6 tracking-[0.46px] text-secondary sm:block">Become
                    an ambassador</a>
            </div>
        </nav>

        <header className="py-24 px-5 lg:pt-52 lg:pb-80">
            <div
                className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-16 lg:flex-row lg:gap-5">
                <div className="w-full max-w-[548px] text-center lg:text-left">
                    <h1
                        className="mb-7 font-primary text-4xl font-extrabold tracking-[0.46px] text-primary sm:text-5xl md:text-6xl lg:mb-3">
                        Transform your <br className="hidden sm:inline-block" />
                        work with PANFT
                    </h1>
                    <p
                        className="mb-7 text-xl font-semibold leading-[30px] tracking-[-0.54px] text-dark md:text-2xl lg:mb-3">
                        Our NFTs will connect our helpful and enthusiastic community of
                        assistants with busy builders and DAOs big on vision but short on
                        time.
                    </p>
                    <a href="#"
                        className="mx-auto block w-fit rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-10 md:text-xl lg:mx-0">Reserve
                        your spot</a>
                </div>
                <div className="w-full max-w-[552px]">
                    <img src="assets/images/reservation-banner.png" alt="Banner"
                        className="h-auto w-full origin-left object-contain lg:scale-125 lg:transform" />
                </div>
            </div>
        </header>

        <section className="mb-40 px-5 md:mb-80">
            <div className="mx-auto flex w-full max-w-[1195px] flex-col items-center justify-between gap-8 md:flex-row">
                <div className="order-last w-full max-w-[480px] md:order-none">
                    <img src="assets/images/reservation-2.png" alt="image" className="h-auto w-full object-contain" />
                </div>
                <div className="w-full max-w-[700px]">
                    <h2 className="mb-8 pb-1 text-3.5xl font-extrabold leading-none text-primary md:mb-16 md:text-5xl">
                        What do I need to prepare for the reservation?
                    </h2>

                    <ul className="space-y-8">
                        <li
                            className="grid grid-cols-[max-content_1fr] gap-3 text-base font-semibold text-dark md:gap-6 md:text-2xl md:leading-9">
                            <span>
                                <svg className="mt-1 h-7 w-7 sm:mt-0 md:h-10 md:w-10" viewBox="0 0 42 42" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14.75 21L18.9167 25.1667L27.25 16.8333M39.75 21C39.75 31.3553 31.3553 39.75 21 39.75C10.6447 39.75 2.25 31.3553 2.25 21C2.25 10.6447 10.6447 2.25 21 2.25C31.3553 2.25 39.75 10.6447 39.75 21Z"
                                        stroke="#0F0F0F" strokeWidth="4" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span>Prepare 3,333 USDC to the escrow smart contract</span>
                        </li>
                        <li
                            className="grid grid-cols-[max-content_1fr] gap-3 text-base font-semibold text-dark md:gap-6 md:text-2xl">
                            <span>
                                <svg className="mt-1 h-7 w-7 sm:mt-0 md:h-10 md:w-10" viewBox="0 0 42 42" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M14.75 21L18.9167 25.1667L27.25 16.8333M39.75 21C39.75 31.3553 31.3553 39.75 21 39.75C10.6447 39.75 2.25 31.3553 2.25 21C2.25 10.6447 10.6447 2.25 21 2.25C31.3553 2.25 39.75 10.6447 39.75 21Z"
                                        stroke="#0F0F0F" strokeWidth="4" strokeLinecap="round"
                                        strokeLinejoin="round" />
                                </svg>
                            </span>
                            <span>Make sure you have some MATIC to pay for the gas
                                transactions</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section className="px-5 pb-40 md:pb-96">
            <h2 className="mb-14 text-center text-3.5xl font-extrabold leading-none text-primary md:mb-28 md:text-5xl">
                FAQs
            </h2>

            <div className="mx-auto w-full max-w-[870px] space-y-12 md:space-y-20">
                <div className="faq-box group" open>
                    <button
                        className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-black md:text-3.5xl">
                        <span>What is an Ambassador?
                            <img src="assets/images/saluting-face.png"
                                className="inline-block h-7 w-7 object-contain align-middle" alt="" /></span>
                        <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8"
                            viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#111827" strokeWidth="3"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div
                        className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-black opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                        <p>
                            Anyone who wants to spread the word about the Pocket Assistant
                            NFT project to their audience, followers, community, or friends.
                            This is a novel web3 project, giving real-world utility to the
                            holder and also benefits underserved communities. Why wouldn&apos;t
                            you want to share it? 🙃
                        </p>
                    </div>
                </div>

                <div className="faq-box group" open>
                    <button
                        className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-black md:text-3.5xl">
                        <span>How does an Ambassador earn? 📣</span>
                        <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8"
                            viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#111827" strokeWidth="3"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div
                        className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-black opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                        <p>
                            The Ambassador shares their unique PANFT link with their
                            community. Everyone that reserves AND ends up minting a PANFT
                            will earn the Ambassador a % of the mint fee. REMEMBER, just
                            because someone reserves a spot does NOT mean they ended up
                            minting an NFT. People who place reservations can withdraw their
                            funds and give up their spot in line any time before the 500th
                            reservation and the subsequent mint.
                            <strong>PANFT will only launch and be minted after receiving 500
                                reservations.</strong>
                        </p>
                    </div>
                </div>

                <div className="faq-box group" open>
                    <button
                        className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-black md:text-3.5xl">
                        <span>What does an Ambassador earn?
                            <img src="assets/images/coin.png" className="inline-block h-6 w-6 object-contain align-middle"
                                alt="" /></span>
                        <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8"
                            viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#111827" strokeWidth="3"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div
                        className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-black opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                        <p>
                            For every reservation that ends up minting a PANFT through an
                            Ambassador link,
                            <strong>the Ambassador will receive 10% of the mint fee in the
                                underlying token.</strong>
                            For example, if the reservation/mint cost is 3,333 USDC, the
                            referring Ambassadors will receive 333 USDC.
                        </p>
                    </div>
                </div>

                <div className="faq-box group" open>
                    <button
                        className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-black md:text-3.5xl">
                        <span>When does an Ambassador get paid? 🤑 </span>
                        <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8"
                            viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#111827" strokeWidth="3"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <div
                        className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-black opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                        <p>
                            Keep in mind that we don&apos;t know when the mint and launch of
                            PANFT will happen. It could be in 3 days, 3 weeks, or 3 months.
                            It depends on reaching 500 reservations.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </div>
  );
}