import { useState, useEffect } from 'react';
import axios from 'axios'

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios.post('http://localhost:3001/login', {
            code,
        }).then(res => {
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)

            window.history.pushState({}, null, '/')
        }).catch(() => {
            // Because codes generated after user login expire after about 1 hour or so, this 
            // catch function will redirect the user back to the login screen to generate a new code
            window.location = "/"
        })
    }, [code])

    // TODO: Setup a function to generate a token automatically to prevent frequent user logins
    return accessToken
}
