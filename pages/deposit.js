import { useEffect, useState, useRef } from "react"
//import { useRouter } from "next/router";
import { useRouter } from "next/router"
import { useRecoilValue } from "recoil"
import { ethers, Contract } from "ethers"
// import Web3Modal from "web3modal";
///import WalletConnectProvider from "@walletconnect/web3-provider"
import ERC20 from '../contracts/erc20.json'
import hDAOEscrow from '../contracts/hDAOEscrow.json'
import { useAddress, useSigner, useAccount, useDisconnect, useMetamask, useWalletConnect, useChainId } from '@thirdweb-dev/react'
import SuccessModal from "../components/SuccessModal"
import WalletConnectModal from "../components/WalletConnectModal"

import { affiliateState } from "../state/atom"
import { registerReservation } from "../lib/affiliate"
import SiteMenu from "../components/SiteMenu"

const reservationAmount = 20 // 3333 // Price that it costs to reserve an NFT

export default function Reservation({ story }) {
  // const { query } = useRouter();
  const router = useRouter()
  console.log(router.query)

  const affiliate = useRecoilValue(affiliateState)
  const [community, setCommunity] = useState('none')
  // const [provider, setProvider] = useState()
  // const [library, setLibrary] = useState()
  // const [chainId, setChainId] = useState()
  const [network, setNetwork] = useState()
  // const [account, setAccount] = useState()
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
  const [maxDepositAmount, setMaxDepositAmount] = useState(0)
  const [maxWithdrawalAmount, setMaxWithdrawalAmount] = useState(0)
  const [isNetworkAllowed, setIsNetworkAllowed] = useState(true)
  const [statusMessage, setStatusMessage] = useState({ type: 'none', message: '' })
  const [reservedNoNFTs, setReservedNoNFTs] = useState(0)
  const [benefitOption, setBenefitOption] = useState('')

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
      hdaoEscrowCntractAddress: '0x15B7B1562909BEd4df3920d06C5A68A41154580D'
    }
  ]

  const resetStatus = () => {
    setStatusMessage({ type: 'none', message : '', reason: '' })
  }

  const getNetworkByChain = (chainID) => {
    return networks.find((nw) => nw.chainID === chainID)
  }

  // third web provider
  const address3 = useAddress()
  const account3 = useAccount()
  const signer3 = useSigner()
  const chain3 = useChainId()
  const disconnect = useDisconnect()
  const connectWithMetamask = useMetamask()
  const connectWithWalletConnect = useWalletConnect()
  const disconnectWallet = useDisconnect()
  const usdc32 = ethers.utils.formatBytes32String("USDC");
  const dai32 = ethers.utils.formatBytes32String("DAI");
  const usdt32 = ethers.utils.formatBytes32String("USDT");
  const [selectedStableCoin, setSelectedStableCoin] = useState({ name: 'USDC', escrowBalance: 0, walletBalance: 0, name32: usdc32, contractAddress: '' })
  const [showModal, setShowModal] = useState(false);
  const [showModalWallet, setShowModalWallet] = useState(false);

  const depositInputRef = useRef(null)
  const withdrawInputRef = useRef(null)

  async function queryTokenBalance(signer, account){

    try {
      const nw = getNetworkByChain(chain3)

      let ethBalance = await signer.getBalance();
      ethBalance = ethers.utils.formatUnits(ethBalance)
      ethBalance = Number(Math.round(ethBalance * 1e4) / 1e4)
      setETHWalletBalance(ethBalance)
  
      const USDC = new ethers.Contract(nw.USDCaddress, ERC20, signer)
      let usdcBalance = await USDC.balanceOf(account)
      setUSDCWalletBalance(Number(ethers.utils.formatUnits(usdcBalance, 6)))

      // Only do other stables if we are on networks where they are configured
      if (nw.chainID === 1 || nw.chainID === 137 || nw.chainID === 80001) {
        const USDT = new ethers.Contract(nw.USDTaddress, ERC20, signer)
        const usdtBalance = await USDT.balanceOf(account)
        setUSDTWalletBalance(Number(ethers.utils.formatUnits(usdtBalance, 6)))
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
    const nw = getNetworkByChain(chain3)
    if (nw?.hdaoEscrowCntractAddress) {
      const hdaoEscrowCntract = new ethers.Contract(nw.hdaoEscrowCntractAddress, hDAOEscrow.abi, signer)
  
      let usdcBalance = await hdaoEscrowCntract.accountBalances(signer.getAddress(), usdc32)
      setUSDCEscrowBalance(Number(ethers.utils.formatUnits(usdcBalance, 6)))

      let usdtBalance = await hdaoEscrowCntract.accountBalances(signer.getAddress(), usdt32)
      setUSDTEscrowBalance(Number(ethers.utils.formatUnits(usdtBalance, 6)))

      let daiBalance = await hdaoEscrowCntract.accountBalances(signer.getAddress(), dai32)
      daiBalance = ethers.utils.formatUnits(daiBalance, 18)
      daiBalance = Math.round(daiBalance * 1e4) / 1e4
      setDAIEscrowBalance (daiBalance)
    } else {
      setUSDCEscrowBalance(0)
      setUSDTEscrowBalance(0)
      setDAIEscrowBalance (0)
    }
  }

  async function handleTransaction(tx) {
    try {
      let receipt = await tx.wait() // waiting until one block is mined
      return { success: true, receipt }
    } catch(e) {
      console.log(e)
      return await handleFailedTransaction(e)
    }
  }

  async function handleFailedTransaction(e) {
    if (e.code === 'TRANSACTION_REPLACED') {
      // No need to react because the 'error' is that the transaction 'failed' as it was replaced with a new one to increase the gas
      // .. that is what I assume here at least - could be replaced for other reasons but result will be the same that we just have to assume that the new transaction is what we need to wait for
      console.log('transaction was replaced')
      try {
        let result = await handleTransaction(e.replacement)
        return result
      } catch(e2) {
        console.log('replacement transaction failed')
        console.log(e2)
        return { success: false, message: 'replacement transaction failed' }
      }
    } else if (e.code === 4001) {
      return { success: false, reason: 'The tranaction was cancelled because the transaction signature was denied' }
    } else {
      return { success: false, message: 'transaction failed' }
    }
  }


  async function depositFunds(event) {
    event.preventDefault()
    if(!signer3 || !chain3) return    
    if (!(depositAmount > 0)) return
    var reservedNoNFTs = depositInputRef.current.value

    const payload = {
      reservation: {
        action: 'deposit_attempt',
        affiliate_id: affiliate.affiliateId,
        community,
        currency: selectedStableCoin.name,
        amount: depositAmount,
        wallet: address3,
        no_nfts: reservedNoNFTs,
        benefit_choice: benefitOption 
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

    hdaoEscrowContract.on('DepositEvent', async (message, event) => {
      depositInputRef.current.value = ''
      window.setTimeout(async () => {
        await queryEscrowBalance(signer3)
        await queryTokenBalance(signer3, address3)
      }, 1000)
      payload.reservation.action = 'deposit'
      await registerReservation(payload)
      setReservedNoNFTs(reservedNoNFTs)
      setInProgress(false)
      setShowModal(true)
    })

    try {
      resetStatus()
      let tx = await stableContract.connect(signer3).approve(nw.hdaoEscrowCntractAddress, depositAmount)
      setInProgress(true)
      let result = await handleTransaction(tx)
      setInProgress(false)
      if (result.success) {
        setStatusMessage({ type: 'success', message: 'You successfully allowed the smart contract to deposit your selected amount. Please, confirm the actual transaction next.' })
      } else {
        setStatusMessage({ type: 'error', reason: result.reason })
      }
      let tx2 = await hdaoEscrowContract.connect(signer3).depositTokens(depositAmount, selectedStableCoin.name32)
      setInProgress(true)
      resetStatus()
      let result2 = await handleTransaction(tx2)
      if (result2.success) {
        window.setTimeout(async () => {
          await queryEscrowBalance(signer3)
          await queryTokenBalance(signer3, address3)
        }, 1000)
      } else {
        setInProgress(false)
        setStatusMessage({ type: 'error', reason: result.reason })
      }
    } catch (e) {
      let result = await handleFailedTransaction(e)
      setInProgress(false)
      setStatusMessage({ type: 'error', reason: result.reason })
    }

    /*
    .then((tr) => {
      setInProgress(true)
      resetStatus()
      console.log(`TransactionResponse TX hash: ${tr.hash}`)
      tr.wait().then((receipt)=>{
        console.log("transfer receipt",receipt)
        setInProgress(false)
        setStatusMessage({ type: 'success', message: 'You successfully allowed the smart contract to deposit your selected amount. Please, confirm the actual transaction next.' })
        // Approval is done so we can do the actual deposit

        hdaoEscrowContract.connect(signer3).depositTokens(depositAmount, selectedStableCoin.name32)
          .then((tr) => {
            setInProgress(true)
            resetStatus()
            console.log(`TransactionResponse TX hash: ${tr.hash}`)
            tr.wait().then(async (receipt) => {
              console.log("deposit transfer receipt",receipt)
              // setStatusMessage({ type: 'success', message: 'Congratulations! Your funds were successfully deposited to our escrow contract.' })
              window.setTimeout(async () => {
                await queryEscrowBalance(signer3)
                await queryTokenBalance(signer3, address3)
              }, 1000)
            })
            .catch((e)=> {
              console.log(e)
              if(e.code === 'TRANSACTION_REPLACED') {
                // No need to react because the 'error' is that one transaction 'failed' as it was replaced to increase gas
                console.log('transaction was replaced')
              } else {
                setInProgress(false)
                console.log('caught in the wait cycle (deposit)')
                setStatusMessage({ type: 'error' })
              }
            })      
          })
          .catch((e)=> {
            console.log(e)
            setInProgress(false)
            if (e.code === 4001) {
              setStatusMessage({ type: 'error', reason: 'The tranaction was cancelled because the transaction signature was denied' })
            } else {
              setStatusMessage({ type: 'error' })
            }
          })
      })
      .catch(async (e)=> {
        console.log(e)
        if(e.code === 'TRANSACTION_REPLACED') {
          // No need to react because the 'error' is that one transaction 'failed' as it was replaced to increase gas
          console.log('transaction was replaced')
          try {
            await e.replacement.wait()
            setInProgress(false)
            setStatusMessage({ type: 'success', message: 'You successfully allowed the smart contract to deposit your selected amount. Please, confirm the actual transaction next.' })
            console.log("NB must refactor to using await so I can call the deposit method from here")
          } catch(e2) {
            console.log('replacement transaction failed')
            console.log(e2)
          }
        } else {
          setInProgress(false)
          console.log('caught in the wait cycle (approval)')
          setStatusMessage({ type: 'error' })
        }
      })      
    })
    .catch((e)=> {
      console.log(e)
      setInProgress(false)
      if (e.code === 4001) {
        setStatusMessage({ type: 'error', reason: 'The tranaction was cancelled because the transaction signature was denied' })
      } else {
        setStatusMessage({ type: 'error' })
      }
    })
    */
  }

  async function withdrawFunds(event) {
    event.preventDefault()
    if(!signer3 || !chain3) return    
    if (withdrawAmount <= 0) return

    const nw = getNetworkByChain(chain3)
    const hdaoEscrowContract = new ethers.Contract(nw.hdaoEscrowCntractAddress, hDAOEscrow.abi, signer3)
    const payload = {
      reservation: {
        action: 'withdrawal_attempt',
        affiliate_id: affiliate.affiliateId,
        currency: selectedStableCoin.name,
        amount: withdrawAmount,
        wallet: address3
      }
    }
    await registerReservation(payload)

    hdaoEscrowContract.on('WithdrawalEvent', async (message, event) => {
      withdrawInputRef.current.value = ''
      window.setTimeout(async () => {
        await queryEscrowBalance(signer3)
        await queryTokenBalance(signer3, address3)
      }, 1000)
      payload.reservation.action = 'withdrawal'
      await registerReservation(payload)
      setInProgress(false)
      setStatusMessage({ type: 'success', message: 'Your funds were successfully withdrawn from our escrow contract.' })
    })

    try {
      resetStatus()
      let tx = await hdaoEscrowContract.connect(signer3).withdrawTokens(withdrawAmount, selectedStableCoin.name32)
      setInProgress(true)
      let result = await handleTransaction(tx)
      if (result.success) {
        window.setTimeout(async () => {
          await queryEscrowBalance(signer3)
          await queryTokenBalance(signer3, address3)
        }, 1000)
      } else {
        setInProgress(false)
        setStatusMessage({ type: 'error', reason: result.reason })
      }
    } catch(e) {
      let result = await handleFailedTransaction(e)
      setInProgress(false)
      setStatusMessage({ type: 'error', reason: result.reason })
    }

    /*
      .then((tr) => {
        setInProgress(true)
        resetStatus()
        console.log(`TransactionResponse TX hash: ${tr.hash}`)
        tr.wait().then(async (receipt)=> {
          window.setTimeout(async () => {
            await queryEscrowBalance(signer3)
            await queryTokenBalance(signer3, address3)
          }, 1000)
          console.log("withdrawal transfer receipt ", receipt)
        })
        .catch((e)=> {
          console.log(e)
          if(e.code === 'TRANSACTION_REPLACED') {
            // No need to react because the 'error' is that one transaction 'failed' as it was replaced to increase gas
            console.log('transaction was replaced')
          } else {
            setInProgress(false)
            console.log('caught in the wait cycle (withdrawal)')
            setStatusMessage({ type: 'error' })
          }
        })      
      })
      .catch((e)=> {
        console.log(e)
        setInProgress(false)
        setStatusMessage({ type: 'error' })
      })      
    */
  }

  useEffect(async () => {
    if (router.query && router.query.community) {
      // console.log('community is being set to: ', router.query.community)
      setCommunity(router.query.community)
    } else {
      // console.log('community is being set to: ', '')
      setCommunity('')
    }
  }, [router])

  useEffect(async () => {
    setNetwork(getNetworkByChain(1))
  }, [])

  useEffect(async () => {
    if (signer3 && address3 && chain3) {
      await queryTokenBalance(signer3, address3)
      await queryEscrowBalance(signer3)
    }
  }, [signer3])

  useEffect(async () => {

  }, [disconnect])

  useEffect(() => {
    changeSelectedStableCoin(selectedStableCoin.name)
  }, [USDTWalletBalance, USDCWalletBalance, DAIWalletBalance, USDTEscrowBalance, USDCEscrowBalance, DAIEscrowBalance])

  useEffect(() => {
    setNetwork(getNetworkByChain(chain3))
    setIsNetworkAllowed(([5, 80001].includes(chain3)))
  }, [chain3])

  const handleChange = (value, method, _stableCoin) => {
    var stableCoin = _stableCoin || selectedStableCoin.name
    if(!isNaN(parseFloat(value))) {
      var amount = 0
      if (['USDC','USDT'].includes(stableCoin)) {
        amount = (parseFloat(value) * 1e6).toString()
      } else if(stableCoin === 'DAI') {
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
    setSelectedStableCoin({ name: stableCoin, escrowBalance, walletBalance, name32, contractAddress })
    calculateMaxNFTs(walletBalance, escrowBalance)
    handleChange(depositInputRef.current.value * reservationAmount, setDepositAmount, stableCoin) // Update the amount to deposit since it will differ from coin to coin due to difference in decimals
  }

  const calculateMaxNFTs = (walletBalance, escrowBalance) => {
    let maxDepositAmount = Math.floor(walletBalance / reservationAmount)
    setMaxDepositAmount(maxDepositAmount)
    let maxWithdrawalAmount = Math.floor(escrowBalance / reservationAmount)
    setMaxWithdrawalAmount(maxWithdrawalAmount)
  }

  return (
    <div className="bg-[#F8F3F3]">
      <div className="relative z-10 mx-auto w-full">
        <SiteMenu community={community}>
        {(address3 && !isNetworkAllowed) && (
        <li>
          <div className="cursor-pointer text-white bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block">
            Wrong Network!
          </div>
        </li>
        )}
        {!address3 && (
          <li>
            <div
              className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block" 
              onClick={ () => setShowModalWallet(true) }
            >
              Connect wallet
            </div>
          </li>
        )}
        {(chain3 && isNetworkAllowed) && (
        <li>
          <div>
              <div className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block">{network?.name}</div>
              <div className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block">
                { address3 ? address3.substring(0, 4) + "..." + address3.substring(address3.length - 4) : "No wallet connected"}
              </div>
            </div>
        </li>
        )}          
        </SiteMenu>

        { community === 'moonbirds' && (
        <section className="px-5 py-10 lg:pt-24 bg-gradient-to-b from-moonbirdf to-moonbirdt">
          <div className="mx-auto w-full max-w-[1050px] text-center lg:text-left">
            <h1 className="font-primary text-4xl font-extrabold tracking-[0.46px] text-yellow-500 sm:text-5xl md:text-6xl">Make your reservation Moonbird</h1>
          </div>
        </section>
        )}
        { community === '' && (
        <section className="px-5 py-10 lg:pt-24">
          <div className="mx-auto w-full max-w-[1050px] text-center lg:text-left">
            <h1 className="font-primary text-4xl font-extrabold text-primary sm:text-5xl md:text-6xl">Make your reservation</h1>
          </div>
        </section>
        )}
        <section className="px-5 py-10 lg:pb-24">
          <div className="mx-auto w-full max-w-[1050px]">
            <p className="font-medium leading-7  text-black/60 sm:text-xl lg:text-2xl">
            Connect your wallet to either { community === '' ? 'Mumbai or Goerli testnet' : 'Ethereum or Polygon' } and make a deposit of $3,333 using USDC, USDT or DAI to secure a Pocket Assistant NFT. You are welcome to reserve multiple NFTs.</p>
            <p className="pt-4 font-medium leading-7  text-black/60 sm:text-xl lg:text-2xl">
            You are free to withdraw your deposited funds any time until we officially announce the date and time of the mint (which will be  shortly after achieving 400 reservations).</p>
          </div>
          <div className="mx-auto w-full max-w-[1050px]">
            <div className="mt-11 mb-10 grid w-full gap-7 lg:grid-cols-2 lg:gap-12">
              <div className="rounded-[10px] bg-white px-7 pt-6 pb-8 shadow-account">
                <h3 className="mb-10 font-primary text-lg font-extrabold  text-black lg:text-2xl">Your Account Balance</h3>

                <div className="grid sm:grid-cols-2 sm:grid-row-4 sm:gap-x-1 gap-y-4 font-medium text-black lg:text-xl">
                  <div className="flex hover:bg-white/20 space-x-2 w-full space-y-1.5 lg:space-y-1 rounded-full">
                    <span className="flex h-10 w-10 rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                      <img src={network?.logo || networks[0].logo } className="w-8 h-8 object-contain"></img>
                    </span>
                    <span className="text-xl md:text-2xl">  {ETHWalletBalance} {network?.Currency || networks[0].Currency }</span>
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
                    <span className="text-xl md:text-5xl font-medium">{DAIEscrowBalance} DAI</span>
                  </li>) : null
                  }
                </ul>
              </div>
            </div>

            <div className="rounded-[10px] bg-white px-7 pt-6 pb-14 shadow-account">
              <h3 className="mb-10 font-primary text-lg font-extrabold  text-black lg:text-2xl">Reserve Your Spot</h3>

              { community === 'moonbirds' && (
              <div className="community-benefits pb-12">
                <h2 className="mb-4 font-sans font-medium text-black lg:text-xl">Choose your Moonbirds community benefit</h2>
                <form className="grid grid-cols-3 gap-2 w-full max-w-screen-sm">
                  <div className="bg-gray-600 hover:bg-moonbirdf active:bg-moonbirdf text-white rounded-lg text-center">
                    <input 
                      className="" 
                      id="radio_1" 
                      type="radio" 
                      name="benefit_radio" 
                      value="rebate"
                      checked={benefitOption === 'rebate'}
                      onChange={(e) => setBenefitOption(e.target.value)}
                    ></input>
                    <label className="flex flex-col p-4 cursor-pointer" htmlFor="radio_1">
                      <span className="text-xs font-semibold uppercase text-center">Rebate back 10% to me (post mint)</span>
                      <img className="max-w-[100px] mx-auto" src="https://res.cloudinary.com/daljbo1q0/image/upload/v1659977826/hdao-nft/65_zfluxq.png"></img>
                    </label>
                  </div>
                  <div className="bg-gray-600 hover:bg-moonbirdf active:bg-moonbirdf text-white rounded-lg text-center">
                    <input 
                      className="" 
                      id="radio_2" 
                      type="radio" 
                      name="benefit_radio" 
                      value="kids"
                      checked={benefitOption === 'kids'} 
                      onChange={(e) => setBenefitOption(e.target.value)}
                    ></input>
                    <label className="flex flex-col p-4 cursor-pointer" htmlFor="radio_2">
                      <span className="text-xs font-semibold uppercase text-center">Feed 650+ kids through Food for Life Global</span>
                      <img className="max-w-[100px] mx-auto" src="https://res.cloudinary.com/daljbo1q0/image/upload/v1659977827/hdao-nft/66_o5urnu.png"></img>
                    </label>
                  </div>
                  <div className="bg-gray-600 hover:bg-moonbirdf active:bg-moonbirdf text-white rounded-lg text-center">
                    <input 
                      className="" 
                      id="radio_3" 
                      type="radio" 
                      name="benefit_radio" 
                      value="treasury"
                      checked={benefitOption === 'treasury'} 
                      onChange={(e) => setBenefitOption(e.target.value)}
                    ></input>
                    <label className="flex flex-col p-4 cursor-pointer" htmlFor="radio_3">
                      <span className="text-xs font-semibold uppercase text-center">Send it to your community treasury</span>
                      <img className="max-w-[100px] mx-auto" src="https://res.cloudinary.com/daljbo1q0/image/upload/v1659977826/hdao-nft/67_aprqoc.png"></img>
                    </label>
                  </div>
                </form>
              </div>
              )}
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
              <div role="status" className="text-center my-8">
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
                  <span className="block sm:inline">{ statusMessage.reason ? statusMessage.reason : 'The transaction failed. Try again later if this seems like an error at out end. Please contact us if the problem does not resolve.' }</span>
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
                    Make deposit for Pocket Assistant NFTs
                  </label>
                  <span className="flex">
                    <p className="text-xs font-medium text-black/50">account balance:&nbsp;</p>
                    <p className="text-xs font-medium text-black/50">{ selectedStableCoin.walletBalance + ' ' + selectedStableCoin.name } - can reserve up to { maxDepositAmount } NFT{maxDepositAmount !== 1 && 's'}</p>
                  </span>
                  <select className="form-select form-select-lg border-[#333] px-3 py-3 font-secondary text-base font-bold text-black/90 appearance-none block w-full bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none" aria-label="select number of NFTs to reserve"
                    ref={depositInputRef}
                    onChange={(evt) =>  handleChange(evt.target.value * reservationAmount, setDepositAmount)}
                    disabled={inProgress || !isNetworkAllowed}                    
                  >
                    <option defaultValue={0} value="0">Number of NFTs to reserve</option>
                    { Array.from({length: maxDepositAmount}).fill('a').map((item, index) => (
                      <option key={index} value={index + 1}>Reserve {index + 1} PA NFT{ index > 0 && 's'}</option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={depositFunds}
                  disabled={inProgress || !isNetworkAllowed || !(depositAmount > 0)}
                  className="mx-auto block w-40 rounded-full bg-accent-purple px-8 py-3 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-10 md:text-xl">Deposit</button>
              </div>

              <div className="grid grid-cols-1 items-end gap-11 sm:grid-cols-[1fr_max-content]">
                <div>
                  <label htmlFor="withdraw" className="mb-5 block font-medium text-black lg:text-xl">
                    Withdraw deposit for Pocket Assistant NFTs
                  </label>
                  <div>
                    <span className="flex">
                      <p className="text-xs font-medium text-black/50">escrow balance:&nbsp;</p>
                      <p className="text-xs font-medium text-black/50">{ selectedStableCoin.escrowBalance + ' ' + selectedStableCoin.name } - { maxWithdrawalAmount } NFT{maxWithdrawalAmount !== 1 && 's'} reserved</p>
                    </span>
                    <select className="form-select form-select-lg border-[#333] px-3 py-3 font-secondary text-base font-bold text-black/90 appearance-none block w-full bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none" aria-label="select number of NFT deposits to withdraw"
                      ref={withdrawInputRef}
                      onChange={(evt) =>  handleChange(evt.target.value * reservationAmount, setWithdrawAmount)}
                      disabled={inProgress || !isNetworkAllowed}
                    >
                      <option defaultValue={0} value="0">Number of NFTs to withdraw</option>
                      { Array.from({length: maxWithdrawalAmount}).fill('a').map((item, index) => (
                        <option key={index} value={index + 1}>Withdraw deposit for {index + 1} PA NFT{ index > 0 && 's'}</option>
                      ))}
                    </select>
                    {/*<input 
                      ref={withdrawInputRef}
                      disabled={inProgress || !isNetworkAllowed}
                      onChange={(evt) => handleChange(evt.target.value, setWithdrawAmount)}
                      type="number" step="0.01" id="withdraw" placeholder="0.0" className="peer block w-full rounded border border-[#333] px-3 py-3 font-secondary text-base font-bold text-black/90 outline-none placeholder:font-normal sm:py-4" />
                    */}
                  </div>
                </div>

                <button 
                  onClick={withdrawFunds}
                  disabled={inProgress || !isNetworkAllowed || !(withdrawAmount > 0)}
                  className="mx-auto block w-40 rounded-full bg-accent-purple px-8 py-3 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-4 md:text-xl">Withdraw</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-10">
            {address3 && (
            <div
              className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 m-1 inline-block" 
              onClick={disconnect}
            >Disconnect wallet</div>
            )}
            { community === '' && (
            <div>
              <h1 className="text-2xl font-bold mt-8">
                  Testing only: click on the button to open the success-modal.
              </h1>
              <button
                className="px-4 py-2 mb-6 text-purple-100 bg-accent-purple rounded-md"
                type="button"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Open Modal
              </button>
            </div>
            )}
            {showModal && <SuccessModal setOpenModal={setShowModal} details={{ wallet: address3, amount: reservedNoNFTs }} />}
            {(community === '' && showModalWallet) && <WalletConnectModal setOpenModal={setShowModalWallet} connectMetaMask={connectWithMetamask} connectWalletConnect={connectWithWalletConnect} />}
          </div>
          </section>
      </div>
    </div>
  );
}
