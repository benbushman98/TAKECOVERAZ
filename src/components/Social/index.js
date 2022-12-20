import React from 'react'

const Social = () => {
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
  )
}

export default Social