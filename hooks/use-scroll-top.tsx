import React, { useState, useEffect } from 'react'

function useScrollTop(threshold = 10) {
    const [scrolled, setScrolled] = useState(false)


    useEffect(() => {

        const handleScroll = () => {
            if (window.screenY > threshold) {
                console.log("first")
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [threshold])


    return scrolled
}

export default useScrollTop