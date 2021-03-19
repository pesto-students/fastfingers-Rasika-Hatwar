import React from 'react'
import  './profile.css'
import gamepad from '../../assets/Icon-gamepad.svg'
import person from '../../assets/Icon-person.svg'


export default function Profile ({userName , difficultyLevel}) {
    return(
            <div>
              <div className='left-section'>
              <img src={person} alt='Player' width='30' height='30' />
              <div class='profile-details' >{userName}</div>
              </div>
                <div className='left-section'>
                <img src={gamepad} alt='Player' width='30' height='30' />
                <div class='profile-details'>Level:{difficultyLevel}</div>
                </div>
            </div>
    )}