import React from 'react'

const bandfacts = () => {

    const style = {
        border: {
            borderStyle: "dashed",
        }
    }
    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <div className="col-12 col-sm-4 d-flex justify-content-center">
                        <div className=' m-4 rounded text-white text-center' style={{ width: "300px", height: "300px" }}>
                            <div className='w-100 justify-content-center d-flex p-3'>
                                <div className='border border-5 border-white p-4 rounded-circle' style={style.border}>
                                    <div className='bg-secondary rounded-circle'>
                                        <img className='m-3' alt='Drum Icon' src={"images/icons8-drum-64.png"}></img>
                                    </div>
                                </div>
                            </div>
                            <h2 className='display-5 fw-bold'>1067</h2>
                            <p className='fs-3'>Events Played</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-4 d-flex justify-content-center">
                        <div className=' m-4 rounded text-white text-center' style={{ width: "300px", height: "300px" }}>
                            <div className='w-100 justify-content-center d-flex p-3'>
                                <div className='border border-5 border-white p-4 rounded-circle' style={style.border}>
                                    <div className='bg-secondary rounded-circle'>
                                        <img className='m-3' alt='Drum Icon' src={"images/icons8-company-64.png"}></img>
                                    </div>
                                </div>
                            </div>
                            <h2 className='display-5 fw-bold'>45</h2>
                            <p className='fs-3'>Venues Played</p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-4 d-flex justify-content-center">
                        <div className=' m-4 rounded text-white text-center' style={{ width: "300px", height: "300px" }}>
                            <div className='w-100 justify-content-center d-flex p-3'>
                                <div className='border border-5 border-white p-4 rounded-circle' style={style.border}>
                                    <div className='bg-secondary rounded-circle'>
                                        <img className='m-3' alt='Drum Icon' src={"images/icons8-song-64.png"}></img>
                                    </div>
                                </div>
                            </div>
                            <h2 className='display-5 fw-bold'>119</h2>
                            <p className='fs-3'>Current Playlist</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default bandfacts