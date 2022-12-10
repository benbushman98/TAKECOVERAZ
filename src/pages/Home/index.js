import React from 'react'



function Home() {
    const style = {
        banner: {
            backgroundImage: `url("https://images.pexels.com/photos/2078076/pexels-photo-2078076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
            height: "600px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }
    }
    return (
        <>
            <div style={style.banner} className="p-5">
                <div>
                    <h1>Welcome to the site</h1>
                    <h5>Sign up for free today</h5>
                </div>
            </div>
        </>
    )
}

export default Home