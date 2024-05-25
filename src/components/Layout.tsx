 import React, {ReactNode}from 'react'

function Layout({children}:{children:ReactNode}) {
  return (
    <div className='max- ms-auto me-auto '>
        {children}
    </div>
  )
}

export default Layout