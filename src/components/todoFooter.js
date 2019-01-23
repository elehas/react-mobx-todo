import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action} from 'mobx';
import {pluralize} from '../utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';
import FilterableTag from './filterableTag';

import _ from 'lodash';
import * as Utils from '../utils';

@observer
export default class TodoFooter extends React.Component {
	render() {
		const {todoStore, tagStore, viewStore} = this.props;
		if (!todoStore.activeTodoCount && !todoStore.completedCount)
			return null;

		const activeTodoWord = pluralize(todoStore.activeTodoCount, 'item');

		return (
			<footer className="footer">
				<div className="todo-filters">
					<span className="todo-count">
						<strong>{todoStore.activeTodoCount}</strong> {activeTodoWord} left
					</span>
					<ul className="filters">
						{this.renderFilterLink(ALL_TODOS, "", "All")}
						{this.renderFilterLink(ACTIVE_TODOS, "active", "Active")}
						{this.renderFilterLink(COMPLETED_TODOS, "completed", "Completed")}
					</ul>
					{ todoStore.completedCount === 0
						? null
						: 	<button
								className="clear-completed"
								onClick={this.clearCompleted}>
								Clear completed
							</button>
					}
				</div>
				<div className="tag-filters">
					<div className="tags">
						{this.renderTagFilters(tagStore.tags).map(filter => {
							return (
								<FilterableTag key={Utils.uuid()} filter={filter} viewStore={viewStore} tagStore={tagStore} />
							)
						})}
					</div>
				</div>
			</footer>
		);
	}

	renderTagFilters = (tags) => {
		return _.uniq(tags);
	}

	renderFilterLink(filterName, url, caption) {
		return (<li>
			<a href={"#/" + url}
				className={filterName ===  this.props.viewStore.todoFilter ? "selected" : ""}>
				{caption}
			</a>
			{' '}
		</li>)
	}

	@action
	clearCompleted = () => {
		this.props.todoStore.clearCompleted();
	};
}

TodoFooter.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired,
	tagStore: PropTypes.object.isRequired
}
