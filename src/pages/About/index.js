import React from 'react'
import BandMembers from '../../components/BandMembers/index.js'
import Social from '../../components/Social/index'

function About() {
  return (
    <div className='mt-5 pt-5'>
      <div className="container mb-5">
        <div className="row">
          <div className="col">
          </div>
          <div className="col-12 text-center">
            <div className='p-4 text-center '>
              <h2 className='text-uppercase text-secondary text-decoration-underline'>Band Bio</h2>
              <img src='/images/theBands.png' alt='the band' className='rounded-pill w-75 my-3'></img>
              <h3 className='text-secondary text-uppercase mt-5'>Take Cover</h3>
              <p className='text-white fs-5'>If you are planning a special event or private party and want a great
                entertainment option &quot;Take Cover!&quot; is the right choice. As seasoned
                professionals, we have the talent to deliver a fantastic performance that will
                keep your guests dancing and wanting more! Our extensive playlist
                includes hits from the 60`s, 70`s, 80`s, 90`s, and beyond!
                &quot;Take Cover!&quot; performs hits from generations past to the present from the
                very best rock n roll bands including The Beatles, Rolling Stones, Stevie
                Wonder, Aerosmith, Rod Stewart, Cheap Trick, ZZ Top, Tom Petty, AC/DC,
                U2, Tears for Fears, Simple Minds, The Cars, Billy Idol, Bon Jovi, Spin
                Doctors, R.E.M., The Killers, Weezer, Neon Trees, Maroon 5, Sublime,
                Queen and so much more!
                Finding the right musical entertainment can be a challenge, so why not hire
                &quot;Take Cover!&quot; and leave the music to us! Check out our live video for music
                samples or see us in person to get the real feel of the band in action.</p>
            </div>
          </div>
          <div className="col">
          </div>
        </div>
      </div>
      <div className="mt-5 ">
        <div className="row">
        </div>
        <div className=" text-center">
          <div className='p-4 text-center d-flex-wrap justify-content-center'>
            <h1 className='text-uppercase text-secondary text-decoration-underline'>Member Bio</h1>
            <div className="d-flex flex-wrap justify-content-center">
              <BandMembers />
            </div>
          </div>
        </div>
      </div>

      <Social />
    </div>
  )
}

export default About