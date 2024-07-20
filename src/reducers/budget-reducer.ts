import { v4 as uuidv4 } from 'uuid';
import { DraftExpense, Expense } from '../types';

export type BudgetActions =
  | {
      type: 'add-budget';
      payload: {
        budget: number;
      };
    }
  | {
      type: 'show-modal';
    }
  | {
      type: 'close-modal';
    }
  | {
      type: 'add-expense';
      payload: {
        expense: DraftExpense;
      };
    }
  | {
      type: 'remove-expense';
      payload: {
        id: Expense['id'];
      };
    }
  | {
      type: 'get-expense-by-id';
      payload: {
        id: Expense['id'];
      };
    }
  | {
      type: 'update-expense';
      payload: {
        expense: Expense;
      };
    };

export type BudgetState = {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  editingId: Expense['id'];
};

export const initialState: BudgetState = {
  budget: 0,
  modal: false,
  expenses: [],
  editingId: '',
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4(),
  };
};

export const budgetReducer = (
  state: BudgetState,
  action: BudgetActions
): BudgetState => {
  switch (action.type) {
    case 'add-budget':
      return {
        ...state,
        budget: action.payload.budget,
      };
    case 'show-modal':
      return {
        ...state,
        modal: !state.modal, // Toggle the modal state
      };
    case 'close-modal':
      return {
        ...state,
        modal: false,
        editingId: '',
      };
    case 'add-expense': {
      const expense = createExpense(action.payload.expense);
      return {
        ...state,
        expenses: [...state.expenses, expense],
        modal: false,
      };
    }
    case 'remove-expense': {
      const newExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      return {
        ...state,
        expenses: newExpenses,
      };
    }
    case 'get-expense-by-id': {
      return {
        ...state,
        editingId: action.payload.id,
        modal: true,
      };
    }
    case 'update-expense': {
      const newExpenses = state.expenses.map((expense) => {
        if (expense.id === action.payload.expense.id) {
          return action.payload.expense;
        }
        return expense;
      });
      return {
        ...state,
        expenses: newExpenses,
        editingId: '',
        modal: false,
      };
    }
    default:
      return state;
  }
};
