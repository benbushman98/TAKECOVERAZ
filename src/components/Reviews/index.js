import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'

function Reviews(props) {
    var items = [
        {
            name: "Danny G.",
            review: '"Take Cover" thats what I did when they started to play. Awesome sound, great vocals, super personalties when they migled with our crowd. We had a corporate holiday party and they made the day. The only problem was they did not know the song "ice castles" \n Seriously, great day and everyone commented on the band.',
            company: "Tony's Service Center"
        },
        {
            name: "Random Name #2",
            review: "Probably the best band you have ever seen! They totally killed it!Probably the best band you have ever seen! They totally killed it! Tons of great songs, super easy to work with and incredible talent. We will keep them around for years to come. Probably the best band you have ever seen! They totally killed it!Probably the best band you have ever seen! They totally killed it! Tons of great songs, super easy to work with and incredible talent."
        }, {
            name: "Random Name #3",
            review: "Probably the best band you have ever seen! They totally killed it!Probably the best band you have ever seen! They totally killed it! Tons of great songs, super easy to work with and incredible talent. We will keep them around for years to come. Probably the best band you have ever seen! They totally killed it!Probably the best band you have ever seen! They totally killed it! Tons of great songs, super easy to work with and incredible talent."
        }
    ]

    return (
        <>
            <div className="container-fluid p-0 w-100">
                <div className="row w-100 m-0">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 p-0">
                    <h1 className='text-secondary text-center mt-5 fw-bold'>Hear Our Clients Thoughts</h1>
                        <div className='my-4 py-5 d-flex justify-content-center'>
                            <Carousel className='w-75'>
                                {
                                    items.map((item, i) => <Item key={i} item={item} />)
                                }
                            </Carousel>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 p-0">
                        <div className=''>
                            <img className='w-100' src='images/homeBandPic.jpg' alt='Take Cover Band'></img>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function Item(props) {
    return (
        <Paper >
            <div className='text-center text-white bg-dark'>
                
                <p>{props.item.review}</p>

                <h2>{props.item.name}</h2>
                <p>{props.item.company}</p>
                <br></br>
            </div>
        </Paper>
    )
}

export default Reviews