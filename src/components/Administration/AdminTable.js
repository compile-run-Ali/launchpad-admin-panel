import React, { useState, useContext } from "react";
import SearchSVG from "../../svgs/search";
import { toast } from "react-toastify";
import { ThemeContext } from "../../context/ThemeContext/ThemeProvider";
import { useModal } from "react-simple-modal-provider";
import axios from "axios";
import { BACKEND_URL } from "../../config/constants/LaunchpadAddress";
import Modal from "./subcomponents/Modal";
import TokenModal from "./subcomponents/TokenModal";
import ReferralModal from "./subcomponents/referralModal";

export default function AdminTable({ pools }) {
  const { theme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPool, setSelectedPool] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tokenEdit, setTokenEdit] = useState(false);
  const [referralModal, setReferralModal] = useState(false);
  const [tagModal, setTagModal] = useState(false);
  const { open: openLoadingModal, close: closeLoadingModal } =
    useModal("LoadingModal");

  const tagList = ["SAFU", "AUDIT", "KYC", "Migration"];

  const filteredPools = pools?.filter((pool) =>
    pool?.sale?.saleAddress?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function copyText(value) {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    toast.success("Copied to clipboard");
  }

  function toggleTag(tag) {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tag)) {
        return prevTags.replace(`,${tag}`, "");
      } else {
        return prevTags + `,${tag}`;
      }
    });
  }
  const confirmEditTags = async () => {
    // Send API request with selectedPool and selectedTags
    console.log("Selected Pool:", selectedPool);
    console.log("Selected Tags:", selectedTags);
    //here we will make pool object with selectedPool and selectedTags
    //and send it to backend
    const finalSaleObject = { ...selectedPool.sale, tags2: selectedTags };
    console.log(finalSaleObject, "finalSaleObject");
    try {
      openLoadingModal();
      const res = await axios.put(
        `${BACKEND_URL}/api/sale/${selectedPool._id}`,
        {
          sale: finalSaleObject,
        }
      );
      toast.success("Project details updated successfully");
      closeLoadingModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      closeLoadingModal();
    }

    // Close the modal and reset selectedPool and selectedTags
    setSelectedPool(null);
    setSelectedTags([]);
  };

  const openEditModal = (pool) => {
    setSelectedPool(pool);
    setTagModal(true);
  };
  const openTokenEditModal = (pool) => {
    setTokenEdit(true);
    setSelectedPool(pool);
  };
  const openReferralModal = (pool) => {
    setReferralModal(true);
    setSelectedPool(pool);
  };
  const removePool = async (pool) => {
    try {
      openLoadingModal();
      const res = await axios.put(`${BACKEND_URL}/api/sale/${pool._id}`, {
        removed: true,
      });
      toast.success("Project removed successfully");
      closeLoadingModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      closeLoadingModal();
    }
  };
  const restorePool = async (pool) => {
    try {
      openLoadingModal();
      const res = await axios.put(`${BACKEND_URL}/api/sale/${pool._id}`, {
        removed: false,
      });
      toast.success("Project restored successfully");
      closeLoadingModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
      closeLoadingModal();
    }
  };


  const changeTrending = async (pool) => {

    try {
      openLoadingModal();

      const res = await axios.put(`${BACKEND_URL}/api/sale/trending/${pool._id}`, {
        isTrending: pool.isTrending ? false : true,
      });

      toast.success("Trending status changed successfully");
      closeLoadingModal();
      window.location.reload();
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong");
      closeLoadingModal();
    }
  };

  return (
    <div className=" w-4/6 mx-auto">
      <div className="flex items-center justify-between border-2 border-white dark:border-dark-1 bg-[#F5F1EB] dark:bg-dark-3 rounded-md px-5 py-3 mb-12">
        <input
          className="bg-transparent dark:text-white placeholder:text-dim-text dark:placeholder:text-dim-text-dark focus:outline-none w-full"
          placeholder={"search by address"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchSVG className="fill-dark-text dark:fill-light-text" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <table className="table-auto w-full dark:text-white text-center overflow-x-auto text-[12px]">
          <thead>
            <tr>
              <th className="px-4 py-2">Pool Name</th>
              <th className="px-4 py-2">Pool Address</th>
              <th className="px-4 py-2">Pool Status</th>
              <th className="px-4 py-2">Pool Start Date</th>
              <th className="px-4 py-2">Pool End Date</th>
              <th className="px-4 py-2">Pool Tags</th>
              <th className="px-4 py-2">Tokenomics </th>
              <th className="px-4 py-2">Removed </th>
              <th className="px-4 py-2">Referral</th>
              <th className="px-4 py-2">Trending</th>
            </tr>
          </thead>
          <tbody>
            {filteredPools.map((pool, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 ">{pool.sale.name}</td>
                <td className="border px-4 py-10 flex">
                  <a
                    href={`https://bscscan.com/address/${pool.sale.saleAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pool.sale.saleAddress}
                  </a>
                  <button
                    onClick={() => copyText(pool.sale.saleAddress)}
                    className="ml-2 text-dark-text dark:text-light-text"
                  >
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="copy"
                      width="1em"
                      height="1em"
                      fill={theme === "dark" ? "white" : "black"}
                      aria-hidden="true"
                    >
                      <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
                    </svg>
                  </button>
                </td>
                <td className="border px-4 py-2">{pool.sale.status}</td>
                <td className="border px-4 py-2">
                  {new Date(pool.sale.startDate * 1000).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(pool.sale.endDate * 1000).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <button onClick={() => openEditModal(pool)}>
                    <div className="flex items-center justify-center">
                      {pool.sale.tags2 &&
                        pool.sale.tags2.split(",").map((tag) =>
                          tag === "" ? null : (
                            <span
                              key={tag}
                              className="bg-primary-green text-white rounded-full px-4 py-2 text-sm font-semibold"
                            >
                              {tag}
                            </span>
                          )
                        )}
                      {!pool.sale.tags2 && (
                        <span className="bg-primary-green text-white rounded-full px-4 py-2 text-sm font-semibold">
                          No Tags
                        </span>
                      )}
                    </div>
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex flex-row justify-center">
                    <button
                      className="bg-primary-green py-2 px-4 rounded-xl"
                      onClick={() => openTokenEditModal(pool)}
                    >
                      <span className="text-sm font-semibold text-white">
                        Edit
                      </span>
                      {/* {pool.sale.tokenomics?.map((tokenomic, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-sm font-semibold text-white">
                          {tokenomic.name}
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {tokenomic.percentage}
                        </span>
                        <span
                          className={`text-sm font-semibold rounded-full w-5 h-5 bg-[${tokenomic.color}]`}
                        >    
                        </span>
                      </div>
                    ))} */}
                    </button>
                  </div>
                </td>
                <td className="border px-4 py-2">
                  {pool.removed ? (
                    <button
                      onClick={() => restorePool(pool)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Restore
                    </button>
                  ) : (
                    <button
                      onClick={() => removePool(pool)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Remove
                    </button>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {/* button on if referral off if not */}
                  {pool.sale.isReferral ? (
                    <button
                      onClick={() => openReferralModal(pool)}
                      className="bg-primary-green text-white rounded-full px-4 py-2 text-sm font-semibold"
                    >
                      {pool.sale.referralPercentage}%
                    </button>
                  ) : (
                    <button
                      onClick={() => openReferralModal(pool)}
                      className="bg-red-500 text-white rounded-full px-4 py-2 text-sm font-semibold"
                    >
                      Off
                    </button>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {/* button on if referral off if not */}
                  {pool.isTrending ? (
                    <button
                      onClick={() => changeTrending(pool)}
                      className="bg-primary-green text-white rounded-full px-4 py-2 text-sm font-semibold"
                    >
                      On
                    </button>
                  ) : (
                    <button
                      onClick={() => changeTrending(pool)}
                      className="bg-red-500 text-white rounded-full px-4 py-2 text-sm font-semibold"
                    >
                      Off
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedPool && tagModal && (
          <Modal
            tagList={tagList}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            confirmEditTags={confirmEditTags}
            setSelectedPool={setSelectedPool}
            setTagModal={setTagModal}
          />
        )}
        {selectedPool && tokenEdit && (
          <TokenModal
            selectedPool={selectedPool}
            setSelectedPool={setSelectedPool}
            openLoadingModal={openLoadingModal}
            closeLoadingModal={closeLoadingModal}
            setTokenEdit={setTokenEdit}
          />
        )}
        {
          referralModal && selectedPool && (
            <ReferralModal
              selectedPool={selectedPool}
              setReferralModal={setReferralModal}
              closeLoadingModal={closeLoadingModal}
              openLoadingModal={openLoadingModal}
            />
          )
        }
      </div>
    </div>
  );
}
