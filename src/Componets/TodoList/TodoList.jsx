import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import "./TodoList.css";

// componets
import Todo from "../Todo";
import { TodosContext } from "../../context/todosContext";

// OTHERS
import { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoList = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const [inputTitle, setInputTitle] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, [setTodos]);

  function changeDisplayedTybe(e) {
    setDisplayedTodosType(e.target.value);
  }

  let filteredTodos;

  if (displayedTodosType === "completed") {
    filteredTodos = todos.filter((todo) => todo.isCompleted);
  } else if (displayedTodosType === "unCompleted") {
    filteredTodos = todos.filter((todo) => !todo.isCompleted);
  } else {
    filteredTodos = todos;
  }

  const todosJsx = filteredTodos.map((todo) => (
    <Todo key={todo.id} todo={todo} />
  ));

  // add new todo to todo list
  function addTodo() {
    const newTodo = {
      id: uuidv4(),
      title: inputTitle,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setInputTitle("");
  }

  return (
    <Container maxWidth="sm">
      <Card
        className="todo-card"
        sx={{ minWidth: 275 }}
        style={{
          textAlign: "center",
          padding: "0 10px 10px",
          maxHeight: "70vh",
          overflowY: "scroll",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          Tasks
        </Typography>
        <Divider />

        {/* FILTER BUTTONS */}
        <ToggleButtonGroup
          value={displayedTodosType}
          onChange={changeDisplayedTybe}
          exclusive
          color="primary"
          aria-label="Platform"
          sx={{
            margin: "25px 0",
            "& .MuiToggleButton-root": {
              fontWeight: "bold",
            },
          }}
        >
          <ToggleButton value="all">All</ToggleButton>
          <ToggleButton value="completed">Finished</ToggleButton>
          <ToggleButton value="unCompleted">Unfinished</ToggleButton>
        </ToggleButtonGroup>
        {/* ==== FILTER BUTTON ==== */}

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {todosJsx}
        </div>

        {/* INPUT + ADD BUTTON */}
        <Grid container style={{ marginTop: "20px" }} spacing={1}>
          <Grid
            xs={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Button
              style={{ width: "100%", height: "100%" }}
              variant="contained"
              onClick={addTodo}
              disabled={inputTitle.length == 0}
            >
              Add
            </Button>
          </Grid>
          <Grid
            xs={8}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <TextField
              style={{ width: "100%" }}
              id="outlined-basic"
              label="Task Tiltle"
              variant="outlined"
              value={inputTitle}
              onChange={(e) => {
                setInputTitle(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        {/*== INPUT + ADD BUTTON ==*/}
      </Card>
    </Container>
  );
};

export default TodoList;
