import {observable, computed, reaction, action} from 'mobx';
import * as Utils from '../utils';

class TagStore {
  @observable tags = [{tag:'Fresh Tag', taggedTodo: '71ffcf5b-7aa2-4983-b100-320488f8dfb8'}];

  addTag = (text, todoId) => {
    this.tags.push(
      {
        text,
        todoId
      }
    );
  }
}

const tagStore = new TagStore();

export default tagStore;
