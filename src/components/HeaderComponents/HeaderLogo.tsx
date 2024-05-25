'use client'
import React from 'react'
import * as logo from '../../../public/assets/HeaderLogo.json'
import Lottie from 'lottie-react'
function HeaderLogo() {




    return (
        <>
            <span><Lottie style={{width:'80px'}} animationData={logo} loop={true} /></span>
        </>
    );


}

export default HeaderLogo