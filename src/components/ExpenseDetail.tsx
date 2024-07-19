import { useMemo } from 'react';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';

import { formatDate } from '../helpers';
import { Expense } from '../types';
import AmountDisplay from './AmountDisplay';
import { categories } from '../data/categories';
import 'react-swipeable-list/dist/styles.css';

type ExpenseDetailProps = {
  expense: Expense;
};

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const categoryInfo = useMemo(
    () => categories.find((category) => category.id === expense.category),
    [expense]
  );

  const leadingActions = () => {
    return (
      <LeadingActions>
        <SwipeAction
          onClick={() => {
            console.log('Leading action clicked');
          }}
        >
          Actualizar
        </SwipeAction>
      </LeadingActions>
    );
  };

  const trailingActions = () => {
    return (
      <TrailingActions>
        <SwipeAction
          destructive={true}
          onClick={() => {
            console.log('Trailing action clicked');
          }}
        >
          Eliminar
        </SwipeAction>
      </TrailingActions>
    );
  };

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center'>
          <div>
            <img
              src={`/img/icono_${categoryInfo!.icon}.svg`}
              alt='Icono de gasto'
              className='w-20'
            />
          </div>
          <div className='flex-1 space-y-2'>
            <p className='text-sm font-bold uppercase text-slate-500'>
              {categoryInfo!.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className='text-slate-600 text-sm'>
              {formatDate(expense.date?.toString())}
            </p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
