import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

    function addNewLeave() {
     return   
    }

    return (
        <>

            <div className='container'>
                <h2 className='text-center'>List of Leaves</h2>

                {/* on click should open a modal window */}
                <button className='btn btn-primary mb-2' onClick={addNewLeave}>Add Leave</button>
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




            <div className="container mt-5">
                <h2>Leave Form</h2>
                <form method="post">
                    {/* <!-- Date Input 1 --> */}
                    <div className="form-group">
                        <label htmlFor="start_date">Start Date:</label>
                        <input type="date" className="form-control" id="start_date" name="start_date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
                    </div>

                    {/* <!-- Date Input 2 --> */}
                    <div className="form-group">
                        <label htmlFor="end_date">End Date:</label>
                        <input type="date" className="form-control" id="end_date" name="end_date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
                    </div>

                    {/* <!-- Selection Input --> */}
                    <div className="form-group">
                        <label htmlFor="employee_select">Employee:</label>
                        <select className="form-control" id="employee_select" name="employee_select" value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)} required>
                            {
                                employees.map(employee =>
                                    <option key={employee.id} value={employee.id}>{employee.firstName + " " + employee.lastName}</option>
                                )
                            }
                        </select>
                    </div>

                    {/* <!-- Save Button --> */}
                    <button type="submit" className="btn btn-primary" onClick={submitLeave}>Save</button>

                    {/* <!-- Cancel Button --> */}
                    {/* <button type="button" className="btn btn-secondary" onClick={submitLeave}>Cancel</button> */}
                </form>
            </div>

        </>
    )



}
