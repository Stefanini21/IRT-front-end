import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/selectors/auth";
import { selectTicketListForKanban } from "../../redux/selectors/ticket";
import {
  changeTicketStatus,
  changeTicketDeveloper,
  getTicketListForKanban
} from "../../redux/actions/ticket";
import { selectUserById } from "../../redux/selectors/user";
import Select from "react-select";
import {
  selectBacklogFirstFilterValue,
  selectFilteredTickets
} from "../../redux/selectors/kanban";
import {
  setBacklogFirstFilterValue,
  setFilteredTickets,
  resetFilteredTickets
} from "../../redux/actions/kanbanFilter";

const Kanban = () => {
  const filterOptions = [
    { value: "CREATOR", label: "Creator" },
    { value: "DEVELOPER", label: "Developer" },
    { value: "SPECIALTY", label: "Specialty" },
    { value: "PRIORITY", label: "Priority" },
  ];

  const dispatch = useDispatch();
  const tickets = useSelector(selectTicketListForKanban);
  const [filterOne, setFilterOne] = useState("");
  const [filterTwo, setFilterTwo] = useState("");
  const [columnBacklog, setColumnBacklog] = useState(false);
  const [options2, setOptions2] = useState([]);
  const backlogFirstFilterValue = useSelector(selectBacklogFirstFilterValue);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const filteredTickets = useSelector(selectFilteredTickets);
  const [firstFilterArgument, setFirstFilterArgument] = useState("");
  const [isSelectedFirstFilter, setIsSelectedFirstFilter] = useState(false);

  useEffect(() => {
    dispatch(getTicketListForKanban());
    setIsSelectedFirstFilter(false);
    dispatch(resetFilteredTickets());
  }, []);

  const setBacklogFilterOne = (e) => {
    setIsSelectedFirstFilter(true);
    setOptions2([]);
    switch (e.value) {
      case "CREATOR": {
        setFirstFilterArgument("creator");
        const authors = [];
        tickets.forEach((ticket) => {
          if (!authors.includes(ticket.creator)) {
            authors.push(ticket.creator);
          }
        });
        dispatch(setBacklogFirstFilterValue(authors));
        console.log("backlogFirstFilterValue: " + backlogFirstFilterValue);
        setOptions2(backlogFirstFilterValue);
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
        dispatch(setBacklogFirstFilterValue(developers));
        console.log("backlogFirstFilterValue: " + backlogFirstFilterValue);
        break;
      }
      case "SPECIALTY": {
        setFirstFilterArgument("specialty");
        const specialities = [];
        tickets.forEach((ticket) => {
          if (!specialities.includes(ticket.specialty)) {
            specialities.push(ticket.specialty);
          }
        });
        dispatch(setBacklogFirstFilterValue(specialities));
        console.log("backlogFirstFilterValue: " + backlogFirstFilterValue);
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
        dispatch(setBacklogFirstFilterValue(priorities));
        console.log("backlogFirstFilterValue: " + backlogFirstFilterValue);
        break;
      }
      default:
        dispatch(setBacklogFirstFilterValue([]));
        setOptions2(null);
    }
  };

  const setBacklogFilterTwo = (e) => {
    setFilterTwo(e.value);
    console.log("firstFilterArgument: " + firstFilterArgument);
    console.log("secondFilterArgument: " + e.value);
    dispatch(setFilteredTickets(firstFilterArgument, e.value));
    setIsFilterActive(true);
  };

  const resetAllFilters = () => {
    setIsFilterActive(false);
    setIsSelectedFirstFilter(false);
    dispatch(resetFilteredTickets());
    // let sel2 = document.getElementById("my_select2");
    // sel2.value = null
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
            <label
              htmlFor="filter"
              style={{
                paddingLeft: 4,
                margin: 0,
                fontWeight: 500,
                flexGrow: 3,
                paddingTop: 6,
                display: "inline-block"
              }}
            >
              <h4
                style={{
                  fontWeight: 500,
                  textAlign: "center",
                  fontSize: "20px",
                  // paddingBottom: -10,
                  marginBottom: 4,
                  textAlign: "right",
                }}
              >
                <span style={{ fontWeight: 300 }}>Filter by:</span>
              </h4>
            </label>
            <div style={{ top: -5, height: 45, flexGrow: 4, margin: "0 10px", display: "inline-block" }}>
              <Select
                id="my_select1"
                options={filterOptions}
                type="text"
                name="filter1"
                onChange={setBacklogFilterOne}
                style={{ width: "20%", padding: 4, marginBottom: 4 }}
              />
            </div>
            <div
              style={{ display: "inline-block", flexGrow: 4, margin: "0 10px" }}
            >
              <Select
                id="my_select2"
                options={
                  backlogFirstFilterValue &&
                  backlogFirstFilterValue.length &&
                  backlogFirstFilterValue.map((v) => ({
                    label: v,
                    value: v,
                  }))
                }
                type="text"
                name="filter2"
                onChange={setBacklogFilterTwo}
                style={{ width: "20%", padding: 4 }}
                isDisabled={!isSelectedFirstFilter}
                value={backlogFirstFilterValue.value}
              />
            </div>
            <div className="form-group" style={{ flexGrow: 4 }}>
              <button
                className="secondary_button"
                disabled={!isFilterActive}
                onClick={() => resetAllFilters()}
                style={{
                  visibility: isFilterActive === true ? "visible" : "hidden",
                }}
              >
                Reset filter
              </button>
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
            tickets={tickets}
            filteredTickets={filteredTickets}
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
  const filteredTickets = useSelector(selectFilteredTickets);
  // const filteredTickets = props.filteredTickets;
  const isFilterActive = props.isFilterActive;

  const columns = [
    { name: "BackLog", stage: 1 },
    { name: "In progress...", stage: 2 },
    { name: "Finished", stage: 3 },
    { name: "Closed", stage: 4 },
  ];

  useEffect(() => {
    // console.log("tickets" + tickets);
    // console.log("isFilterActive: " + isFilterActive);
    console.log("filteredTickets in KanbanBoard: " + filteredTickets);
    if (isFilterActive) {
      setProjects(filteredTickets);
    } else {
      setProjects(tickets);
    }

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
  }, [setDraggedOverCol]);

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

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
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

  useEffect(() => {
    setMouseIsHovering(false);
  }, [props]);

  const generateKanbanCards = () => {
    return props.projects.slice(0).map((project) => {
      //!!!!!!!!! ---- must to send project up!!!
      // console.log("in generateKanbanCards project.title: " + project.title)
      // console.log("in generateKanbanCards project: " + project)
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
          margin: "2px 5px 4px",
        }}
      >
        {props.title}{" "}
        <span style={{ fontWeight: 300, fontSize: "1rem" }}>
          ({props.projects.length})
        </span>
      </h5>
      <div style={{ height: 600, overflowY: "scroll" }}>
        {generateKanbanCards()}
      </div>
    </div>
  );
};

const KanbanCard = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const userById = useSelector(selectUserById);
  const dispatch = useDispatch();

  // const userNameByUserId = (id) => {
  //   dispatch(getUserById(id));
  //   const username = userById.username;
  //   return username;
  // };

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

  // console.log('========================')
  // console.log("priority: " + priority);
  // console.log("specialty: " + specialty);
  // console.log("author: " + author);
  // console.log("developer: " + developer);

  const descriptionStyle = {
    menu: {
      // overflow: "hidden",
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            // color: "brown",
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
            // color: "brown",
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
              developer: <span style={{ fontWeight: 400 }}>unasigned</span>
            </h6>
          )}
        </div>
      </div>
      <div style={{ position: "relative" }}>
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
        <div style={{ display: "inline-block", margin: 0, padding: 0 }}>
          <h6 style={{ fontWeight: 500, margin: 0, marginBottom: 6 }}>
            {project.title}
          </h6>
        </div>
      </div>
      <div
        style={
          collapsed ? descriptionStyle.menuCollapsed : descriptionStyle.menu
        }
      >
        <div style={{ fontSize: "0.8rem", padding: "0 7px 7px 7px" }}>
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
              style={{ fontSize: "0.7rem", marginBottom: 0, cursor: "pointer" }}
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
