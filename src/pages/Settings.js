import React from 'react';
import Header from '../componentes/Header';

/* export const redirectLogin = () => {
  const { history } = this.props;
  localStorage.clear();
  history.push('/');
}; */

class Settings extends React.Component {
  render() {
    return (
      <div className="settings-conteiner">
        <Header />
        <h1 data-testid="settings-title">Welcome Settings</h1>
      </div>
    );
  }
}

export default Settings;
