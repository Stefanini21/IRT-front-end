import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../../redux/selectors/auth";

const Kanban = () => {
  const style = {
    paddingTop: "5px",
  };

  return (
    <div style={style}>
      <h3>Kanban Board</h3>
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

  const columns = [
    { name: "BackLog", stage: 1 },
    { name: "Design", stage: 2 },
    { name: "In Progress", stage: 3 },
    { name: "Testing", stage: 4 },
  ];

  useEffect(() => {
    setProjects(projectList);
    setIsLoading(false);
  }, []);

  //this is called when a Kanban card is dragged over a column (called by column)
  const handleOnDragEnter = (e, stageValue) => {
    console.log("target: " + e.target);
    console.log("e.stageValue: " + stageValue);
    setDraggedOverCol(stageValue);
  };

  //this is called when a Kanban card dropped over a column (called by card)

  const handleOnDragEnd = (e, project) => {
    const updatedProjects = projects.slice(0);
    console.log("project.project_stage: " + project.project_stage);
    const dOc = updatedProjects.find((projectObject) => {
      if (
        currentUserData.role === "ADMIN" &&
        (draggedOverCol === 1 || draggedOverCol === 4) &&
        project.project_stage === 3
      ) {
        return projectObject.name === project.name;
      } else if (
        (currentUserData.role === "USER" &&
          project.project_stage === 1 &&
          draggedOverCol === 2) ||
        (currentUserData.role === "USER" &&
          project.project_stage === 2 &&
          draggedOverCol === 3)
      ) {
        return projectObject.name === project.name;
      }
    });
    if (dOc !== undefined) {
      dOc.project_stage = draggedOverCol;
      setProjects(updatedProjects);
    }
  };

  return (
    <div>
      {columns.map((column) => {
        return (
          <KanbanColumn
            name={column.name}
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
      return (
        <KanbanCard
          project={project}
          key={project.name}
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
    minHeight: 500,
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
      <h5
        style={{ backgroundColor: "#87CEFA", padding: 5 }}
        onMouseOver={{ backgroundColor: "red" }}
      >
        {props.name} ({props.projects.length})
      </h5>
      {generateKanbanCards()}
    </div>
  );
};

class KanbanCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  render() {
    const cardStyle = {
      backgroundColor: "#f9f7f7",
      paddingLeft: "0px",
      paddingBottom: "5px",
      marginLeft: "0px",
      marginBottom: "5px",
    };

    return (
      <div
        style={cardStyle}
        draggable={true}
        onDragEnd={(e) => {
          this.props.onDragEnd(e, this.props.project);
        }}
      >
        <div
          style={{
            // color: "brown",
            backgroundColor: "orange"
          }}
        >
          <h6
            style={{
              fontSize: "0.7rem",
              margin: 0,
              padding: 3
            }}
          >
            author: {this.props.project.creator}
          </h6>
        </div>
        <div
          style={{
            // color: "brown",
            backgroundColor: "yellow",
          }}
        >
          {this.props.project.developer !== "" && (
            <h6
              style={{
                fontSize: "0.8rem",
                margin: 0,
                padding: 3
              }}
            >
              developer: {this.props.project.developer}
            </h6>
          )}
        </div>
        <h6 style={{ paddingTop: 6, marginBottom: 2 }}>{this.props.project.name}</h6>

        {this.state.collapsed ? null : (
          <div style={{fontSize: "0.8rem"}}>
            <strong>Task: </strong>
            {this.props.project.description}
          </div>
        )}
        <div
          style={{ width: "100%" }}
          onClick={(e) => {
            this.setState({ collapsed: !this.state.collapsed });
          }}
        >
          {this.state.collapsed
            ? String.fromCharCode("9660")
            : String.fromCharCode("9650")}
        </div>
      </div>
    );
  }
}

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
];

export default Kanban;
