import db from '../db';

async function updateActiveHackathonId(id) {
  await db.set('active_hackathon_id', id);
  return id;
}

async function updateActiveHackathon(hackathon) {
  return await db.get('hackathons', true).find({
    _id: db.get('active_hackathon_id')
  }).update(hackathon).write();
}

async function getActiveHackathon(withLodashWrapper, withPasswords) {
  const activeHackathonId = db.get('active_hackathon_id');
  const activeHackathonWrapped = db.get('hackathons', true).getById(activeHackathonId);

  if (withLodashWrapper) {
    return activeHackathonWrapped;
  }

  const activeHackathon = activeHackathonWrapped.value() || null;

  return withPasswords
    ? activeHackathon
    : (activeHackathon && (
        activeHackathon.teams = activeHackathonWrapped.get('teams').omitCollection('password').value(),
        activeHackathon
      ));
}

async function createNewTeam(team) {
  const currentHackathon = await getActiveHackathon(true);

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
  return (await getActiveHackathon(true))
    .get('teams')
    .find({ name })
    .value();
}

async function startHackathon() {
  const activeHackathon = await getActiveHackathon(true);
  return activeHackathon.assign({
      startTime: Date.now(),
      started: true,
    }).write();
}

async function finishHackathon() {
  const activeHackathon = await getActiveHackathon(true);
  return activeHackathon
    .set('finished', true)
    .write();
}

async function addNewHackathon(hackathon) {
  return await db.insert('hackathons', hackathon);
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
