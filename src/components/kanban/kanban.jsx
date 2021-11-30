import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../../redux/selectors/auth";
import {selectTicketListForKanban} from "../../redux/selectors/ticket";
import {changeTicketDeveloper, changeTicketStatus, getTicketListForKanban,} from "../../redux/actions/ticket";
import {selectUserById} from "../../redux/selectors/user";
import Select from "react-select";

const Kanban = () => {
<<<<<<< HEAD
  const filterOptions = [
    { value: "CREATOR", label: "Creator" },
    { value: "DEVELOPER", label: "Developer" },
    { value: "SPECIALTY", label: "Specialty" },
    { value: "PRIORITY", label: "Priority" },
  ];

  const dispatch = useDispatch();
  const tickets = useSelector(selectTicketListForKanban);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [firstFilterArgument, setFirstFilterArgument] = useState("");
  const [isSelectedFirstFilter, setIsSelectedFirstFilter] = useState(false);
  const [firstFilterValues, setFirstFilterValues] = useState([]);
  const [isFiltersWasReseted, setIsFilterWasReseted] = useState(false);
  const [firstOptionsValue, setFirstOptionsValue] = useState("");
  const [optionOneWasChanged, setOptionOneWasChanged] = useState(false);

  useEffect(() => {
    dispatch(getTicketListForKanban());
    setFilteredTickets(tickets);
  }, [filteredTicketsByOptions]);

  const setFilterOne = (e) => {
    setIsSelectedFirstFilter(true);
    switch (e.value) {
      case "CREATOR": {
        setFirstFilterArgument("creator");
        const authors = [];
        tickets.forEach((ticket) => {
          if (!authors.includes(ticket.creator)) {
            authors.push(ticket.creator);
          }
        });
        setFirstFilterValues(authors);
        console.log("authors: " + authors);
        break;
      }
      case "DEVELOPER": {
        setFirstFilterArgument("developer");
        const developers = [];
        tickets.forEach((ticket) => {
          if (!developers.includes(ticket.developer)) {
            developers.push(ticket.developer);
          }
        });
        setFirstFilterValues(developers);
        console.log("developers: " + developers);
        break;
      }
      case "SPECIALTY": {
        setFirstFilterArgument("specialty");
        const specialties = [];
        tickets.forEach((ticket) => {
          if (!specialties.includes(ticket.specialty)) {
            specialties.push(ticket.specialty);
          }
        });
        setFirstFilterValues(specialties);
        console.log("developers: " + specialties);
        break;
      }
      case "PRIORITY": {
        setFirstFilterArgument("priority");
        const priorities = [];
        tickets.forEach((ticket) => {
          if (!priorities.includes(ticket.priority)) {
            priorities.push(ticket.priority);
          }
        });
        setFirstFilterValues(priorities);
        console.log("developers: " + priorities);
        break;
      }
      default:
        setFirstFilterValues([]);
    }
  };

  const setFilterTwo = (e) => {
    console.log("firstFilterArgument: " + firstFilterArgument);
    console.log("secondFilterArgument: " + e.value);
    const filteredTicketsByOptions = [];

    if (firstFilterArgument === "creator") {
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
=======
    const filterOptions = [
        {value: "CREATOR", label: "Creator"},
        {value: "DEVELOPER", label: "Developer"},
        {value: "SPECIALTY", label: "Specialty"},
        {value: "PRIORITY", label: "Priority"},
    ];

    const dispatch = useDispatch();
    const tickets = useSelector(selectTicketListForKanban);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [filteredTickets, setFilteredTickets] = useState(tickets);
    const [firstFilterArgument, setFirstFilterArgument] = useState("");
    const [isSelectedFirstFilter, setIsSelectedFirstFilter] = useState(false);
    const [firstFilterValues, setFirstFilterValues] = useState([]);
    const [isFiltersWasReseted, setIsFilterWasReseted] = useState(false);
    const [firstOptionsValue, setFirstOptionsValue] = useState("");

    useEffect(() => {
        dispatch(getTicketListForKanban());
        setFilteredTickets(tickets);
    }, [isFiltersWasReseted]);

    const setFilterOne = (e) => {
        setIsSelectedFirstFilter(true);
        switch (e.value) {
            case "CREATOR": {
                setFirstFilterArgument("creator");
                const authors = [];
                tickets.forEach((ticket) => {
                    if (!authors.includes(ticket.creator)) {
                        authors.push(ticket.creator);
                    }
                });
                setFirstFilterValues(authors);
                console.log("authors: " + authors);
                break;
            }
            case "DEVELOPER": {
                setFirstFilterArgument("developer");
                const developers = [];
                tickets.forEach((ticket) => {
                    if (!developers.includes(ticket.developer)) {
                        developers.push(ticket.developer);
                    }
                });
                setFirstFilterValues(developers);
                console.log("developers: " + developers);
                break;
            }
            case "SPECIALTY": {
                setFirstFilterArgument("specialty");
                const specialties = [];
                tickets.forEach((ticket) => {
                    if (!specialties.includes(ticket.specialty)) {
                        specialties.push(ticket.specialty);
                    }
                });
                setFirstFilterValues(specialties);
                console.log("developers: " + specialties);
                break;
            }
            case "PRIORITY": {
                setFirstFilterArgument("priority");
                const priorities = [];
                tickets.forEach((ticket) => {
                    if (!priorities.includes(ticket.priority)) {
                        priorities.push(ticket.priority);
                    }
                });
                setFirstFilterValues(priorities);
                console.log("developers: " + priorities);
                break;
            }
            default:
                setFirstFilterValues([]);
>>>>>>> 0310c572855f75294dc9d3f3faf4d9ae3b11724c
        }
    };

    const setFilterTwo = (e) => {
        console.log("firstFilterArgument: " + firstFilterArgument);
        console.log("secondFilterArgument: " + e.value);
        const filteredTicketsByOptions = [];

        if (firstFilterArgument === "creator") {
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
        }
        setFilteredTickets(filteredTicketsByOptions);
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
        setFirstOptionsValue("");
    };

    return (
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
                        style={{display: "flex", justifyContent: "flex-end", padding: 0}}
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
                                    fontSize: "20px",
                                    marginBottom: 4,
                                    textAlign: "right",
                                }}
                            >
                                <span style={{fontWeight: 300}}>Filter by:</span>
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
                                style={{width: "20%", padding: 4, marginBottom: 4}}
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
                            style={{display: "inline-block", flexGrow: 4, margin: "0 10px"}}
                        >
                            <Select
                                id={"select2"}
                                options={firstFilterValues.map((v) => ({
                                    label: v,
                                    value: v,
                                }))}
                                type="text"
                                name="filter2"
                                onChange={setFilterTwo}
                                style={{width: "20%", padding: 4}}
                                isDisabled={!isSelectedFirstFilter || isFilterActive}
                            />
                        </div>
                        <div className="form-group" style={{marginLeft: 10}}>
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
                <KanbanBoard
                    isFilterActive={isFilterActive}
                    filteredTickets={filteredTickets}
                    isFiltersWasReseted={isFiltersWasReseted}
                />
            </div>
        </div>
    );
};

const KanbanBoard = (props) => {
    const [projects, setProjects] = useState([]);
    const [draggedOverCol, setDraggedOverCol] = useState(0);
    const userData = useSelector(getUserData);
    const currentUserData = useSelector(getUserData);
    const tickets = useSelector(selectTicketListForKanban);
    // const tickets = props.tickets;
    const [status, setStatus] = useState("");
    const dispatch = useDispatch();
    const filteredTickets = props.filteredTickets;
    const isFilterActive = props.isFilterActive;
    const isFiltersWasReseted = props.isFiltersWasReseted;

    const columns = [
        {name: "BackLog", stage: 1},
        {name: "In progress...", stage: 2},
        {name: "Finished", stage: 3},
        {name: "Closed", stage: 4},
    ];

    //this is called when a Kanban card is dragged over a column (called by column)
    const handleOnDragEnter = (e, stageValue) => {
        setDraggedOverCol(stageValue);

        switch (stageValue) {
            case 1:
                console.log("case 1 draggedOverCol: " + stageValue);
                setStatus("BACKLOG");
                break;
            case 2:
                console.log("case 2 draggedOverCol: " + stageValue);
                setStatus("ASSIGNED");
                break;
            case 3:
                console.log("case 3 draggedOverCol: " + stageValue);
                setStatus("FINISHED");
                break;
            case 4:
                console.log("case 4 draggedOverCol: " + stageValue);
                setStatus("CLOSED");
                break;
            default:
                setStatus("");
        }
    };

    //this is called when a Kanban card dropped over a column (called by card)
    const handleOnDragEnd = (e, project) => {
        const updatedProjects = projects.slice(0);
        const dOc = updatedProjects.find((projectObject) => {
            if (
                project.developer === null &&
                currentUserData.role === "USER" &&
                project.specialty === currentUserData.specialty &&
                project.project_stage === 1 &&
                draggedOverCol === 2
            ) {
                project.developer === currentUserData.username;
                dispatch(changeTicketDeveloper(project.id, currentUserData.username));
                return projectObject.title === project.title;
            } else if (
                currentUserData.username === project.developer ||
                currentUserData.username === project.creator
            ) {
                if (
                    currentUserData.role === "ADMIN" &&
                    project.project_stage === 3 &&
                    draggedOverCol === 1 &&
                    currentUserData.creator === project.author
                ) {
                    return projectObject.title === project.title;
                } else if (
                    currentUserData.role === "ADMIN" &&
                    project.project_stage === 3 &&
                    draggedOverCol === 4
                ) {
                    return projectObject.title === project.title;
                } else if (
                    (currentUserData.role === "USER" &&
                        project.project_stage === 1 &&
                        draggedOverCol === 2) ||
                    (currentUserData.role === "USER" &&
                        project.project_stage === 2 &&
                        draggedOverCol === 3)
                ) {
                    return projectObject.title === project.title;
                }
            }
        });
        if (dOc !== undefined) {
            dispatch(changeTicketStatus(project.id, status));
            dOc.project_stage = draggedOverCol;
            setProjects(updatedProjects);
        }
        setDraggedOverCol(project.project_stage);
    };

    useEffect(() => {
        // console.log("tickets" + tickets);
        // console.log("isFilterActive: " + isFilterActive);
        console.log("filteredTickets in KanbanBoard: " + filteredTickets);
        setProjects(filteredTickets);

        // setProjects(filteredTickets)

        tickets.forEach((element) => {
            switch (element.status) {
                case "BACKLOG": {
                    element.project_stage = 1;
                    break;
                }
                case "ASSIGNED": {
                    element.project_stage = 2;
                    break;
                }
                case "FINISHED": {
                    element.project_stage = 3;
                    break;
                }
                case "CLOSED": {
                    element.project_stage = 4;
                    break;
                }
                default:
                    element.project_stage = 1;
            }
        });
    }, [
        setDraggedOverCol,
        filteredTickets,
        isFiltersWasReseted,
        handleOnDragEnd,
    ]);

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            {columns.map((column) => {
                return (
                    <KanbanColumn
                        title={column.name}
                        stage={column.stage}
                        projects={projects.filter((project) => {
                            return parseInt(project.project_stage, 10) === column.stage;
                        })}
                        onDragEnter={handleOnDragEnter}
                        onDragEnd={handleOnDragEnd}
                        key={column.stage}
                        userData={userData}
                        currentUserData={currentUserData}
                        isFilterActive={isFilterActive}
                        filteredTickets={filteredTickets}
                        isFiltersWasReseted={isFiltersWasReseted}
                    />
                );
            })}
        </div>
    );
};

