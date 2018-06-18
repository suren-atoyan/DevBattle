import _ from 'lodash';

export default {
    omitCollection: (collection, propertyToOmit) => collection.map(item => _.omit(item, propertyToOmit)),
};