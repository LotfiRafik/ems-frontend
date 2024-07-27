import React, { useState, useEffect } from 'react'
import { listEmployees, updateEmployee, deleteEmployee } from '../services/EmployeeService'
import { Link, useNavigate } from 'react-router-dom'

function ListEmployeeComponent() {

    const [employees, setEmployees] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        getEmployees()
    }, []
    )

    function getEmployees() {
        listEmployees().then((res) => {
            setEmployees(res.data);
        }).catch(err => console.error(err));
    }

    function updateEmployee(empId) {
        navigator('/employees/' + empId)
    }

    function removeEmployee(empId) {
        deleteEmployee(empId).then((res) => {
            // TODO in this case, is it better to update only the view (deleting the corresponding row) without refetching employees
            setEmployees(employees.filter(employee => employee.id != empId));
        }).catch(err => console.error(err));
    }

    return (

        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>


            <Link to={'/add-employee'}>
                <button className='btn btn-primary mb-2'>Add Employee</button>
            </Link>

            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                                    <button className='btn btn-danger' onClick={() => removeEmployee(employee.id)}
                                        style={{ marginLeft: '10px' }}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent