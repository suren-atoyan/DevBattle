import db from './';
import uuid from 'uuid/v1';
/*
  SCHEMA format

  ex.

  team = {
    name: {
      required: true, // by default required is false,
      type: String,
    },

    count: {
      required: false,
      type: Number,
      default: 10,
    },
  }
*/

export default (name, schema) => class Model {

  constructor(object) {
    if (!Model.__isValid(object)) {
      throw Error('Model is not valid'); // TODO ::: Create ErrorHandler
    }

    return {
      ...Model.__generate(object),
      _id: uuid(),
    };
  }

  static __generate(object) {
    const result = Object.keys(schema).reduce((acc, key) => {
      const { default: defaultValue, type } = schema[key];
      const value = object[key];

      if (type.isCollection) {
        acc[key] = object[key].map(item => new type.__model(item));

        return acc;
      }

      if (!value && defaultValue) {
        return (acc[key] = defaultValue, acc);
      }

      return (acc[key] = object[key], acc);
    }, {});

    return result;
  }

  static __isValid(object) {
    // Shallow check ( (not required) TODO ::: Implement the same for deep checking)
    return Object.keys(schema).reduce((isValid, key) => {
      const value = object[key];
      const requirements = schema[key];

      const {
        type,
        required: isRequired = false,
        default: defaultValue,
      } = requirements;

      if (!value) {
        if (isRequired) {
          isValid = false;
        }
      } else {
        if (type) {
          if (type.isModel) {
            isValid = type.__isValid(value);
          } else if (type.isCollection) {
            isValid = value.every(type.__model.__isValid);
          } else if (value.constructor !== type) {
            isValid = false;
          }
        }
      }

      // TODO ::: Combain all cases when value is nor valid and show in Error Message

      return isValid;
    }, true);
  }

  static get isModel() {
    return true;
  }
}
