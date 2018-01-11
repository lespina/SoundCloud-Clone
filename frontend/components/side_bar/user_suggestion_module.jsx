import React from 'react';
import UserSuggestionItem from './user_suggestion_item';

const UserSuggestionModule = ({ refresh, users, currentUser, handleToggleFollow}) => {
  return (
    <section className="sidebar-module who-to-follow">
      <a className="sidebar-header" href="#">
        <h3 className="sidebar-header-title">
          <span className="sidebar-header-follower-icon"></span>
          <span>Who to follow</span>
        </h3>
        <span onClick={refresh} className="sidebar-header-refresh">Refresh</span>
      </a>

      <div className="sidebar-content">
        <ul className="sidebar-list">
          {
            users.map(user => {

              let active;
              if (!currentUser || !currentUser.follows) {
                active = false;
              } else {
                const follows = currentUser.follows;
                active = ((user.id in follows) ? "active" : "");
              }

              return <UserSuggestionItem key={user.id} user={user} active={active} handleToggleFollow={handleToggleFollow(user.id)}/>;
            }, this)
          }
        </ul>
      </div>
    </section>
  );
};

export default UserSuggestionModule;