import { useState, useEffect, useMemo } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import "./TodoList.css";

// componets
import Todo from "../Todo";
import { useToast } from "../../context/toastContext";
import { useTodos, useDispatch } from "../../context/todosContext";

// DIALOG IMPORTS
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";

const TodoList = () => {
  const todos = useTodos();
  const dispatch = useDispatch();
  const [dialogTodo, setDialogTodo] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const { showHideToast } = useToast();

  useEffect(() => {
    dispatch({ type: "get" });
  }, [dispatch]);

  function changeDisplayedTybe(e) {
    setDisplayedTodosType(e.target.value);
  }

  const completedTodos = useMemo(() => {
    return todos.filter((todo) => todo.isCompleted);
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((todo) => !todo.isCompleted);
  }, [todos]);

  let filteredTodos;
  if (displayedTodosType === "completed") {
    filteredTodos = completedTodos;
  } else if (displayedTodosType === "unCompleted") {
    filteredTodos = notCompletedTodos;
  } else {
    filteredTodos = todos;
  }

  const todosJsx = filteredTodos.map((todo) => (
    <Todo
      key={todo.id}
      todo={todo}
      handleDeleteClick={handleDeleteClick}
      handleUpdateClick={handleUpdateClick}
    />
  ));

  // add new todo to todo list
  function addTodo() {
    dispatch({ type: "added", payload: { newTitle: inputTitle } });
    setInputTitle("");
    showHideToast("The task has been added successfully");
  }

  // dialog handelar

  // delete todo
  function handleDeleteClick(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    dispatch({ type: "deleted", payload: dialogTodo });
    setShowDeleteDialog(false);
    showHideToast("The task has been deleted successfully");
  }
  // delete todo //

  // update todo
  function handleUpdateClick(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    dispatch({ type: "updated", payload: dialogTodo });
    setShowUpdateDialog(false);
    showHideToast("The task has been updated successfully");
  }
  // update todo //

  return (
    <>
      {/* DELETE DIALOG */}
      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete the task?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo the deletion once it is completed
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Close</Button>
          <Button
            autoFocus
            onClick={handleDeleteConfirm}
            style={{ color: "red" }}
          >
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* === DELETE DIALOG === */}

      {/* UPDATE DIALOG */}
      <Dialog
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update This Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task Title"
            fullWidth
            variant="standard"
            value={dialogTodo ? dialogTodo.title : ""}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="details"
            fullWidth
            variant="standard"
            value={dialogTodo ? dialogTodo.details : ""}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Close</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {/* === UPDATE DIALOG */}

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
          <Typography variant="h2" sx={{ fontWeight: "semibold" }}>
            To
            <span style={{ color: "#283593" }}>
              d
              <CheckCircleOutlineIcon sx={{ fontSize: "35px" }} />
            </span>
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

          {/* todos container */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {filteredTodos.length > 0 ? (
              todosJsx
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#283593",
                  fontSize: "20px",
                  padding: "20px",
                  opacity: 0.8,
                  animation: "fadeIn 1s ease-in-out",
                  "@keyframes fadeIn": {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 0.8 },
                  },
                }}
              >
                <AssignmentTurnedInIcon
                  sx={{ fontSize: "50px", mb: 1, color: "#283593" }}
                />
                Your Todos list is empty!
              </Box>
            )}
          </div>
          {/* ==== todos container ==== */}

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
                label="Todo Title"
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
    </>
  );
};

export default TodoList;
