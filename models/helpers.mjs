import db from '../db';
import omit from 'lodash/omit';

async function updateActiveHackathonId(id) {
  await db.set('active_hackathon_id', id);
  return id;
}

async function updateActiveHackathon(hackathon) {
  return await db.get('hackathons', true).find({
    _id: db.get('active_hackathon_id')
  }).update(hackathon).write();
}

async function getActiveHackathon({
  withLodashWrapper,
  withPasswords,
  role = {},
} = {}) {
  // FIXME ::: Properly handle case when active_hackathon_id is null
  const activeHackathonId = db.get('active_hackathon_id') || '';
  const activeHackathonWrapped = db.get('hackathons', true).getById(activeHackathonId);

  if (withLodashWrapper) {
    return activeHackathonWrapped;
  }

  const activeHackathon = activeHackathonWrapped.value() || null;

  const results = filterResultsByRole(activeHackathon.results, role);

  return withPasswords
    ? activeHackathon
    : (activeHackathon && ({
      ...activeHackathon,
      ...{
        teams: activeHackathon.teams.map(team => omit(team, 'password')),
        results,
      }
    }));
}

async function createNewTeam(team) {
  const currentHackathon = await getActiveHackathon({withLodashWrapper: true});

  const teams = currentHackathon.get('teams');

  const isTeamNameUnique = await !teams.find({ name: team.name.trim() }).value();

  if (isTeamNameUnique) {
    await teams.push(team).write();
    const { password, ...withoutPassword } = team;
    return {
      success: true,
      team: withoutPassword,
    };
  } else {
    return {
      success: false,
      errorMessage: 'Team name should be unique',
    }
  }
}

async function getTeamByName(name) {
  return (await getActiveHackathon({withLodashWrapper: true}))
    .get('teams')
    .find({ name })
    .value();
}

async function startHackathon() {
  const activeHackathon = await getActiveHackathon({withLodashWrapper: true});
  return activeHackathon.assign({
    startTime: Date.now(),
    started: true,
  }).write();
}

async function finishHackathon() {
  const activeHackathon = await getActiveHackathon({withLodashWrapper: true});
  return activeHackathon
    .set('finished', true)
    .write();
}

async function addNewHackathon(hackathon) {
  return await db.insert('hackathons', hackathon);
}

function filterResultsByRole(results, role) {
  return Object.keys(results).reduce((acc, key) => (
    acc[key] = {
      ...results[key],
      confirmedSolutions: results[key].confirmedSolutions.map(solution => (!role || role.isGuest)
        ? omit(solution, 'source')
        : (
          role.isTeamMember
            ? role.team._id === key ? solution : omit(solution, 'source')
            : solution
          ))
  }, acc), {});
}

export {
  updateActiveHackathonId,
  updateActiveHackathon,
  getActiveHackathon,
  createNewTeam,
  getTeamByName,
  startHackathon,
  finishHackathon,
  addNewHackathon,
};
