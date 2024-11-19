import { useMemo, useEffect } from "react";
import BudgetForm from "./components/BudgetForm";
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import FilterByCategory from "./components/FilterByCategory";

function App() {
  const { state } = useBudget();
  const isValidBuget = useMemo(() => state.budget > 0, [state.budget]);


  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses)) //los arreglos no se pueden guardar en storage, solo los strings

  }, [state])

  return (
    <>
      <header className="bg-blue-600 py-8 max-h-72">
        <h1 className="text-white text-center text-4xl font-bold uppercase">
          Planificador de Gastos
        </h1>
      </header>

      <div className="bg-white max-w-3xl mx-auto shadow-lg rounded-lg mt-10 p-10">
        {isValidBuget ? <BudgetTracker /> : <BudgetForm />}
      </div>

      {isValidBuget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}

    </>
  );
}

export default App;
