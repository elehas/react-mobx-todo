import 'todomvc-common';
import TodoStore from './stores/TodoStore';
import ViewStore from './stores/ViewStore';
import TagStore from './stores/TagStore';
import TodoApp from './components/todoApp.js';
import React from 'react';
import ReactDOM from 'react-dom';

const initialState = window.initialState && JSON.parse(window.initialState) || {};

var todoStore = TodoStore.fromJS([]);
var viewStore = new ViewStore();
var tagStore = new TagStore();

// todoStore.subscribeServerToStore();

ReactDOM.render(
	<TodoApp todoStore={todoStore} tagStore={tagStore} viewStore={viewStore}/>,
	document.getElementById('todoapp')
);

if (module.hot) {
  module.hot.accept('./components/todoApp', () => {
    var NewTodoApp = require('./components/todoApp').default;
    ReactDOM.render(
      <NewTodoApp todoStore={todoStore} tagStore={tagStore} viewStore={viewStore}/>,
      document.getElementById('todoapp')
    );
  });
}
