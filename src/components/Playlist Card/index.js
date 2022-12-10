import React from 'react'
import Playlists from "../../data/playlist.json"

const PlaylistCard = () => {
  return (
    Playlists && Playlists.map(playlists => {
      return (
        <div className='text-white text-center justify-content-center' key={playlists.id}>
          <p>{playlists.song} - {playlists.artist}</p>
        </div>

      )
    })
  )
}

export default PlaylistCard