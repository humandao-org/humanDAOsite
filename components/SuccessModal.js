import React, { useState } from "react";
import Link from "next/link";
import StatusDisplay from "./StatusMessage";
import { registerEmail } from "../lib/affiliate";

export default function SuccessModal({ setOpenModal, details }) {

  const [statusMessage, setStatusMessage] = useState({ type: 'none', message: '' })
  const [email, setEmail] = useState('')

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
      setStatusMessage({ type: 'success', message: 'Your email address was sucessfully submitted.' })
    } else {
      setStatusMessage({ type: 'error', message: 'A technical problem occurred when submitting your email. Please, try again later!' })
    }
    console.log(result);
  }

  return (
    <div className="fixed inset-0 z-20 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setOpenModal(false)}></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative mx-auto mb-12 w-full max-w-[762px] rounded-[10px] bg-white px-9 pt-9 pb-14 shadow-box sm:flex-row">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpenModal(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-7 w-7 fill-current group-open:block">
                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
              </svg>
            </div>
            <div className="w-full max-w-[391px]">
              <h3 className="mb-8 text-2xl font-semibold leading-8 -tracking-[0.45px]">Thank you for your reservation!</h3>
              <ul className="space-y-8">
                <li className="text-sm -tracking-default">
                  <span className="mb-1 block font-bold uppercase text-dark/40">timestamp</span>
                  <span className="font-medium text-dark">{new Date().toLocaleString()}</span>
                </li>

                <li className="text-sm -tracking-default">
                  <span className="mb-1 block font-bold uppercase text-dark/40">owner</span>
                  <span className="break-words font-medium text-dark">{details.wallet}</span>
                </li>

                <li className="text-sm -tracking-default">
                  <span className="mb-1 block font-bold uppercase text-dark/40">reserved amount</span>
                  <span className="font-medium text-dark">{details.amount}</span>
                </li>
              </ul>
            </div>

            <div className="w-full max-w-[400px] sm:order-none">
              <img src="https://res.cloudinary.com/daljbo1q0/image/upload/v1659339164/hdao-nft/123_kzuttx.png" alt="Checked" className="h-auto max-w-[200px] lg:max-w-[300px] mx-auto object-contain" />

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
                <Link
                  data-size="large"
                  href="http://twitter.com/share?text=I've reserved a Pocket Assistant NFT from @humandao. Let's get this web3 gig economy started!%0a%0aGet one soon before they're gone at&url=https://reserve.humandao.org.%0a%0aHelp those in need and get your time back 🤝&hashtags=PANFT"
                >
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
          <div className="text-center mt-12 space-y-8">
            <div className="border-t border-slate-300"></div>
            <section className="contact pb-6">
              <div className="mx-auto flex w-full flex-wrap max-w-[400px] sm:max-w-[600px]">
                <div className="min-w-[250px] flex-1 rounded-lg px-5 pt-8 pb-8 text-center shadow-circle bg-gradient-to-br from-zinc-200 via-rose-100 to-purple-200">
                  <h3 className="text-2xl font-bold leading-none text-black">Stay updated on PANFT</h3>
                  <form
                    onSubmit={handleEmailSubmit}
                  >
                    <input 
                      required
                      type="email"
                      placeholder="Email address" 
                      className=" text-center bg-slate-50 rounded-md shadow-sm max-w-full mt-4 px-2 py-2"
                      onChange={(event) => setEmail(event.target.value)}
                    ></input>
                    <button
                      type="submit"
                      className="mx-auto mt-6 block w-fit rounded-full bg-accent-purple px-4 py-2 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none sm:px-10 md:text-sm"
                    >Notify me
                    </button>
                  </form>
                  <StatusDisplay statusMessage={statusMessage} resetStatus={() => setStatusMessage({ type: 'none', message: '' })}></StatusDisplay>
                </div>
              </div>
            </section>
            <div>
              Join our{" "}
              <Link href="https://discord.gg/PN7ftwV5gh">
                <a target="_blank" rel="noreferrer" className="underline font-semibold hover:text-blue-400">
                  Discord
                </a>
              </Link>{" "}
              and stay updated via #pa-nft-chat channel.
            </div>
            <div>
              <Link href="https://nft.humandao.org">
                <a target="_blank" rel="noreferrer" className="underline font-semibold hover:text-blue-400">
                  Return to NFT website
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
