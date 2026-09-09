import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../config/constants/LaunchpadAddress";
import { toast } from "react-toastify";

export default function TokenModal({
  selectedPool,
  setSelectedPool,
  openLoadingModal,
  closeLoadingModal,
  setTokenEdit,
}) {
  const [tokenomics, setTokenomics] = useState([]);
  const [sale, setSale] = useState(selectedPool.sale);

  useEffect(() => {
    if (selectedPool.sale.tokenomics) {
      setTokenomics(selectedPool.sale.tokenomics);
    }
  }, [selectedPool]);

  const handleTokenomicsChange = (index, field, value) => {
    const updatedTokenomics = [...tokenomics];
    updatedTokenomics[index][field] = value;
    setTokenomics(updatedTokenomics);
    setSale({ ...sale, tokenomics: updatedTokenomics });
  };

  const handleAddTokenomic = () => {
    const newTokenomic = {
      name: "",
      percentage: 0,
      color: "#000000",
    };
    setTokenomics([...tokenomics, newTokenomic]);
    setSale({ ...sale, tokenomics: [...tokenomics, newTokenomic] });
  };
  const handleRemoveTokenomic = (index) => {
    const updatedTokenomics = [...tokenomics];
    updatedTokenomics.splice(index, 1);
    setTokenomics(updatedTokenomics);
    setSale({ ...sale, tokenomics: updatedTokenomics });
  };

  const handleConfirmEdit = async () => {
    try {
      openLoadingModal();
      const res = await axios.put(
        `${BACKEND_URL}/api/sale/${selectedPool._id}`,
        {
          sale: sale,
        }
      );
      console.log(res);
      toast.success("Project details updated successfully");
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
        <h2 className="text-xl font-semibold mb-4 dark:text-white text-dark-3">
          Edit Tokenomics
        </h2>

        {tokenomics.map((tokenomic, index) => (
          <div key={index} className="flex mb-4 items-center">
            <input
              type="text"
              value={tokenomic.name}
              onChange={(e) =>
                handleTokenomicsChange(index, "name", e.target.value)
              }
              className="border border-gray-300 rounded-lg px-2 py-1 mr-2 dark:text-white text-dark-3"
            />
            <input
              type="number"
              value={parseFloat(tokenomic.percentage)}
              min="0"
              onChange={(e) =>
                handleTokenomicsChange(index, "percentage", e.target.value)
              }
              className="border border-gray-300 rounded-lg px-2 py-1 mr-2 dark:text-white text-dark-3"
            />
            <input
              type="color"
              value={tokenomic.color}
              onChange={(e) =>
                handleTokenomicsChange(index, "color", e.target.value)
              }
              className="border border-gray-300 rounded-lg px-2 py-1 dark:text-white text-dark-3"
            />
          </div>
        ))}
        <div className="flex mb-4 items-center">
          <button
            className="px-4 py-2 bg-primary-green text-white rounded-md  mb-4"
            onClick={handleAddTokenomic}
          >
            Add Tokenomic
          </button>
          <button
            className="px-4 py-2 bg-primary-red text-white rounded-md  mb-4 ml-4"
            onClick={handleRemoveTokenomic}
          >
            Remove Tokenomic
          </button>
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 dark:bg-white text-white bg-black dark:text-black rounded-md  mr-2"
            onClick={handleConfirmEdit}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 dark:bg-white text-white bg-black dark:text-black rounded-md "
            onClick={() => {
              setSelectedPool(null);
              setTokenEdit(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
