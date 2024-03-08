import React, { useEffect, useState } from 'react';
import { useMetamask } from '@thirdweb-dev/react';
import MetaMaskOnboarding from '@metamask/onboarding';
import detectEthereumProvider from '@metamask/detect-provider';
import { Toaster, toast } from 'react-hot-toast';
import Image from 'next/image'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider, } from '@rainbow-me/rainbowkit';
import { configureChains, Chain, createConfig, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const METAMASK_DEEPLINK = "https://metamask.app.link/dapp/venium.io/"; // Replace with your MetaMask deeplink

function Login() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const connectWithMetamask = useMetamask();

  useEffect(() => {
    const checkInstallation = async () => {
      const provider = await detectEthereumProvider();
      setIsMetaMaskInstalled(!!provider);
    };

    if (window.ethereum) {
      handleEthereum();
    } else {
      window.addEventListener('ethereum#initialized', handleEthereum, { once: true });
      setTimeout(handleEthereum, 3000);
    }

    checkInstallation();
  }, []);

  function handleEthereum() {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask) {
      console.log('Ethereum successfully detected!');
    } else {
      console.log('Please install MetaMask!');
    }
  }

  const handleLoginClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isMetaMaskInstalled) {
      // Redirect user to MetaMask using deeplink or instruct them to install
      window.open(METAMASK_DEEPLINK, '_blank');
      console.log("MetaMask not installed. Showing toast...");
      toast.error('MetaMask is not installed!');
      return;
    }

    connectWithMetamask();
  };

  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className='top-left'>
          <button className='line-through'>Connect with your Metamask</button>
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://venium.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/sclogo.png"
              alt="Venium Logo"
              className=""
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-purple-700/90 before:dark:opacity-10 after:dark:from-purple-900 after:purple:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      <h4 className='text-4xl  relative flex fadeIn right-7'>Prophex</h4>
        <Image
          className="relative animate-slow-ping ml-5"
          src="/sclogo.png"
          alt="Next.js Logo"
          width={120}
          height={37}
          priority
        />
    
      </div>
      

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

    
      </div>
    </main>
  );
}

export default Login;
