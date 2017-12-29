import htmlTags from './htmlTags';

const validateElementPropType = (props, propName, componentName) =>
  htmlTags.includes(props[propName])
    ? null
    : new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Allowed elements: ${htmlTags.join(
          ', ',
        )}`,
      );

export default validateElementPropType;
