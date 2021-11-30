import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import Select from "react-select";
import CreateUserModal from "./create.user.component";
import ViewUser from "./view.user.component";
import DataTable from "react-data-table-component";
import {useDispatch, useSelector} from "react-redux";
import {getRoles, getSpecialties, getUserById, getUserList, setUserId} from "../../redux/actions/user";
import EditUserModal from "./edit.user.component";
import {selectIsFetching, selectUserList} from "../../redux/selectors/user";
import Loader from "react-loader-spinner";
import DeleteUserModal from "./delete.user.component";

const AdminUserList = () => {
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

    const [showCreateUserModal, setShowCreateUserModal] = useState(false);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [showViewUserModal, setShowViewUserModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [userToView, setUserToView] = useState([]);
    const [loading, setLoading] = useState(true);

    const userList = useSelector(selectUserList);
    const fetching = useSelector(selectIsFetching);
 
    const [isFiltersWasReseted, setIsFilterWasReseted] = useState(false);
    const [isSelectedFirstFilter, setIsSelectedFirstFilter] = useState(false);
    const [firstFilterArgument, setFirstFilterArgument] = useState("");
    const [firstFilterValues, setFirstFilterValues] = useState([]);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [filteredUsersByOptions, setFilteredUsersByOptions] = useState([]);
    
    const columns = [
        {
            name: 'First Name',
            selector: row => row.firstName,
            sortable: true,
            width: '110px'
        },
        {
            name: 'Last Name',
            selector: row => row.lastName,
            sortable: true,
            width: '110px'
        },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
            width: '130px'
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
            width: '100px'
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
            width: '190px'
        },
        {
            name: 'Specialty',
            selector: row => row.specialty,
            sortable: true,
        },
        {
            name: "View User",
            cell: (row) =>
                <button className="secondary_button"
                        onClick={() => handleShowViewUserModal(row)}>View</button>,
            grow: 0.3
        },
        {
            name: "Edit User",
            cell: (row) =>
                <button className="secondary_button"
                        onClick={() => handleEditUserModal(row)}>Edit</button>,
            grow: 0.3
        },
        {
            name: "Delete User",
            cell: (row) =>
                <button className="secondary_button"
                        onClick={() => handleShowDeleteUserModal(row)}>Delete</button>,
            grow: 1
        },
    ]

    const handleShowCreateUserModal = () => {
        setShowCreateUserModal(true)
    }

    const handleCloseCreateUserModal = () => {
        setShowCreateUserModal(false)
    }

    const handleShowViewUserModal = (userToView) => {
        dispatch(setUserId(userToView.id))
        setShowViewUserModal(true)
        setUserToView(userToView)
    }

    const handleEditUserModal = (userToEdit) => {
        dispatch(setUserId(userToEdit.id))
        setShowEditUserModal(true)
        setUserToView(userToEdit)
    }

    const handleCloseViewUserModal = () => {
        setShowViewUserModal(false)
    }

    const handleCloseEditUserModal = () => {
        setShowEditUserModal(false)
        dispatch(getUserList())
    }

    const handleShowDeleteUserModal = (userToDelete) => {
        dispatch(getUserById(userToDelete.id))
            .then(() => {
                setShowDeleteUserModal(true)
            })
    }

    const handleCloseDeleteUserModal = () => {
        setShowDeleteUserModal(false)
        dispatch(getUserList())
    }

    useEffect(() => {
        setUsers(userList)
        setLoading(fetching)
    }, [userList])


    useEffect(() => {
        dispatch(getUserList());
        dispatch(getSpecialties());
        dispatch(getRoles());
    }, [])

    const setFilterOne = (e) => {
        setIsSelectedFirstFilter(true);
        switch (e.value) {
            case "FIRST NAME": {
                setFirstFilterArgument("firstName");
                const byFirstNames = [];
                users.forEach((user) => {
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
                users.forEach((user) => {
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
                users.forEach((user) => {
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
                users.forEach((user) => {
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
                users.forEach((user) => {
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
                users.forEach((user) => {
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
                users.forEach((user) => {
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

        switch (firstFilterArgument) {
            case "firstName": {
                users.forEach((user) => {
                    if (user.firstName === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;
            }
            case "lastName": {
                users.forEach((user) => {
                    if (user.lastName === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;
            }
            case "username": {
                users.forEach((user) => {
                    if (user.username === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;
            }
            case "email": {
                users.forEach((user) => {
                    if (user.email === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;
            }
            case "role": {
                users.forEach((user) => {
                    if (user.role === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;}
            case "specialty": {
                users.forEach((user) => {
                    if (user.specialty === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;
            }
            case "createdDate": {
                users.forEach((user) => {
                    if (user.createdDate === e.value) {
                        filteredUsersByOptions.push(user);
                    }
                });
                break;
            }
            default:
                setFilteredUsersByOptions([]);
        }
        setUsers(filteredUsersByOptions);
        setIsFilterActive(true);
        console.log(isSelectedFirstFilter);
        console.log(isFilterActive);
        console.log(isFiltersWasReseted);
    };

    const resetAllFilters = () => {
        setIsSelectedFirstFilter(false);
        setIsFilterActive(false);
        setIsFilterWasReseted(true);
        setFilteredUsersByOptions([]);
        dispatch(getUserList());
        console.log(isSelectedFirstFilter);
        console.log(isFilterActive);
        console.log(isFiltersWasReseted);
    };

    return <>
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
                {loading ? <Loader className="loader-spinner"
                           type="TailSpin"
                           color="#4f677f"
                           height={50}
                           width={50}
                    /> :
                    (<div>
                        <Modal show={showCreateUserModal} onHide={handleCloseCreateUserModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <CreateUserModal handleCloseCreateUserModal={handleCloseCreateUserModal}/>
                            </Modal.Body>
                        </Modal>

                        <Modal show={showViewUserModal} onHide={handleCloseViewUserModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>View User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <ViewUser currentUser={userToView}/>
                            </Modal.Body>
                        </Modal>

                        <Modal show={showEditUserModal} onHide={handleCloseEditUserModal}>
                            <Modal.Header closeButton>
                                <Modal.Title className="modal_header">Edit User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <EditUserModal handleCloseEditUserModal={handleCloseEditUserModal}/>
                            </Modal.Body>
                        </Modal>

                        <Modal show={showDeleteUserModal} onHide={handleCloseDeleteUserModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <DeleteUserModal handleCloseDeleteUserModal={handleCloseDeleteUserModal}/>
                            </Modal.Body>
                        </Modal>
                
                        <header className="jumbotron">
                            {error && <h3>{error}</h3>}
                            <div style={{margin: 10}}>
                                <button className="primary_button" onClick={handleShowCreateUserModal}>
                                    Create User
                                </button>
                            </div>
                            <DataTable
                                paginationPerPage={10}
                                paginationRowsPerPageOptions={[10, 25, 50]}
                                title={'Users'}
                                columns={columns}
                                data={users}
                                pagination={true}/>
                        </header>
                    </div>)
                }
            </div>
        </div>
    </>
}

export default AdminUserList