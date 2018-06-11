import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = {
  content: {
    width: '100%',
    padding: '0 !important',
  },

  typography: {
    textAlign: 'center',
  },
};

class DetailedExpansionPanel extends PureComponent {

  state = {
    expanded: this.props.expanded || this.props.defaultExpanded,
  }

  handleClick = e => this.setState({ expanded: !this.state.expanded });

  render() {
    const { classes, label, children, className, defaultExpanded } = this.props;
    return (
      <ExpansionPanel
        expanded={this.state.expanded}
        onClick={this.handleClick}
        className={className}
        defaultExpanded={defaultExpanded}
      >
        <ExpansionPanelSummary className="tets" expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.typography}>{label}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.content}>
            { this.state.expanded && (
                children
            )}
          </div>
        </ExpansionPanelDetails>  
      </ExpansionPanel>
    );
  }
}

DetailedExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DetailedExpansionPanel);