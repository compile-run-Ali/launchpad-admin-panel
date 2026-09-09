import React from "react";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import LaunchpadSVG from "../../svgs/Sidebar/launchpad";
import { useDocumentTitle } from "../../hooks/setDocumentTitle";
import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { BACKEND_URL,BackendUrlRef } from "../../config/constants/LaunchpadAddress";
import { useModal } from "react-simple-modal-provider";
import AdminTable from "../../components/Administration/AdminTable";
import { UserContext } from "../../context/userContext/UserContext";
import UsersTable from "../../components/Administration/UsersTable";


export default function Administration() {
  useDocumentTitle("Pools");
  const [loading, setLoading] = useState(true);
  const [pools, setPools] = useState([]);
  const [tab, setTab] = useState("pools");
  const [unApprovedUsers, setUnApprovedUsers] = useState([ ]);
  const { open: openLoadingModal, close: closeLoadingModal } =
    useModal("LoadingModal");

  const { user } = useContext(UserContext);

  useEffect(() => {
    
    async function getPools() {
      openLoadingModal();
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/sale/admin`);
        console.log(res.data)
        
        setPools(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
      closeLoadingModal();
    }

    getPools();
  }, []);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axios.get(`${BackendUrlRef}/users`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const unapproved = res.data.filter((user) => user.role === "unApproved");
        setUnApprovedUsers(unapproved);        

      } catch (err) {
        console.log(err);
      }
    }

    getUsers();
  } , []);


  return (
    <BaseLayout
      title={"Arborswap"}
      title_img={<LaunchpadSVG className="md:hidden fill-dim-text" />}
      page_name={"Admin"}
      page_description={"Edit sales and manage the launchpad"}
      setTab={setTab}
      numberOfUsers={unApprovedUsers.length}
    >

      {tab === "pools" && (
        <AdminTable pools={pools} loading={loading} setTab={setTab} />
      )}
      {tab === "users" && (
        <UsersTable users={unApprovedUsers} />
      )}
    </BaseLayout>
  );
}
