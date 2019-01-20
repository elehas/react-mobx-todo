import {observable, computed, reaction, action} from 'mobx';
import * as Utils from '../utils';

class TagStore {
  @observable tags = [{}];

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
