import React, { useEffect, useState } from 'react'

export default function Topbar({
  setSideBarMobile,
  sideBarMobile,
  title,
  title_img,
  subpage,
  page_name,
  page_description,
  setTab,
  numberOfUsers,
}) {

  



  return (
    <div className="h-[110px] flex items-center justify-between pl-[4%] pr-[5%] ">
      <div className="flex items-center">
        <div
          className="flex md:hidden flex-col h-10 w-10 bg-[#F5F6F7] dark:bg-dark-1 hamburger justify-center items-center"
          onClick={() => setSideBarMobile(!sideBarMobile)}
        >
          <div
            className={`${sideBarMobile ? 'hidden' : 'block'
              } h-0 w-5 border mb-1 border-dark-text dark:border-light-text`}
          />
          <div
            className={`${sideBarMobile ? 'hidden' : 'block'
              } h-0 w-5 border mb-1 border-dark-text dark:border-light-text`}
          />
          <div
            className={`${sideBarMobile ? 'hidden' : 'block'} h-0 w-5 border border-dark-text dark:border-light-text`}
          />
          <span className={`${sideBarMobile ? 'block' : 'hidden'} dark:text-light-text`}>&#x2715;</span>
        </div>
        {subpage ? (
          <div className="flex items-center">
            <span className="font-medium text-dim-text text-xl capitalize">{page_name}</span>

            <div className="w-3 h-3 mx-2 -rotate-45 border-b-2 border-r-2 border-dark-text dark:border-light-text rounded" />

            <span className="font-gilroy font-medium text-dark-text text-xl">{title}</span>
          </div>
        ) : (
          <div className="flex flex-col justify-center ml-4 md:ml-0">
            <div className="flex items-center">
              {title_img}
              <span className="hidden md:inline-block font-gilroy font-bold text-gray dark:text-gray-dark text-3xl">
                {title}
              </span>

              <img className="mx-2" src="/images/topbar/separator.svg" alt="separator" />

              <span className="font-gilroy font-medium text-primary-green md:text-2xl">{page_name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-gilroy font-medium text-dark dark:text-light text-xs md:text-base">
                {page_description || 'Lock your assets for proof of lock.'}
              </span>
            </div>
          </div>
        )}

      </div>
        {setTab && (
          <div className="flex items-center ml-4">
            <button
              onClick={() => setTab('pools')}
              className={`${
                subpage ? 'hidden' : 'block'
              } bg-primary-green text-white rounded-md px-4 py-1 font-medium`}
            >
              Pools
            </button>
            <button
              onClick={() => setTab('users')}
              className={`${
                subpage ? 'hidden' : 'block'
              } bg-primary-green text-white rounded-md px-4 py-1 font-medium ml-2 relative`}
            >
              Users
              {numberOfUsers > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                { numberOfUsers }
              </span>
              )}
            </button>
          </div>
        )}

    </div>
  )
}
