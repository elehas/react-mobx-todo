import {observable} from 'mobx';

export default class TodoModel {
	store;
	id;
	@observable title;
	@observable tags;
	@observable completed;

	constructor(store, id, title, tags=[], completed) {
		this.store = store;
		this.id = id;
		this.title = title;
		this.tags = tags;
		this.completed = completed;
	}

	toggle() {
		this.completed = !this.completed;
	}

	destroy() {
		this.store.todos.remove(this);
	}

	setTitle(title) {
		this.title = title;
	}

	addTag (text) {
		this.tags.push(text);
	}

	getTags() {
		return this.tags;
	}

	toJS() {
		return {
			id: this.id,
			title: this.title,
			tags: this.tags,
			completed: this.completed
		};
	}

	static fromJS(store, object) {
		return new TodoModel(store, object.id, object.title, object.tags, object.completed);
	}
}
