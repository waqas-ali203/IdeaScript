'use client'
import Lottie from 'lottie-react'
import React from 'react'
import * as logo from '../../../../public/assets/NotesHero.json'
export default function NotesHeroAnimation() {
  return (
    <div>

        <Lottie animationData={logo} />

    </div>
  )
}
