import React from 'react';
import { connect } from 'react-redux';

const SongDetail = ({ song }) => {
  if (!song) {
    return <div>Select a song</div>
  }
  console.log(song.title)
  return (
    <div>
      <h3>Details:</h3>q
      <p>
        Title: {song.title}
        <br />
        Duration: {song.duration}
      </p>

    </div>
  );
}

const mapStateToProps = state => {
  console.log(state)
  return {
    song: state.selectedSong
  }
};

export default connect(mapStateToProps)(SongDetail);

