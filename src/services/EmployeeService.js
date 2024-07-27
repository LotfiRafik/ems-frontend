import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const EMPLOYEES_PATH = "/employees"
const LEAVES_PATH = "/leaves"


export const listEmployees = () => {
    const headers = {};
    // Add jwt if it exists
    if (localStorage.getItem("jwt")) {
        headers["Authorization"] = "Bearer " + localStorage.getItem("jwt")
    }

    return axios.get(API_BASE_URL + EMPLOYEES_PATH, {
        headers
    });
}

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


export const createEmployee = async (employee) => {
    const headers = { 'Content-Type': 'application/json' };
    // Add jwt if it exists
    if (localStorage.getItem("jwt")) {
        headers["Authorization"] = "Bearer " + localStorage.getItem("jwt")
    }

    return axios.post(API_BASE_URL + EMPLOYEES_PATH, employee, {
        headers
    });
}

export const createLeave = async (leave, employeeId) => {
    const url = API_BASE_URL + EMPLOYEES_PATH + "/" + employeeId + LEAVES_PATH
    const headers = { 'Content-Type': 'application/json' };
    // Add jwt if it exists
    if (localStorage.getItem("jwt")) {
        headers["Authorization"] = "Bearer " + localStorage.getItem("jwt")
    }
    return axios.post(url, leave, {
        headers
    });
}

export const getEmployee = (employeeId) => {
    const headers = {};
    // Add jwt if it exists
    if (localStorage.getItem("jwt")) {
        headers["Authorization"] = "Bearer " + localStorage.getItem("jwt")
    }
    return axios.get(API_BASE_URL + EMPLOYEES_PATH + "/" + employeeId, {
        headers
    });
}


export const updateEmployee = (id, employee) => {
    const headers = { 'Content-Type': 'application/json' };
    // Add jwt if it exists
    if (localStorage.getItem("jwt")) {
        headers["Authorization"] = "Bearer " + localStorage.getItem("jwt")
    }
    return axios.put(API_BASE_URL + EMPLOYEES_PATH + "/" + id, employee, {
        headers
    });
}

export const deleteEmployee = (employeeId) => {
    const headers = {};
    // Add jwt if it exists
    if (localStorage.getItem("jwt")) {
        headers["Authorization"] = "Bearer " + localStorage.getItem("jwt")
    }
    return axios.delete(API_BASE_URL + EMPLOYEES_PATH + "/" + employeeId, {
        headers
    });
}


export const login = async (loginData) => {
    return axios.post(API_BASE_URL + "/auth/login", loginData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}