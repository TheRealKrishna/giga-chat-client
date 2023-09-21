import React, { useEffect, useId, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import ClickAwayListener from "react-click-away-listener"
import Styles from "../css/ChatPage.module.css"
import { useSearchParams } from 'react-router-dom';
import Loader from './Loader';

export default function ChatArea(props) {
    const [text, setText] = useState("");
    const [emojiPicker, setEmojiPicker] = useState(false);
    const chat = useRef();
    const [messages, setMessages] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        props.socket.current?.on('newMessage', () => {
            fetchMessages();
            props.setSearchQuery("")
          });
    },[])
    

    const fetchMessages = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/getMessages`, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem("auth-token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: props.currentUser._id })
        })
        const json = await response.json()
        if (json.success) {
            setMessages(json.messages)
        }
    }

    const onTextChange = (e) => {
        setText(e.target.value);
    }

    const toggleEmojiSelector = () => {
        setEmojiPicker(!emojiPicker);
    }

    const onEmojiSelect = (emoji) => {
        setText((prevText) => prevText + emoji.emoji);
    }

    const addToContact = async () => {
        await fetch(`${process.env.REACT_APP_API_URL}/api/chat/addContact`, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem("auth-token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: props.currentUser._id })
        })
    }

    const sendMessage = async (e) => {
        e.preventDefault();
        if (text.length) {
            // chat.current.innerHTML += `<div className=${Styles.rightChat}><span className=${Styles.outgoingChat}>${text}</span></div>`
            const message = text;
            setText("")
            addToContact();
            if (messages?.length !== 0) {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/addMessage`, {
                    method: "POST",
                    headers: {
                        "auth-token": localStorage.getItem("auth-token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ _id: props.currentUser._id, message: message })
                })
                const json = await response.json()
                setMessages(json.messages)
            }
            else {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/createChat`, {
                    method: "POST",
                    headers: {
                        "auth-token": localStorage.getItem("auth-token"),
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ _id: props.currentUser._id, message: message })
                })
                const json = await response.json()
                setMessages(json.messages)
            }
        }
        props.socket.current.emit('newMessage')
    }

    useEffect(() => {
        setMessages(false)
        fetchMessages();
    }, [searchParams])

    useEffect(() => {
        if (chat.current) {
            chat.current.scrollTop = chat.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={Styles.chatArea}>
            <div ref={chat} className={Styles.chat}>
                {
                    messages ? messages.map((message) => {
                        return (
                            <div key={message._id} className={message.sender === props.currentUser._id ? Styles.leftChat : Styles.rightChat}><span className={message.sender === props.currentUser._id ? Styles.incomingChat : Styles.outgoingChat}>{message.message}<h6 className={Styles.timeStamp}>{new Date(message.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h6></span></div>
                        )
                    })
                    :
                    <Loader/>
                }
            </div>
            {emojiPicker &&
                (
                    <ClickAwayListener onClickAway={toggleEmojiSelector}>
                        <div className={Styles.emojiSelectorBox}>
                            <EmojiPicker defaultSkinTone="1f3fb" onEmojiClick={onEmojiSelect} />
                        </div>
                    </ClickAwayListener>
                )
            }
            <form onSubmit={sendMessage} className={Styles.sendMessage}>
                <div className={Styles.sendMessageBox}>
                    <div className={Styles.sendMessageEmojiSelector}><i className="fa-regular fa-face-smile" onClick={toggleEmojiSelector}></i></div>
                    <label htmlFor="fileUpload"><div className={Styles.attachmentSelector}><i className="fa-solid fa-paperclip"></i><input name='fileUpload' style={{ display: "none" }} id="fileUpload" type="file" /></div></label>
                    <input autoComplete='off' name="text" value={text} onChange={onTextChange} type="text" className={Styles.sendMessageInput} placeholder='say something...'></input>
                    <button type='submit' className={`${Styles.sendMessage} btn`}><i className="fa-solid fa-circle-arrow-right"></i></button>
                </div>
            </form>
        </div>
    )
}
