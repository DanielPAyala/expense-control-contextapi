import { useMemo, useState } from 'react';
import { useBudget } from '../hooks/useBudget';

export default function BudgetForm() {
  const [budget, setbudget] = useState(0);
  const { dispatch } = useBudget();

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setbudget(e.target.valueAsNumber);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'add-budget', payload: { budget } });
  };

  return (
    <form className='space-y-5' onSubmit={(e) => handleSubmit(e)}>
      <div className='flex flex-col space-y-5'>
        <label
          htmlFor='budget'
          className='text-4xl text-blue-600 font-bold text-center'
        >
          Definir Presupuesto
        </label>
        <input
          className='w-full'
          id='budget'
          name='budget'
          placeholder='Define tu presupuesto'
          type='number'
          value={budget}
          onChange={handleChange}
        />
      </div>

      <input
        className='bg-blue-600 hover:bg-blue-700 disabled:opacity-40 cursor-pointer w-full p-2 text-white font-black uppercase'
        type='submit'
        value='Definir Presupuesto'
        disabled={isValid}
      />
    </form>
  );
}
