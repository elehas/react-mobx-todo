import React, { Component } from 'react';
import {observer} from 'mobx-react';

@observer
export default class FilterableTag extends Component {
  constructor(props) {
    super(props);
    this.viewStore = props.viewStore;
    this.tagStore = props.tagStore;
    this.filter = props.filter;
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <span onClick={this.handleClick}
            className={this.tagStore.currentlySelected === this.filter ? 'active tag': 'tag'}>
        {this.filter}
      </span>
    )
  }

  handleClick = () => {
    if (this.viewStore.filteredByTag && this.tagStore.currentlySelected == this.filter) {
      this.viewStore.filteredByTag = false;
      this.tagStore.currentlySelected = '';
    } else {
      this.viewStore.filteredByTag = true;
      this.tagStore.currentlySelected = this.filter;
    }
  }
}
