import React from 'react'
import PlaylistCard from "../../components/Playlist Card/index"

const Playlist = () => {
  return (

    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col">
          </div>
          <div className="col-12 col-lg-6 col-md-10 text-center justify-content-center align-center">
            <div className='border border-secondary rounded border-5 m-4' style={{ maxWidth: '500px' }}>
            <h3 className='w-100 p-1 bg-secondary'>Playlist</h3>
              <PlaylistCard />
            </div>
          </div>
          <div className="col">
          </div>
        </div>
      </div>

    </>
  )
}

export default Playlist