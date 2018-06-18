import omit from 'lodash/omit';

export default {
    omitCollection: (collection, propertyToOmit) => collection.map(item => omit(item, propertyToOmit)),
};
