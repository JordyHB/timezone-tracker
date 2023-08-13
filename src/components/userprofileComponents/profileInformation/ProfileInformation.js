import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
// context
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
// components
import DigitalClock from "../../digitalclock/DigitalClock";
import ApiUserInfo from "../../apiuserinfo/ApiUserInfo";
// helpers
import fetchUserEntry from "../../../helpers/firebase/fetchUserEntry";
// styles
import './ProfileInformation.css'


function ProfileInformation({groupMember, id, showSeconds}) {

    const [requestedUser, setRequestedUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const {user, isAuth} = useContext(UserInfoContext)

    const navigate = useNavigate()


    // handles the profile tile being clicked
    function handleProfileClick() {
        // if the profile town is clicked while on the group page, navigate to the member's profile if not the auth user
        if (groupMember && groupMember.username !== user.username) {
            navigate(`/profile/${groupMember.username}`)
        }
    }


    // fetches the requested user on mount and when the id changes
    useEffect(() => {

        // fetches the user entry from the firestore database based on the username from the url
        async function fetchRequestedUser() {
            setRequestedUser(await fetchUserEntry(id))
            setLoading(false)
        }

        // handles errors and loading state
        try {
            setLoading(true)
            setError(null)

            // if the requested user is a group member, set the requested user to the group member
            if (groupMember) {
                setRequestedUser(groupMember)
                setLoading(false)
                // fetches the requested user if not the auth user
            } else if (id && id !== user?.username && id !== 'myprofile') {
                void fetchRequestedUser()
                setLoading(false)
                // if the requested user is the auth user but the url is not 'myprofile', navigate to 'myprofile'
            } else if (id === user.username) {
                navigate(`/profile/myprofile`)
            } else {
                // if the requested user is the auth user, set the requested user to the auth user from context
                setRequestedUser(user)
                setLoading(false)
            }

        } catch (e) {
            console.error(e)
            setError('there was an error fetching the requested user')
        }

        // cleans up the old data in case of profile hopping
        return () => {
            setRequestedUser(null)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    return (

        <>
            {error && <p>{error}</p>}
            {loading && <p>loading...</p>}
            {!loading && !error &&
                <article className="profile-info-tile user-profile-tile" onClick={handleProfileClick}>
                    <div className="profile-clock-wrapper">
                        <DigitalClock
                            showSeconds={showSeconds}
                            timezone={requestedUser?.timezone}
                            className="profile-clock"
                        />
                    </div>
                    <p className="info-p">Nickname: <span>{requestedUser?.nickname}</span></p>
                    <p className="info-p">Country: <span>{requestedUser?.country}</span></p>
                    <p className="info-p">Timezone: <span>{requestedUser?.timezone}</span></p>
                    {requestedUser &&
                        <ApiUserInfo
                            timezone={requestedUser?.timezone}
                            // checks whether the user is the auth user or not and whether you're trying to view your own profile
                            notOwnInfo={isAuth && requestedUser?.username !== user?.username}
                        />
                    }
                </article>
            }
        </>
    );
}

export default ProfileInformation;