/*
 * The Kanban Board Column React component
 */
const KanbanColumn = (props) => {
    const [mouseIsHovering, setMouseIsHovering] = useState(false);
    const isFilterActive = props.isFilterActive;
    const filteredTickets = props.filteredTickets;
    const isFiltersWasReseted = props.isFiltersWasReseted;

    useEffect(() => {
        setMouseIsHovering(false);
    }, [props, isFilterActive, filteredTickets, isFiltersWasReseted]);

    const generateKanbanCards = () => {
        return props.projects.slice(0).map((project) => {
            return (
                <KanbanCard
                    project={project}
                    key={project.id}
                    onDragEnd={props.onDragEnd}
                    currentUserData={props.currentUserData}
                />
            );
        });
    };

    const columnStyle = {
        display: "inline-block",
        verticalAlign: "top",
        marginBottom: "2px",
        margin: 3,
        paddingLeft: "1px",
        paddingTop: "3px",
        paddingRight: "1px",
        width: "25%",
        textAlign: "center",
        backgroundColor: mouseIsHovering ? "#8f92a1" : "#a1a4b5",
        transition: "mouseIsHovering 1",
        borderBottom: "8px solid #a1a4b5",
    };

    return (
        <div
            style={columnStyle}
            onDragEnter={(e) => {
                setMouseIsHovering(true);
                setTimeout(() => {
                    setMouseIsHovering(false);
                }, 900);

                props.onDragEnter(e, props.stage);
            }}
            onDragExit={(e) => {
                setTimeout(() => {
                    setMouseIsHovering(false);
                }, 1200);
            }}
        >
            <h5
                style={{
                    backgroundColor: "#0C0032",
                    padding: 8,
                    color: "white",
                    margin: "1px 3",
                }}
            >
                {props.title}{" "}
                <span style={{fontWeight: 300, fontSize: "1rem"}}>

          ({props.projects.length})
        </span>
            </h5>
            <div style={{height: 600, overflowY: "scroll"}}>
                {generateKanbanCards()}
            </div>
        </div>
    );
};

