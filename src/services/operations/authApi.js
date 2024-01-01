import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { authEndpoints } from "../apis"
import { resetCart } from "../../slices/cartSlice"


export function sendOtp(email, navigate){

    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", authEndpoints.SENDOTP_API, {email} );
            console.log("SENDOTP API RESPONSE............", response)

            console.log(response.data.success)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")

            navigate("/verify-email")
        }
        catch(error){
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", authEndpoints.SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            })

            console.log("SIGNUP API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Signup Successful")

            navigate("/login")
        }
        catch(error){
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate){

    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", authEndpoints.LOGIN_API, {
                email,
                password
            })

            console.log("LOGIN API RESPONSE............", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Login Successful")

            //set the token after login
            dispatch(setToken(response.data.token))

            //set user data with user image
            const userImage = response.data?.user?.image ? response.data.user.image :
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

            dispatch(setUser({ ...response.data.user, image:userImage }))
            
            //set token and user in local storage
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify({ ...response.data.user, image:userImage }))

            navigate("/dashboard/my-profile")
        }
        catch(error){
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }

}

export function logout(navigate){
    
    return (dispatch) => {

        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")

    }

}

export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", authEndpoints.RESETPASSTOKEN_API, {email})

            console.log("RESET PASSWORD TOKEN API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent")

            setEmailSent(true)
        }
        catch(error){
            console.log("RESET PASSWORD TOKEN API ERROR............", error)
            toast.error("Something went wrong")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function resetPassword(token, password, confirmPassword, setEmailSent){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", authEndpoints.RESETPASSWORD_API, {
                token, password, confirmPassword
            })

            console.log("RESET PASSWORD API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Password has been reset successfully")

            setEmailSent(true)
        }
        catch(error){
            console.log("RESET PASSWORD API ERROR............", error)
            toast.error("Unable to reset password")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}