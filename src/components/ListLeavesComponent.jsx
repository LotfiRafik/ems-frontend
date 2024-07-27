import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { listEmployees, createLeave, listLeaves } from '../services/EmployeeService'

export default function ListLeavesComponent() {
    const navigator = useNavigate();

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [employees, setEmployees] = useState([])
    const [leaves, setLeaves] = useState([])

    useEffect(() => {
        getEmployees();
        getLeaves();
    }, []
    )

    function getLeaves() {
        listLeaves().then((res) => {
            setLeaves(res.data);
        }).catch(err => console.error(err));
    }

    function getEmployees() {
        listEmployees().then((res) => {
            const employees = res.data
            setEmployees(employees);
            setSelectedEmployeeId(employees[0].id);
        }).catch(err => console.error(err));
    }

    function submitLeave(e) {
        e.preventDefault();
        const leave = {
            "startDate": startDate,
            "endDate": endDate,
        };
        createLeave(leave, selectedEmployeeId).then((response) => {
            console.log(response.data);
            navigator('/leaves')
        }).catch(error => {
            console.error(error);
        })
    }


    return (
        <>


            {/* TODO , on click should open a modal window not new page */}

            <Link to={'/add-leave'}>
                <button className='btn btn-primary mb-2'>Request Leave</button>
            </Link>

            <div className='container'>
                <h2 className='text-center'>List of Leaves</h2>

                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Employee Id</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>State</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            leaves.map(leave =>
                                <tr key={leave.id}>
                                    <td>{leave.employeeId}</td>
                                    <td>{leave.startDate}</td>
                                    <td>{leave.endDate}</td>
                                    <td>{leave.state}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateleave(leave.id)}>Update</button>
                                        <button className='btn btn-danger' onClick={() => removeleave(leave.id)}
                                            style={{ marginLeft: '10px' }}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )



}
