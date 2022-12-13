import React from 'react'
import PlaylistCard from "../../components/Playlist Card/index"

const Playlist = () => {
  return (

    <>
      <div className="container">
        <div className="row">
          <div className="col">
          </div>
          <div className="col-12 col-sm-6 col-md-6 d-flex text-center pb-4 justify-content-center align-center">
            <div className='border border-secondary rounded border-5'>
              <h3 className='w-100 p-1 bg-secondary'>Playlist</h3>
              <div className='px-5' style={{ maxWidth: '500px' }}>
                <PlaylistCard />
              </div>
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