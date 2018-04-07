import React from 'react';
import { connect } from 'react-redux';

import './style.scss';

class ActiveUsers extends React.Component {
  render() {
    const { users, online } = this.props;

    return (
      <div id="active-users">
        <div className="container">
          <div className="row"><div className="col-md-12">
          <div className="list-group">
            {online.map(user_id=>{
              let user = users[user_id];
              if (!user) return null;
              return (
                <div key={user.id} className="list-group-item">
                  {user.display_name}
                  <i className="fa fa-circle" style={{color: 'green', position: 'absolute', right: '10px', top: '6px'}} />
                </div>
              )
            })}
          </div>
          </div></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, online }) => {
  return {
      users,
      online,
  };
};

export default connect(mapStateToProps, null)(ActiveUsers);