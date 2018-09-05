import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Bar from './Bar';
import Pie from './Pie';

import Button from '@material-ui/core/Button';
import PieChartIcon from '@material-ui/icons/PieChart';
import BarChartIcon from '@material-ui/icons/InsertChart';

import './index.scss';

class Charts extends PureComponent {
  state = {
    chartType: 1,
  };

  toggleCharts = _ =>
    this.setState(pState => ({ chartType: !pState.chartType }));

  render() {

    const { results, teams, challenges } = this.props.activeBattle;

    const chartsData = {
      results, teams, challenges,
    };

    return (
      <div className="monitoring-charts">
        <Button
          variant="fab"
          color="default"
          onClick={this.toggleCharts}
          className="monitoring-charts__toggle-button"
        >
          {
            this.state.chartType
              ? <PieChartIcon />
              : <BarChartIcon />
          }
        </Button>
        {
          this.state.chartType
            ? <Bar {...chartsData} />
            : <Pie {...chartsData} />
        }
      </div>
    );
  }
}

Charts.propTypes = {
  activeBattle: PropTypes.object.isRequired,
};

export default Charts;
