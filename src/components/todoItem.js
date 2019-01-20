import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, action, computed} from 'mobx';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class TodoItem extends React.Component {
	@observable editText = "";
	@observable tagText = "";

	render() {
		const {todo} = this.props;
		return (
				<li className={[
					todo.completed ? "completed": "",
					this.isBeingEdited ? "editing" : "",
					this.isBeingTagged ? "tagging" : ""
				].join(" ")}>
					<div className="view">
						<input
							className="toggle"
							type="checkbox"
							checked={todo.completed}
							onChange={this.handleToggle}
						/>
						<label onDoubleClick={this.handleEdit}>
							{todo.title}
						</label>
						<button className="destroy" onClick={this.handleDestroy} />
						<button className="addTag" onClick={this.handleShowTagInput}>Add tags</button>
					</div>
					<input
						ref="editField"
						className="edit"
						value={this.editText}
						onBlur={this.handleSubmit}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyDown}
					/>
					<div className="tags">
						{
							this.getTodoTags(todo.id).map(tag => (
								<span className="tag">{tag.text}</span>
							))
						}

						<input
							ref="todoTagField"
							className="tagInput"
							placeholder="Add some tags to this item"
							onBlur={this.handleSubmitTag}
							onChange={this.handleTagChange}
							onKeyDown={this.handleTagKeyDown}
							value={this.tagText}
							/>
					</div>
				</li>
		);
	}

	getTodoTags (todoId) {
		let {tags} = this.props.tagStore;

		if(tags.length > 0) {
			return tags.filter(tag => {
				return tag.todoId == todoId ? tag.text : '';
			})
		}
	};

	@computed
	get isBeingEdited() {
		return this.props.viewStore.todoBeingEdited === this.props.todo
	}

	@computed
	get isBeingTagged() {
		return this.props.viewStore.todoBeingTagged === this.props.todo
	}

	handleShowTagInput = (event) => {
		event.preventDefault();
		this.props.viewStore.todoBeingTagged = this.props.todo
	}

	handleTagChange = (event) => {
		this.tagText = event.target.value;
	}

	@action
	handleTagKeyDown = (event) => {
		if (event.which === ESCAPE_KEY) {
			this.tagText = '';
			this.props.viewStore.todoBeingTagged = null;
		} else if (event.which === ENTER_KEY) {
			this.handleSubmitTag(event);
		}
	}

	@action
	handleSubmitTag = (event) => {
		let val = this.tagText.trim();
		if (val) {
			this.props.tagStore.addTag(val, this.props.todo.id);
			this.tagText = '';
		}
	}

	@action
	handleSubmit = (event) => {
		const val = this.editText.trim();
		if (val) {
			this.props.todo.setTitle(val);
			this.editText = val;
		} else {
			this.handleDestroy();
		}
		this.props.viewStore.todoBeingEdited = null;
	};

	@action
	handleDestroy = () => {
		this.props.todo.destroy();
		this.props.viewStore.todoBeingEdited = null;
	};

	@action
	handleEdit = () => {
		const todo = this.props.todo;
		this.props.viewStore.todoBeingEdited = todo;
		this.editText = todo.title;
	};

	@action
	handleKeyDown = (event) => {
		if (event.which === ESCAPE_KEY) {
			this.editText = this.props.todo.title;
			this.props.viewStore.todoBeingEdited = null;
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	};

	@action
	handleChange = (event) => {
		this.editText = event.target.value;
	};

	@action
	handleToggle = () => {
		this.props.todo.toggle();
	};
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	viewStore: PropTypes.object.isRequired
};
