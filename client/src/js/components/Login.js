import React from 'react';
import FacebookLogin from 'react-facebook-login';

class Login extends React.Component{

  constructor(props) {
      super(props);
  };

  responseFacebook = (response) => {
    console.log(response);
    console.log(response.picture.data.url);
    if(response.id){
      console.log('Usuario logueado: '+ response.id);
      this.props.changeUser(response.id, response.name);
    }
    //this.props.changeQuery(title);
  };

  render () {
    var button ='';
    if (this.props.selectedUserId == '001') {
      button = <FacebookLogin
                appId="1712977212353438"
                fields="name,email,picture"
                callback={this.responseFacebook}
                icon="fa-facebook"
                size="small"
                />;
    }

    return (
        <div class="panel-group">
            <div class="panel panel-default">
              <div class="panel-heading">
                Bienvenido <strong>{this.props.selectedUserName}</strong>
              </div>
              <div class="panel-body">
                {button}
              </div>
            </div>
          </div>

    );
  }

}

export default Login;
