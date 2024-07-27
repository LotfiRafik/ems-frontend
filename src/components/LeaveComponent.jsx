import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployee, createLeave } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom';

const LeaveComponent = () => {
    const navigator = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    function submitLeave(e) {
        e.preventDefault();
        const leave = {
            "startDate": startDate,
            "endDate": endDate,
        };

        // TODO refactor...
        const userId = localStorage.getItem("id");
        createLeave(leave, userId).then((response) => {
            console.log(response.data);
            navigator('/leaves');
        }).catch(error => {
            console.error(error);
        })
    }

    return (
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

                {/* <!-- Save Button --> */}
                <button type="submit" className="btn btn-primary" onClick={submitLeave}>Save</button>

                {/* <!-- TODO Cancel Button --> */}
                {/* <button type="button" className="btn btn-secondary" onClick={submitLeave}>Cancel</button> */}
            </form>
        </div>

    )
}




export default LeaveComponent;