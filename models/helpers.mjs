import db from '../db';

async function updateActiveHackathonId(id) {
  await db.set('active_hackathon_id', id);
  return id;
}

async function getActiveHackathon(withLodashWrapper, withPasswords) {
  const activeHackathonId = await db.get('active_hackathon_id');
  const activeHackathonWrapped = (await db.get('hackathons', true)).find({ _id: activeHackathonId });

  if (withLodashWrapper) {
    return activeHackathonWrapped;
  }

  const activeHackathon = activeHackathonWrapped.value();

  return withPasswords
    ? activeHackathon
    : activeHackathon
    ? (
        activeHackathon.teams = activeHackathon.teams.map(team => {
          const { password, ...withoutPassword } = team;
          return withoutPassword;
        }),
        activeHackathon
      )
    : null;
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

async function startHackathon() {
  const activeHackathon = getActiveHackathon(true, true);
  return activeHackathon
    .set('startTime', Date.now())
    .set('started', true)
    .write();
}

async function finishHackathon() {
  const activeHackathon = getActiveHackathon(true, true);
  return activeHackathon
    .set('finished', true)
    .write();
}

async function addNewHackathon(hackathon) {
  return await db.setPush('hackathons', hackathon);
}

export {
  updateActiveHackathonId,
  getActiveHackathon,
  createNewTeam,
  startHackathon,
  finishHackathon,
  addNewHackathon,
};
