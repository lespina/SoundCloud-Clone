import React from 'react';
import { Link } from 'react-router-dom';
import * as FormatUtil from '../../util/format_util';

class StreamIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleLike = this.handleToggleLike.bind(this);
    this.handleToggleRepost = this.handleToggleRepost.bind(this);
  }


  handleToggleLike(e) {
    e.preventDefault();
    const { currentUser, song, deleteLike, createLike } = this.props;
    if (song.id in currentUser.likes) {
      deleteLike(currentUser.likes[song.id]);
    } else {
      createLike(currentUser.id, song.id);
    }
  }

  handleToggleRepost(e) {
    e.preventDefault();
    const { currentUser, song, deleteRepost, createRepost } = this.props;
    if (song.id in currentUser.reposts) {
      deleteRepost(currentUser.reposts[song.id]);
    } else {
      createRepost(currentUser.id, song.id);
    }
  }

  usernames() {
    const { user, artist } = this.props;

    if (artist.id !== user.id) {
      return (
        <div>
          <Link to={`/users/${user.id}`} className="sound-title-username1">{user.username}</Link>
          <Link to={`/users/${artist.id}`} className="sound-title-username2">&nbsp;&nbsp;{artist.username}</Link>
        </div>
      );
    } else {
      return (
        <Link to={`/users/${artist.id}`} className="sound-title-username1">{artist.username}</Link>
      );
    }
  }

  render() {
    const {
      song,
      artist,
      handleTogglePlayback,
      playing,
      currentSongId,
      addToNextUp,
      currentUser,
    } = this.props;

    const likeActive = ((song.id in currentUser.likes) ? 'active' : '' );
    const repostActive = ((song.id in currentUser.reposts) ? 'active' : '' );
    const paused = ((playing && parseInt(currentSongId) === song.id) ? 'stream-paused' : '');
    const coverImage = { backgroundImage: `url(${song.imageUrl})` };

    return (
      <li className="stream-index-item">
        <div className="stream-index-item-body">
          <div className="stream-index-item-artwork">
            <a href="#" className="stream-index-item-cover-art">
              <div className="stream-index-item-cover-art-bg">
                <span className="stream-index-item-cover-art-true-image" style={coverImage}>Sound Cover Image</span>
              </div>
            </a>
          </div>
          <div className="stream-index-item-content">
            <div className="stream-index-item-header">
              <div className="sound-title-container">
                <div onClick={handleTogglePlayback} className={`bc-btn sound-title-play-btn ${paused}`}></div>
                <div className="sound-title-info-container">
                  <div className="sound-title-info-first">
                    {this.usernames()}
                  </div>
                  <a href="#" className="sound-title-info-second">{song.title}</a>
                  <div className="sound-title-info-third">
                    <div className="sound-title-info-upload-time">{FormatUtil.timeSince(song.createdAt)}</div>
                    {/* <a className="tag-container tag-small">
                      <span className="truncate sound-title-info-tag">Electronic</span>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="sound-waveform">
              <div className="waveform loaded">

              </div>
            </div>

            <div className="sound-footer">
              <div className="sound-actions">
                <button onClick={this.handleToggleLike} type="button" className={`bc-btn sound-actions-btn action-like ${likeActive}`}>{song.numLikes}</button>
                <button onClick={this.handleToggleRepost} type="button" className={`bc-btn sound-actions-btn action-repost ${repostActive}`}>{song.numReposts}</button>
                <button onClick={addToNextUp.bind(null, song.id)} type="button" className="bc-btn sound-actions-btn action-next-up">Add to Next up</button>
              </div>
              <div className="sound-stats">
                <div className="sound-stats-plays">{FormatUtil.formatPlays(song.plays)}</div>
                {/* <div className="sound-stats-comments">1</div> */}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default StreamIndexItem;
