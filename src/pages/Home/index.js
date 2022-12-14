import React from 'react';
import BandFacts from "../../components/BandFacts/index"
import Reviews from "../../components/Reviews/index"
import Service from "../../components/Service/index"
import PictureGallery  from "../../components/PictureGallery/index"


function Home() {
    const style = {
        banner: {
            backgroundImage: `url("https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
            height: "600px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative"
        },
        bottom: {
            position: "absolute",
            bottom: "5px",
            width: "99%"
        }
    }
    return (
        <>
            <div style={style.banner} className="p-1">
                <div style={style.bottom} className='text-white text-center m-0'>
                    <h3>Playing the best of the 60's, 70's, 80's, 90's & beyond!</h3>
                    <h3>We will, we will rock you!</h3>
                </div>
            </div>
            <div className='bg-black'>
                <BandFacts />
            </div>
            <div className='bg-dark'>
                <Reviews  />
            </div>
            <div className='bg-dark'>
                <Service />
            </div>
            <div className='bg-black'>
                <PictureGallery />
            </div>
        </>
    )
}

export default Home