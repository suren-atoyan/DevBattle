import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Info extends PureComponent {

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
      sourceLength,
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
          <ListItem>Source length - {sourceLength}</ListItem>
        </Collapse>
      </Fragment>
    );
  }
};

Info.propTypes = {
  index: PropTypes.number.isRequired,
  deleteChallenge: PropTypes.func.isRequired,
  codeExample: PropTypes.string,
  description: PropTypes.string.isRequired,
  fnName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sourceLength: PropTypes.number,
  hasCodeEditor: PropTypes.bool,
  hasCodeLimitation: PropTypes.bool,
  tests: PropTypes.array.isRequired,
};

export default Info;
