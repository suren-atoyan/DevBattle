import Model from './';

const challengeSchema = {
  name: {
    required: true,
    type: String,
  },

  description: {
    required: true,
    type: String,
  },

  hasCodeEditor: {
    required: false,
    default: false,
    type: Boolean,
  },
};

export default Model('challenge', challengeSchema);
