import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    content: {
        width: '100%',
        padding: '0 !important',
    },
    typography: {
        textAlign: 'center',
    },
});

class DetailedExpansionPanel extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            expanded: props.expanded || props.defaultExpanded,
        }
    }

    handleClick = e => {
        this.setState(prevState => ({
            expanded: !prevState.expanded
        }))
    }

    render() {
        const { classes } = this.props;
        return (
            <ExpansionPanel
                expanded={this.state.expanded}
                onClick={this.handleClick}
                className={this.props.className}
                defaultExpanded={this.props.defaultExpanded}
            >
                <ExpansionPanelSummary className="tets" expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.typography}>{this.props.label}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={classes.content}>
                        { this.state.expanded && (
                            this.props.children
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