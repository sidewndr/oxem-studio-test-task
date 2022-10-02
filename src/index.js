import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import './index.scss'
import {MainPage} from "./pages/main/main-page";

const Root = () => {
  return (
    <MainPage />
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Root />)