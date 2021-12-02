import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import CreateTicketModal from "./create.ticket.component.jsx";
import DataTable from "react-data-table-component";
import Select from "react-select";
import ViewTicket from "./view.ticket.component";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersBySpecialty,
  getPriorities,
  getStatuses,
  getTicketList,
  setTicketId,
  getTicketById,
} from "../../redux/actions/ticket";
import {
  selectIsFetching,
  selectTicketList,
  selectPriorities,
} from "../../redux/selectors/ticket";
import Loader from "react-loader-spinner";
import {
  getSpecialties,
  getAllUsernamesByRole,
} from "../../redux/actions/user";
import EditTicketComponent from "./edit.ticket.component";
import DeleteTicketModal from "./delete.ticket.component.js";
import {
  selectSpecialties,
  usernamesFetchedByRole,
} from "../../redux/selectors/user";

const TicketList = () => {
  const filterOptions = [
    { value: "ADMIN", label: "Creator" },
    { value: "DEVELOPER", label: "Developer" },
    { value: "SPECIALTY", label: "Specialty" },
    { value: "PRIORITY", label: "Priority" },
  ];

  const dispatch = useDispatch();

  const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
  const [showDeleteTicketModal, setShowDeleteTicketModal] = useState(false);
  const [showViewTicketModal, setShowViewTicketModal] = useState(false);
  const [showEditTicketModal, setShowEditTicketModal] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");
  const [ticketToView, setTicketToView] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [firstFilterArgument, setFirstFilterArgument] = useState("");
  const [isSelectedFirstFilter, setIsSelectedFirstFilter] = useState(false);
  const [firstFilterValues, setFirstFilterValues] = useState([]);
  const [isFiltersWasReseted, setIsFilterWasReseted] = useState(false);

  const specialties = useSelector(selectSpecialties);
  const priorities = useSelector(selectPriorities);
  const usersByRole = useSelector(usernamesFetchedByRole);

  const [ticketList, setTicketList] = useState([]);
  const ticketsFromSelector = useSelector(selectTicketList);

  const fetching = useSelector(selectIsFetching);

  useEffect(() => {
    console.log("setting ticket list...");
    setTicketList(ticketsFromSelector);
  }, [ticketsFromSelector]);

  useEffect(() => {
    setTickets(ticketsFromSelector);
  }, [isFiltersWasReseted]);

  useEffect(() => {
    console.log(usersByRole);
    console.log("usersByRole");
    setFirstFilterValues(usersByRole);
  }, [usersByRole]);

  const setFilterOne = (e) => {
    setIsSelectedFirstFilter(true);
    switch (e.value) {
      case "ADMIN": {
        setFirstFilterArgument("creator");
        dispatch(getAllUsernamesByRole(e.value));
        break;
      }
      case "DEVELOPER": {
        setFirstFilterArgument("developer");
        dispatch(getAllUsernamesByRole(e.value));
        break;
      }
      case "SPECIALTY": {
        setFirstFilterArgument("specialty");
        setFirstFilterValues(specialties);
        break;
      }
      case "PRIORITY": {
        setFirstFilterArgument("priority");
        setFirstFilterValues(priorities);
        break;
      }
      default:
    }
  };

  const setFilterTwo = (e) => {
    console.log("firstFilterArgument: " + firstFilterArgument);
    console.log("secondFilterArgument: " + e.value);
    let filteredTicketsByOptions = [];

    if (firstFilterArgument === "creator") {
      tickets.forEach((ticket) => {
        if (ticket.creator === e.value) {
          filteredTicketsByOptions.push(ticket);
        }
      });
    } else if (firstFilterArgument === "developer") {
      tickets.forEach((ticket) => {
        if (ticket.developer === e.value) {
          filteredTicketsByOptions.push(ticket);
        }
      });
    } else if (firstFilterArgument === "specialty") {
      tickets.forEach((ticket) => {
        if (ticket.specialty === e.value) {
          filteredTicketsByOptions.push(ticket);
        }
      });
    } else if (firstFilterArgument === "priority") {
      tickets.forEach((ticket) => {
        if (ticket.priority === e.value) {
          filteredTicketsByOptions.push(ticket);
        }
      });
    }
    setTicketList(filteredTicketsByOptions);
    console.log("filtred ticketsbyOptions: " + filteredTicketsByOptions);
    setIsFilterActive(true);
  };

  const doFilters = () => {
    setFilteredTickets([...filteredTickets]);
  };

  const resetAllFilters = () => {
    setIsFilterActive(false);
    setIsSelectedFirstFilter(false);
    setFilteredTickets(tickets);
    setIsFilterWasReseted(true);
    dispatch(getTicketList());
  };


  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Specialty",
      selector: (row) => row.specialty,
      sortable: true,
    },
    {
      name: "Priority",
      selector: (row) => row.priority,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Developer",
      selector: (row) => row.developer,
      sortable: true,
    },
    {
      name: "Created date",
      selector: (row) => row.createdDate,
      sortable: true,
    },

    {
      name: "View Ticket",
      cell: (row) => (
        <button
          className="secondary_button"
          onClick={() => handleShowViewTicketModal(row)}
        >
          View
        </button>
      ),
      grow: 0.3,
    },
    {
      name: "Edit Ticket",
      cell: (row) => (
        <button
          className="secondary_button"
          onClick={() => handleEditTicketModal(row)}
        >
          Edit
        </button>
      ),
      grow: 0.3,
    },
    {
      name: "Delete Ticket",
      cell: (row) => (
        <button
          className="secondary_button"
          onClick={() => handleShowDeleteTicketModal(row)}
        >
          Delete
        </button>
      ),
      grow: 1,
    },
  ];

  const handleEditTicketModal = (ticketToEdit) => {
    dispatch(setTicketId(ticketToEdit.id));
    setShowEditTicketModal(true);
    setTicketToView(ticketToEdit);
  };

  const handleCloseEditTicketModal = () => {
    setShowEditTicketModal(false);
    dispatch(getTicketList());
  };

  const handleShowCreateTicketModal = () => {
    setShowCreateTicketModal(true);
  };

  const handleCloseCreateTicketModal = () => {
    setShowCreateTicketModal(false);
    window.location.reload();
  };

  const handleShowViewTicketModal = (ticketToView) => {
    dispatch(setTicketId(ticketToView.id));
    setShowViewTicketModal(true);
    setTicketToView(ticketToView);
  };

  const handleCloseViewTicketModal = () => {
    setShowViewTicketModal(false);
  };

  const handleShowDeleteTicketModal = (ticketToDelete) => {
    dispatch(getTicketById(ticketToDelete.id)).then(() => {
      setShowDeleteTicketModal(true);
    });
  };

  const handleCloseDeleteTicketModal = () => {
    setShowDeleteTicketModal(false);
    dispatch(getTicketList());
  };

  useEffect(() => {
    setTickets(ticketList);
    setLoading(fetching);
  }, [ticketList]);

  useEffect(() => {
    dispatch(getTicketList());
    dispatch(getSpecialties());
    dispatch(getStatuses());
    dispatch(getPriorities());
    dispatch(getAllUsersBySpecialty("NONE"));
  }, []);

  return (
    <>
      <div className={"col-lg-12"}>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "0 10px",
            }}
          >
            <div
              className={"col-lg-6"}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: 0,
              }}
            >
              <label
                htmlFor="filter"
                style={{
                  paddingLeft: 4,
                  margin: 0,
                  fontWeight: 500,
                  flexGrow: 3,
                  paddingTop: 6,
                  display: "inline-block",
                }}
              >
                <h4
                  style={{
                    fontWeight: 500,
                    textAlign: "center",
                    fontSize: "20px",
                    marginBottom: 4,
                    textAlign: "right",
                  }}
                >
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
                }}
              >
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
            <div
              className={"col-lg-6"}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                padding: 0,
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  flexGrow: 4,
                  margin: "0 10px",
                }}
              >
                <Select
                  id={"select2"}
                  options={
                    firstFilterValues &&
                    firstFilterValues.length &&
                    firstFilterValues.map((v) => ({
                      label: v,
                      value: v,
                    }))
                  }
                  type="text"
                  name="filter2"
                  onChange={setFilterTwo}
                  style={{ width: "20%", padding: 4 }}
                  isDisabled={!isSelectedFirstFilter || isFilterActive}
                />
              </div>
              <div className="form-group" style={{ marginLeft: 10 }}>
                <button
                  className="secondary_button"
                  disabled={!isFilterActive}
                  onClick={() => resetAllFilters()}
                  style={{
                    visibility: isFilterActive === true ? "visible" : "hidden",
                    marginRight: 90,
                  }}
                >
                  Reset filter
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={"col-lg-12"}
          style={{
            justifyContent: "space-between",
            padding: "0 auto",
            flexGrow: 3,
            right: 0,
          }}
        >
          {/* <KanbanBoard
              isFilterActive={isFilterActive}
              filteredTickets={filteredTickets}
              isFiltersWasReseted={isFiltersWasReseted}
            /> */}
        </div>
      </div>

      {loading ? (
        <Loader
          className="loader-spinner"
          type="TailSpin"
          color="#4f677f"
          height={50}
          width={50}
        />
      ) : (
        <div>
          <Modal
            show={showCreateTicketModal}
            onHide={handleCloseCreateTicketModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateTicketModal
                handleCloseCreateTicketModal={handleCloseCreateTicketModal}
              />
            </Modal.Body>
          </Modal>

          <Modal show={showViewTicketModal} onHide={handleCloseViewTicketModal}>
            <Modal.Header closeButton>
              <Modal.Title>View Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ViewTicket ticket={ticketToView} />
            </Modal.Body>
          </Modal>

          <Modal show={showEditTicketModal} onHide={handleCloseEditTicketModal}>
            <Modal.Header closeButton>
              <Modal.Title className="modal_header">Edit Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditTicketComponent
                handleCloseEditTicketModal={handleCloseEditTicketModal}
              />
            </Modal.Body>
          </Modal>

          <Modal
            show={showDeleteTicketModal}
            onHide={handleCloseDeleteTicketModal}
          >
            <Modal.Header closeButton>
              <Modal.Title>Delete Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DeleteTicketModal
                handleCloseDeleteTicketModal={handleCloseDeleteTicketModal}
              />
            </Modal.Body>
          </Modal>

          <header className="jumbotron">
            {error && <h3>{error}</h3>}
            <div style={{ margin: 10 }}>
              <button
                className="primary_button"
                onClick={handleShowCreateTicketModal}
              >
                Create Ticket
              </button>
            </div>
            <DataTable
              paginationPerPage={10}
              paginationRowsPerPageOptions={[10, 25, 50]}
              title={"Tickets"}
              columns={columns}
              data={tickets}
              pagination={true}
              noDataComponent={" "}
            />
          </header>
        </div>
      )}
    </>
  );
};

export default TicketList;
