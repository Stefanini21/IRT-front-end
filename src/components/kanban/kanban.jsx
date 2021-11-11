import { width } from "dom-helpers";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/selectors/auth";
import { selectTicketList } from "../../redux/selectors/ticket";
import { changeTicketStatus } from "../../redux/actions/ticket";
import { getUserById } from "../../redux/actions/user";
import { selectUserById } from "../../redux/selectors/user";

const Kanban = () => {
  const style = {
    paddingTop: "5px",
  };

  return (
    <div style={style}>
      <h3>Ticket-board</h3>
      <KanbanBoard />
    </div>
  );
};

const KanbanBoard = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [draggedOverCol, setDraggedOverCol] = useState(0);
  const userData = useSelector(getUserData);
  const currentUserData = useSelector(getUserData);
  const tickets = useSelector(selectTicketList);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  // const userById = useSelector(selectUserById);

  const columns = [
    { name: "BackLog", stage: 1 },
    { name: "Asigned", stage: 2 },
    { name: "Finished", stage: 3 },
    { name: "Closed", stage: 4 },
  ];

  // console.log("props.tickets: " + props.tickets)

  useEffect(() => {
    setProjects(tickets);
    setIsLoading(false);
    // tickets.forEach((element) => {
    //   console.log("element.status: " + element.status);
    //   switch (element.status) {
    //     case "BACKLOG": {
    //       element.project_stage = 1;
    //       break;
    //     }
    //     case "ASIGNED": {
    //       element.project_stage = 2;
    //       break;
    //     }
    //     case "FINISHED": {
    //       element.project_stage = 3;
    //       break;
    //     }
    //     case "CLOSED": {
    //       element.project_stage = 4;
    //       break;
    //     }
    //     default:
    //       element.project_stage = 1;
    //   }
    // });
  }, [setDraggedOverCol]);

  //this is called when a Kanban card is dragged over a column (called by column)
  const handleOnDragEnter = (e, stageValue) => {
    // console.log("target: " + e.target);
    // console.log("e.stageValue: " + stageValue);
    setDraggedOverCol(stageValue);

    switch (stageValue) {
      case 1:
        console.log("case 1 draggedOverCol: " + stageValue);
        setStatus("BACKLOG");
        break;
      case 2:
        console.log("case 2 draggedOverCol: " + stageValue);
        setStatus("ASIGNED");
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

  useEffect(() => {
    console.log("draggedOverCol: " + draggedOverCol);
  }, [setDraggedOverCol]);

  //this is called when a Kanban card dropped over a column (called by card)

  const handleOnDragEnd = (e, project) => {
    const updatedProjects = projects.slice(0);
    console.log(
      "in the start handleOnDragEnd project.project_stage: " +
        project.project_stage
    );
    // console.log("project.title: " + project.title);
    // console.log("draggedOverCol: " + draggedOverCol);
    // console.log("e: " + e);
    // console.log("currentUserData.role: " + currentUserData.role);
    const dOc = updatedProjects.find((projectObject) => {
      // if (
      //   currentUserData.role === "ADMIN" &&
      //   (draggedOverCol === 1 || draggedOverCol === 4) &&
      //   project.project_stage === 3
      // ) {
      //   projectObject.author === currentUserData.author;
      //   alert("This is ADMIN!");
      //   return projectObject.title === project.title;
      // } else if (
      //   (currentUserData.role === "USER" &&
      //     project.project_stage === 1 &&
      //     draggedOverCol === 2 &&
      //     project.developer === currentUserData.username) ||
      //   (currentUserData.role === "USER" &&
      //     project.project_stage === 2 &&
      //     draggedOverCol === 3)
      // ) {
      //   if (projectObject.developer === "") {
      //     projectObject.developer === currentUserData.developer;
      //   }
      //   alert("This is USER!");
      //   return projectObject.title === project.title;
      // }
      return projectObject.title === project.title;
    });
    if (dOc !== undefined) {
      // console.log("status: " + status);
      // console.log("project.id: " + project.id);
      const ticket = {
        id: project.id,
        createdDate: project.createdDate,
        title: project.title,
        description: project.description,
        specialty: project.specialty,
        priority: project.priority,
        status: status,
        author: project.author,
        developer: project.developer,
        creator: project.creator,
      };
      // console.log("ticket: " + ticket);
      dispatch(changeTicketStatus(ticket));
      dOc.project_stage = draggedOverCol;
      console.log(
        "in the en handleOnDragEnd dOc.project_stage: " + dOc.project_stage
      );
      setProjects(updatedProjects);
    }
  };

  return (
    <div>
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
          key={project.title}
          onDragEnd={props.onDragEnd}
        />
      );
    });
  };

  const columnStyle = {
    display: "inline-block",
    verticalAlign: "top",
    marginBottom: "5px",
    paddingLeft: "5px",
    paddingTop: "5px",
    paddingRight: "5px",
    width: "25%",
    // minHeight: 500,
    textAlign: "center",
    backgroundColor: mouseIsHovering ? "#969292" : "#b1b1b1",
  };

  return (
    <div
      style={columnStyle}
      onDragEnter={(e) => {
        setMouseIsHovering(true);
        props.onDragEnter(e, props.stage);
      }}
      onDragExit={(e) => {
        setMouseIsHovering(false);
      }}
    >
      <h5 style={{ backgroundColor: "#324ab2", padding: 5, color: "white" }}>
        {props.title} ({props.projects.length})
      </h5>
      {generateKanbanCards()}
    </div>
  );
};

