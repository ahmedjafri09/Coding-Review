import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="mailto:dummy@email.com" target="_blank" rel="noopener noreferrer">
          App Owner
        </a>
        <span className="ms-1">&copy; 2023</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Made by</span>
        <a href="mailto:ahmed.jafri09@gmail.com" target="_blank" rel="noopener noreferrer">
          Ahmed
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
