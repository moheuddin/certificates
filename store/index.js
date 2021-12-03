// import Vue from 'vue';
// import Vuex from 'vuex';
import axios from 'axios';
export const state = () => ({
  /* User */
  userName: null,
  userEmail: null,
  userAvatar: null,
  role: null,
  todos: [],
  singleItem: null
});

export const mutations = {
  /* A fit-them-all commit */

  SET_TODOS(state, todos) {
    state.todos = todos;
  },
  SET_SINGLE_ITEM(state, items) {
    state.singleItem = items;
  },
  ADD_TODO(state, todo) {
    state.todos.push(todo);
  },
  REMOVE_TODO(state, todo) {
    const i = state.todos.indexOf(todo);
    state.todos.splice(i, 1);
  },
  FILTER_TODOS(state, value) {
    state.todos.forEach((todo) => {
      todo.completed = !value;
    });
  },
  /* User */
  user(state, payload) {
    if (payload.name) {
      state.userName = payload.name;
    }
    if (payload.email) {
      state.userEmail = payload.email;
    }
    if (payload.avatar) {
      state.userAvatar = payload.avatar;
    }
    if (payload.role) {
      state.role = payload.role;
    }
  }
};

// Getters
export const getters = {
  allTodos(state) {
    return state.todos;
  },
  activeTodos(state) {
    return state.todos.filter((todo) => !todo.completed);
  },
  completedTodos(state) {
    return state.todos.filter((todo) => todo.completed);
  }
  /*   getArrItem: (state) => (id) => {
    return state.todos.find((todos) => todos.id === id);
  } */
};

export const actions = {
  addTodo({ commit }, todo) {
    commit('ADD_TODO', todo);
  },
  setTodos({ commit }, todos) {
    commit('SET_TODOS', todos);
  },
  setSingleItem({ commit }, items) {
    commit('SET_SINGLE_ITEM', items);
  },
  removeTodo({ commit }, todo) {
    commit('REMOVE_TODO', todo);
  },
  allDone({ state, commit }) {
    const value =
      state.todos.filter((todo) => todo.completed).length ===
      state.todos.length;
    commit('FILTER_TODOS', value);
  },
  saveTodos({ state }) {
    axios.put('/api/todos', { todos: state.todos });
  },
  nuxtServerInit({ commit }, { req }) {
    commit('SET_TODOS', req.session ? req.session.todos || [] : []);
  }
};
