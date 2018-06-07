import React, { PureComponent } from 'react';
import Highcharts from 'highcharts/js/highcharts';
import {
    HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Tooltip, Legend, SplineSeries
} from 'react-jsx-highcharts';

import './index.scss';

const MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

class Charts extends PureComponent{

    static defaultProps = {
        width: '100%',
        height: '100%',
        options: {},
    };

    componentDidMount() {
    }
    render(){
        return(
            <HighchartsChart>
                <Chart />

                <svg width="0" height="0">
                    <defs>
                        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%"   stopColor="#4fbff6"/>
                            <stop offset="100%" stopColor="#5dd1d7"/>
                        </linearGradient>
                    </defs>
                </svg>

                <Title>Monitoring</Title>

                <Legend layout="vertical" align="right" verticalAlign="middle" borderWidth={0} />

                <Tooltip valueSuffix=" °C" shared />

                <XAxis categories={MONTHS}>
                    <XAxis.Title>Time</XAxis.Title>
                </XAxis>

                <YAxis>
                    <YAxis.Title>Temperature (°C)</YAxis.Title>
                    <SplineSeries name="Tokyo" data={[7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]} />
                    <SplineSeries name="New York" data={[-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]} />
                    <SplineSeries name="Berlin" data={[-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]} />
                    <SplineSeries name="London" data={[3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]} />
                </YAxis>
            </HighchartsChart>
            )
    }
};

export default withHighcharts(Charts, Highcharts);