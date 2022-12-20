import React from 'react'
import Social from '../../components/Social/index'

function Contact() {
    return (
        <>
            <h1 className='p-5 m-0 text-center text-secondary text-decoration-underline'>Contact Us</h1>
            <div className="container">
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col-10 col-lg-6">
                        <form className="justify-content-center align-items-center text-center">
                            <div className="form-group m-3">
                                <input type="text" className="form-control" id="InputName1" aria-describedby="nameHelp" placeholder="Name" required></input>
                            </div>
                            <div className="form-group m-3">
                                <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Email" required></input>
                            </div>
                            <div className="form-group m-3">
                                <input type="text" className="form-control" id="InputSubject1" placeholder="Subject" required></input>
                            </div>
                            <div className="form-group m-3">
                                <input type="text" className="form-control" id="InputMessage1" placeholder="Message" required></input>
                            </div>
                            <button type="submit" className="btn btn-primary mb-2">Submit</button>
                        </form>
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>
            <div className="container py-3 mt-5">
                <div className="row">
                    <div className="col">
                    </div>
                    <div className="col-10 col-lg-6 mb-5">
                        <h5 className='text-white py-2 px-1 text-center'>Please reach out with any questions, suggestions, or interest in events. Feel free to reach out via the contact form or visit us on social media.</h5>
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>

            <Social />
        </>
    )
}
export default Contact