import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config/constants/LaunchpadAddress';
import Modal from './subcomponents/Modal';

export default function BannerTable({ banners }) {
    const [showModal, setShowModal]=useState(false);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/banner/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-8">
      <button 
      onClick={()=>setShowModal(true)}
      className="bg-primary-green float-right m-4 text-white font-bold py-2 px-4 rounded">
        Add Banner
      </button>
      <table className="w-full border border-white text-white">
        <thead>
          <tr>
            <th className="border-b">Name</th>
            <th className="border-b">Image</th>
            <th className="border-b"></th>
          </tr>
        </thead>
        <tbody>
          {banners.map((banner) => (
            <tr key={banner.name} className='text-center'>
              <td className="border-b border-r w-1/3">{banner.name}</td>
              <td className="border-b border-r flex justify-center">
                <img src={BACKEND_URL + banner.url} alt={banner.name} className="w-full h-40" />

              </td>
              <td className="border-b border-r w-1/3">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(banner._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        {showModal && (
            <Modal setShowModal={setShowModal} />
        )}
    </div>
  );
}
