import React  , {useState}from 'react'
import  './style.css'
import Profile from '../profile/Profile'
import Timer from '../timer/Timer'
import {EASY_ARRAY} from '../../data/utils'
import {MEDIUM_ARRAY}from '../../data/utils'
import {HARD_ARRAY} from '../../data/utils'

export default function Dashboard ({userName , difficultyLevel}) {
    const [level,setLevel] =useState(difficultyLevel)
    const [item,setItem] = useState(EASY_ARRAY[Math.floor(Math.random() * EASY_ARRAY.length)])
    const [factor,setFactor] = useState(1)
   
    const itemShow = () => {
        if(level === 'EASY')  {
            setItem(EASY_ARRAY[Math.floor(Math.random() * EASY_ARRAY.length)]);
            setFactor(1.5)
        }
         else if(level === 'MEDIUM'){
            setItem(MEDIUM_ARRAY[Math.floor(Math.random() * EASY_ARRAY.length)]);
            setFactor(1.5)
        }
        else {
            setItem(HARD_ARRAY[Math.floor(Math.random() * EASY_ARRAY.length)]);
            setFactor(2)
        } 
      
     }
     const incrementFactor = ()=>{
        setFactor(prevState => prevState + 0.01);
     }
        const checkUserInput = (e)=>{
            console.log(e.target.value)
            if(e.target.value === item){
                itemShow()
                e.target.value = ''
                incrementFactor()
            }
        }
        return(
            <div style={{ display:'flex', flex:1, flexDrection:'row',margin:'10px', padding:'10px',
            justifyContent:'space-between'}}>
                <div className='column'>
                    <Profile userName={userName} difficultyLevel={difficultyLevel}/>
                    <h3 className='top-details'>SCOREBOARD</h3>
                    <h3 className='top-details'>QUIT GAME</h3>
                </div>
                
                <div class='middle-section column'>
                    <div class='random-word'>{item}</div>
                    <Timer wordItem={item} difficultyFactor={factor}/>
                    <input className='word-input' type='text' name='userInput' onChange ={checkUserInput} ></input>
                    </div>
                <div className='right-section top-details column'>
                    <div>fast fingers</div>
                    <div>SCORE:00.30</div>
                </div>


            </div>
        );
    
}