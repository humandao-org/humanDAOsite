import Head from "next/head"
import { useEffect, useState } from 'react';
import { useStoryblokState, storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { getStoryblokApi } from "@storyblok/react"
import { ethers } from "ethers";
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"

import { SwapWidget } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'

// Infura endpoint
const INFURA_ID = "1dc03bb35a274a3c918f23a0646bcd23"
const jsonRpcEndpoint = `https://mainnet.infura.io/v3/${INFURA_ID}`

export default function BuyHDAO({ story }) {
  story = useStoryblokState(story);
  const [provider, setProvider] = useState()
  const [library, setLibrary] = useState();
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [account, setAccount] = useState();
  const [web3modal, setWeb3Modal] = useState();

  const connect = async () => {
    const providerOptions = {
      // Example with injected providers
      injected: {
        display: {
          name: "Injected",
          description: "Connect with the provider in your Browser"
        },
        package: null
      },
      // Example with WalletConnect provider
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
    if (web3modal && web3modal.cachedProvider) {
      connect();
    }
  }, [])

  useEffect(() => {
    console.log('user effect run')

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


  console.log(story)
  // className={'styles.container'}
  return (
    <div className={`bg-fixed pt-20 pb-20 text-${story.content.text_color ? story.content.text_color : 'black'}`} style={
        Object.assign(
          {}, 
          story.content.bg_image && { minHeight: '100vh', backgroundImage: `url(${story.content.bg_image.filename})` }, 
          story.content.bg_color && { backgroundColor: story.content.bg_color } 
        )}> 
      <Head>
        <title>{story.content.header}</title>
        <link rel="icon" href="/HDAO-logo-transp-60x60-1.png" />
      </Head>

      <div className="md:mx-24 lg:mx-32 m-8" style={{ position: 'absolute', top: 0, right: 0 }}>
        { (!account) && (<button type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 m-1 py-2.5 focus:outline-none disabled:opacity-60" 
          onClick={connect}
        >Connect</button>)
        }
        { chainId && ( <div>
            <div
              className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block" 
            >{ chainId === 1 ? 'Ethereum' : 'Wrong chain' }</div>
            <div
              className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block" 
            >{ account ? (account.substring(0,4) + '...'+ account.substring(account.length-4)) : 'No wallet connected'}</div>
          </div>
        ) }
      </div>
      <h1 className="Title text-center font-press-start font-bold text-3xl lg:text-4xl mx-2 mb-8" {...storyblokEditable(story.content)}>{story.content.header}</h1>
      <div className="Uniswap flex justify-center mb-8">
        <SwapWidget
          provider={provider}
          jsonRpcEndpoint={jsonRpcEndpoint}
        />
      </div>
      <StoryblokComponent blok={story.content} /> 
    </div>
  )
}

export async function getStaticProps({ preview = false }) {
  // home is the default slug for the homepage in Storyblok
  let slug = "buy-hdao" // has to match slug in Storyblok
  // load the published content outside of the preview mode
  let sbParams = {
    version: "draft", // or 'published'
  };
 
  if (preview) {
    // load the draft version inside of the preview mode
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }
 
  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
 
  return {
    props: {
      story: data ? data.story : null,
      key: data ? data.story.id : false,
      preview,
    },
    revalidate: 3600, // revalidate every hour
  };
}
