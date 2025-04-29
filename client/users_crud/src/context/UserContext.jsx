import React, { createContext, useContext, useReducer, useEffect } from 'react';
import {
  getUsers as apiGetUsers,
  createUser as apiCreateUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser
} from '../api/users';

// --- Initial State ---
const initialState = {
  list: [],
  total: 0,
  loading: false,
  error: null,
  filters: { status: '', search: '' },
  pagination: { limit: 10, offset: 0 }
};

// --- Action Types ---
const actionTypes = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
  SET_FILTERS: 'SET_FILTERS',
  SET_PAGINATION: 'SET_PAGINATION'
};

// --- Reducer ---
function usersReducer(state, action) {
  switch (action.type) {
    case actionTypes.FETCH_INIT:
      return { ...state, loading: true, error: null };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data,
        total: action.payload.total
      };
    case actionTypes.FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case actionTypes.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
        pagination: { ...state.pagination, offset: 0 }
      };
    case actionTypes.SET_PAGINATION:
      return { ...state, pagination: { ...state.pagination, ...action.payload } };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// --- Context ---
const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  const fetchUsers = async () => {
    dispatch({ type: actionTypes.FETCH_INIT });
    try {
      const { data, total } = await apiGetUsers({
        limit: state.pagination.limit,
        offset: state.pagination.offset,
        status: state.filters.status,
        search: state.filters.search
      });
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: { data, total } });
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_FAILURE, payload: error.message });
    }
  };

  // Fetch on mount and when filters or pagination change
  useEffect(() => {
    fetchUsers();
  }, [state.filters, state.pagination]);

  const addUser = async (user) => {
    await apiCreateUser(user);
    fetchUsers();
  };

  const editUser = async (id, user) => {
    await apiUpdateUser(id, user);
    fetchUsers();
  };

  const removeUser = async (id) => {
    await apiDeleteUser(id);
    // If deleting last item on page, adjust offset
    if ((state.total - 1) <= state.pagination.offset && state.pagination.offset > 0) {
      dispatch({ type: actionTypes.SET_PAGINATION, payload: { offset: state.pagination.offset - state.pagination.limit } });
    } else {
      fetchUsers();
    }
  };

  const setFilters = (filters) => {
    dispatch({ type: actionTypes.SET_FILTERS, payload: filters });
  };

  const setPagination = (pagination) => {
    dispatch({ type: actionTypes.SET_PAGINATION, payload: pagination });
  };

  return (
    <UsersContext.Provider value={{
      ...state,
      fetchUsers,
      addUser,
      editUser,
      removeUser,
      setFilters,
      setPagination
    }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};
