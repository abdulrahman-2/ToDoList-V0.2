import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { useDispatch } from "../context/todosContext";
import { useToast } from "../context/toastContext";

// ICONS
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

const Todo = ({ todo, handleDeleteClick, handleUpdateClick }) => {
  const dispatch = useDispatch();
  const { showHideToast } = useToast();

  //check todo if isCoomleted
  function handleCheckClick() {
    dispatch({ type: "toggledCompleted", payload: todo });
    showHideToast(
      todo.isCompleted
        ? "Task has been added to unfinshied tasks"
        : "Task has been added to finshied tasks"
    );
  }
  //check todo if isCoomleted //

  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
        }}
      >
        <CardContent style={{ padding: "15px" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography
                variant="h5"
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  textAlign: "left",
                }}
              >
                {todo.title}
              </Typography>

              <Typography
                variant="h6"
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  textAlign: "left",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>

            {/* ACTION BUTTONS */}
            <Grid item xs={12} md={4} container justifyContent="flex-end">
              {/* CHECK ICON BUTTON */}
              <IconButton
                className="iconButton"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
                onClick={handleCheckClick}
              >
                <CheckIcon />
              </IconButton>
              {/*== CHECK ICON BUTTON ==*/}

              {/* UPDATE BUTTON */}
              <IconButton
                className="iconButton"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
                onClick={() => {
                  handleUpdateClick(todo);
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/*== UPDATE BUTTON ==*/}

              {/* DELETE BUTTON */}
              <IconButton
                className="iconButton"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={() => {
                  handleDeleteClick(todo);
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/*=== DELETE BUTTON ===*/}
            </Grid>
            {/*== ACTION BUTTONS ==*/}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
