import Head from "next/head";
import styles from "../styles/Home.module.css"
import Link from 'next/link'

/*
import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { getResolver as getKeyResolver } from 'key-did-resolver'
import { getResolver as get3IDResolver } from '@ceramicnetwork/3id-did-resolver'
import { EthereumAuthProvider, ThreeIdConnect } from '@3id/connect'

if (process.browser) {
  // Create a ThreeIdConnect connect instance as soon as possible in your app to start loading assets
  var threeID = new ThreeIdConnect()
}

async function authenticateWithEthereum(ethereumProvider) {
  // Request accounts from the Ethereum provider
  const accounts = await ethereumProvider.request({
    method: 'eth_requestAccounts',
  })
  // Create an EthereumAuthProvider using the Ethereum provider and requested account
  const authProvider = new EthereumAuthProvider(ethereumProvider, accounts[0])
  // Connect the created EthereumAuthProvider to the 3ID Connect instance so it can be used to
  // generate the authentication secret
  await threeID.connect(authProvider)

  const ceramic = new CeramicClient()
  const did = new DID({
    // Get the DID provider from the 3ID Connect instance
    provider: threeID.getDidProvider(),
    resolver: {
      ...get3IDResolver(ceramic),
      ...getKeyResolver(),
    },
  })

  // Authenticate the DID using the 3ID provider from 3ID Connect, this will trigger the
  // authentication flow using 3ID Connect and the Ethereum provider
  await did.authenticate()

  // The Ceramic client can create and update streams using the authenticated DID
  ceramic.did = did
}

// When using extensions such as MetaMask, an Ethereum provider may be injected as `window.ethereum`
async function tryAuthenticate() {
  if (window.ethereum == null) {
    throw new Error('No injected Ethereum provider')
  }
  await authenticateWithEthereum(window.ethereum)
}
*/


import {
  useStoryblokState,
  getStoryblokApi,
  StoryblokComponent,
} from "@storyblok/react"

export default function Home({ story }) {
  story = useStoryblokState(story)

  return (
    <div className={styles.container}>
      <Head>
        <title>humanDAO</title>
        <link rel="icon" href="/HDAO-logo-transp-60x60-1.png" />
      </Head>

      <Link href="/dashboard">
        <a className="no-underline hover:underline">Dashboard</a>
      </Link>
      <StoryblokComponent blok={story.content} />

      <div className="mx-auto max-w-sm">
        <h1 className="mb-6 pt-6"> Make the right choice :</h1>
        
        <div className="pl-12">
        
          <div className="flex items-center mr-4 mb-4">
            <input id="radio1" type="radio" name="radio" className="hidden" />
            <label htmlFor="radio1" className="flex items-center cursor-pointer text-xl">
            <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
            Best choice</label>
          </div>

          <div className="flex items-center mr-4 mb-4">
            <input id="radio2" type="radio" name="radio" className="hidden" />
            <label htmlFor="radio2" className="flex items-center cursor-pointer text-xl">
            <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
            Second choice</label>
          </div>
          
            <div className="flex items-center mr-4 mb-4">
            <input id="radio3" type="radio" name="radio" className="hidden" />
            <label htmlFor="radio3" className="flex items-center cursor-pointer text-xl">
            <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
            Third choice</label>
          </div>
        
          <div className="flex items-center mr-4 mb-4">
            <input id="radio4" type="radio" name="radio" className="hidden" />
            <label htmlFor="radio4" className="flex items-center cursor-pointer text-xl">
            <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
            Fourth choice</label>
          </div>
          
          <div className="flex items-center mr-4 mb-4">
              <input id="radio5" type="radio" name="radio" className="hidden" />
              <label htmlFor="radio5" className="flex items-center cursor-pointer text-xl">
              <span className="w-8 h-8 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
              Choice Five with a longer title</label>
          </div>
        </div>
      </div>
    </div>);
}

export async function getStaticProps() {
  let slug = "home";

  let sbParams = {
    version: "draft", // or 'published'
  };

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);

  return {
    props: {
      story: data ? data.story : false,
      key: data ? data.story.id : false,
    },
    revalidate: 3600,
  };
}