import Model from '.';
import Teams from '../collections/teams';
import Challenges from '../collections/challenges';

const hackathonSchema = {
  name: {
    required: true,
    type: String,
  },

  teams: {
    required: true,
    type: Teams,
  },

  isGuestTeam: {
    required: false,
    type: Boolean,
    default: true,
  },

  duration: {
    required: true,
    type: Number, // Date
  },

  challenges: {
    required: true,
    type: Challenges,
  }
};

export default Model('hackathon', hackathonSchema);
