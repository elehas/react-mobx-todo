import {observable, computed, reaction, action} from 'mobx';
import _ from 'lodash';
import * as Utils from '../utils';

export default class TagStore {
  @observable tags = [];
  @observable currentlySelected = '';

  addTag = (text) => {
    this.tags.push(text);
  }
}
