import { ChangeEvent } from 'react';
import { categories } from '../data/categories';
import { useBudget } from '../hooks/useBudget';

export default function FilterByCategory() {
  const { dispatch } = useBudget();

  const handleFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'add-filter-category',
      payload: { id: e.target.value },
    });
  };

  return (
    <div className='bg-white shadow-lg rounded-lg p-10'>
      <form>
        <div className='flex flex-col md:flex-row md:items-center gap-5'>
          <label htmlFor='category'>Filtrar Gastos</label>
          <select
            className='bg-slate-100 p-3 flex-1 rounded'
            name='category'
            id='category'
            onChange={handleFilter}
          >
            <option value=''>-- Todas las categorías --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
