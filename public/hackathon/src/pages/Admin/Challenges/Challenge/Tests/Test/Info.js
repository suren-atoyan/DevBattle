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

  deleteTest = ev => ev.stopPropagation() & this.props.deleteTest(this.props.index);

  render() {

    const {
      input,
      output,
    } = this.props;

    return (
      <Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemText inset primary={`${input}/${output}`} />
          <Button onClick={this.deleteTest} variant="flat" color="secondary">Delete</Button>
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          in={this.state.open}
          timeout="auto"
          unmountOnExit
        >
          <ListItem>Input - {input}</ListItem>
          <ListItem>Output - {output}</ListItem>
        </Collapse>
      </Fragment>
    );
  }
};

Info.propTypes = {
  index: PropTypes.number.isRequired,
  deleteTest: PropTypes.func.isRequired,
  input: PropTypes.any.isRequired,
  output: PropTypes.any.isRequired,
};

export default Info;
