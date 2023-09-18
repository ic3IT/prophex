'use client'
import type { NextPage } from 'next';
import Head from "next/head";
import Header from "../../components/Header";
import { useContractRead, useContract,useContractWrite, useAddress, ThirdwebProvider, ChainId, useDisconnect } from "@thirdweb-dev/react";
import { ScrollSepoliaTestnet } from "@thirdweb-dev/chains";
import Login from "../../components/login";
import Loading from "../../components/Loading";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import React from 'react';
import CountdownTimer from '../../components/CountdownTimer';
import toast, { Toaster } from 'react-hot-toast';
import { currency } from '../../constants';
import Marquee from 'react-fast-marquee';
import AdminControls from '../../components/AdminControls';
import Image from 'next/image';
import { disconnect } from 'process';

const Home: NextPage = () => {
  return (
    <ThirdwebProvider activeChain={ ScrollSepoliaTestnet } clientId='1e11f5ed7379e8b2e3305a4bf4ebe2db'> 
    <Toaster />
        <Head>
          <title>Scrollium Draw</title>
        </Head>

        <MainContent />
    </ThirdwebProvider>
  );
}

const MainContent: NextPage = () => {
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );
  const [userTickets, setUserTickets] = useState(0);
  const address = useAddress();
  const [quantity, setQuantity] = useState<number>(1);
  const { data: remainingTickets } = useContractRead(contract, "RemainingTickets")
  const {data: currentWinningReward } = useContractRead (contract, "CurrentWinningReward");
  const {data: ticketPrice } = useContractRead (contract, "ticketPrice");
  const {data: ticketCommision } = useContractRead (contract, "ticketCommission");
  const { mutateAsync: BuyTickets} = useContractWrite(contract, "BuyTickets") 
  const {data: expiration } = useContractRead (contract, "expiration");
  const {data: tickets } = useContractRead(contract, "getTickets")
  const {data: winnings} = useContractRead(contract, "getWinningsForAddress", [address])
  const [hasMinLoadTimePassed, setHasMinLoadTimePassed] = useState(false);
  const { mutateAsync: WithdrawWinnings } = useContractWrite(contract, "WithdrawWinnings");
  const {data: lastWinnerAmount } = useContractRead(contract, "lastWinnerAmount")
  const {data: lastWinner } = useContractRead(contract, "lastWinner")
  const {data: isLotteyOperator } = useContractRead(contract, 'lotteryOperator');
  const disconnect = useDisconnect();
  
  
  const onWithdrawWinnings = async () => {
      const notification = toast.loading("Withdraw Winnings...")

      try {
        const data = await WithdrawWinnings({ args: [] });

        toast.success("Winnings withdraw succesfully!", {
          id: notification
        })
      } catch(err) {
        toast.error("Whoops something went wrong", {
          id: notification
        });

        console.error("contract call failure", err)
      }

  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMinLoadTimePassed(true);
    }, 2000); // 2 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClick = async () => {
    try {
        await disconnect(); // Calling the function directly to disconnect.
        toast.success("Successfully disconnected!");
    } catch(err) {
        toast.error("Failed to disconnect!");
        console.error("Error disconnecting:", err);
    }
}

  useEffect(() => {
    if (!tickets) return;

    const noOfUserTickets = tickets.reduce((total: number, ticketAddress: string) => 
      (ticketAddress === address ? total + 1 : total), 
      0
    );

    setUserTickets(noOfUserTickets);

}, [tickets, address]);

  if (!hasMinLoadTimePassed) return <Loading />;
  if (isLoading) return <Loading />; 
  if (!address) return <Login />;


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      <div className='top-right'>
          <button onClick={disconnect} className=''>Disconnect</button>
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://scrolliums.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/sclogo.png"
              alt="Scrollium Logo"
              className=""
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-purple-700/90 before:dark:opacity-10 after:dark:from-purple-900 after:purple:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
      
    
      </div>
      

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">

    
      </div>
    </main>
  );
}


export default Home;
