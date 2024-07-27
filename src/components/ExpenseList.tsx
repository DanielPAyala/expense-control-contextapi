import { useMemo } from 'react';
import { useBudget } from '../hooks/useBudget';
import ExpenseDetail from './ExpenseDetail';

export default function ExpenseList() {
  const { state } = useBudget();

  const filteredExpenses = useMemo(() => {
    if (state.currentCategory) {
      return state.expenses.filter(
        (expense) => expense.category === state.currentCategory
      );
    }
    return state.expenses;
  }, [state.expenses, state.currentCategory]);

  const isEmpty = useMemo(
    () => filteredExpenses.length === 0,
    [filteredExpenses]
  );

  return (
    <div className='mt-10 bg-white shadow-lg rounded-lg px-10 py-8 text-center'>
      {isEmpty ? (
        <p className='text-gray-600 text-2xl font-bold'>No hay gastos</p>
      ) : (
        <>
          <p className='text-gray-600 text-2xl font-bold my-5'>
            Listado de Gastos
          </p>
          {filteredExpenses.map((expense) => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}
    </div>
  );
}
