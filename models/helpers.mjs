import db from '../db';
import omit from 'lodash/omit';

async function updateActiveBattleId(id) {
  await db.set('active_battle_id', id);
  return id;
}

async function updateActiveBattle(battle) {
  return await db.get('battles', true).find({
    _id: db.get('active_battle_id')
  }).update(battle).write();
}

async function getActiveBattle({
  withLodashWrapper,
  withPasswords,
  role = {},
} = {}) {
  // FIXME ::: Properly handle case when active_battle_id is null
  const activeBattleId = db.get('active_battle_id') || '';
  const activeBattleWrapped = db.get('battles', true).getById(activeBattleId);

  if (withLodashWrapper) {
    return activeBattleWrapped;
  }

  const activeBattle = activeBattleWrapped.value() || null;

  const results = activeBattle
    ? filterResultsByRole(activeBattle.results, role)
    : null;

  return withPasswords
    ? activeBattle
    : (activeBattle && ({
      ...activeBattle,
      teams: activeBattle.teams.map(team => omit(team, 'password')),
      results,
    }));
}

async function createNewTeam(team) {
  const currentBattle = await getActiveBattle({ withLodashWrapper: true });

  const teams = currentBattle.get('teams');

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

async function deleteTeamById(id) {
  const currentBattle = await getActiveBattle({ withLodashWrapper: true });

  await currentBattle.get('teams').removeById(id).write();
  await currentBattle.get('results').unset(id).write();

  return currentBattle.pick(['teams', 'results']);
}

async function getTeamByName(name) {
  return (await getActiveBattle({ withLodashWrapper: true }))
    .get('teams')
    .find({ name })
    .value();
}

async function startBattle() {
  const activeBattle = await getActiveBattle({ withLodashWrapper: true });
  return activeBattle.assign({
    startTime: Date.now(),
    started: true,
  }).write();
}

async function finishBattle() {
  const activeBattle = await getActiveBattle({ withLodashWrapper: true });
  return activeBattle
    .set('finished', true)
    .write();
}

async function deleteActiveBattle() {
  return db.set('active_battle_id', null);
}

async function addNewBattle(battle) {
  return await db.insert('battles', battle);
}

async function updateAdminPassword(hashedPassword) {
  return db.set('admin', { password: hashedPassword });
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
  updateActiveBattleId,
  updateActiveBattle,
  getActiveBattle,
  createNewTeam,
  deleteTeamById,
  getTeamByName,
  startBattle,
  finishBattle,
  addNewBattle,
  deleteActiveBattle,
  updateAdminPassword,
};
