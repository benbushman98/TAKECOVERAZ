import React from 'react'
import PlaylistCard from "../../components/Playlist Card/index"
import Social from '../../components/Social/index'

const Playlist = () => {
  return (

    <>
      <div className="container mt-5 pt-5">
        <div className="row">
          <div className="col">
          </div>
          <div className="col-12 col-sm-6 col-md-6 d-flex text-center pb-4 justify-content-center align-center">
            <div className=' mt-2 border border-dark rounded border-5'>
              <h1 className='w-100 p-1 bg-dark text-secondary mt-2'>Playlist</h1>
              <div className='px-5' style={{ maxWidth: '500px' }}>
                <PlaylistCard />
              </div>
            </div>
          </div>
          <div className="col">
          </div>
        </div>
      </div>
      <Social />
    </>
  )
}

export default Playlist