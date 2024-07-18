import { categories } from '../data/categories';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, useState } from 'react';
import { DraftExpense, Value } from '../types';
import ErrorMessage from './ErrorMessage';

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  });

  const [error, setError] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ['amount'].includes(name);

    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({ ...expense, date: value as Date });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).some((value) => !value)) {
      setError('Todos los campos son obligatorios');
      return;
    }
  };

  return (
    <form className='space-y-5' onSubmit={handleSubmit}>
      <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
        Nuevo Gasto
      </legend>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className='flex flex-col gap-2'>
        <label htmlFor='expenseName' className='text-xl'>
          Nombre Gasto:
        </label>
        <input
          className='bg-slate-100 p-2'
          id='expenseName'
          name='expenseName'
          placeholder='Añade el Nombre del gasto'
          type='text'
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='amount' className='text-xl'>
          Cantidad:
        </label>
        <input
          className='bg-slate-100 p-2'
          id='amount'
          name='amount'
          placeholder='Añade la cantidad del gasto: ej. 300'
          type='text'
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='category' className='text-xl'>
          Categoría:
        </label>
        <select
          name='category'
          id='category'
          className='bg-slate-100 p-2'
          value={expense.category}
          onChange={handleChange}
        >
          <option value=''>-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor='date' className='text-xl'>
          Fecha Gasto
        </label>
        <DatePicker
          name='date'
          className='bg-slate-100 p-2 border-0'
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
        type='submit'
        value={'Registrar Gasto'}
      />
    </form>
  );
}
