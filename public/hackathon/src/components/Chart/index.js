import React, { PureComponent } from 'react';
import Highcharts from 'highcharts/js/highcharts';
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Tooltip,
  Legend,
  SplineSeries,
} from 'react-jsx-highcharts';

import './index.scss';

const sampleData = [
  [0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 24],
  [0, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1],
  [0, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0],
  [0, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3],
];

const plotOptions = {
  series: {
    pointStart: 0,
  }
};

class Charts extends PureComponent {

  static defaultProps = {
    width: '100%',
    height: '100%',
    options: {},
  };

  render(){

    const { activeHackathon: { teams, challenges } } = this.props;

    return(
      <HighchartsChart plotOptions={plotOptions}>
        <Chart />

        <svg width="0" height="0">
          <defs>
            <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4fbff6"/>
              <stop offset="100%" stopColor="#5dd1d7"/>
            </linearGradient>
          </defs>
        </svg>

        <Title>Monitoring</Title>

        <Legend layout="vertical" align="right" verticalAlign="middle" borderWidth={0} />

        <Tooltip valueSuffix="Time" shared/>

        <XAxis >
          <XAxis.Title>Challanges</XAxis.Title>
        </XAxis>

        <YAxis>
          <YAxis.Title>Timeline</YAxis.Title>
          {
            teams.map(({ name, _id }, i) => <SplineSeries name={name} key={_id} data={sampleData[i]} />)
          }
        </YAxis>
      </HighchartsChart>
    )
  }
};

export default withHighcharts(Charts, Highcharts);