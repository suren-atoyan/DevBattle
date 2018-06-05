import Model from '.';
import Teams from '../collections/Teams';

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
  }
};

export default Model('hackathon', hackathonSchema);
