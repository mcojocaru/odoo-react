openerp.web_react_widget = function(instance) {
    var QWeb = instance.web.qweb;
    var _t = instance.web._t;

    function UserGreeting(props) {
      return <h1>Welcome back!</h1>;
    }

    function GuestGreeting(props) {
      return <h1>Please sign up.</h1>;
    }

    function Greeting(props) {
      const isLoggedIn = props.isLoggedIn;
      if (isLoggedIn) {
        return <UserGreeting />;
      }
      return <GuestGreeting />;
    }

    function LoginButton(props) {
      return (
        <button onClick={props.onClick}>
          Login
        </button>
      );
    }

    function LogoutButton(props) {
      return (
        <button onClick={props.onClick}>
          Logout
        </button>
      );
    }

    class LoginControl extends React.Component {
      constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
      }

      handleLoginClick() {
        this.setState({isLoggedIn: true});
      }

      handleLogoutClick() {
        this.setState({isLoggedIn: false});
      }

      render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;

        if (isLoggedIn) {
          button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
          button = <LoginButton onClick={this.handleLoginClick} />;
        }

        return (
          <div>
            <Greeting isLoggedIn={isLoggedIn} />
            {button}
          </div>
        );
      }
    }

    instance.web.form.widgets.add('react_char', 'instance.web.form.FieldRectChar');

    instance.web.form.FieldRectChar = instance.web.form.FieldChar.extend({
        template: 'FieldCharReact',

        initialize_content: function() {
            this._super();
            ReactDOM.render(
              <LoginControl />,
              document.getElementById('reactRoot')
            );
        },
    });
}
