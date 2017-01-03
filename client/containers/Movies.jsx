import { connect } from 'react-redux';

import { moviesRequest } from '../actions/movies';
import { secretRequest } from '../actions/secret';

type Props = {
  moviesRequest: Function,
  secretRequest: Function,
  movies: Array<Object>,
  loading: boolean,
  secret: String,
}

@connect(
  state => ({
    movies: state.movies.movies,
    loading: state.movies.loading,
    secret: state.secret.secret,
  }),
  {
    moviesRequest,
    secretRequest,
  }
)
class Movies extends React.Component {
  constructor(props: Props) {
    super(props);

    if (!props.movies.length) {
      props.moviesRequest();
    }

    if (!props.secret) {
      props.secretRequest();
    }
  }

  render() {
    return (
      <div>
        <h2>Unauthenticated Movies <button onClick={() => this.props.moviesRequest()}>&#8635;</button></h2>
        {this.props.loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {this.props.movies.map((movie, i) => (
              <li key={i}>{movie.title} ({movie.releaseYear})</li>
            ))}
          </ul>
        )}
        <h2>Authenticated Moviesecret <button onClick={() => this.props.secretRequest()}>&#8635;</button></h2>
        <p>The secret is: {this.props.secret}</p>
      </div>
    );
  }
}

export default Movies;
