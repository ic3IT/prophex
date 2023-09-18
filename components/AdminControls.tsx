import React from "react";
import {
  StarIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
  ArrowUturnDownIcon,
} from "@heroicons/react/24/solid";
import {
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { currency } from "../constants";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

function AdminControls() {
  const { contract, isLoading } = useContract(
    process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
  );

  const { data: totalCommision } = useContractRead(
    contract,
    "operatorTotalCommission"
  );
  const { mutateAsync: DrawWinnerTicket } = useContractWrite(
    contract,
    "DrawWinnerTicket"
  );

  const { mutateAsync: restartDraw } = useContractWrite(
    contract,
    "restartDraw"
  );
  const { mutateAsync: RefundAll } = useContractWrite(contract, "RefundAll");
  const { mutateAsync: WithdrawCommission } = useContractWrite(
    contract,
    "WithdrawCommission"
  );

  const drawWinner = async () => {
    const notification = toast.loading("Picking a lucky winner....");
  
    try {
      const data = await DrawWinnerTicket({ args: [] });
      
      toast.success("A winner has been selected", {
        id: notification
      });
      console.info("Contract Call Success", data);
    } catch (err) {
      toast.error("Whoops something went wrong", {
        id: notification
      });
  
      console.error("Contract call failure", err);
    }
  }
  
  const onWithdrawCommission = async () => {
    const notification = toast.loading("Withdrawing Commission ....");
  
    try {
      const data = await WithdrawCommission({ args: [] });
      
      toast.success("Withdraw Successful", {
        id: notification
      });
      console.info("Contract Call Success", data);
    } catch (err) {
      toast.error("Whoops something went wrong", {
        id: notification
      });
  
      console.error("Contract call failure", err);
    }
  }
  
  const onRestartDraw = async () => {
    const notification = toast.loading("Restarting Draw ...");
  
    try {
      const data = await restartDraw({ args: [] });
      
      toast.success("Draw restart successful!", {
        id: notification
      });
      console.info("Contract Call Success", data);
    } catch (err) {
      toast.error("Whoops something went wrong", {
        id: notification
      });
  
      console.error("Contract call failure", err);
    }
  }
  
  const onRefundAll = async () => {
    const notification = toast.loading("Refunding All ...");
  
    try {
      const data = await RefundAll({ args: [] });
      
      toast.success("Refund Sucessfull", {
        id: notification
      });
      console.info("Contract Call Success", data);
    } catch (err) {
      toast.error("Whoops something went wrong", {
        id: notification
      });
  
      console.error("Contract call failure", err);
    }
  }




  return (
    <div className="text-white text-center px-5 py-3 rounded-md border-emerald-300/20 border">
      <h2 className="font-bold">Admin Controls</h2>
      <p className="mb-5">
        Total Commision to be withdrawn:{" "}
        {totalCommision && ethers.utils.formatEther(totalCommision?.toString())}{" "}
        {currency}
      </p>

      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <button onClick={drawWinner} className="admin-button">
          <StarIcon className="h-6 mx-auto mb-2" />
          Draw Winner
        </button>
        <button onClick={onWithdrawCommission} className="admin-button">
          <CurrencyDollarIcon className="h-6 mx-auto mb-2" />
          Withdraw Commision
        </button>
        <button onClick={onRestartDraw} className="admin-button">
          <ArrowPathIcon className="h-6 mx-auto mb-2" />
          Restart Draw
        </button>
        <button onClick={onRefundAll} className="admin-button">
          <ArrowUturnDownIcon className="h-6 mx-auto mb-2" />
          Refund All
        </button>
      </div>
    </div>
  );
}

export default AdminControls;
