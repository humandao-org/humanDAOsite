import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { affiliateState } from '../state/atom';
// import SiteMenuMB from "../components/SiteMenuMB";
import SiteMenu from '../components/SiteMenu';
import { registerEmail } from '../lib/affiliate';
import StatusDisplay from '../components/StatusMessage';

export default function Moonbirds({ story }) {
  // const { query } = useRouter();
  const affiliate = useRecoilValue(affiliateState);
  const setAffiliate = useSetRecoilState(affiliateState);
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState({ type: 'none', message: '' });

  const handleEmailSubmit = async (event) => {
    // setError({ success: true, emailMmessage: "" }); // Resetting a previous error if any
    event.preventDefault();
    let payload = {
      mailing: {
        email: email,
        category: 'panft',
      },
    };
    let result = await registerEmail(payload);
    if (result.success) {
      setStatusMessage({ type: 'success', message: 'Your email address was sucessfully submitted.' });
    } else {
      setStatusMessage({ type: 'error', message: 'A technical problem occurred when submitting your email. Please, try again later!' });
    }
    console.log(result);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const affiliateID = urlSearchParams.get('affiliate');
    setAffiliate((oldData) => ({
      affiliateId: affiliateID,
    }));
  }, []);

  return (
    <div className="bg-gradient-to-b from-moonbirdf to-moonbirdt">
      <Head>
        <meta property="og:title" content="Get Back Your Time With PANFT" />
        <meta property="og:site_name" content="humanDAO" />
        <meta property="og:image" content="https://res.cloudinary.com/daljbo1q0/image/upload/v1660185851/hdao-nft/hdao-moonbirds_thumbnail_xdzjxn.png" />
        <meta name="twitter:image" content="https://res.cloudinary.com/daljbo1q0/image/upload/v1660185851/hdao-nft/hdao-moonbirds_thumbnail_xdzjxn.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#c5bcff" />
        <link rel="icon" href="/HDAO-logo-transp-60x60-1.png" />
        <title>Get Back Your Time With PANFT</title>
      </Head>
      <div className="relative z-10 mx-auto w-full">
        <SiteMenu community="moonbirds">
          <li className="mx-auto md:mx-0">
            <Link href="/deposit?community=moonbirds">
              <a className="block rounded bg-secondary/[0.04] py-2 px-3 text-[15px] font-medium leading-6 tracking-[0.46px] text-secondary">Reserve Now</a>
            </Link>
          </li>
        </SiteMenu>
        <header className="py-16 px-5 lg:pt-52 lg:pb-40">
          <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-between gap-16 lg:flex-row lg:gap-5">
            <div className="w-full max-w-[548px] text-center lg:text-left">
              <h1 className="mb-7 font-primary text-4xl font-extrabold tracking-[0.46px] text-yellow-500 sm:text-5xl md:text-6xl lg:mb-3">Get Back Your Time With PANFT</h1>
              <p className="mb-7 text-xl font-semibold tracking-normal text-white md:text-2xl lg:mb-3">
                This mint functions differently from typical NFT drops due to the service attached. We will be using a reservation system and will only mint and launch the service by achieving a certain amount of reservations. Please make sure to
                read the FAQs below.
              </p>
              <Link href="/deposit?community=moonbirds">
                <a className="mx-auto block w-fit rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-10 md:text-xl lg:mx-0">Reserve your NFT</a>
              </Link>
            </div>
            <div className="w-full max-w-[552px]">
              <img src="https://res.cloudinary.com/daljbo1q0/image/upload/v1660069417/hdao-nft/hdao_x_moonbirds_wsonmq.png" alt="wristband" className="h-auto w-full origin-left object-contain lg:scale-100 lg:transform" />
            </div>
          </div>
        </header>

        <section id="benefit">
          <div className="mx-auto max-w-[800px] space-y-[32px] px-2 py-16 lg:pb-40">
            <h1 className="pt-12 px-8 text-center text-3xl font-bold text-yellow-500 font-primary sm:text-5xl">Community Benefits</h1>
            <div className="px-4 text-left flex mx-a flex-col space-y-[12px] ">
              <p className="text-xl max-w-[800px] md:text-2xl mx-auto text-white text-center font-normal">Because you&#39;re an awesome MoonBird or Oddity you get to make a choice with 10% ($333 USDC) of the mint price</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px] max-w-[300px] md:max-w-[800px] lg:max-w-[1200px] mx-auto shadow-xs rounded-lg px-12 py-8">
              <div className="flex flex-col items-center space-y-[12px] text-center md:space-y-[24px]">
                <img className="max-w-[200px] max-h-[150px]" src="https://res.cloudinary.com/daljbo1q0/image/upload/v1659977826/hdao-nft/65_zfluxq.png"></img>
                <p className="text-xl font-semibold text-white">Rebate it back to me (post mint)</p>
              </div>
              <div className="flex flex-col items-center space-y-[12px] text-center md:space-y-[24px]">
                <img className="max-w-[200px] max-h-[150px]" src="https://res.cloudinary.com/daljbo1q0/image/upload/v1659977827/hdao-nft/66_o5urnu.png"></img>
                <p className="text-xl font-semibold text-white">Feed 650+ kids through Food For Life Global</p>
              </div>
              <div className="flex flex-col items-center space-y-[12px] text-center md:space-y-[24px]">
                <img className="max-w-[200px] max-h-[150px]" src="https://res.cloudinary.com/daljbo1q0/image/upload/v1659977826/hdao-nft/67_aprqoc.png"></img>
                <p className="text-xl font-semibold text-white">Send it to your community treasury</p>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-40 px-5 md:mb-80 ">
          <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-between gap-8 md:flex-row">
            <div className="order-last w-full max-w-[450px] md:order-none">
              <img src="https://res.cloudinary.com/daljbo1q0/image/upload/v1660622143/hdao-nft/coins_kvtpbr.png" alt="image" className="h-auto w-full object-contain" />
            </div>
            <div className="w-full max-w-[700px]">
              <h2 className="mb-8 pb-1 text-3.5xl font-extrabold text-yellow-500 md:mb-16 md:text-5xl">What do I need for the reservation?</h2>

              <ul className="space-y-8">
                <li className="grid grid-cols-[max-content_1fr] gap-3 text-lg font-semibold text-dark md:gap-6">
                  <span>
                    <svg className="mt-1 h-7 w-7 sm:mt-0" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.75 21L18.9167 25.1667L27.25 16.8333M39.75 21C39.75 31.3553 31.3553 39.75 21 39.75C10.6447 39.75 2.25 31.3553 2.25 21C2.25 10.6447 10.6447 2.25 21 2.25C31.3553 2.25 39.75 10.6447 39.75 21Z"
                        stroke="#FFFFFF"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-white">You will need 3,333 USDC, USDT, or DAI.</span>
                </li>
                <li className="grid grid-cols-[max-content_1fr] gap-3 text-lg font-semibold text-dark md:gap-6">
                  <span>
                    <svg className="mt-1 h-7 w-7 sm:mt-0" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.75 21L18.9167 25.1667L27.25 16.8333M39.75 21C39.75 31.3553 31.3553 39.75 21 39.75C10.6447 39.75 2.25 31.3553 2.25 21C2.25 10.6447 10.6447 2.25 21 2.25C31.3553 2.25 39.75 10.6447 39.75 21Z"
                        stroke="#FFFFFF"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-white">You can reserve on Polygon chain or Ethereum mainnet.</span>
                </li>
                <li className="grid grid-cols-[max-content_1fr] gap-3 text-lg font-semibold text-dark md:gap-6">
                  <span>
                    <svg className="mt-1 h-7 w-7 sm:mt-0" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.75 21L18.9167 25.1667L27.25 16.8333M39.75 21C39.75 31.3553 31.3553 39.75 21 39.75C10.6447 39.75 2.25 31.3553 2.25 21C2.25 10.6447 10.6447 2.25 21 2.25C31.3553 2.25 39.75 10.6447 39.75 21Z"
                        stroke="#FFFFFF"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-white">Have some MATIC or ETH to pay for gas.</span>
                </li>
                <li className="grid grid-cols-[max-content_1fr] gap-3 text-lg font-semibold text-dark md:gap-6">
                  <span>
                    <svg className="mt-1 h-7 w-7 sm:mt-0" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.75 21L18.9167 25.1667L27.25 16.8333M39.75 21C39.75 31.3553 31.3553 39.75 21 39.75C10.6447 39.75 2.25 31.3553 2.25 21C2.25 10.6447 10.6447 2.25 21 2.25C31.3553 2.25 39.75 10.6447 39.75 21Z"
                        stroke="#FFFFFF"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-white">PANFT will NOT mint/launch until 400 reservations are received.</span>
                </li>
                <li className="grid grid-cols-[max-content_1fr] gap-3 text-lg font-semibold text-dark md:gap-6">
                  <span>
                    <svg className="mt-1 h-7 w-7 sm:mt-0" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.75 21L18.9167 25.1667L27.25 16.8333M39.75 21C39.75 31.3553 31.3553 39.75 21 39.75C10.6447 39.75 2.25 31.3553 2.25 21C2.25 10.6447 10.6447 2.25 21 2.25C31.3553 2.25 39.75 10.6447 39.75 21Z"
                        stroke="#FFFFFF"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-white">Any time prior you can withdraw your funds/reservation and give up your spot.</span>
                </li>
                <li className="grid grid-cols-[max-content_1fr] gap-3 text-lg font-semibold text-dark md:gap-6">
                  <span>
                    <svg className="mt-1 h-7 w-7 sm:mt-0" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.75 21L18.9167 25.1667L27.25 16.8333M39.75 21C39.75 31.3553 31.3553 39.75 21 39.75C10.6447 39.75 2.25 31.3553 2.25 21C2.25 10.6447 10.6447 2.25 21 2.25C31.3553 2.25 39.75 10.6447 39.75 21Z"
                        stroke="#FFFFFF"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-white">PANFT mints on Polygon and will be sent to your reservation address ON POLYGON even if your reservation was made on Ethereum. Read FAQ for details. </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="faqs" className="px-5 pb-40">
          <h2 className="mb-14 text-center text-3.5xl font-extrabold leading-none text-yellow-500 md:mb-28 md:text-5xl">FAQs</h2>

          <div className="mx-auto w-full max-w-[870px] space-y-12 md:space-y-20">
            <div className="faq-box group">
              <button
                className="faq-btn cursor-pointer grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-white md:text-3.5xl"
                onClick={(evt) => {
                  evt.target.parentNode.parentNode.toggleAttribute('open');
                }}
              >
                <span>What chain will the PANFT use?</span>
                <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-white opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                <p>
                  The NFT will be deployed on the Polygon chain. The main reason for this is the utility of PANFT. On Ethereum mainnet it may require high gas fees for sales, renting and minting. To make things easier we have allowed people to
                  reserve PANFT on either chain, Polygon or Ethereum mainnet.
                </p>
                <p className="pt-4">
                  <strong>But once PANFT mints/launches it will be sent to the address used for the reservation -- ON POLYGON -- regardless if the reservation was made on Ethereum mainnet.</strong> You have used that address on mainnet, therefore,
                  the same address exists on Polygon as well and you have control of it too. You only have to connect your wallet to Polygon chain to see and use your PANFT.
                </p>
                <p className="pt-4">
                  If using Metamask,{' '}
                  <a className="underline hover:text-blue-500" href="https://bit.ly/hdao-tokens" target="_blank" rel="noreferrer">
                    here
                  </a>{' '}
                  is a tutorial on connecting to the Polygon chain.
                </p>
              </div>
            </div>

            <div className="faq-box group">
              <button
                className="faq-btn cursor-pointer grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-white md:text-3.5xl"
                onClick={(evt) => {
                  evt.target.parentNode.parentNode.toggleAttribute('open');
                }}
              >
                <span>What will it cost to mint?</span>
                <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-white opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                <p>Remember PANFT is a membership and service, not a PFP project. Since there are no ongoing costs to the holders we need to ensure sustainability of the program. Therefore, we cannot mint 10k at low/no cost.</p>
                <p className="pt-4">
                  We will be utilizing a reservation smart contract that will allow you to reserve a PANFT by committing the full mint price, $3,333. The funds are in a escrow style smart contract and you can withdraw your funds and give up your spot
                  in line anytime prior to mint.
                </p>
                <p className="pt-4">
                  <strong>
                    Our benchmark for the genesis mint is 400 reservations. Once 400 reservations are received, the NFTs can be minted and service will begin shortly thereafter. If there is large demand and we have enough PAs onboarded, we reserve
                    the right to extend the genesis batch (by a few hundred) to more than 400 before mint.
                  </strong>
                </p>
                <p className="pt-4">DYK the &#34;3&#39;s&#34; in the mint price represent the symbiotic relationship of the parties involved—the holder, DAO, and PA.</p>
              </div>
            </div>

            <div className="faq-box group">
              <button
                className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-white md:text-3.5xl"
                onClick={(evt) => {
                  evt.target.parentNode.parentNode.toggleAttribute('open');
                }}
              >
                <span>How many NFTs are available?</span>
                <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-white opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                <p>
                  PANFT will be very limited. Our benchmark for the genesis mint is 400 reservations. Once 400 reservations are received, the NFTs can be minted and service will begin shortly thereafter. From that point on there will be a daily
                  auction for a single PANFT. If there is large demand and we have enough PAs onboarded, we reserve the right to extend the genesis batch (by a few hundred) to more than 400 before mint.
                </p>
                <p className="pt-4">
                  <span className="font-bold">The genesis mint is the only time there will be a set fee for PANFTs. </span>The daily auctions will start at the genesis mint price ($3,333) and demand will dictate the winning bid.
                </p>
                <p className="pt-4">From the genesis mint we will test and improve the application and service before scaling up and offering more NFTs in batch auctions. </p>
              </div>
            </div>

            <div className="faq-box group">
              <button
                className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-white md:text-3.5xl"
                onClick={(evt) => {
                  evt.target.parentNode.parentNode.toggleAttribute('open');
                }}
              >
                <span>What are the features and benefits of the NFT?</span>
                <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-white opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                <p className="italic">Tokenomics: fees from PANFT mints, rents, sales distributions:</p>
                <ul className="mx-auto list-disc pt-6 pl-4">
                  <li>40% PA pool (gig workers)</li>
                  <li>40% hDAO treasury</li>
                  <li>10% PANFT token holders</li>
                  <li>10% HDAO buyback</li>
                </ul>
                <p className="pt-6">That is right, PANFT holders will collect a portion of the fees 💪</p>
                <p className="pt-6 italic">Additional PANFT features:</p>
                <ul className="mx-auto list-disc pt-6 pl-4">
                  <li>Extremely limited</li>
                  <li>CC0 for design and IP (more to come on this)</li>
                  <li>Shareable. Whether an individual or an organisation, you can share the weekly energy with your family or employees.</li>
                </ul>
              </div>
            </div>

            <div className="faq-box group">
              <button
                className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-white md:text-3.5xl"
                onClick={(evt) => {
                  evt.target.parentNode.parentNode.toggleAttribute('open');
                }}
              >
                <span>Why do we have to hodl or stake HDAO?</span>
                <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-white opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                <p>
                  Activating the NFT by holding or staking HDAO helps us forecast demand for the PAs and ensure enough resources are available to complete tasks quickly. Remember, you must hodl or be staking at least 10,000 HDAO from the same address
                  as the PANFT.
                </p>
                <p className="pt-4">Holding and using HDAO benefits the underserved communities making up the humanDAO, grants staking rewards (get more $HDAO), and you can participate in governance as a true DAO member.</p>
                <p className="pt-4">From the genesis mint we will test and improve the application and service before scaling up and offering more NFTs in batch auctions. </p>
                <p className="pt-4">
                  <a className="underline hover:text-blue-500" href="https://app.humandao.org/buyhdao" target="_blank" rel="noreferrer">
                    Buy HDAO here
                  </a>
                </p>
                <p className="pt-4">
                  <a className="underline hover:text-blue-500" href="https://app.humandao.org/dashboard" target="_blank" rel="noreferrer">
                    Visit our Dashboard for DAO metrics
                  </a>
                </p>
              </div>
            </div>

            <div className="faq-box group">
              <button
                className="faq-btn grid w-full grid-cols-[1fr_max-content] gap-2 text-left text-base font-bold leading-none text-white md:text-3.5xl"
                onClick={(evt) => {
                  evt.target.parentNode.parentNode.toggleAttribute('open');
                }}
              >
                <span>What is the design/art for the NFT?</span>
                <svg className="block h-6 w-6 transform transition-all duration-200 group-open:rotate-180 md:h-8 md:w-8" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.75 9.677L15 17.2036L6.25 9.677" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="pointer-events-none invisible max-h-0 text-sm font-medium leading-[30px] text-white opacity-0 transition-all duration-300 group-only:opacity-100 group-open:pointer-events-auto group-open:visible group-open:mt-4 group-open:max-h-[1080px] group-open:opacity-100 md:text-xl md:group-open:mt-9">
                <p>
                  Keep in mind this is not a PFP or Avatar project. It is a membership NFT granting the holder use of a service (among other beneficial tokenomics). So while the artwork doesn&#39;t convey identity we have something wonderful planned.
                </p>
                <p className="pt-4">
                  The art will be determined in a major web3 design competition hDAO will be holding very soon. We have dedicated $20k in prizes, so if you are an artist or designer make sure to follow our{' '}
                  <a className="underline hover:text-blue-500" href="https://twitter.com/humanDAO" target="_blank" rel="noreferrer">
                    Twitter
                  </a>
                  , subscribe to our{' '}
                  <a className="underline hover:text-blue-500" href="https://medium.com/@TheHumanDAO" target="_blank" rel="noreferrer">
                    blog
                  </a>
                  , or join our{' '}
                  <a className="underline hover:text-blue-500" href="https:/discord.com/invite/humandao" target="_blank" rel="noreferrer">
                    Discord
                  </a>{' '}
                  for the kickoff.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact pb-12">
          <div className="mx-auto flex w-full max-w-[900px] flex-wrap px-5">
            <div className="min-w-[250px] flex-1 overflow-hidden rounded-lg px-5 pt-8 pb-8 text-center shadow-circle bg-gradient-to-b from-moonbirdt to-moonbirdg">
              <h3 className="mb-2 text-3.5xl font-bold leading-none text-white">Stay updated on PANFT</h3>
              <form onSubmit={handleEmailSubmit}>
                <input required placeholder="Email address" type="email" className=" text-center bg-slate-50 rounded-md shadow-sm w-2/4 mt-4 px-4 py-4" onChange={(event) => setEmail(event.target.value)}></input>
                <button className="mx-auto mt-8 block w-fit rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none sm:px-10 md:text-xl">Notify me</button>
                <StatusDisplay statusMessage={statusMessage} resetStatus={() => setStatusMessage({ type: 'none', message: '' })}></StatusDisplay>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
