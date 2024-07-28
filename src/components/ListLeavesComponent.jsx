import React, { useState, useEffect, useReducer } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { approveLeave, rejectLeave, cancelLeave, listLeaves } from '../services/LeaveService';


const forceUpdateReducer = (state) => state + 1;

export default function ListLeavesComponent() {
    const navigator = useNavigate();
    const [, forceUpdate] = useReducer(forceUpdateReducer, 0);

    const [leaves, setLeaves] = useState([])

    useEffect(() => {
        getLeaves();
    }, []
    )

    function getLeaves() {
        listLeaves().then((res) => {
            setLeaves(res.data);
        }).catch(err => console.error(err));
    }

    function approveLeaveHandler(leaveId) {
        approveLeave(leaveId).then((res) => {
            alert("Leave has been approved successfully");
            // TODO refactor, just change the leave's state without refetching/calling the backend..
            forceUpdate();
        }).catch(err => console.error(err));
        return;
    }

    function rejectLeaveHandler(leaveId) {
        rejectLeave(leaveId).then((res) => {
            alert("Leave has been rejected successfully");
            // TODO refactor, just change the leave's state without refetching/calling the backend..
            forceUpdate();
        }).catch(err => console.error(err));
        return;
    }

    function cancelLeaveHandler(leaveId) {
        cancelLeave(leaveId).then(() => {
            alert("Leave has been cancelled successfully");
            // TODO refactor, just change the leave's state without refetching/calling the backend..
            forceUpdate();
        }).catch(err => {
            alert(err.message);
            console.error(err)
        }
        );
        return;
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
                                        <button className='btn btn-info' onClick={() => approveLeaveHandler(leave.id)}>Approve</button>
                                        <button className='btn btn-danger' onClick={() => rejectLeaveHandler(leave.id)}
                                            style={{ marginLeft: '10px' }}
                                        >Reject</button>
                                        <button className='btn btn-danger' onClick={() => cancelLeaveHandler(leave.id)}
                                            style={{ marginLeft: '10px' }}
                                        >Cancel</button>
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
