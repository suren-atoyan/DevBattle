import Model from './';

const teamSchema = {
  name: {
    required: true,
    type: String,
  },

  count: {
    required: false,
    default: 10,
    type: Number,
  },

  password: {
    required: true,
    type: String,
  },
};

export default Model('team', teamSchema);
