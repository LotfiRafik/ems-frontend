import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const EMPLOYEES_PATH = "/employees"
const LEAVES_PATH = "/leaves"


export const listEmployees = () => {
    return axios.get(API_BASE_URL + EMPLOYEES_PATH);
}

export const listLeaves = () => {
    return axios.get(API_BASE_URL + LEAVES_PATH);
}


export const createEmployee = async (employee) => {
    return axios.post(API_BASE_URL + EMPLOYEES_PATH, employee, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const createLeave = async (leave, employeeId) => {
    const url = API_BASE_URL + EMPLOYEES_PATH + "/" + employeeId + LEAVES_PATH
    return axios.post(url, leave, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const getEmployee = (employeeId) => {
    return axios.get(API_BASE_URL + EMPLOYEES_PATH + "/" + employeeId);
}


export const updateEmployee = (id, employee) => {
    return axios.put(API_BASE_URL + EMPLOYEES_PATH + "/" + id, employee, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const deleteEmployee = (employeeId) => {
    return axios.delete(API_BASE_URL + EMPLOYEES_PATH + "/" + employeeId);
}
