import React from 'react'
import BandMember from '../../data/bandmembers.json'

const BandMembers = () => {
    return (
        BandMember && BandMember.map(bandmember => {
            return (
                <div className='border border-secondary rounded border-5 m-3 p-4 text-white' style={{ width: '450px' }} key={bandmember.id}>
                    <h3>{bandmember.name}</h3>
                    <img className='w-75 h-25 my-2 rounded' alt={bandmember.alt} src={bandmember.img}></img>
                    <h5>{bandmember.instrument}</h5>
                    <div>{bandmember.bio}</div>
                </div>

            )
        })
    )
}

export default BandMembers