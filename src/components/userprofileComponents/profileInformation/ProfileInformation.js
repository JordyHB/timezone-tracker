import React, {useContext, useEffect, useState} from 'react';
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
import DigitalClock from "../../DigitalClock/DigitalClock";
import './ProfileInformation.css'
import ApiUserInfo from "../../ApiUserInfo";
import fetchUserEntry from "../../../helpers/firebase/fetchUserEntry";

function ProfileInformation({id, showSeconds}) {

    const {user} = useContext(UserInfoContext)

    const [requestedUser, setRequestedUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

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
            // fetches the requested user if not the auth user
            console.log(id)
            if (id && id !== user?.username && id !== 'myprofile') {
                void fetchRequestedUser()
                setLoading(false)
            } else {
                // if the user is the auth user, set the requested user to the auth user from context
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

    }, [id])

    return (
        <>
            {error && <p>{error}</p>}
            {loading && <p>loading...</p>}
            {!loading && !error &&
                <article className="profile-info-tile user-profile-tile">
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
                        />
                    }
                </article>
            }
        </>
    );
}

export default ProfileInformation;