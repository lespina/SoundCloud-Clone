import * as PlaybackApiUtil from '../util/playback_api_util';

export const RECEIVE_POSITION = "RECEIVE_POSITION";
export const RECEIVE_DURATION = "RECEIVE_DURATION";

export const PREVIOUS = "PREVIOUS";
export const TOGGLE_PLAYBACK = "TOGGLE_PLAYBACK";
export const NEXT = "NEXT";

export const TOGGLE_SHUFFLE = "TOGGLE_SHUFFLE";
export const TOGGLE_LOOP = "TOGGLE_LOOP";

export const SEEK = "SEEK";
export const TOGGLE_MUTE = "TOGGLE_MUTE";
export const RECEIVE_VOLUME = "RECEIVE_VOLUME";
export const RECEIVE_PLAYBACK_SONGS = "RECEIVE_PLAYBACK_SONGS";
export const RECEIVE_PLAYBACK_SONG = "RECEIVE_PLAYBACK_SONG";
export const ADD_TO_NEXT_UP = "ADD_TO_NEXT_UP";
export const RECEIVE_PLAYBACK_SONG_FROM_QUEUE = "RECEIVE_PLAYBACK_SONG_FROM_QUEUE";
export const RECEIVE_NEW_PLAYBACK_SONGS = "RECEIVE_NEW_PLAYBACK_SONGS";

export const CLEAR_QUEUE = "CLEAR_QUEUE";
export const UPDATE_QUEUE = "UPDATE_QUEUE";

export const receivePosition = (position) => ({
  type: RECEIVE_POSITION,
  position
});

export const receiveDuration = (duration) => ({
  type: RECEIVE_DURATION,
  duration
});

export const previous = () => ({
  type: PREVIOUS
});

export const togglePlayback = () => ({
  type: TOGGLE_PLAYBACK,
});

export const next = () => ({
  type: NEXT
});

export const toggleShuffle = () => ({
  type: TOGGLE_SHUFFLE,
});

export const toggleLoop = () => ({
  type: TOGGLE_LOOP,
});

export const seekTo = (position) => ({
  type: SEEK,
  position,
});

export const toggleMute = () => ({
  type: TOGGLE_MUTE,
});

export const receiveVolume = (volume) => ({
  type: RECEIVE_VOLUME,
  volume,
});

export const receivePlaybackSongs = (songs) => ({
  type: RECEIVE_PLAYBACK_SONGS,
  songs
});

export const receiveNewPlaybackSongs = (songs) => ({
  type: RECEIVE_NEW_PLAYBACK_SONGS,
  songs
});

export const receivePlaybackSong = (songId) => ({
  type: RECEIVE_PLAYBACK_SONG,
  songId
});

export const addToNextUp = (songId) => ({
  type: ADD_TO_NEXT_UP,
  songId
});

export const receivePlaybackSongFromQueue = (songIdx) => ({
  type: RECEIVE_PLAYBACK_SONG_FROM_QUEUE,
  songIdx
});

export const clearQueue = () => ({
  type: CLEAR_QUEUE,
});

export const updateQueue = (songQueue, songIdx) => ({
  type: UPDATE_QUEUE,
  songQueue,
  songIdx
});

export const fetchPlaybackSongs = (songIds) => (dispatch) => {
  return PlaybackApiUtil.fetchPlaybackSongs(songIds).then(songs => {
    dispatch(receivePlaybackSongs(songs));
    return songs;
  });
};
