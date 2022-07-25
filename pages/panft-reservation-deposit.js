import Head from "next/head";
import { useEffect, useState } from "react";
//import { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { ethers } from "ethers";
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"

import { affiliateState } from "../state/atom";

// Infura endpoint
const INFURA_ID = "1dc03bb35a274a3c918f23a0646bcd23"
const jsonRpcEndpoint = `https://mainnet.infura.io/v3/${INFURA_ID}`

export default function Reservation({ story }) {
  const affiliate = useRecoilValue(affiliateState)
  const [provider, setProvider] = useState()
  const [library, setLibrary] = useState();
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [account, setAccount] = useState();
  const [web3modal, setWeb3Modal] = useState();

  const connect = async () => {
    const providerOptions = {

      injected: {
        display: {
          name: "Injected",
          description: "Connect with the provider in your Browser"
        },
        package: null
      },

      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: INFURA_ID, // required
          rpc: {
            1: `https://mainnet.infura.io/v3/${INFURA_ID}`,
            137: "https://polygon-rpc.com",
            80001: `https://polygon-mumbai.infura.io/v3/${INFURA_ID}`
          }
        }
      }
    }
  
    const web3Modal = new Web3Modal({
      // network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions // required
    });
    setWeb3Modal(web3Modal)

    const provider = await web3Modal.connect();
    const library = new ethers.providers.Web3Provider(provider);
    const accounts = await library.listAccounts();
    const network = await library.getNetwork();

    setProvider(provider)
    setLibrary(library);

    if (accounts) setAccount(accounts[0]);
    setChainId(network.chainId);

    console.log('this is run once?')

    // const signer = library.getSigner();
  }
  
  useEffect(() => {
    console.log('here')
    if (web3modal && web3modal.cachedProvider) {
        console.log('and here')
        connect();
    }
  }, [])

  useEffect(() => {

    const refreshState = () => {
      setAccount();
      setChainId();
      setNetwork("");
      // setMessage("");
      // setSignature("");
      // setVerified(undefined);
    };
  
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(parseInt(_hexChainId));
      };

      const handleDisconnect = (error) => {
        web3modal.clearCachedProvider();
        refreshState();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

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
                {/* <li className="mx-auto md:mx-0">
                  <Link href="/panft-reservation-deposit">
                    <a className="block rounded bg-secondary/[0.04] py-2 px-3 text-[15px] font-medium leading-6 tracking-[0.46px] text-secondary">Reserve your NFT</a>
                  </Link>
                </li> */}
                <li>
                    { (!account) && (<div
                        className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block" 
                        onClick={connect}
                    >Connect</div>)
                    }
                </li>
                <li>
                    { chainId && ( <div>
                        <div
                        className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block" 
                        >{ chainId === 1 ? 'Ethereum' : chainId }</div>
                        <div
                        className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block" 
                        >{ account ? (account.substring(0,4) + '...'+ account.substring(account.length-4)) : 'No wallet connected'}</div>
                    </div>
                    ) }
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

        <section className="px-5 py-10 lg:pt-48 lg:pb-24">
          <div className="mx-auto w-full max-w-[1050px]">
            <h1 className="mb-6 font-primary text-4xl font-extrabold tracking-[0.46px] text-primary sm:text-5xl md:text-6xl">Make your reservation</h1>
            <p className="font-medium leading-7 tracking-[0.46px] text-black/60 sm:text-xl lg:text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <div className="mt-11 mb-10 grid w-full grid-cols-1 gap-7 sm:grid-cols-2 lg:gap-12">
              <div className="rounded-[10px] bg-white px-7 pt-6 pb-14 shadow-account">
                <h3 className="mb-10 font-primary text-lg font-extrabold tracking-[0.46px] text-black lg:text-2xl">Account Balance</h3>

                <ul className="space-y-8 font-medium text-black lg:text-xl">
                  <li className="grid grid-cols-[max-content_1fr] items-center gap-3.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                      <img src="assets/images/eth-diamond-purple.png" alt="Diamond" className="h-full w-full object-contain" />
                    </span>
                    <span>
                      <strong>Balance:</strong> 1.1242114729405 ETH
                    </span>
                  </li>
                  <li className="grid grid-cols-[max-content_1fr] items-center gap-3.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">🔗</span>
                    <span>
                      <strong>Chain Info: </strong>Polygon Mainnet
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-[10px] bg-white px-7 pt-6 pb-14 shadow-account">
                <h3 className="mb-10 font-primary text-lg font-extrabold tracking-[0.46px] text-black lg:text-2xl">Your Holdings</h3>

                <ul className="space-y-8 font-medium text-black lg:text-xl">
                  <li className="grid grid-cols-[max-content_1fr] items-center gap-3.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                      <img src="assets/images/coin.png" alt="Diamond" className="h-full w-full object-contain" />
                    </span>
                    <span>
                      <strong>Current: </strong>1.1242114729405 ETH
                    </span>
                  </li>
                  <li className="grid grid-cols-[max-content_1fr] items-center gap-3.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                      <img src="assets/images/coin.png" alt="Diamond" className="h-full w-full object-contain" />
                    </span>
                    <span>
                      <strong>In escrow: </strong>2.12993484575 ETH
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-[10px] bg-white px-7 pt-6 pb-14 shadow-account">
              <h3 className="mb-10 font-primary text-lg font-extrabold tracking-[0.46px] text-black lg:text-2xl">Reserve Your Spot</h3>

              <div className="mb-10 grid grid-cols-1 items-end gap-11 sm:grid-cols-[1fr_max-content]">
                <div>
                  <label htmlFor="deposit" className="mb-5 block font-medium tracking-[-0.46px] text-black lg:text-xl">
                    Deposit Amount
                  </label>
                  <input type="text" id="deposit" className="peer block w-full rounded border border-[#333] px-3 py-3 font-secondary text-base font-bold text-black/90 outline-none placeholder:font-normal sm:py-4" />
                </div>

                <button className="mx-auto block w-40 rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-10 md:text-xl">Deposit</button>
              </div>

              <div className="grid grid-cols-1 items-end gap-11 sm:grid-cols-[1fr_max-content]">
                <div>
                  <label htmlFor="withdraw" className="mb-5 block font-medium tracking-[-0.46px] text-black lg:text-xl">
                    Withdraw Amount
                  </label>
                  <input type="text" id="withdraw" className="peer block w-full rounded border border-[#333] px-3 py-3 font-secondary text-base font-bold text-black/90 outline-none placeholder:font-normal sm:py-4" />
                </div>

                <button className="mx-auto block w-40 rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-10 md:text-xl">Withdraw</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
