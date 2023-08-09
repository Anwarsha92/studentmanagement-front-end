import { BASE_URL } from "./base_url"
import { commonRequest } from "./commonRqst"




//register
export const studRegister=async(body,headers)=>{
    return commonRequest("POST",`${BASE_URL}/student/register`,body,headers)
}

//get all users

export const getStudents=async(searchKey)=>{
    return await commonRequest("GET",`${BASE_URL}/student/get-all-student-details?search=${searchKey}`,"")
}

//view profile

export const viewProfile=async(id)=>{
    return await commonRequest("GET",`${BASE_URL}/student/view-profile/${id}`,"")
}

export const removeUser=async(id)=>{
    return await commonRequest("DELETE",`${BASE_URL}/student/delete-profile/${id}`,{})
}

export const updateUser=async(id,body,headers)=>{
    return await commonRequest("PUT",`${BASE_URL}/student/update-profile/${id}`,body,headers)
}