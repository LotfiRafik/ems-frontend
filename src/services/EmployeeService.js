import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api/employees'


export const listEmployees = () => {
    return axios.get(API_BASE_URL);
}

export const createEmployee = async (employee) => {
    return axios.post(API_BASE_URL, employee, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const getEmployee = (employeeId) => {
    return axios.get(API_BASE_URL+"/"+employeeId);
}


export const updateEmployee = (id, employee) => {
    return axios.put(API_BASE_URL+"/"+id, employee, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export const deleteEmployee = (employeeId) => {
    return axios.delete(API_BASE_URL+"/"+employeeId);
}
