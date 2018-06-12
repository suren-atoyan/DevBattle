import React, { PureComponent, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
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

  deleteTest = ev => ev.stopPropagation() & this.props.deleteTest(this.props.index);

  render() {

    const {
      name,
      description,
      hasCodeEditor,
      codeExample,
    } = this.props;

    return (
      <Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemText inset primary={name} />
          <Button onClick={this.deleteTest} variant="flat" color="secondary">Delete</Button>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          in={this.state.open}
          timeout="auto"
          unmountOnExit
        >
          <Typography>Name - {name}</Typography>
          <Typography>Description - {description}</Typography>
          <Typography>Has Code Editor - {hasCodeEditor ? 'Yes' : 'No'}</Typography>
          <Typography>Code Example - {codeExample || 'N/A'}</Typography>
        </Collapse>
      </Fragment>
    );
  }
};
