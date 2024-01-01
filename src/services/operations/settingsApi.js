import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { settingsEndpoints } from "../apis"
import { logout } from "./authApi"

export function updateDisplayPicture(token, formData){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("PUT", settingsEndpoints.UPDATE_DISPLAY_PICTURE_API, formData, 
            {"Authorization" : `Bearer ${token}`});

            console.log("UPDATE_DISPLAY_PICTURE_API RESPONSE............", response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Display Picture Updated Successfully");

            dispatch(setUser(response.data.data));
        }
        catch(error){
            console.log("UPDATE_DISPLAY_PICTURE_API ERROR............", error);
            toast.error("Could Not Update Display Picture");
        }
        toast.dismiss(toastId);
    }
}

export function updateProfile(token, formData){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("PUT", settingsEndpoints.UPDATE_PROFILE_API, formData, 
            {"Authorization" : `Bearer ${token}`});

            console.log("UPDATE_PROFILE_API RESPONSE............", response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            const userImage = response.data.data.image ? response.data.data.image :
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;
            
            dispatch(setUser({...response.data.data, image: userImage}));

            toast.success("Profile Updated Successfully");
        }
        catch(error){
            console.log("UPDATE_PROFILE_API ERROR............", error);
            toast.error("Could Not Update Profile");
        }
        toast.dismiss(toastId);
    }
}

export async function changePassword(token, formData){
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", settingsEndpoints.CHANGE_PASSWORD_API, formData, 
        {"Authorization" : `Bearer ${token}`});

        console.log("CHANGE_PASSWORD_API RESPONSE............", response);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("Password Changed Successfully");
    }
    catch(error){
        console.log("CHANGE_PASSWORD_API ERROR............", error);
        toast.error("Could Not Change Password");
    }
    toast.dismiss(toastId);
}

export function deleteProfile(token, navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector("DELETE", settingsEndpoints.DELETE_PROFILE_API, null, 
                                {"Authorization": `Bearer ${token}`});

            console.log("DELETE_PROFILE_API RESPONSE............", response);

            if(!response.data.success)
                throw new Error(response.data.message);

            toast.success("Profile Deleted Successfully");

            dispatch(logout(navigate));
        }
        catch(error){
            console.log("DELETE_PROFILE_API ERROR............", error);
            toast.error("Could Not Delete Profile");
        }
        toast.dismiss(toastId);
    }
}