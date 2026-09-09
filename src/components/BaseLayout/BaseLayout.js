import React, { useContext, useEffect, useState } from "react";
import Styles from "./BaseLayout.module.css";

import { ThemeContext } from "../../context/ThemeContext/ThemeProvider";
import Topbar from "../Topbar/Topbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Middleware from "../../middleware/middleware";


export default function BaseLayout({
  children,
  noTopbar,
  noSidebar,
  title,
  subpage,
  title_img,
  page_name,
  page_description,
  admin,
  setAdminMode,
  setTab = null,
  numberOfUsers = 0,
}) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [tempfixed, setTempFixed] = useState(true);



  useEffect(() => {
    if (theme === "dark") {
      setTempFixed(false);
    }
  }, [theme]);



  return (
    <>
    <Middleware>
    <div className="w-full dark:bg-dark">

          {noTopbar ? null : (
            <div className={`${Styles.topBar} w-full`}>
              <Topbar
                page_description={page_description}
                title={title}
                title_img={title_img}
                subpage={subpage}
                page_name={page_name}
                admin={admin}
                setAdminMode={setAdminMode}
                setTab={setTab}
                numberOfUsers={numberOfUsers}
              />
            </div>
          )}
          <div
            className="pb-10 mt-[130px] min-h-[calc(100vh-130px)] font-gilroy bg-tree-pattern-mobile md:bg-tree-pattern bg-center bg-no-repeat bg-contain w-full "
          >
            {children}
          </div>
        </div>
                <ToastContainer />
    </Middleware>
</>

  );
}
