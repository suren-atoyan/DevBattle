/* eslint-disable no-sequences */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Third-Party Components
import Highcharts from 'highcharts/js/highcharts';
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Legend,
  ColumnSeries,
  PieSeries,
} from 'react-jsx-highcharts';

import './index.scss';

const pieSeriesPosition = [100, 80];

class Charts extends PureComponent {

  static defaultProps = {
    width: '100%',
    height: '100%',
  };

  render() {
    const { activeHackathon: { teams, challenges, results } } = this.props;

    const chartData = teams.reduce((res, { _id }) => (res.push(results[_id] ? results[_id].score : 0), res), []);

    const maxYValue = challenges.reduce((sum, challenge) => sum + challenge.points, 0);

    return (
      <HighchartsChart>
        <Chart />
        <Title>Monitoring</Title>
        <Legend />
        <XAxis categories={['Teams']}  />
        <YAxis max={maxYValue}>
          {
            teams.map(({ _id, name }, i) => 
              <ColumnSeries  key={_id} name={name} data={[chartData[i]]} />
            )
          }
          <PieSeries name="Total consumption" size={100} data={chartData} showInLegend={false} center={pieSeriesPosition} />
        </YAxis>
      </HighchartsChart>
    )
  }
};

Charts.propTypes = {
  activeHackathon: PropTypes.object.isRequired,
}

const DecoratedCharts = withHighcharts(Charts, Highcharts);

DecoratedCharts.propTypes = {
  activeHackathon: PropTypes.object.isRequired,
}

export default DecoratedCharts;
