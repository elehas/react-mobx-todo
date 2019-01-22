import {observable, computed, reaction, action} from 'mobx';
import _ from 'lodash';
import * as Utils from '../utils';

class TagStore {
  @observable tags = [];

  @computed get sortByUniqueTag() {

  }

  addTag = (text) => {
    this.tags.push(text);
  }
}

const tagStore = new TagStore();

export default tagStore;
