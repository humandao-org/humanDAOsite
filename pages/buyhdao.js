import Head from "next/head"
import { useEffect, useState } from 'react';
import { useStoryblokState, storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { getStoryblokApi } from "@storyblok/react"
import { ethers } from "ethers";
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"
import styles from "../styles/TextBlock.module.css"

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

  const MY_TOKEN_LIST = [
    {
      "name": "Dai Stablecoin",
      "address": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      "symbol": "DAI",
      "decimals": 18,
      "chainId": 1,
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png"
    },
    {
      "name": "Tether USD",
      "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      "symbol": "USDT",
      "decimals": 6,
      "chainId": 1,
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png"
    },
    {
      "name": "USD Coin",
      "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      "symbol": "USDC",
      "decimals": 6,
      "chainId": 1,
      "logoURI": "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png"
    },
    {
      "name": "HDAO Token",
      "address": "0xdac657ffd44a3b9d8aba8749830bf14beb66ff2d",
      "symbol": "HDAO",
      "decimals": 18,
      "chainId": 1,
      "logoURI": "https://assets.coingecko.com/coins/images/21138/small/Untitled-2.jpg?1645163749"
    },
    {
      "name": "Wrapped Ether",
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "symbol": "WETH",
      "decimals": 18,
      "chainId": 1,
      "logoURI": "https://assets.coingecko.com/coins/images/2518/small/weth.png?1628852295"
    },
    {
      "name": "ChainLink Token",
      "address": "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      "symbol": "LINK",
      "decimals": 18,
      "chainId": 1,
      "logoURI": "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png?1547034700"
    },
    {
      "name": "Wrapped Bitcoin",
      "address": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      "symbol": "WBTC",
      "decimals": 18,
      "chainId": 1,
      "logoURI": "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png?1548822744"
    },
    {
      "name": "Binance USD",
      "address": "0x4fabb145d64652a948d72533023f6e7a623c7c53",
      "symbol": "BUSD",
      "decimals": 18,
      "chainId": 1,
      "logoURI": "https://assets.coingecko.com/coins/images/9576/small/BUSD.png?1568947766"
    },
    
  ]


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
    if (web3modal && web3modal.cachedProvider) {
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

  // className={'styles.container'}
  return (
    <div className={`Card ${styles.container} bg-fixed pt-12 pb-20 text-${story.content.text_color ? story.content.text_color : 'black'}`} style={
        Object.assign(
          {}, 
          story.content.bg_image && { minHeight: '100vh', backgroundImage: `url(${story.content.bg_image.filename})` }, 
          story.content.bg_color && { backgroundColor: story.content.bg_color } 
        )}> 
      <Head>
        <title>{story.content.header}</title>
        <link rel="icon" href="/HDAO-logo-transp-60x60-1.png" />
      </Head>

      <div className="m-6 -mt-6 md:mr-24 lg:mr-32 text-right">
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
      <div className="Uniswap flex justify-center">
        <SwapWidget
          provider={provider}
          jsonRpcEndpoint={jsonRpcEndpoint}
          tokenList={MY_TOKEN_LIST}
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
