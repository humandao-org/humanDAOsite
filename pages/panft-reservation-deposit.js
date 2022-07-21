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

            <section className="px-5 py-10 lg:pt-48 lg:pb-24">
                <div className="mx-auto w-full max-w-[1050px]">
                    <h1
                        className="mb-6 font-primary text-4xl font-extrabold tracking-[0.46px] text-primary sm:text-5xl md:text-6xl">
                        Make your reservation
                    </h1>
                    <p className="font-medium leading-7 tracking-[0.46px] text-black/60 sm:text-xl lg:text-2xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </p>

                    <div className="mt-11 mb-10 grid w-full grid-cols-1 gap-7 sm:grid-cols-2 lg:gap-12">
                        <div className="rounded-[10px] bg-white px-7 pt-6 pb-14 shadow-account">
                            <h3 className="mb-10 font-primary text-lg font-extrabold tracking-[0.46px] text-black lg:text-2xl">
                                Account Balance
                            </h3>

                            <ul className="space-y-8 font-medium text-black lg:text-xl">
                                <li className="grid grid-cols-[max-content_1fr] items-center gap-3.5">
                                    <span
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                                        <img src="assets/images/eth-diamond-purple.png" alt="Diamond"
                                            className="h-full w-full object-contain" />
                                    </span>
                                    <span><strong>Balance:</strong> 1.1242114729405 ETH</span>
                                </li>
                                <li className="grid grid-cols-[max-content_1fr] items-center gap-3.5">
                                    <span
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                                        🔗
                                    </span>
                                    <span><strong>Chain Info: </strong>Polygon Mainnet</span>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-[10px] bg-white px-7 pt-6 pb-14 shadow-account">
                            <h3 className="mb-10 font-primary text-lg font-extrabold tracking-[0.46px] text-black lg:text-2xl">
                                Your Holdings
                            </h3>

                            <ul className="space-y-8 font-medium text-black lg:text-xl">
                                <li className="grid grid-cols-[max-content_1fr] items-center gap-3.5">
                                    <span
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                                        <img src="assets/images/coin.png" alt="Diamond"
                                            className="h-full w-full object-contain" />
                                    </span>
                                    <span><strong>Current: </strong>1.1242114729405 ETH</span>
                                </li>
                                <li className="grid grid-cols-[max-content_1fr] items-center gap-3.5">
                                    <span
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f8f8] p-1 text-base shadow-icon">
                                        <img src="assets/images/coin.png" alt="Diamond"
                                            className="h-full w-full object-contain" />
                                    </span>
                                    <span><strong>In escrow: </strong>2.12993484575 ETH</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="rounded-[10px] bg-white px-7 pt-6 pb-14 shadow-account">
                        <h3 className="mb-10 font-primary text-lg font-extrabold tracking-[0.46px] text-black lg:text-2xl">
                            Reserve Your Spot
                        </h3>

                        <div className="mb-10 grid grid-cols-1 items-end gap-11 sm:grid-cols-[1fr_max-content]">
                            <div>
                                <label htmlFor="deposit"
                                    className="mb-5 block font-medium tracking-[-0.46px] text-black lg:text-xl">Deposit
                                    Amount</label>
                                <input type="text" id="deposit"
                                    className="peer block w-full rounded border border-[#333] px-3 py-3 font-secondary text-base font-bold text-black/90 outline-none placeholder:font-normal sm:py-4" />
                            </div>

                            <button
                                className="mx-auto block w-40 rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-10 md:text-xl">
                                Deposit
                            </button>
                        </div>

                        <div className="grid grid-cols-1 items-end gap-11 sm:grid-cols-[1fr_max-content]">
                            <div>
                                <label htmlFor="withdraw"
                                    className="mb-5 block font-medium tracking-[-0.46px] text-black lg:text-xl">Withdraw
                                    Amount</label>
                                <input type="text" id="withdraw"
                                    className="peer block w-full rounded border border-[#333] px-3 py-3 font-secondary text-base font-bold text-black/90 outline-none placeholder:font-normal sm:py-4" />
                            </div>

                            <button
                                className="mx-auto block w-40 rounded-full bg-accent-purple px-8 py-4 text-base font-bold text-white shadow-sm transition-all duration-200 hover:shadow-none md:px-10 md:text-xl">
                                Withdraw
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  );
}
