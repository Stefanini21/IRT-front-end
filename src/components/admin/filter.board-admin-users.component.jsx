import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../../redux/selectors/auth";
import {selectTicketListForKanban} from "../../redux/selectors/ticket";
import {changeTicketDeveloper, changeTicketStatus, getTicketListForKanban,} from "../../redux/actions/ticket";
import {selectUserById} from "../../redux/selectors/user";
import Select from "react-select";
import { filter } from "dom-helpers";
import DataTable from "react-data-table-component";
import {getRoles, getSpecialties, getUserList, setUserId, getUserById} from "../../redux/actions/user";
import {selectIsFetching, selectUserList} from "../../redux/selectors/user";
import Loader from "react-loader-spinner";
import AdminUserList from "./board-admin-users.component";

const AdminUserListFilter = () => {
    const filterOptions = [
        { value: "FIRST NAME", label: "First Name" },
        { value: "LAST NAME", label: "Last Name" },
        { value: "USERNAME", label: "Username" },
        { value: "EMAIL", label: "Email" },
        { value: "ROLE", label: "Role" },
        { value: "SPECIALTY", label: "Specialty" },
        { value: "CREATION DATE", label: "Creation date" },
    ];

    const dispatch = useDispatch();
  
    const users = useSelector(selectUserList);
  
    const [isFiltersWasReseted, setIsFilterWasReseted] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState(users);
    const [isSelectedFirstFilter, setIsSelectedFirstFilter] = useState(false);
    const [firstFilterArgument, setFirstFilterArgument] = useState("");
    const [firstFilterValues, setFirstFilterValues] = useState([]);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [filteredUsersByOptions, setFilteredUsersByOptions] = useState([]);
  
    //const [firstOptionsValue, setFirstOptionsValue] = useState("");
    //const [optionOneWasChanged, setOptionOneWasChanged] = useState(false);

    useEffect(() => {
        dispatch(getUserList());
        setFilteredUsers(users);
    }, [isFiltersWasReseted]);

    const setFilterOne = (e) => {
        setIsSelectedFirstFilter(true);
        switch (e.value) {
            case "FIRST NAME": {
                setFirstFilterArgument("firstName");
                const byFirstNames = [];
                filteredUsers.forEach((user) => {
                    if (!byFirstNames.includes(user.firstName)) {
                        byFirstNames.push(user.firstName);
                    }
                });
                setFirstFilterValues(byFirstNames);
                console.log("byFirstNames: " + byFirstNames);
                break;
            }
            case "LAST NAME": {
                setFirstFilterArgument("lastName");
                const byLastNames = [];
                filteredUsers.forEach((user) => {
                    if (!byLastNames.includes(user.lastName)) {
                        byLastNames.push(user.lastName);
                    }
                });
                setFirstFilterValues(byLastNames);
                console.log("byLastNames: " + byLastNames);
                break;
            }
            case "USERNAME": {
                setFirstFilterArgument("username");
                const byUsernames = [];
                filteredUsers.forEach((user) => {
                    if (!byUsernames.includes(user.username)) {
                        byUsernames.push(user.username);
                    }
                });
                setFirstFilterValues(byUsernames);
                console.log("byUsernames: " + byUsernames);
                break;
            }
            case "EMAIL": {
                setFirstFilterArgument("email");
                const byEmail = [];
                filteredUsers.forEach((user) => {
                    if (!byEmail.includes(user.email)) {
                        byEmail.push(user.email);
                    }
                });
                setFirstFilterValues(byEmail);
                console.log("byEmail: " + byEmail);
                break;
            }
            case "ROLE": {
                setFirstFilterArgument("role");
                const byRoles = [];
                filteredUsers.forEach((user) => {
                    if (!byRoles.includes(user.role)) {
                        byRoles.push(user.role);
                    }
                });
                setFirstFilterValues(byRoles);
                console.log("byRoles: " + byRoles);
                break;
            }
            case "SPECIALTY": {
                setFirstFilterArgument("specialty");
                const bySpecialties = [];
                filteredUsers.forEach((user) => {
                    if (!bySpecialties.includes(user.specialty)) {
                        bySpecialties.push(user.specialty);
                    }
                });
                setFirstFilterValues(bySpecialties);
                console.log("bySpecialties: " + bySpecialties);
                break;
            }
            case "CREATION DATE": {
                setFirstFilterArgument("createdDate");
                const byCreationDate = [];
                filteredUsers.forEach((user) => {
                    if (!byCreationDate.includes(user.createdDate)) {
                        byCreationDate.push(user.createdDate);
                    }
                });
                setFirstFilterValues(byCreationDate);
                console.log("byCreationDate: " + byCreationDate);
                break;
            }
            default:
                setFirstFilterValues([]);
        }
    };

    const setFilterTwo = (e) => {
        console.log("firstFilterArgument: " + firstFilterArgument);
        console.log("secondFilterArgument: " + e.value);
        //const filteredUsersByOptions = [];

        switch (firstFilterArgument) {
            case "firstName": {
                filteredUsers.forEach((user) => {
                    if (user.firstName === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;
            }
            case "lastName": {
                filteredUsers.forEach((user) => {
                    if (user.lastName === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;
            }
            case "username": {
                filteredUsers.forEach((user) => {
                    if (user.username === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;
            }
            case "email": {
                filteredUsers.forEach((user) => {
                    if (user.email === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;
            }
            case "role": {
                filteredUsers.forEach((user) => {
                    if (user.role === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;}
            case "specialty": {
                filteredUsers.forEach((user) => {
                    if (user.specialty === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;
            }
            case "createdDate": {
                filteredUsers.forEach((user) => {
                    if (user.createdDate === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;
            }
            default:
                setFilteredUsersByOptions([]);
        }
                /*if (firstFilterArgument === "creator") {
                    filteredTickets.forEach((ticket) => {
                    if (ticket.creator === e.value) {
                    filteredTicketsByOptions.push(ticket);
                    }
                    });
                    } else if (firstFilterArgument === "developer") {
                    filteredTickets.forEach((ticket) => {
                    if (ticket.developer === e.value) {
                    filteredTicketsByOptions.push(ticket);
                    }
                    });
                    } else if (firstFilterArgument === "specialty") {
                    filteredTickets.forEach((ticket) => {
                    if (ticket.specialty === e.value) {
                    filteredTicketsByOptions.push(ticket);
                    }
                    });
                    } else if (firstFilterArgument === "priority") {
                    filteredTickets.forEach((ticket) => {
                    if (ticket.priority === e.value) {
                    filteredTicketsByOptions.push(ticket);
                    }
                    });
                }*/
        setFilteredUsers(filteredUsersByOptions);
        setIsFilterActive(true);
    };

    /*const doFilters = () => {
        setFilteredUsers([...filteredUsers]);
    };*/

    const resetAllFilters = () => {
        setIsFilterActive(false);
        setIsSelectedFirstFilter(false);
        setFilteredUsers(users);
        setIsFilterWasReseted(true);
        //setFirstOptionsValue("");
    };

    return (
        <div className={"col-lg-12"}>
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingRight: "0 10px", }}>
                    <div className={"col-lg-6"} style={{ display: "flex", justifyContent: "flex-end", padding: 0 }}>
                        <label
                            htmlFor="filter"
                            style={{
                                paddingLeft: 4,
                                margin: 0,
                                fontWeight: 500,
                                flexGrow: 3,
                                paddingTop: 6,
                                display: "inline-block", 
                                }}>
                            <h4
                                style={{
                                    fontWeight: 500,
                                    fontSize: "20px",
                                    marginBottom: 4,
                                    textAlign: "right", 
                                    }}>
                                <span style={{ fontWeight: 300 }}>Filter by:</span>
                            </h4>
                        </label>
                        <div
                            style={{
                                top: -5,
                                height: 45,
                                flexGrow: 4,
                                margin: "0 10px",
                                display: "inline-block",
                                }}>
                            <Select
                                id={"select1"}
                                options={filterOptions}
                                type="text"
                                name="filter1"
                                onChange={setFilterOne}
                                style={{ width: "20%", padding: 4, marginBottom: 4 }}
                                isDisabled={isFilterActive}
                                />
                        </div>
                    </div>
                    <div className={"col-lg-6"} style={{ display: "flex", justifyContent: "flex-start", padding: 0, }}>
                        <div style={{ display: "inline-block", flexGrow: 4, margin: "0 10px" }}>
                            <Select
                                id={"select2"}
                                options={firstFilterValues.map((v) => ({
                                    label: v,
                                    value: v,
                                }))}
                                type="text"
                                name="filter2"
                                onChange={setFilterTwo}
                                style={{ width: "20%", padding: 4 }}
                                isDisabled={!isSelectedFirstFilter || isFilterActive}
                                />
                        </div>
                        <div className="form-group" style={{ marginLeft: 10 }}>
                            <button className="secondary_button"
                                    disabled={!isFilterActive}
                                    onClick={() => resetAllFilters()}
                                    style={{ visibility: isFilterActive === true ? "visible" : "hidden", marginRight: 90, }}
                                    >
                                Reset filter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"col-lg-12"}
                style={{ justifyContent: "space-between", padding: "0 auto", flexGrow: 3, right: 0, }}
                >
                <AdminUserList
                    isFilterActive={isFilterActive}
                    filteredUsers={filteredUsers}
                    isFiltersWasReseted={isFiltersWasReseted}
                    />
            </div>
        </div>
    );
};

export default AdminUserListFilter