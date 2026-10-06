import apiService from "../api/apiServices";

// GET PROJECTS 
export const allProjectAPI = async()=> {
    return await apiService('GET',"/projects",{})
}

// ADD PROJECT
export const addProjectAPI = async(details)=> {
    return await apiService('POST',"/projects",details)
}

// UPDATE PROJECT
export const updateProjectAPI = async(id,details)=> {
    return await apiService('PUT',`/projects/${id}`,details)
}

// DELETE PROJECT
export const deleteProjectApi = async (id)=>{
    return await apiService('DELETE',`/projects/${id}`,{})
}

// DETAIL PROJECT GET
export const detailProjectAPI = async(id)=> {
    return await apiService('GET',`/projects/${id}`,{})
}

// Get tasks belonging to this project
export const taskProjectAPI = async(id)=> {
    return await apiService('GET',`/tasks?projectId=${id}`,{})
}

// task delete
export const deleteTasksAPI = async(id)=> {
    return await apiService('DELETE',`/tasks/${id}`,{})
}

// post operation in task
export const postTasksAPI = async(details)=> {
    return await apiService('POST',"/tasks",details);
}

// UPDATE Tasks project
export const putTasksAPI = async(id,details)=> {
    return await apiService('PUT',`/tasks/${id}`,details)
}

// GET PROJECTS 
export const allTasksAPI = async()=> {
    return await apiService('GET',"/tasks",{})
}

// Get Team
export const allTeamAPI = async()=> {
    return await apiService('GET',"/team",{})
}

// Put Team
export const putTeamAPI = async(id,details)=> {
    return await apiService('PUT',`/team/${id}`,details)
}

// Post team details
export const postTeamAPI = async(details)=> {
    return await apiService('POST',"/team",details);
}

// Delete Team Details
export const deleteTeamAPI = async(id)=> {
    return await apiService('DELETE',`/team/${id}`,{});
}