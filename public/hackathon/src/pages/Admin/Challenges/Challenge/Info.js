import React, { PureComponent, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Info extends PureComponent {

  state = {
    open: false,
  }

  handleClick = _ => this.setState({ open: !this.state.open });

  deleteChallenge = ev => ev.stopPropagation() & this.props.deleteChallenge(this.props.index);

  render() {

    const {
      name,
      description,
      hasCodeEditor,
      codeExample,
      hasCodeLimitation,
      fnName,
      fnLength,
    } = this.props;

    return (
      <Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemText inset primary={name} />
          <Button onClick={this.deleteChallenge} variant="flat" color="secondary">Delete</Button>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          in={this.state.open}
          timeout="auto"
          unmountOnExit
        >
          <ListItem>Name - {name}</ListItem>
          <ListItem>Description - {description}</ListItem>
          <ListItem>Has Code Editor - {hasCodeEditor ? 'Yes' : 'No'}</ListItem>
          <ListItem>Code Example - {codeExample || 'N/A'}</ListItem>
          <ListItem>hasCodeLimitation - {hasCodeLimitation ? 'Yes' : 'No'}</ListItem>
          <ListItem>Function name - {fnName}</ListItem>
          <ListItem>Function length - {fnLength}</ListItem>
        </Collapse>
      </Fragment>
    );
  }
};
