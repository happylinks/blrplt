import asyncComponent from './helpers/asyncComponent';

const Hello = asyncComponent(() =>
  System.import('./components/Hello').then(module => module.default)
);
const Movies = asyncComponent(() =>
  System.import('./containers/Movies').then(module => module.default)
);

export {
  Hello,
  Movies,
}