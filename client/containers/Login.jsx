import { connect } from 'react-redux';

import { loginRequest, logoutRequest } from '../actions/auth';

type Props = {
  loginRequest: Function,
  logoutRequest: Function,
}

@connect(
  null,
  {
    loginRequest,
    logoutRequest,
  }
)
class Login extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onLogin(e) {
    e.preventDefault();
    this.props.loginRequest(this.state.username, this.state.password);
  }

  onLogout(e) {
    e.preventDefault();
    this.props.logoutRequest();
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.onLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={this.onChangeUsername} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.onChangePassword} />
          </div>

          <button type="submit">Login</button>
        </form>

        <form onSubmit={this.onLogout}>
          <button type="submit">Logout</button>
        </form>

      </div>
    );
  }
}

export default Login;
