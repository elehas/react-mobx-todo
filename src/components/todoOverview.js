import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import _ from 'lodash';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import TodoItem from './todoItem';

@observer
export default class TodoOverview extends React.Component {
	render() {
		const {todoStore, viewStore, tagStore} = this.props;
		if (todoStore.todos.length === 0)
			return null;
		return <section className="main">
			<input
				className="toggle-all"
				id="toggle-all"
				type="checkbox"
				onChange={this.toggleAll}
				checked={todoStore.activeTodoCount === 0}
			/>
			<label htmlFor="toggle-all"></label>
			<ul className="todo-list">
				{this.getVisibleTodos().map(todo =>
					(<TodoItem
						key={todo.id}
						todo={todo}
						viewStore={viewStore}
						tagStore={tagStore}
					/>)
				)}
			</ul>
		</section>
	}

	getVisibleTodos() {
		return this.props.todoStore.todos.filter(todo => {
			switch (this.props.viewStore.todoFilter) {
				case ACTIVE_TODOS:
					if (this.props.viewStore.filteredByTag) {
						if(_.includes(todo.tags, this.props.tagStore.currentlySelected) && !todo.completed) {
							return todo;
						} else {
							break;
						}
					} else {
						return !todo.completed;
					}
				case COMPLETED_TODOS:
					if (this.props.viewStore.filteredByTag) {
						if(_.includes(todo.tags, this.props.tagStore.currentlySelected) && todo.completed) {
							return todo;
						} else {
							break;
						}
					} else {
						return todo.completed;
					}
				default:
					if (this.props.viewStore.filteredByTag) {
						if(_.includes(todo.tags, this.props.tagStore.currentlySelected)) {
							return todo;
						} else {
							break;
						}
					} else {
						return true;
					}
			}
		});
	}

	toggleAll = (event) => {
		var checked = event.target.checked;
		this.props.todoStore.toggleAll(checked);
	};
}


TodoOverview.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired,
	tagStore: PropTypes.object.isRequired
}
