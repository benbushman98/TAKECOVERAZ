import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

function PictureGallery(props) {
    var items = [
        {
            name: "Chad",
            src: "chad (2).jpg"
        },
        {
            name: "Chad",
            src: "chad (3).jpg"
        },
        {
            name: "Chad",
            src: "chad (4).jpg"
        },
        {
            name: "Jeff",
            src: 'jeff.jpg',
        },
        {
            name: "Chad",
            src: "chad (5).jpg"
        },
        {
            name: "Chad",
            src: "chad (8).jpg"
        },
        {
            name: "Chad",
            src: "chad (9).jpg"
        },
        {
            name: "Chad",
            src: "chad (10).jpg"
        },
        {
            name: "Jay",
            src: "jay.jpg"
        },
        {
            name:"Jay",
            src: "takecover_drum.jpg"
        },
        {
            name: "Group",
            src: "takecover_group.jpg"
        }
    ]

    return (
        <>


            <div className='container-fluid m-0'>
                <div className='row'>
                <h1 className='text-secondary text-center mt-5 fw-bold w-100'>See the Band in Action</h1>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 d-flex justify-content-center py-5'>
                        <div className='bg-white rounded-3 p-3' style={{ maxHeight: "350px", maxWidth: "455px" }}>
                            <iframe title='Take Cover Band Showcase' maxWidth="420" maxHeight="315"
                                src="https://www.youtube.com/embed/Jg4ZwElXiNE">
                            </iframe>
                        </div>
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 pt-5'>
                        <div className="d-flex justify-content-center">
                            <div>
                                <div className='d-flex justify-content-center p-1' style={{ height: "600px", width: "390px" }}>
                                    <Carousel className='w-100 '>
                                        {
                                            items.map((item, i) => <Item key={i} item={item} />)
                                        }
                                    </Carousel>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-12 col-md-12 col-lg-4 d-flex justify-content-center py-5'>
                        <div className='bg-white rounded-3 p-3' style={{ maxHeight: "350px", maxWidth: "455px" }}>
                            <iframe title='Take Cover Band Showcase' maxWidth="420" maxHeight="315"
                                src="https://www.youtube.com/embed/2ScZkF8BBgM">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Item(props) {
    return (
        <>
            <Paper >
                <div className='text-center text-white bg-black d-flex w-100 justify-content-center'>
                    <div className='bg-white p-3 rounded-3' style={{ maxHeight: "535px", maxWidth: "435px" }}>
                        <img alt={props.item.name} className="rounded-3" style={{ maxHeight: "500px", maxWidth: "400px" }} src={`/images/${props.item.src}`}></img>
                    </div>
                    <br></br>
                </div>
            </Paper>
        </>
    )
}

export default PictureGallery