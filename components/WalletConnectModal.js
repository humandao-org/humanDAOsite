import React from "react";
import Link from "next/link";
import MetaMaskLogo from "../public/assets/svg/Metamask"
import WalletConnectLogo from "../public/assets/svg/WalletConnect"
import styled from 'styled-components';

const StyledWalletOptions = styled.div`
  display: flex;
  flex-direction: column;
  height: 365px;
  min-width: 350px;
  justify-content: space-between;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

export default function WalletConnectModal({ setOpenModal, connectMetaMask, connectWalletConnect }) {
    return (
        <div className="fixed inset-0 z-20 overflow-y-auto">
            <div
                className="fixed inset-0 w-full h-full bg-black opacity-40"
                onClick={() => setOpenModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">

                <div className="relative mx-auto flex flex-col items-center justify-between gap-6 rounded-[10px] bg-white shadow-box sm:flex-row">
                    <StyledWalletOptions className="bg-white">
                    <div
                        className="flex flex-1 flex-col items-center justify-center border-0 border-b-2 border-b-borderGray border-solid hover:cursor-pointer"
                        onClick={() => { connectMetaMask(); setOpenModal(false) }}
                    >
                        <MetaMaskLogo />
                        <div className="font-inter font-bold text-2xl mt-4">MetaMask</div>
                        <div className="font-inter text-sm">
                        Connect to your Metamask Wallet
                        </div>
                    </div>
                    <div
                        className="flex flex-1 flex-col items-center justify-center hover:cursor-pointer"
                        onClick={() => { connectWalletConnect(); setOpenModal(false) }}
                    >
                        <WalletConnectLogo />
                        <div className="font-inter font-bold text-2xl mt-4">
                        WalletConnect
                        </div>
                        <div className="font-inter text-sm">
                        Scan WalletConnect QR to connect
                        </div>
                    </div>
                    </StyledWalletOptions>
                </div>
            </div>
        </div>
    );
}