import React , {Component} from 'react'
import  './style.css'
import gamepad from '../../assets/Icon-gamepad.svg'
import person from '../../assets/Icon-person.svg'

export default class Dashboard extends Component {
    constructor(props){
        super(props);
     this.state={}   
    }
    render(){
        return(
            <div style={{ display:'flex', flex:1, flexDrection:'row',margin:'20px' ,justifyContent:'space-between'}}>
                <div className='column'>
                <div className='left-section'>
                    <div className='column'>
                    <img src={person} alt='Player' width='30' height='30' />
                    <img src={gamepad} alt='Player' width='40' height='40' />
                    </div>
                    <div class='top-details column'>
                    <div>{this.props.userName}</div>
                    <div>Level:{this.props.difficultyLevel}</div>
                    </div>
                </div>
                <div className='top-details'>
                    SCOREBOARD
                </div>
                </div>
               
                <div class='middle-section'>
                    <div style={{color:'white'}}>Mid section</div>
                </div>
                <div className='right-section top-details'>
                    <div>fast fingers</div>
                    <div>SCORE:00.30</div>
                </div>

            </div>
        );
    }
}