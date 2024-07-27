"use client"
import { useRouter } from "next/navigation";
//----------- ICONS --------------------------
import { FaArchive, FaUserPlus } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { PiChatsFill } from "react-icons/pi";
import { RiContactsBook3Fill, RiLogoutCircleLine } from "react-icons/ri";
import UploadProfilePic from "@/app/SVGs/UploadProfilePic";
import { useState } from "react";
// import AddFriend from "../scenes/AddFriend";

const SideBarButtons = () => {
  const router = useRouter(),
  [addFriend, setAddFriend] = useState(false);
  
  const gotoChats = () => {
      router.replace("/");
    },
    gotoProfileSettings = () => {
      router.replace("/profile");
    },
    addFriendModal = () =>{
      setAddFriend(!addFriend)
    },
    consolee = () => {
      console.log("nothing");
    };
    
  return (
    <>
      <main className="sidebar-icons">
        <div className="profile" onClick={gotoProfileSettings}>
            <UploadProfilePic />
        </div>
        <section className="icons-section">
          <button
            className="side-Btn"
            type="button"
            title="Chats"
            onClick={gotoChats}
          >
            <PiChatsFill className="side-icon" />
            Chats
          </button>
          <button className="side-Btn" type="button" title="Contacts">
            <RiContactsBook3Fill className="side-icon" />
            Contacts
          </button>
          <button
            className="side-Btn"
            type="button"
            title="Archive"
            onClick={consolee}
          >
            <FaArchive className="side-icon" />
            Archive
          </button>
          <button
            className="side-Btn"
            type="button"
            title="Archive"
            onClick={addFriendModal}
          >
            <FaUserPlus className="side-icon" />
            Add Friend
          </button>
        </section>
        <section className="icons-section">
          <button className="side-Btn" type="button" title="Settings">
            <IoSettingsSharp className="side-icon" />
            Settings
          </button>
          <button
            className="logout-Btn side-Btn"
            type="button"
            title="Log-out"
          >
            <RiLogoutCircleLine className="logout-icon" />
            Log out
          </button>
        </section>
        {/* {addFriend && <AddFriend toggleAddFriendModal={addFriendModal}/>} */}
      </main>
    </>
  );
};

export default SideBarButtons;
