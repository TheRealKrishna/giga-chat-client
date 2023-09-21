import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Loader from "./Loader"

export default function GetContacts(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [contacts, setContacts] = useState(false)
    const navigate = useNavigate();

    const getContacts = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/getContacts`, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem("auth-token")
            }
        })
        const json = await response.json()
        return json.contacts
    }

    const fetchContactsWithInfo = async (contactIds) => {
        const contactsPromise = contactIds.map(async (contact) => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/chat/getContactInfo`, {
                method: "POST",
                headers: {
                    "auth-token": localStorage.getItem("auth-token"),
                    "Content-Type":'Application/Json',
                },
                body: JSON.stringify({ _id: contact._id })
            })
            const json = await response.json()
            return json.contact;
        })
        const contacts = await Promise.all(contactsPromise);
        setContacts(prev=> contacts);
    }

    useEffect(() => {
        getContacts().then((contacts) => fetchContactsWithInfo(contacts))
        props.socket.current?.on('newMessage', () => {
            getContacts().then((contacts) => fetchContactsWithInfo(contacts))
        });
    }, [])


    return (
        <Fragment>
            {
                contacts ? contacts.map((contact) => {
                    return (
                        <div key={contact._id} className={`${props.Styles.contactItem} ${searchParams.get("id") === contact._id ? props.Styles.contactItemActive : ""}`} onClick={() => navigate(`/chat?id=${contact._id}`)}><img className={props.Styles.contactItemImage} src={contact.profile} alt="userProfile" /><span className={props.Styles.contactItemName}>{contact.nickname}</span>
                        {
                          props.user.unreadMessages[contact._id] > 0 && searchParams.get("id") !== contact._id ?  <span className={props.Styles.newMessageIndicator}>{props.user.unreadMessages[contact._id]}</span> : null
                        }
                        </div>
                    )

                })
                    :
                    <Loader />
            }
        </Fragment>
    )
}
