import { connect } from 'react-redux';
import { Link } from 'react-router';

import { moviesRequest } from '../actions/movies';

type Props = {
  moviesRequest: Function,
  movies: Array<Object>,
  loading: boolean,
}

@connect(
  state => ({
    movies: state.movies.movies,
    loading: state.movies.loading,
  }),
  { moviesRequest }
)
class Movies extends React.Component {
  constructor(props: Props) {
    super(props);

    if (!props.movies.length) {
      props.moviesRequest();
    }
  }

  render() {
    return (
      <div>
        <h2>Movies</h2>
        {this.props.loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {this.props.movies.map((movie, i) => (
              <li key={i}>{movie.title} ({movie.releaseYear})</li>
            ))}
          </ul>
        )}
        <Link to="/hello">Hello</Link>
      </div>
    );
  }
}

export default Movies;
