import React, { useEffect, useId, useRef, useState } from 'react'
import Styles from "../../css/ChatPage.module.css"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import GetContacts from '../../components/GetContacts';
import SearchContacts from '../../components/SearchContacts';
import ChatArea from '../../components/ChatArea';
import io from 'socket.io-client';

export default function ChatPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentUser, setCurrentUser] = useState(false)
  const [user, setUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const navigate = useNavigate();
  const socket = useRef();

  // io
  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API_URL);
  }, []);

  useEffect(()=>{
    socket.current?.on('newMessage', () => {
      fetchUser();
      });
  },[])

  const fetchUser = async()=>{
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/getUserInfo`, {
        method: "POST",
        headers: {
            "auth-token": localStorage.getItem("auth-token"),
        },
    })
    const json = await response.json()
    setUser(prev=>json.user);
}

  const fetchCurrentUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/getContactInfo`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: searchParams.get("id") })
    })
    const json = await response.json()
    if (json.success) {
      setCurrentUser(json.contact);
    }
    return json.success
  }

  const searchContact = async (e) => {
    setSearchQuery(prevText => e.target.value);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/searchContact`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nickname: e.target.value })
    })
    const json = await response.json()
    setSearchedUsers(json.users);
  }

  useEffect(() => {
    fetchUser();
    const contactsArea = document.getElementsByClassName(Styles.contactsArea)[0];
    contactsArea.style.display = "";
    setCurrentUser(false)
    if (searchParams.get("id")) {
      fetchCurrentUser().then((response) => {
        if (response) {
          if (window.matchMedia("(max-width: 700px)").matches) {
            contactsArea.style.display = "none";
          }
        }
        else {
          navigate("/chat")
        }
      });
    }
  }, [searchParams])

  return (
    <div>
      <div className={Styles.blueCirclesBackground}></div>
      <div className={Styles.navbar}>
        <Link to="/"><h4 className={Styles.title}>Giga Chat</h4></Link>
        <div className={Styles.currentUser}>
          {
            currentUser &&
            <>
              <img src={currentUser.profile} alt='profile' />
              <span>{currentUser.nickname}</span>
            </>
          }
        </div>
        <Link className={Styles.settingsIcon} to={"/settings"}>
          <i className={`fa-solid fa-gear`}></i>
        </Link>
      </div>
      <div className='d-flex'>
        <div className={Styles.contactsArea}>
          <form onSubmit={(e) => { e.preventDefault() }} className={Styles.contactSearch}>
            <input autoComplete="off" type="text" name="searchQuery" value={searchQuery} onChange={searchContact} placeholder='search...' className={Styles.contactSearchInput} />
            <button type='submit' className={`${Styles.contactSearchButton} btn`}><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>
          <div className={Styles.contacts}>
            {
              searchQuery?.length !== 0 ? searchedUsers?.length !== 0 ? <SearchContacts user = {user} socket={socket} searchedUsers={searchedUsers} Styles={Styles} /> : <h6 style={{ textAlign: "center", margin: "20px 0px" }}>No results found!</h6> : <GetContacts user = {user} socket={socket} Styles={Styles} />
            }
          </div>
        </div>
        {
          currentUser &&
          <ChatArea user = {user} setSearchQuery={setSearchQuery} socket={socket} currentUser={currentUser} />
        }
      </div>
    </div>
  )
}
