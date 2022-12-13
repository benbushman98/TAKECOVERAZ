import React from 'react'


function Contact() {
    const style = {
        blueText: {
            color: '#2096F3'
        },
        social: {
            padding: "5px",
            fontSize: "30px",
            width: "50px",
            textAlign: "center",
            textDecoration: "none",
        },
        link: {
            textDecoration: "none",
            color: "black"
        },
        footer: {
            position: "relative",
        }
    }
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

            <div style={style.footer} className="text-center w-100 py-1">
                <div className='container'>
                    <br />
                    <div className='bg-white d-inline-flex m-2 rounded-pill'>
                        <div className='d-flex'>
                            <div className='mx-1' style={style.social}><a style={style.link} href="https://www.facebook.com/takecoveraz/" target="_blank" rel="noopener noreferrer" alt="Facebook Profile"><i aria-hidden="true" className="fa fa-1x fa-facebook"></i><title>FaceBook</title></a></div>
                            <div className='mx-1' style={style.social}><a style={style.link} href="https://www.youtube.com/@takecover2434" target="_blank" rel="noopener noreferrer" alt="Youtube Profile"><i aria-hidden="true" className="fa fa-1x fa-youtube"></i><title>YouTube</title></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact