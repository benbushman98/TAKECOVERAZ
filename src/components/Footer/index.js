import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className=''>
            <div className='text-center p-4 text-white'>© {currentYear} Take Cover. All rights reserved.</div>
        </div>
    )
}

export default Footer