import React, { useState, useEffect } from 'react'
import { listEmployees, fetchEmployeeLeaves } from '../services/EmployeeService'
import dayjs from "dayjs";
import classNames from "classnames";
import { isWeekendDay, isInInterval } from "./calendar/helpers";
import Calendar, { CalendarDayHeader } from "./calendar/calender";
import "./calendar/styles.css";

const LeavesCalendarComponent = () => {
    const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [yearAndMonth, setYearAndMonth] = useState([dayjs().year(), dayjs().month() + 1]);
    const [selectedLeaveStates, setSelectedLeaveStates] = useState(["APPROVED"]);
    const leaveStates = ["SUBMITED_TO_REVIEW", "APPROVED"];

    useEffect(() => {
        getEmployees();
        handleMyCalendarClick();
    }, []
    )

    useEffect(() => {
        if (!selectedEmployeeId)
            return
        getEmployeeLeaves(selectedEmployeeId);
    }, [selectedEmployeeId]
    )

    // **************** Event Handlers ****************
    function handleSelectEmployee(event) {
        const employeeId = event.target.value;
        setSelectedEmployeeId(employeeId);
        getEmployeeLeaves(employeeId);
    }

    function handleMyCalendarClick() {
        // need current user id
        const currentUserId = localStorage.getItem("id");
        setSelectedEmployeeId(currentUserId);
    }


    const handleLeaveStateChange = (event) => {
        const value = event.target.value;
        setSelectedLeaveStates((prevSelected) =>
            prevSelected.includes(value)
                ? prevSelected.filter((leaveState) => leaveState !== value)
                : [...prevSelected, value]
        );
    };

    // **************** Event Handlers ****************

    // ***************** Functions ******************
    function getEmployeeLeaves(employeeId) {
        fetchEmployeeLeaves(employeeId).then((res) => {
            setLeaves(res.data);
        }).catch(err => console.error(err));
    }

    function getEmployees() {
        listEmployees().then((res) => {
            setEmployees(res.data);
        }).catch(err => console.error(err));
    }

    function renderDay(calendarDayObject) {
        return (
            <div
                key={calendarDayObject.dateString}
                className={classNames("day-grid-item-container", {
                    "weekend-day": isWeekendDay(calendarDayObject.dateString),
                    "current-month": calendarDayObject.isCurrentMonth,
                    "leave-day": isLeaveDay(calendarDayObject.dateString),
                })}
            >
                <div className="day-content-wrapper">
                    <CalendarDayHeader calendarDayObject={calendarDayObject} />
                </div>
            </div>
        )
    }

    function isLeaveDay(dateToCheck) {
        for (let index = 0; index < leaves.length; index++) {
            const leave = leaves[index];

            if (!selectedLeaveStates.includes(leave.state))
                continue

            if (isInInterval(dayjs(leave.startDate), dayjs(leave.endDate), dayjs(dateToCheck))) {
                return true;
            }
        }
        return false;
    }
    // ***************** Functions ******************


    return (

        <>
            <div>
                {/* Employee filter */}
                <select value={selectedEmployeeId} onChange={handleSelectEmployee}>
                    <option value="">Select an employee</option>
                    {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                            {employee.firstName} {employee.lastName}
                        </option>
                    ))}
                </select>

                {/* Leave state filter */}
                <div>
                    {leaveStates.map((leaveState, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                value={leaveState}
                                onChange={handleLeaveStateChange}
                                checked={selectedLeaveStates.includes(leaveState)}
                            />
                            {leaveState}
                        </div>
                    ))}
                </div>

                {/* My Calendar filter */}
                <button onClick={handleMyCalendarClick}> My Calendar </button>
            </div>

            {/*  CALENDAR */}
            <div className="App">
                <Calendar
                    yearAndMonth={yearAndMonth}
                    onYearAndMonthChange={setYearAndMonth}
                    renderDay={renderDay}
                />
            </div>
        </>


    )
}

export default LeavesCalendarComponent;