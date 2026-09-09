import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../../config/constants/LaunchpadAddress';

export default function Modal(setShowModal) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('url', url);

      await axios.post(`${BACKEND_URL}/api/banner`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-3 rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4 dark:text-white text-dark-3">
          Add Banner
        </h2>
        <div className="flex flex-col mb-4">
          <label className="text-sm mb-2 dark:text-white text-dark-3">
            Name
          </label>
          <input
            type="text"
            className="rounded-md border border-gray-300 dark:bg-white dark:border-dark-3 dark:text-black px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm mb-2 dark:text-white text-dark-3">
            URL
          </label>
          <input
            type="file"
            className="rounded-md border border-gray-300 dark:bg-white dark:border-dark-3 dark:text-black px-4 py-2"
            onChange={(e) => setUrl(e.target.files[0])}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-primary-green text-white rounded-md"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
