import TodoList from "./Componets/TodoList/TodoList";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./context/todosContext";
import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },

  palette: {
    primary: {
      main: "#0277bd",
    },
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "First Task",
    details: "First Task Details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Second Task",
    details: "Second Task Details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Third Task",
    details: "Third Task Details",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#191b1f",
          height: "100vh",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
