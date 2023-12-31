import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const router = useRouter()
    useEffect(() => {
        const user = localStorage.getItem("user") 
        // ? JSON.parse(localStorage.getItem('user')) : null
        const token = localStorage.getItem("token") 
        // ? JSON.parse(localStorage.getItem("token")) : null

        setUser(user)
        setToken(token)
    }, [])
    const handleRegister = async (e, userData) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:3000/api/auth/register', userData)
            setUser(data.others)
            setToken(data.token)
            saveUserAndTokenToLocalStorage(data.others, data.token);
            localStorage.setItem("user", JSON.stringify(data.others))
            localStorage.setItem("token", JSON.stringify(data.token))
            router.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    const handleLogin = async (e, userData) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:3000/api/auth/login', userData)
            console.log(data, 'LOGIN')
            setUser(data.others)
            setToken(data.token)
            localStorage.setItem("user", JSON.stringify(data.others))
            localStorage.setItem("token", JSON.stringify(data.token))
            router.push('/')

        } catch (error) {
            console.error(error)
        }
    }

    return <authContext.Provider value={{
        user,
        token,
        handleRegister,
        handleLogin
    }}>
        {children}
    </authContext.Provider>
}

export function useAuthContext() {
    return useContext(authContext)
}







// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";
// import { useRouter } from "next/router";

// const authContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [token, setToken] = useState(null);
//     const router = useRouter();

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         const storedToken = localStorage.getItem("token");

//         if (storedUser !== null) {
//             setUser(JSON.parse(storedUser));
//         }

//         if (storedToken !== null) {
//             setToken(JSON.parse(storedToken));
//         }
//     }, []);

//     const saveUserAndTokenToLocalStorage = (userData, userToken) => {
//         localStorage.setItem("user", JSON.stringify(userData));
//         localStorage.setItem("token", JSON.stringify(userToken));
//     };

//     const handleRegister = async (e, userData) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post("http://localhost:3000/api/auth/register", userData);
//             setUser(data.others);
//             setToken(data.token);
//             saveUserAndTokenToLocalStorage(data.others, data.token);
//             router.push("/");
//         } catch (error) {
//             console.error(error);
//             // Add user-friendly error handling and display to the user here
//         }
//     };

//     const handleLogin = async (e, userData) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post("http://localhost:3000/api/auth/login", userData);
//             setUser(data.others);
//             setToken(data.token);
//             saveUserAndTokenToLocalStorage(data.others, data.token);
//             router.push("/");
//         } catch (error) {
//             console.error(error);
//             // Add user-friendly error handling and display to the user here
//         }
//     };

//     return (
//         <authContext.Provider
//             value={{
//                 user,
//                 token,
//                 handleRegister,
//                 handleLogin,
//             }}
//         >
//             {children}
//         </authContext.Provider>
//     );
// };

// export function useAuthContext() {
//     return useContext(authContext);
// }
