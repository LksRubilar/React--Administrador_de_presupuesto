import { createContext, Dispatch, useReducer, ReactNode, useMemo } from "react";
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from "../reducers/budget-reducer";

//creamos este TYPE para decirle a provider los elementos que va a contener
type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  totalExpenses: number
  remainingBudget: number
}

type BudgetProviderProps = {
  children: ReactNode;
}

//context es la accion de tener un estado global
export const BudgetContext = createContext<BudgetContextProps>(null!);

//provider son los datos que va a tener ese context
export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)
  const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
  const remainingBudget = state.budget - totalExpenses

  //aqui es donde se conecta el context y el provider
  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        remainingBudget
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
