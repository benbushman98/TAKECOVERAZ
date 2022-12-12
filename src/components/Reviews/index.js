import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

function Reviews(props)
{
    var items = [
        {
            name: "Random Name #1",
            review: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            review: "Hello World!"
        },{
            name: "Random Name #3",
            review: "Testing this out!"
        }
    ]

    return (
        <Carousel className=''>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.review}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

export default Reviews