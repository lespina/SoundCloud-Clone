import React from 'react';
import { LOOP_ALL, LOOP_ONE } from '../../reducers/playback_reducer';
import { PREVIOUS, NEXT, RECEIVE_POSITION, TOGGLE_PLAYBACK } from '../../actions/playback_actions';

class PlayBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      start: new Date(0),
      time: new Date(0),
      volumeDragStart: this.props.playback.volume,
      draggableHeight: { bottom: `${Math.floor(this.props.playback.volume)}px` },
    };
    this.increment = this.increment.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  componentDidMount() {
    this.toggleTimer();
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { lastAction, playing } = nextProps.playback;
    switch (lastAction) {
      case RECEIVE_POSITION:
        return false;
      case TOGGLE_PLAYBACK:
        this.toggleTimer(nextProps);
        return true;
      case PREVIOUS:
      case NEXT:
        if (this.state.start === nextState.start) {
          this.resetTime();
        }
        return true;
      default:
        return true;
    }
  }

  format(numSeconds) {
    const sec_num = parseInt(numSeconds, 10);
    const hours   = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (seconds < 10) {seconds = "0"+seconds;}

    if (hours === 0) {
      return [minutes, seconds].join(":");
    } else {
      return [hours, minutes, seconds].join(':');
    }
  }

  resetTime() {
    this.setState({
      start: new Date(0),
      time: new Date(0),
    });
  }

  toggleTimer(nextProps) {
    let playing;
    if (nextProps === undefined) {
      playing = this.props.playback.playing;
    } else {
      playing = nextProps.playback.playing;
    }
    if (playing) {
      this.timer = window.setInterval(this.increment, 1000);
    } else {
      if (this.timer) {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    }
  }

  increment() {
    const time = new Date(this.state.time.getTime() + 1000);
    this.setState({ time });
    this.forceUpdate();
  }

  handleSimpleAction(name) {
    return (e) => {
      e.preventDefault();
      this.props[name]();
    };
  }

  toVolRange(pos) {
    const start = this.state.volumeDragStart;
    let result = Math.floor((start - (10 / 9) * pos) / 10);
    result = result + 3;
    if (result > 10) { return undefined; }
    if (result < 0) { return null; }
    return result;
  }

  handleDrag(e) {
    const currentVol = Math.ceil(this.props.playback.volume / 10);
    const yCoord = (e.clientY - e.target.getClientRects()[0].y);
    const newVol = this.toVolRange(yCoord);
    if (newVol !== null && newVol !== undefined && newVol !== currentVol) {
      this.props.receiveVolume(newVol * 10);
    }
  }

  handleDragEnd(e) {
    const newBottom = `${Math.floor(this.props.playback.volume)}px`;
    const draggableHeight = { bottom: newBottom };
    this.setState({ draggableHeight });
  }

  handleDragStart(e) {
    e.dataTransfer.setDragImage(document.getElementById('empty'), 0, 0);
  }

  parseSec(ms) {
    return Math.floor(ms/1000);
  }

  render() {
    const { start, time } = this.state;
    const { songs, playback } = this.props;
    const { mute, playing, duration, position, shuffle, loop } = playback;
    const song = songs[playback.songQueue[playback.songIdx]];

    if (!song) {
      return <div></div>;
    }

    const buttonStatus = ((playing) ? "playbar-pause" : "");
    const shuffleStatus = ((shuffle) ? "shuffle-toggle" : "");
    const muteStatus = ((mute) ? "mute-toggle" : "");
    let loopStatus;
    switch (loop) {
      case null:
        loopStatus = "";
        break;
      case LOOP_ONE:
        loopStatus = "loop-one";
        break;
      case LOOP_ALL:
        loopStatus = "loop-all";
        break;
      default:
        loopStatus = "brown";
    }

    const sliderHeight = { height: `${this.props.playback.volume}px` };
    const handleBottom = { bottom: `${this.props.playback.volume}px` };
    const draggableHeight = this.state.draggableHeight;

    return (
      <div>
        <div className="playbar-bg">Playbar Background</div>
        <div className="full-width-container">
          <section className="playbar">
            <section className="playbar-control-buttons">
              <div onClick={this.handleSimpleAction('previous')} className="playbar-prev controls">

              </div>
              <div onClick={this.handleSimpleAction('togglePlayback')} className={`playbar-play controls ${buttonStatus}`}>

              </div>
              <div onClick={this.handleSimpleAction('next')} className="playbar-next controls">

              </div>
              <div onClick={this.handleSimpleAction('toggleShuffle')} className={`playbar-shuffle controls ${shuffleStatus}`}>

              </div>
              <div onClick={this.handleSimpleAction('toggleLoop')} className={`playbar-loop controls ${loopStatus}`}>

              </div>
            </section>
            <span className="playbar-timeline-time-passed">
             {this.format(this.parseSec(time.getTime()))}
            </span>
            <section className="playbar-timeline">
              <div className="progress-background"></div>
              <div className="progress-bar"></div>
            </section>
            <div className="playbar-timeline-time-left">
              -{this.format(this.parseSec(duration - time.getTime()))}
            </div>
            <div className={`playbar-volume-wrapper ${muteStatus}`}>
              <div onClick={this.handleSimpleAction('toggleMute')} className="volume-mute-div">Content</div>
              <div className="playbar-volume-wrapper-slider">
                <div className="volume-slider-bg"></div>
                <div className="volume-slider-progress" style={sliderHeight}></div>
                <div className="volume-slider-handle" style={handleBottom}></div>
                <div className="volume-slider-draggable" style={draggableHeight} onDrag={this.handleDrag} onDragEnd={this.handleDragEnd} onDragStart={this.handleDragStart} draggable></div>
              </div>
            </div>
            <section className="playbar-song-info">
              <div className="playbar-image">
                <a className="playbar-image" href="#" style={{ backgroundImage: `url(${song.imageUrl})` }}>Artwork</a>
              </div>
              <section className="playbar-song-text-container">
                <a className="playbar-artist truncate" href="#">{song.artist.username}</a>
                <a className="playbar-title truncate" href="#">{song.title}</a>
              </section>
              <div className="playbar-like">

              </div>

              <div className="playback-queue">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <g fill="none" fillRule="evenodd">
                    <g fill="#000" fillRule="nonzero">
                      <path d="M6 11h12v2H6zM6 7h8v2H6zM6 15h12v2H6zM16 3v6l4-3z"></path>
                    </g>
                  </g>
                </svg>
              </div>

            </section>
          </section>
        </div>

        <div id="empty">empty</div>
      </div>
    );
  }
}

export default PlayBar;
