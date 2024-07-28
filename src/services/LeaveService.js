import axios from "axios";


// TODO refactor, put this into a config file, and import it where its needed
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const LEAVES_PATH = "/leaves"

export const listLeaves = () => {
    const headers = {};
    // Add jwt if it exists
    if (localStorage.getItem("jwt")) {
        headers["Authorization"] = "Bearer " + localStorage.getItem("jwt")
    }

    return axios.get(API_BASE_URL + LEAVES_PATH, {
        headers
    });
}


export const approveLeave = (leaveId) => {
    const headers = {};
    // Add jwt if it exists
    if (localStorage.getItem("jwt")) {
        headers["Authorization"] = "Bearer " + localStorage.getItem("jwt")
    }
    return axios.put(API_BASE_URL + LEAVES_PATH + "/" + leaveId + "/approve", undefined, {
        headers
    });
}

export const cancelLeave = (leaveId) => {
    const headers = {};
    // Add jwt if it exists
    if (localStorage.getItem("jwt")) {
        headers["Authorization"] = "Bearer " + localStorage.getItem("jwt")
    }
    return axios.put(API_BASE_URL + LEAVES_PATH + "/" + leaveId + "/cancel", undefined, {
        headers
    });
}

export const rejectLeave = (leaveId) => {
    const headers = {};
    // Add jwt if it exists
    if (localStorage.getItem("jwt")) {
        headers["Authorization"] = "Bearer " + localStorage.getItem("jwt")
    }
    return axios.put(API_BASE_URL + LEAVES_PATH + "/" + leaveId + "/reject", undefined, {
        headers
    });
}