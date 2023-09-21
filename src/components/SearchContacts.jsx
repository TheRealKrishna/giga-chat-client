import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function SearchContacts(props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const contacts = props.searchedUsers;
    const navigate = useNavigate();

    return (
        <Fragment>
            {
                contacts && contacts.map((contact) => {
                    return (
                        <div key={contact._id} className={`${props.Styles.contactItem} ${searchParams.get("id") === contact._id ? props.Styles.contactItemActive : ""}`} onClick={() => navigate(`/chat?id=${contact._id}`)}><img className={props.Styles.contactItemImage} src={contact.profile} alt="userProfile" /><span className={props.Styles.contactItemName}>{contact.nickname}</span></div>
                    )

                })
            }
        </Fragment>
    )
}
