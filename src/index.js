import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import './index.scss'

const Root = () => {
  return (
    <>Hello world!</>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Root />)