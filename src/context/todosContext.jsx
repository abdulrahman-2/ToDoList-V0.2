import { createContext, useReducer, useContext } from "react";
import { todosRedusers } from "../redusers/todosRedusers";
export const TodosContext = createContext([]);
export const DispatchContext = createContext(null);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosRedusers, []);
  return (
    <TodosContext.Provider value={todos}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};

export const useDispatch = () => {
  return useContext(DispatchContext);
};

export default TodosProvider;
