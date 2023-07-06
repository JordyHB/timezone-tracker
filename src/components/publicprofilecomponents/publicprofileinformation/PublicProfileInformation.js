import React, {useEffect, useState} from 'react';
import DigitalClock from "../../DigitalClock/DigitalClock";
import ApiUserInfo from "../../ApiUserInfo";
import fetchUserEntry from "../../../helpers/firebase/fetchUserEntry";


function PublicProfileInformation({username}) {

    const [requestedUser, setRequestedUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {

        // fetches the user entry from the firestore database based on the username from the url
        async function fetchRequestedUser() {
            setRequestedUser(await fetchUserEntry(username))
            setLoading(false)
        }

        // handles errors and loading state
        try {
            setLoading(true)
            setError(null)
            void fetchRequestedUser()

        } catch (e) {
            console.error(e)
            setError('there was an error fetching the requested user')
        }
    }, [username])

    return (
        <>
            {error && <p>{error}</p>}
            {loading && <p>loading...</p>}
            {!loading && !error &&
                <article className="profile-info-tile">
                    <h2><span>{username}'s</span> Information</h2>
                    <div className="profile-clock-wrapper">
                        <DigitalClock
                            showSeconds={true}
                            timezone={requestedUser?.timezone}
                        />
                    </div>
                    <p>Nickname: <span>{requestedUser?.nickname}</span></p>
                    <p>Country: <span>{requestedUser?.country}</span></p>
                    <p>Timezone: <span>{requestedUser?.timezone}</span></p>
                    <ApiUserInfo
                        timezone={requestedUser?.timezone}
                    />
                </article>
            }
        </>
    );
}

export default PublicProfileInformation;







