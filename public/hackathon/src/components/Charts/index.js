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
                            <stop offset="0%"   stop-color="#4fbff6"/>
                            <stop offset="100%" stop-color="#5dd1d7"/>
                        </linearGradient>
                    </defs>
                </svg>

                <Title>Monthly Average Temperature</Title>

                <Subtitle>Source: WorldClimate.com</Subtitle>

                <Legend layout="vertical" align="right" verticalAlign="middle" borderWidth={0} />

                <Tooltip valueSuffix=" °C" shared />

                <XAxis categories={MONTHS}>
                    <XAxis.Title>Time</XAxis.Title>
                </XAxis>

                <YAxis>
                    <YAxis.Title>Temperature (°C)</YAxis.Title>
                    <SplineSeries name="New York" data={[-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]} />
                </YAxis>
            </HighchartsChart>
            )
    }
};

export default withHighcharts(Charts, Highcharts);