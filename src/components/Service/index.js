import React from 'react'

const Service = () => {
    return (
        <div className="container-fluid p-0">
            <div className="row w-100 m-0">
            <div className="col-12 col-sm-12 col-md-12 col-lg-6 p-0 col order-lg-12 col order-md-1 col order-sm-1 col order-1">
                    <div className='d-flex'>
                        <iframe className='w-100' title='map of AZ' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380999.2749295337!2d-114.17278577421322!3d34.15255585532767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b08ebcb4c186b%3A0x423927b17fc1cd71!2sArizona!5e0!3m2!1sen!2sus!4v1670953547923!5m2!1sen!2sus" width="950" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-6 col order-lg-1 col order-md-12 col order-sm-12 col order-12 p-0 ">
                <h1 className='text-secondary text-center mt-5 fw-bold'>Service Area</h1>
                    <div className='text-white text-center fs-2 p-5 mx-3'>                     
                        <p>Just because we are Arizona's greatest rock cover band doesn't mean AZ is the only place that gets us. <a className='text-danger' href='/contact'>Contact us</a> to see if we can work out a deal to play at your event, wherever you are!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Service