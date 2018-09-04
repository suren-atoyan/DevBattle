import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ResponsivePie } from '@nivo/pie'

import chartProperties from './properties';

class Pie extends PureComponent {

  static getResults(teams, challenges, results) {
    return teams.reduce((acc, { _id, name }) => {

      const teamInfo = { id: name, label: name };

      const teamResults = results[_id];

      const value = teamResults
        ? teamResults.score
        : 0;

      teamInfo.value = value;

      return (acc.push(teamInfo), acc);
    }, []);
  }

  render() {
    const { teams, challenges, results } = this.props;

    const pieChartData = Pie.getResults(teams, challenges, results);

    return (
      <ResponsivePie
        data={pieChartData}
        margin={chartProperties.margin}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors="nivo"
        colorBy="id"
        borderWidth={1}
        borderColor="inherit:darker(0.2)"
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor="inherit"
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={chartProperties.defs}
        legends={chartProperties.legends}
      />
    );
  }
}

Pie.propTypes = {
  teams: PropTypes.array.isRequired,
  challenges: PropTypes.array.isRequired,
  results: PropTypes.object.isRequired,
};

export default Pie;
