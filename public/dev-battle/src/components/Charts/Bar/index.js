import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { ResponsiveBar } from '@nivo/bar';

import chartProperties from './properties';

class Bar extends PureComponent {

  static getResults(teams, challenges, results) {
    // TODO ::: Optimaze this case
    // Data in store should be normalized
    // For avoiding such kind of loops
    // E.g
    // Instead of
    // [{ id: 12, name: 'team_4' }, { id: 13, name: 'team_5' }]
    // Should be
    // {
    //   12: { id: 12, name: 'team_4' },
    //   13: { id: 13, name: 'team_5' }
    // }

    return teams.reduce((acc, { name, _id }) => {
      const teamInfo = { name };

      const teamResults = results[_id];
      if (teamResults) {
        teamResults.confirmedSolutions.reduce(
          (res, { challengeId, points }) => {
            res[challenges.find(({ _id }) => _id === challengeId).name] = points;
            return res;
          },
          teamInfo,
        );
      }
      return (acc.push(teamInfo), acc);
    }, []);
  }

  render() {
    const { teams, challenges, results } = this.props;

    const barChartData = Bar.getResults(teams, challenges, results);

    const keys = challenges.map(({ name }) => name);

    return (
      <ResponsiveBar
        data={barChartData}
        keys={keys}
        indexBy="name"
        margin={chartProperties.margin}
        padding={0.3}
        colors="blues"
        colorBy="id"
        defs={chartProperties.defs}
        borderColor="inherit:darker(1.6)"
        axisBottom={chartProperties.axisBottom}
        axisLeft={chartProperties.axisLeft}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    );
  }
}

Bar.propTypes = {
  teams: PropTypes.array.isRequired,
  challenges: PropTypes.array.isRequired,
  results: PropTypes.object.isRequired,
};

// For dynamic import
const creator = props => <Bar {...props} />;

export { creator };

export default Bar;
