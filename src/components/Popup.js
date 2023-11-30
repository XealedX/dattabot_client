import React from 'react'
import './PopupStyle.css'

function Popup(props) {
  return (props.trigger) ? (
    <div className='popup'>
        <div className='inner-popup'>
            { props.children }
        </div>
    </div>
  ) : "";
}

export default Popup