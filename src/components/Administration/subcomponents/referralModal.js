import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../../config/constants/LaunchpadAddress";

export default function ReferralModal({
  selectedPool,
  setReferralModal,
  closeLoadingModal,
  openLoadingModal,
}) {
  const [referralPercentage, setReferralPercentage] = useState(0);
  const changeReferral = async (pool) => {
    if (referralPercentage < 0 || referralPercentage > 100) {
      return toast.error("Referral percentage should be between 0 and 100");
    }
    try {
      openLoadingModal();
      let finalSaleObject;

      finalSaleObject = {
        ...pool.sale,
        isReferral: referralPercentage > 0,
        referralPercentage,
      };

      const res = await axios.put(`${BACKEND_URL}/api/sale/${pool._id}`, {
        sale: finalSaleObject,
      });
      toast.success("Referral status changed successfully");
      closeLoadingModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      closeLoadingModal();
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-3 rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4  text-white">
          Edit Referral
        </h2>
        <div className="mb-4">
          <label
            htmlFor="referralPercentage"
            className="block text-sm font-medium text-white"
          >
            Referral Percentage:
          </label>
          <input
            type="number"
            id="referralPercentage"
            name="referralPercentage"
            
            value={referralPercentage}
            onChange={(e) => setReferralPercentage(e.target.value)}
            className="mt-1 p-2 border border-white text-white rounded-md w-full"
          />
        </div>
        <button
          onClick={() => changeReferral(selectedPool)}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save
        </button>
        <button
          onClick={() => setReferralModal(false)}
          className="ml-2 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
