import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import PieChartIcon from '@material-ui/icons/PieChart';
import BarChartIcon from '@material-ui/icons/InsertChart';

import Loading from 'components/Loading';

import './index.scss';

class Charts extends PureComponent {
  state = {
    chartType: 0,
    charts: null,
  };

  constructor(props) {
    super(props);

    import('./dynamic~import')
      .then(({ _Bar, _Pie }) => this.setState({ charts: [ _Bar, _Pie ] }));
  }

  toggleCharts = _ =>
    this.setState(pState => ({ chartType: !pState.chartType }));

  render() {

    if (!this.state.charts) {
      return <Loading />
    }

    const { results, teams, challenges } = this.props.activeBattle;

    const { charts, chartType } = this.state;

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
            chartType
              ? <BarChartIcon />
              : <PieChartIcon />
          }
        </Button>
        {charts[chartType](chartsData)}
      </div>
    );
  }
}

Charts.propTypes = {
  activeBattle: PropTypes.object.isRequired,
};

export default Charts;
