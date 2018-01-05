import React from 'react';

const SongIndexItem = ({ handleTogglePlayback, song }) => {
  const { title, artist, imageUrl, audioUrl } = song;

  return (
    <li className="song-index-item">
      <div>
        <div className="playable-tile">
          <div className="playable-tile-artwork" style={{"backgroundImage": `url(${imageUrl})`}}>
            <div className="play-button">
              <a onClick={handleTogglePlayback} href="#">Play</a>
            </div>
          </div>

          <div className="playable-tile-description">
            <div className="playable-tile-description-title">
              <a className="truncate" href="#">{title}</a>
            </div>
            <div className="playable-tile-description-username">
              <a className="truncate" href="#">{artist.username}</a>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SongIndexItem;
