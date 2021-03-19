import React , {Component} from 'react'
import  './style.css'
import keyboard from '../../assets/keyboard.svg'
import playbutton from '../../assets/Icon-play.svg'
import Dashboard from '../dashboard/Dashboard'

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
         userName : '',
         difficultyLevel:'EASY',
         startGame : false,
         errorMessage: ''
        };
      }

      
      handleUserName = (e) => {
        const { target: { value } = {} } = e;
        this.setState({ userName: value });
        console.log("player name", this.state.userName);
      };
      handleChange = (e) => {
        const {
          target: { name, value }
        } = e;
        console.log({ name, value });
        this.setState({ [name]: value });
    }
    showDashboard = () => {
        if(this.state.userName){
        this.setState({ startGame: true });
        }
        else{
            this.setState({errorMessage:'Please enter user name'})
        }
    }
     
    render() {
        const {  userName, difficultyLevel,startGame,errorMessage} = this.state;
        return(
            <div style={{ display: 'flex', flex:1}}>
             {!startGame &&<div className ='login-container'> 
                <img src={keyboard} alt='KeyBoard' width='235px' height='137px' />
                <div className='app-title'> fast fingers</div>
                <div className='subTitle'>
                    <div className='line'></div>
                    <div className='subtitle-text'>the ultimate typing game</div>
                    <div className='line'></div>
                </div>
                <input className='name-input' type='text' name='userName'  placeholder='type your name' onChange={this.handleUserName}></input>
                <select className='select-input' name= 'difficultyLevel'  onChange = {this.handle}>
                    <option  value='EASY'> EASY</option>
                    <option value='MEDIUM'>MEDIUM</option>
                    <option value='HARD'>HARD</option>
                </select>
                 {(!userName && errorMessage)&& <div class='subtitle-text'>{errorMessage}</div>}
                <div className='start-game subTitle' onClick={this.showDashboard }>
                <img src={playbutton} alt='Start'/>
                <h3 className='subtitle-text'>START GAME</h3>
                </div>
            </div>}
            {startGame && <Dashboard userName={userName} difficultyLevel={difficultyLevel}/>}
            </div>
        );
    }
}