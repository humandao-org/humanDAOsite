import React from "react";

export default function SuccessModal({ setOpenModal, details }) {
    return (
        <div className="fixed inset-0 z-20 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setOpenModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full mx-auto max-w-[1110px] p-4 mx-auto rounded-md shadow-lg bg-[#F8F3F3]">
                    <div 
                        className="absolute top-4 right-4 cursor-pointer"
                        onClick={() => setOpenModal(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="h-7 w-7 fill-current group-open:block">
                            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                        </svg>
                    </div>

                    <h1 className="my-6 text-center font-primary text-4xl font-extrabold tracking-[0.46px] text-primary sm:text-5xl md:text-6xl">
                        Thanks for your reservation!
                    </h1>

                    <div
                        className="mx-auto mb-12 flex w-full max-w-[762px] flex-col items-center justify-between gap-6 rounded-[10px] bg-white px-9 pt-9 pb-14 shadow-box sm:flex-row"
                    >
                        <div className="w-full max-w-[391px]">
                        <h3
                            className="mb-8 text-2xl font-semibold leading-8 -tracking-[0.45px]"
                        >
                            Your reservation details
                        </h3>
                        <ul className="space-y-8">
                            <li className="text-sm -tracking-default">
                            <span className="mb-1 block font-bold uppercase text-dark/40"
                                >timestamp</span
                            >
                            <span className="font-medium text-dark"
                                >{new Date().toLocaleString()}</span
                            >
                            </li>

                            <li className="text-sm -tracking-default">
                            <span className="mb-1 block font-bold uppercase text-dark/40"
                                >owner</span
                            >
                            <span className="break-words font-medium text-dark"
                                >{details.wallet}</span
                            >
                            </li>

                            <li className="text-sm -tracking-default">
                            <span className="mb-1 block font-bold uppercase text-dark/40"
                                >reserved amount</span
                            >
                            <span className="font-medium text-dark">{details.amount}</span>
                            </li>
                        </ul>
                        </div>
                        <div className="order-first w-full max-w-[280px] sm:order-none">
                        <img
                            src="assets/images/checked.png"
                            alt="Checked"
                            className="h-auto w-full object-contain"
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}