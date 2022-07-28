import Head from "next/head";
import { useEffect, useState, useRef } from "react";
//import { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { ethers, Contract } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import ERC20 from '../contracts/erc20.json'
import hDAOEscrow from '../contracts/hDAOEscrow.json'
import { useAddress, useSigner, useAccount, useDisconnect, useMetamask, useWalletConnect, useChainId } from '@thirdweb-dev/react';

import { affiliateState } from "../state/atom";
import { registerReservation } from "../lib/affiliate";
// Infura endpoint
const INFURA_ID = "1dc03bb35a274a3c918f23a0646bcd23";
const jsonRpcEndpoint = `https://mainnet.infura.io/v3/${INFURA_ID}`;

export default function Reservation({ story }) {
  const affiliate = useRecoilValue(affiliateState)
  const [provider, setProvider] = useState()
  const [library, setLibrary] = useState()
  const [chainId, setChainId] = useState()
  const [network, setNetwork] = useState()
  const [account, setAccount] = useState()
  const [inProgress, setInProgress] = useState(false)
  // const [web3modal, setWeb3Modal] = useState();
  const [USDCWalletBalance, setUSDCWalletBalance] = useState(0)
  const [DAIWalletBalance, setDAIWalletBalance] = useState(0)
  const [USDTWalletBalance, setUSDTWalletBalance] = useState(0)
  const [ETHWalletBalance, setETHWalletBalance] = useState(0)
  const [depositAmount, setDepositAmount] = useState()
  const [withdrawAmount, setWithdrawAmount] = useState()
  const [USDCEscrowBalance, setUSDCEscrowBalance] = useState(0)
  const [DAIEscrowBalance, setDAIEscrowBalance] = useState(0)
  const [USDTEscrowBalance, setUSDTEscrowBalance] = useState(0)
  const [escrowTokenAndBalance, setEscrowTokenAndBalance] = useState()
  const [isNetworkAllowed, setIsNetworkAllowed] = useState(true)
  const [statusMessage, setStatusMessage] = useState({ type: 'none', message: '' })
  const networks = [
    {
      chainID: 1,
      name: 'Ethereum',
      USDCaddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      USDTaddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      DAIaddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
      Currency: 'ETH',
      logo: 'https://ethereum.org/static/a183661dd70e0e5c70689a0ec95ef0ba/13c43/eth-diamond-purple.png'
    },
    {
      chainID: 137,
      name: 'Polygon',
      USDCaddress: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      USDTaddress: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
      DAIaddress: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
      Currency: 'MATIC',
      logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022'
    },
    {
      chainID: 5,
      name: 'Goerli Testnet',
      USDCaddress: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
      Currency: 'ETH',
      logo: 'https://ethereum.org/static/a183661dd70e0e5c70689a0ec95ef0ba/13c43/eth-diamond-purple.png',
      hdaoEscrowCntractOLD: '0xEbbcf1F75A7Bb13A6617D82Fe105D2484Af64F5a',
      hdaoEscrowCntractAddress: '0x26855E8445efe3950FEAcAdEC4a6C85293B6c21c'
    },
    {
      chainID: 80001,
      name: 'Mumbai Testnet',
      USDCaddress: '0xd33602Ce228aDBc90625e4FC8071aAE0CAd11Fe9', // '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747', // 0xe11A86849d99F524cAC3E7A0Ec1241828e332C62 (18 decimals)
      USDTaddress: '0x466DD1e48570FAA2E7f69B75139813e4F8EF75c2',
      DAIaddress: '0x3eA3EfA40DB89571E9d0bbF123678E90647644EE',
      Currency: 'MATIC',
      logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=022',
      hdaoEscrowCntractAddress: '0x689b285fCCc63EB819C2EDc37A2B5248E3261Dc0'
    }
  ]

  const resetStatus = () => {
    setStatusMessage({ type: 'none', message : '' })
  }

  const getNetworkByChain = (chainID) => {
    return networks.find((nw) => nw.chainID === chainID)
  }

  // third web provider
  const address3 = useAddress()
  const account3 = useAccount()
  const signer3 = useSigner()
  const chain3 = useChainId()
  const connectWithMetamask = useMetamask()
  const connectWithWalletConnect = useWalletConnect()
  const disconnectWallet = useDisconnect()
  const usdc32 = ethers.utils.formatBytes32String("USDC");
  const dai32 = ethers.utils.formatBytes32String("DAI");
  const usdt32 = ethers.utils.formatBytes32String("USDT");
  const [selectedStableCoin, setSelectedStableCoin] = useState({ name: 'USDC', escrowBalance: 0, walletBalance: 0, name32: usdc32, contractAddress: '' })

  const depositInputRef = useRef(null)
  const withdrawInputRef = useRef(null)

  async function queryTokenBalance(signer, account){

    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const erc20:Contract = new ethers.Contract(addressContract, abi, provider);
    console.log('erc20', ERC20)
    // await USDC.connect(signer).approve(hdaoEscrowCntractAddress, 500);
    try {
      const nw = getNetworkByChain(chain3)

      let ethBalance = await signer.getBalance();
      ethBalance = ethers.utils.formatUnits(ethBalance)
      ethBalance = Number(Math.round(ethBalance * 1e4) / 1e4)
      setETHWalletBalance(ethBalance)
  
      const USDC = new ethers.Contract(nw.USDCaddress, ERC20, signer)
      let usdcBalance = await USDC.balanceOf(account)
      console.log("got USDC balance", usdcBalance)
      setUSDCWalletBalance(Number(ethers.utils.formatUnits(usdcBalance, 6)))
      console.log("set USDC balance", USDCWalletBalance)

      // Only do other stables if we are on networks where they are configured
      if (nw.chainID === 1 || nw.chainID === 137 || nw.chainID === 80001) {
        console.log('getting USDT balance from: ', nw.USDTaddress)
        const USDT = new ethers.Contract(nw.USDTaddress, ERC20, signer)
        const usdtBalance = await USDT.balanceOf(account)
        setUSDTWalletBalance(Number(ethers.utils.formatUnits(usdtBalance, 6)))
        console.log('got usdt balance', usdtBalance)
        const DAI = new ethers.Contract(nw.DAIaddress, ERC20, signer)
        let daiBalance = await DAI.balanceOf(account)
        daiBalance = ethers.utils.formatUnits(daiBalance, 18)
        daiBalance = Math.round(daiBalance * 1e4) / 1e4
        setDAIWalletBalance(daiBalance)
      } else {
        setUSDTWalletBalance(0)
        setDAIWalletBalance(0)
      }
    } catch (e) {
      console.log(e)
    }
  }
  
  async function queryEscrowBalance(signer, network){
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    const nw = getNetworkByChain(chain3)
    console.log('query escrow balance - next line is network')
    console.log('network', nw)
    if (nw?.hdaoEscrowCntractAddress) {
      const hdaoEscrowCntract = new ethers.Contract(nw.hdaoEscrowCntractAddress, hDAOEscrow.abi, signer)
  
      // const signer = provider.getSigner()
  
      let usdcBalance = await hdaoEscrowCntract.accountBalances(signer.getAddress(), usdc32)
      console.log('escrow balance in USDC', usdcBalance)
      setUSDCEscrowBalance(Number(ethers.utils.formatUnits(usdcBalance, 6)))

      let usdtBalance = await hdaoEscrowCntract.accountBalances(signer.getAddress(), usdt32)
      console.log('escrow balance in USDT', usdtBalance)
      setUSDTEscrowBalance(Number(ethers.utils.formatUnits(usdtBalance, 6)))

      let daiBalance = await hdaoEscrowCntract.accountBalances(signer.getAddress(), dai32)
      daiBalance = ethers.utils.formatUnits(daiBalance, 18)
      daiBalance = Math.round(daiBalance * 1e4) / 1e4
      console.log('escrow balance in DAI', daiBalance)
      setDAIEscrowBalance (daiBalance)
    } else {
      setUSDCEscrowBalance(0)
      setUSDTEscrowBalance(0)
      setDAIEscrowBalance (0)
    }
  }

  async function depositFunds(event) {
    event.preventDefault()
    if(!signer3 || !chain3) return    
    if (depositAmount <= 0) return
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const signer = provider.getSigner()
    // const erc20:Contract = new ethers.Contract(addressContract, abi, signer)

    // const hDAOEscrow = await ethers.getContractFactory('hDAOEscrow');
    // const hdaoescrow = await hDAOEscrow.attach(contractAddress);
    const payload = {
      reservation: {
        action: 'deposit_attempt',
        affiliate_id: affiliate.affiliateId,
        currency: selectedStableCoin.name,
        amount: depositAmount,
        wallet: address3
      }
    }
    let result = await registerReservation(payload)
    if(!result.success) {
      alert("There is a technical glitch with our affiliate system. Thus, we cannot accept deposits. Please wait a bit before trying again.")
      return
    }
    const nw = getNetworkByChain(chain3)
    const hdaoEscrowContract = new ethers.Contract(nw.hdaoEscrowCntractAddress, hDAOEscrow.abi, signer3)
    const stableContract = new ethers.Contract(selectedStableCoin.contractAddress, ERC20, signer3)
    stableContract.connect(signer3).approve(nw.hdaoEscrowCntractAddress, depositAmount)
      .then((tr) => {
        setInProgress(true)
        resetStatus()
        console.log(`TransactionResponse TX hash: ${tr.hash}`)
        tr.wait().then((receipt)=>{
          console.log("transfer receipt",receipt)
          setInProgress(false)
          setStatusMessage({ type: 'success', message: 'You successfully allowed the smart contract to recieve your selected coin. Next you need to confirm the actual transaction.' })
          // Approval is done so we can do the actual deposit
          hdaoEscrowContract.connect(signer3).depositTokens(depositAmount, usdc32)
            .then((tr) => {
              setInProgress(true)
              resetStatus()
              console.log(`TransactionResponse TX hash: ${tr.hash}`)
              tr.wait().then(async (receipt) => {
                console.log("deposit transfer receipt",receipt)
                depositInputRef.current.value = ''
                window.setTimeout(async () => {
                  await queryEscrowBalance(signer3)
                  await queryTokenBalance(signer3, address3)
                }, 1000)
                payload.reservation.action = 'deposit'
                await registerReservation(payload)
                setInProgress(false)
                setStatusMessage({ type: 'success', message: 'Congratulations! Your funds were successfully deposited to our escrow contract.' })
              })
            })
            .catch((e)=> {
              console.log(e)
              setInProgress(false)
              setStatusMessage({ type: 'error' })
            })
        })
      })
    .catch((e)=> {
      console.log(e)
      setInProgress(false)
      setStatusMessage({ type: 'error' })
    })
  }

  async function withdrawFunds(event) {
    event.preventDefault()
    if(!signer3 || !chain3) return    
    if (withdrawAmount <= 0) return

    //const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const signer = provider.getSigner()
    const nw = getNetworkByChain(chain3)
    const hdaoEscrowContract = new ethers.Contract(nw.hdaoEscrowCntractAddress, hDAOEscrow.abi, signer3)
    // const USDC: Contract = new ethers.Contract(USDCaddress, ERC20, signer)
    const payload = {
      reservation: {
        action: 'withdrawal_attempt',
        affiliate_id: affiliate.affiliateId,
        currency: selectedStableCoin.name,
        amount: depositAmount,
        wallet: address3
      }
    }
    await registerReservation(payload)

    hdaoEscrowContract.connect(signer3).withdrawTokens(withdrawAmount, selectedStableCoin.name32)
      .then((tr) => {
        setInProgress(true)
        resetStatus()
        console.log(`TransactionResponse TX hash: ${tr.hash}`)
        tr.wait().then(async (receipt)=> {
          withdrawInputRef.current.value = ''
          window.setTimeout(async () => {
            await queryEscrowBalance(signer3)
            await queryTokenBalance(signer3, address3)
          }, 1000)
          console.log("withdrawal transfer receipt",receipt)
          payload.reservation.action = 'withdrawal'
          await registerReservation(payload)
          setInProgress(false)
          setStatusMessage({ type: 'success', message: 'Your funds were successfully withdrawn from our escrow contract.' })
        })
      })
      .catch((e)=> {
        console.log(e)
        setInProgress(false)
        setStatusMessage({ type: 'error' })
      })      
  }

  useEffect(async () => {
    setNetwork(getNetworkByChain(1))
  }, [])

  useEffect(async () => {
    console.log('signer', signer3)
    console.log('account', account3)
    console.log('addres', address3)
    if (signer3 && address3 && chain3) {
      setNetwork(getNetworkByChain(chain3))
      await queryTokenBalance(signer3, address3)
      await queryEscrowBalance(signer3)
      setIsNetworkAllowed(([5, 80001].includes(chain3)))
      console.log('before calling change stable function - what is usdc: ', USDCWalletBalance)
      // changeSelectedStableCoin(selectedStableCoin.name)
    }
  }, [signer3])

  useEffect(() => {
    changeSelectedStableCoin(selectedStableCoin.name)
  }, [USDTWalletBalance, USDCWalletBalance, DAIWalletBalance, USDTEscrowBalance, USDCEscrowBalance, DAIEscrowBalance])

  useEffect(() => {
    console.log('chain id changed', chain3)
  }, [chain3])

  const handleChange = (value, method) => {
    // console.log(value)
    if(!isNaN(parseFloat(value))) {
      var amount = 0
      if (['USDC','USDT'].includes(selectedStableCoin.name)) {
        amount = (parseFloat(value) * 1e6).toString()
        // console.log('amount to withdraw/deposit: ', amount)
      } else if(selectedStableCoin.name === 'DAI') {
        amount = (parseFloat(value) * 1e18).toString()
      }
      method(amount)
    }
  }

  const changeSelectedStableCoin = (stableCoin) => {
    if (!network) return
    let escrowBalance = 0
    let walletBalance = 0
    let name32 = ''
    let contractAddress = ''
    setSelectedStableCoin
    if (stableCoin === 'USDC') {
      escrowBalance = USDCEscrowBalance
      walletBalance = USDCWalletBalance
      name32 = usdc32
      contractAddress = network.USDCaddress
    } else if (stableCoin === 'USDT') {
      escrowBalance = USDTEscrowBalance
      walletBalance = USDTWalletBalance
      name32 = usdt32
      contractAddress = network.USDTaddress
    } else if (stableCoin === 'DAI') {
      escrowBalance = DAIEscrowBalance
      walletBalance = DAIWalletBalance
      name32 = dai32
      contractAddress = network.DAIaddress
    }
    console.log("changing selected stablecoin", { name: stableCoin, escrowBalance, walletBalance })

    setSelectedStableCoin({ name: stableCoin, escrowBalance, walletBalance, name32, contractAddress })
  }


  // Assume mainnet
  /*
  const connect = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: "Injected",
          description: "Connect with the provider in your Browser",
        },
        package: null,
      },

      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: INFURA_ID, // required
          rpc: {
            1: `https://mainnet.infura.io/v3/${INFURA_ID}`,
            5: `https://goerli.prylabs.net`,
            137: "https://polygon-rpc.com",
            80001: `https://polygon-mumbai.infura.io/v3/${INFURA_ID}`,
          },
        },
      },
    };

    const web3Modal = new Web3Modal({
      // network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });
    setWeb3Modal(web3Modal);

    const provider = await web3Modal.connect();
    const library = new ethers.providers.Web3Provider(provider);
    const accounts = await library.listAccounts();
    const network = await library.getNetwork();

    console.log('setting provider', provider)
    setProvider(provider);
    setLibrary(library);
    console.log('setting library', library)

    if (accounts) setAccount(accounts[0]);
    setChainId(network.chainId);

    console.log("this is run once?");

    // const signer = library.getSigner();
  };

  useEffect(() => {
    console.log("connect use effect");
    if (web3modal && web3modal.cachedProvider) {
      console.log("and here");
      connect();
    }
  }, []);


  useEffect(() => {
    console.log("chain id is: ", chainId)
    if (account && library) {
      console.log('both are set')
      queryTokenBalance(library, account)
    }
  }, [account, library, chainId])

  useEffect(() => {
    console.log("refresh use effect");
    const refreshState = () => {
      setAccount();
      setChainId();
      setNetwork("");
      // setMessage("");
      // setSignature("");
      // setVerified(undefined);
    };

    if (provider?.on) {
      console.log('events attached')
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        console.log("chains changed", account);
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
                  <Link href="/deposit">
                    <a className="block rounded bg-secondary/[0.04] py-2 px-3 text-[15px] font-medium leading-6  text-secondary">Reserve your NFT</a>
                  </Link>
                </li> */}
                <li>
                  {(address3 && !isNetworkAllowed) && (
                    <div className="cursor-pointer text-white bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block">
                      Wrong Network!
                    </div>
                  )}
                </li>
                <li>
                  {!address3 && (
                    <div className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block" onClick={connectWithMetamask}>
                      Connect
                    </div>
                  )}
                </li>
                <li>
                  {(chain3 && isNetworkAllowed) && (
                    <div>
                      <div className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block">{network?.name}</div>
                      <div className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block">
                        { address3 ? address3.substring(0, 4) + "..." + address3.substring(address3.length - 4) : "No wallet connected"}
                      </div>
                    </div>
                  )}
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

        <section className="px-5 py-10 lg:pt-24 lg:pb-24">
          <div className="mx-auto w-full max-w-[1050px]">
            <h1 className="mb-6 font-primary text-4xl font-extrabold  text-primary sm:text-5xl md:text-6xl">Make your reservation</h1>
            <p className="font-medium leading-7  text-black/60 sm:text-xl lg:text-2xl">
              Connect your wallet to either Mumbai or Goerli testnet and make a deposit of $3,333 using USDC, USDT or DAI to secure a Pocket Assistant NFT.</p>
            <p>You are welcome to deposit using multiple stablecoins and you are free to make several smaller deposits. Once you reach at total of $3,333 you will have reserved one PA NFT. You are welcome to reserve multiple NFTs.
            </p>
            <p>
              You are free to withdraw your deposited funds at any time until we announce the date and time of the mint (which will be done shortly after we reach 400 reservations).
            </p>

            <div className="mt-11 mb-10 grid w-full gap-7 lg:grid-cols-2 lg:gap-12">
              <div className="rounded-[10px] bg-white px-7 pt-6 pb-8 shadow-account">
                <h3 className="mb-10 font-primary text-lg font-extrabold  text-black lg:text-2xl">Your Account Balance</h3>

                <div className="grid sm:grid-cols-2 sm:grid-row-4 sm:gap-x-1 gap-y-4 font-medium text-black lg:text-xl">
                  <div className="flex hover:bg-white/20 space-x-2 w-full space-y-1.5 lg:space-y-1 rounded-full">
                    <span className="flex h-10 w-10 rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                      <img src={network?.logo} className="w-8 h-8 object-contain"></img>
                    </span>
                    <span className="text-xl md:text-2xl">  {ETHWalletBalance} {network?.Currency}</span>
                  </div>
                  <div 
                    className="flex hover:bg-white/20 space-x-2 w-full space-y-1.5 lg:space-y-1 rounded-full"
                  >
                    <span className="flex h-10 w-10 rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                      <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=022" className="w-8 h-8 object-contain"></img>
                    </span>
                    <span className="text-xl md:text-2xl"> {USDCWalletBalance} USDC</span>
                  </div>
                  <div className="flex hover:bg-white/20 space-x-2 w-full space-y-1.5 lg:space-y-1 rounded-full">
                    <span className="flex h-10 w-10 rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                      <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022" className="w-8 h-8 object-contain"></img>
                    </span>
                    <span className="text-xl md:text-2xl"> {USDTWalletBalance} USDT</span>
                  </div>
                  <div className="flex hover:bg-white/20 space-x-2 w-full space-y-1.5 lg:space-y-1 rounded-full">
                    <span className="flex h-10 w-10 rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                      <img src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=022" className="w-8 h-8 object-contain"></img>
                    </span>
                    <span className="text-xl md:text-2xl"> {DAIWalletBalance} DAI</span>
                  </div>
                </div>
              </div>
              <div className="rounded-[10px] bg-white px-7 pt-6 pb-8 shadow-account">
                <h3 className="mb-10 font-primary text-lg font-extrabold  text-black lg:text-2xl">Reservation Balance</h3>

                <ul className="space-y-2 font-medium text-black lg:text-xl">
                  { USDCEscrowBalance > 0 || (selectedStableCoin.name === 'USDC') ?
                  (<li className="grid grid-cols-[max-content_1fr] items-center gap-3.5">
                    <span className="flex w-10 h-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                      <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=022" alt="usdc logo" className="h-10 w-10 object-contain" />
                    </span>
                    <span className="text-xl md:text-5xl font-medium">{USDCEscrowBalance} USDC</span>
                  </li>) : null
                  }
                  { USDTEscrowBalance > 0 || (selectedStableCoin.name === 'USDT') ?
                  (<li className="grid grid-cols-[max-content_1fr] items-center gap-3.5">
                    <span className="flex w-10 h-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                      <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022" alt="usdt logo" className="w-10 h-10 object-contain"></img>
                    </span>
                    <span className="text-xl md:text-5xl font-medium">{USDTEscrowBalance} USDT</span>
                  </li>) : null
                  }
                  { DAIEscrowBalance > 0 || (selectedStableCoin.name === 'DAI') ?
                  (<li className="grid grid-cols-[max-content_1fr] items-center gap-3.5">
                    <span className="flex w-10 h-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                      <img src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=022" alt="usdt logo" className="w-10 h-10 object-contain"></img>
                    </span>
                    <span className="text-xl md:text-5xl font-medium">{USDTEscrowBalance} USDT</span>
                  </li>) : null
                  }
                </ul>
              </div>
            </div>

            <div className="rounded-[10px] bg-white px-7 pt-6 pb-14 shadow-account">
              <h3 className="mb-10 font-primary text-lg font-extrabold  text-black lg:text-2xl">Reserve Your Spot</h3>

              <p className="mb-4 font-medium text-black lg:text-xl">Reserve using</p>
              <div className="cursor-pointer grid mb-10 grid-rows-1 grid-cols-3 w-full md:max-w-md rounded-full bg-gray-600 text-base font-bold text-white shadow-sm">
                <div 
                  className={`flex items-center justify-center mx-auto active:bg-gray-800 hover:bg-white/20 w-full text-center rounded-full ${( selectedStableCoin.name === 'USDC' ? 'bg-gray-800' : '')}`}
                  onClick={() => { changeSelectedStableCoin('USDC') }}
                >
                  <span className="flex p-2 space-x-1">
                    <img src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=022" alt="usdc logo" className="mx-auto" width="25" height="25"></img>
                    &nbsp;USDC
                  </span>
                </div>
                <div 
                  className={`flex items-center justify-center mx-auto active:bg-gray-800 hover:bg-white/20 w-full text-center rounded-full ${( selectedStableCoin.name === 'USDT' ? 'bg-gray-800' : '')}`}
                  onClick={() => { changeSelectedStableCoin('USDT') }}
                >
                  <span className="flex p-2 space-x-1">
                    <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=022" alt="usdt logo" width="25" height="25"></img>
                    &nbsp;USDT
                  </span>
                </div>
                <div 
                  className={`flex items-center justify-center mx-auto active:bg-gray-800 hover:bg-white/20 w-full text-center rounded-full ${( selectedStableCoin.name === 'DAI' ? 'bg-gray-800' : '')}`}
                  onClick={() => { changeSelectedStableCoin('DAI') }}
                >
                  <span className="flex p-2 space-x-1">
                    <img src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=022" alt="DAI logo" width="25" height="25"></img>
                    &nbsp;DAI
                  </span>
                </div>
              </div>
              { inProgress ? (
              <div role="status" className="text-center">
                <svg className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <div className="my-2 text-amber-600">Transaction in progress. Please wait.</div>
              </div>
              ) : null }
              {statusMessage.type === 'success' ? (
                <div className="mb-10 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline">{ statusMessage.message }</span>
                  <span 
                    onClick={resetStatus}
                    className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </span>
                </div>
              ) : null}
              {statusMessage.type === 'error' ? (
                <div className="mb-10 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Transaction failed!</strong>
                  <span className="block sm:inline">The transaction failed. Try again later if this is an error at out end.</span>
                  <span 
                    onClick={resetStatus}
                    className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </span>
                </div>
              ) : null}
              <div className="mb-10 grid grid-cols-1 items-end gap-11 sm:grid-cols-[1fr_max-content]">
                <div>
                  <label htmlFor="deposit" className="mb-5 block font-medium text-black lg:text-xl">
                    Deposit Amount
                  </label>
                  <span className="flex">
                    <p className="text-xs font-medium text-black/50">account balance:&nbsp;</p>
                    <p className="text-xs font-medium text-black/50">{ selectedStableCoin.walletBalance + ' ' + selectedStableCoin.name }</p>
                  </span>
                  <input
                    ref={depositInputRef}
                    disabled={inProgress || !isNetworkAllowed}
                    onChange={(evt) => handleChange(evt.target.value, setDepositAmount)}
                    type="number" id="deposit" step="0.01" placeholder="0.0" className="peer block w-full rounded border border-[#333] px-3 py-3 font-secondary text-base font-bold text-black/90 outline-none placeholder:font-normal sm:py-4" />
                </div>

                <button 
                  onClick={depositFunds}
                  disabled={inProgress || !isNetworkAllowed}
                  className="mx-auto block w-40 rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-10 md:text-xl">Deposit</button>
              </div>

              <div className="grid grid-cols-1 items-end gap-11 sm:grid-cols-[1fr_max-content]">
                <div>
                  <label htmlFor="withdraw" className="mb-5 block font-medium text-black lg:text-xl">
                    Withdraw Amount
                  </label>
                  <div>
                    <span className="flex">
                      <p className="text-xs font-medium text-black/50">escrow balance:&nbsp;</p>
                      <p className="text-xs font-medium text-black/50">{ selectedStableCoin.escrowBalance + ' ' + selectedStableCoin.name }</p>
                    </span>
                    <input 
                      ref={withdrawInputRef}
                      disabled={inProgress || !isNetworkAllowed}
                      onChange={(evt) => handleChange(evt.target.value, setWithdrawAmount)}
                      type="number" step="0.01" id="withdraw" placeholder="0.0" className="peer block w-full rounded border border-[#333] px-3 py-3 font-secondary text-base font-bold text-black/90 outline-none placeholder:font-normal sm:py-4" />
                  </div>
                </div>

                <button 
                  onClick={withdrawFunds}
                  disabled={inProgress || !isNetworkAllowed}
                  className="mx-auto block w-40 rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-4 md:text-xl">Withdraw</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
