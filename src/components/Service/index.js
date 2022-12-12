import React from 'react'

const Service = () => {
    return (
        <div className="container-fluid p-0">
            <div className="row w-100 m-0">
                <div className="col-12 col-sm-6 p-0">
                    <div className=''>
                        <img className='w-100' style={{ height: "500px" }} src='images/az.PNG' alt='Take Cover Band'></img>
                    </div>
                </div>
                <div className="col-12 col-sm-6 p-0">
                    <div className='text-white text-center fs-2 p-5 m-5'>
                    <h1 className='text-black'>Service Area</h1>
                    <p>Just because we are Arizona's greatest rock cover band doesn't mean AZ is the only place that gets us. <a className='text-black' href='/contact'>Contact us</a> to see if we can work out a deal to play at your event, wherever you are!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service