const KanbanCard = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const userById = useSelector(selectUserById);
  const dispatch = useDispatch();

  const userNameByUserId = (id) => {
    dispatch(getUserById(id));
     const username = userById.username;
     return username;
  }
  
  console.log("userById: " + userById);

  const changeCollapse = () => {
    setCollapsed(!collapsed);
  };

  const cardStyle = {
    backgroundColor: "#f9f7f7",
    paddingLeft: "0px",
    paddingBottom: "5px",
    marginLeft: "0px",
    marginBottom: "5px",
  };
  const priority = props.project.priority;
  const specialty = props.project.specialty;
  const shortSpecialty = specialty === "FRONTEND" ? "F" : "B";
  const author = props.project.author;
  const developer = props.project.developer;
  console.log("priority: " + priority);
  console.log("specialty: " + specialty);
  console.log("author: " + author);
  console.log("developer: " + developer);

  return (
    <div
      style={cardStyle}
      draggable={true}
      onDragEnd={(e) => {
        props.onDragEnd(e, props.project);
      }}
    >
      <div>
        <div
          style={{
            // color: "brown",
            backgroundColor: "orange",
          }}
        >
          <h6
            style={{
              fontSize: "0.7rem",
              margin: 0,
              padding: 3,
            }}
          >
            author: {props.project.creator}
          </h6>
        </div>
        <div
          style={{
            // color: "brown",
            backgroundColor: "yellow",
          }}
        >
          {props.project.developer !== "" && (
            <h6
              style={{
                fontSize: "0.8rem",
                margin: 0,
                padding: 3,
              }}
            >
              developer: {props.project.developer}
            </h6>
          )}
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            backgroundColor:
              priority === "LOW"
                ? "#f4bbff"
                : priority === "MEDIUM"
                ? "#ff77ff"
                : "#ff0090",
            width: 25,
            height: 25,
            borderRadius: "50%",
            top: -35,
            left: 5,
            border: "2px solid white",
          }}
        >
          <h6
            style={{
              paddingTop: 3,
              marginBottom: 4,
              color: "white",
              fontSize: "0.7rem",
            }}
          >
            <strong>{props.project.id} </strong>
          </h6>
        </div>
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#324ab2",
            top: -40,
            position: "absolute",
            right: 0,
          }}
        >
          <span
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: "1.5rem",
              margin: 0,
              paddingLeft: 3,
              right: 0,
            }}
          >
            {shortSpecialty}
          </span>
        </div>
        <div style={{ display: "inline-block" }}>
          <h6 style={{ paddingTop: 6, marginBottom: 2 }}>
            {props.project.title}
          </h6>
        </div>
      </div>
      {collapsed ? null : (
        <div style={{ fontSize: "0.8rem", paddingTop: 5 }}>
          {props.project.description}
        </div>
      )}
      <div
        style={{ width: "100%" }}
        onClick={changeCollapse}
      >
        {collapsed
          ? String.fromCharCode("9660")
          : String.fromCharCode("9650")}
      </div>
    </div>
  );
};

/*
 * Projects to be displayed on Kanban Board
 */
let projectList = [
  {
    id: 1,
    name: "Title ticket 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 1,
    creator: "aaa",
    developer: "",
  },
  {
    id: 2,
    name: "Title ticket 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 2,
    creator: "aaa",
    developer: "ccc",
  },
  {
    id: 3,
    name: "Title ticket 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 1,
    creator: "bbb",
    developer: "",
  },
  {
    id: 4,
    name: "Title ticket 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 2,
    creator: "bbb",
    developer: "nic",
  },
  {
    id: 5,
    name: "Title ticket 5",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 3,
    creator: "aaa",
    developer: "nic",
  },
  {
    id: 6,
    name: "Title ticket 6",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 3,
    creator: "aaa",
    developer: "ccc",
  },
  {
    id: 7,
    name: "Title ticket 7",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 4,
    creator: "vova",
    developer: "ccc",
  },
  {
    id: 8,
    name: "Title ticket 8",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 1,
    creator: "aaa",
    developer: "",
  },
  {
    id: 9,
    name: "Title ticket 9",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 2,
    creator: "aaa",
    developer: "ccc",
  },
  {
    id: 10,
    name: "Title ticket 10",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 1,
    creator: "bbb",
    developer: "",
  },
  {
    id: 11,
    name: "Title ticket 11",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 2,
    creator: "bbb",
    developer: "nic",
  },
  {
    id: 12,
    name: "Title ticket 12",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 3,
    creator: "aaa",
    developer: "nic",
  },
  {
    id: 13,
    name: "Title ticket 13",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 3,
    creator: "aaa",
    developer: "ccc",
  },
  {
    id: 14,
    name: "Title ticket 14",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
    project_stage: 4,
    creator: "vova",
    developer: "ccc",
  },
];

export default Kanban;