const KanbanCard = (props) => {
    const [collapsed, setCollapsed] = useState(true);
    const userById = useSelector(selectUserById);
    const dispatch = useDispatch();

    const changeCollapse = () => {
        setCollapsed(!collapsed);
    };

    const cardStyle = {
        backgroundColor: "#f9f7f7",
        paddingLeft: 0,
        margin: "2px 7px 7px",
        marginBottom: 8,
    };
    const project = props.project;
    const priority = props.project.priority;
    const specialty = props.project.specialty;
    const shortSpecialty = specialty === "FRONTEND" ? "F" : "B";
    const author = props.project.creator;
    const developer = props.project.developer;
    const currentUserData = props.currentUserData;


    const descriptionStyle = {
        menu: {
            width: "auto",
            padding: 7,
            transition: "250ms ease-in, 250ms ease-out",
            fontSize: "0.9rem",
        },

        menuCollapsed: {
            overflow: "hidden",
            height: 0,
            transition: "250ms ease-in, 250ms ease-out",
            fontSize: "0.9rem",
        },
    };

    const openTicketHistory = (id) => {
        alert("Hitory of ticket with id: " + id + "!!");
    };

    const changeBackgroundOnMouseHover = (e) => {
        const latColor = e.target.style.background;
        e.target.style.background = "#BFC6DF";
    };

    const changeBackgroundOnMouseLeave = (e) => {
        e.target.style.background = "#D5DDF8";
    };

    return (
        <div
            style={cardStyle}
            draggable={true}
            onDragEnd={(e) => {
                props.onDragEnd(e, project);
            }}
        >
            <div
                style={{
                    backgroundColor: "#190061",
                    margin: "0 auto",
                    top: -37,
                    left: 5,
                }}
            >
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <h6
                            style={{
                                color: "white",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                margin: "5px 0 0 0",
                                padding: "3px 0 5px 6px",
                                textAlign: "left",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <strong>id: {project.id}</strong>
                        </h6>
                    </div>
                    <div>
                        <h6
                            style={{
                                color: "white",
                                fontSize: "0.7rem",
                                fontWeight: 600,
                                margin: "5px 0 0 0",
                                padding: "3px 6px 5px 0",
                                textAlign: "right",
                            }}
                        >
                            <strong>Created date: {project.createdDate}</strong>
                        </h6>
                    </div>
                </div>
            </div>
            <div>
                <div
                    style={{
                        backgroundColor: "#97ACED",
                        position: "relative",
                    }}
                >
                    {currentUserData !== null &&
                    currentUserData.username === project.creator ? (
                        <div>
                            <div
                                style={{
                                    width: 9,
                                    height: 9,
                                    backgroundColor: "yellow",
                                    border: "2px solid orange",
                                    display: "inline-block",
                                    position: "absolute",
                                    left: 10,
                                    top: 11,
                                    borderRadius: "100%",
                                }}
                            ></div>
                        </div>
                    ) : (
                        <div
                            style={{
                                width: 9,
                                height: 9,
                                backgroundColor: "#6e5dbd",
                                display: "inline-block",
                                position: "absolute",
                                left: 10,
                                top: 11,
                                borderRadius: "100%",
                            }}
                        ></div>
                    )}
                    {currentUserData !== null &&
                    currentUserData.username === project.developer ? (
                        <div>
                            <div
                                style={{
                                    width: 9,
                                    height: 9,
                                    backgroundColor: "yellow",
                                    border: "2px solid orange",
                                    display: "inline-block",
                                    position: "absolute",
                                    left: 10,
                                    top: 32,
                                    borderRadius: "100%",
                                }}
                            ></div>
                        </div>
                    ) : (
                        <div
                            style={{
                                width: 9,
                                height: 9,
                                backgroundColor: "#6e5dbd",
                                display: "inline-block",
                                position: "absolute",
                                left: 10,
                                top: 32,
                                borderRadius: "100%",
                            }}
                        ></div>
                    )}
                    <h6
                        style={{
                            fontSize: "0.8rem",
                            margin: 0,
                            padding: 3,
                            paddingLeft: 18,
                            textAlign: "left",
                            fontWeight: 700,
                            borderTop: "5px solid white",
                            borderLeft: "5px solid white",
                        }}
                    >
                        author: {author}
                    </h6>
                </div>
                <div
                    style={{
                        backgroundColor: "#D5DDF8",
                    }}
                >
                    {developer !== null ? (
                        <h6
                            style={{
                                fontSize: "0.8rem",
                                textAlign: "left",
                                padding: 3,
                                paddingLeft: 18,
                                fontWeight: 700,
                                borderLeft: "5px solid white",
                            }}
                        >
                            developer: {developer}
                        </h6>
                    ) : (
                        <h6
                            style={{
                                fontSize: "0.8rem",
                                textAlign: "left",
                                padding: 3,
                                paddingLeft: 18,
                                fontWeight: 700,
                                borderLeft: "5px solid white",
                            }}
                        >
                            developer: <span style={{fontWeight: 400}}>unasigned</span>
                        </h6>
                    )}
                </div>
            </div>
            <div style={{position: "relative"}}>
                <div
                    style={{
                        width: 50,
                        height: 50,
                        backgroundColor:
                            priority === "LOW"
                                ? "#5C7DE3"
                                : priority === "MEDIUM"
                                    ? "#0035D3"
                                    : "#190061",
                        top: -54,
                        position: "absolute",
                        right: 0,
                        border: "4px solid white",
                        borderLeft: "none",
                    }}
                >
          <span
              style={{
                  color: "white",
                  fontWeight: 700,
                  fontSize: "1.6rem",
                  margin: 0,
                  paddingLeft: 2,
                  right: 0,
              }}
          >
            {shortSpecialty}
          </span>
                </div>
                <div style={{display: "inline-block", margin: 0, padding: 0}}>
                    <h6 style={{fontWeight: 500, margin: 0, marginBottom: 6}}>
                        {project.title}
                    </h6>
                </div>
            </div>
            <div
                style={
                    collapsed ? descriptionStyle.menuCollapsed : descriptionStyle.menu
                }
            >
                <div style={{fontSize: "0.8rem", padding: "0 7px 7px 7px"}}>
                    {props.project.description}
                </div>
                {currentUserData !== null ? (
                    currentUserData.username === project.developer ||
                    currentUserData.username === project.creator ? (
                        <h6
                            style={{
                                fontSize: "0.7rem",
                                marginBottom: -2,
                                backgroundColor: "#d5ddf8",
                                padding: "6px 0 8px",
                                width: "100%",
                                cursor: "pointer",
                            }}
                            onClick={() => openTicketHistory(project.id)}
                            onMouseOver={changeBackgroundOnMouseHover}
                            onMouseLeave={changeBackgroundOnMouseLeave}
                        >
                            Ticket history
                        </h6>
                    ) : null
                ) : null}
            </div>
            <div
                style={{
                    width: "100%",
                    backgroundColor: "#97aced",
                    color: "#190061",
                    paddingTop: 4,
                    paddingBottom: 3,
                    borderBottom: "2px solid #d5ddf8",
                    borderLeft: "2px solid #d5ddf8",
                    borderRight: "2px solid #d5ddf8",
                }}
                onClick={changeCollapse}
            >
                {project.createdDate < project.closedDate ? (
                    <div>
                        <h6
                            style={{fontSize: "0.7rem", marginBottom: 0, cursor: "pointer"}}
                        >
                            Closed date: {project.closedDate}
                        </h6>
                    </div>
                ) : null}
                {collapsed ? String.fromCharCode("9660") : String.fromCharCode("9650")}
            </div>
        </div>
    );
};

export default Kanban;
