import {observable, computed, reaction, action} from 'mobx';
import * as Utils from '../utils';

class TagStore {
  @observable tags = [];

  addTag = (text) => {
    this.tags.push(text);
  }
}

const tagStore = new TagStore();

export default tagStore;
