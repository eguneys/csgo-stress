import User from './user';
import { Emit } from 'rhx';

export default class PoolUser {

  user: User

  _send: Emit = () => {}
  
  constructor() {
  
    this.user = new User('http://localhost:3000',
                         send => this._send = send,
                         this.receive);
  }

  connect() {
    setInterval(() => {
      this._send('null');
    }, 1000)
    
    return this.user
      .auth()
      .then(() => this.user.wsconnect('/matchmaker/csgo/socket/v5'));
  }

  send(t: string, d: any) {
    this._send(JSON.stringify({t, d}))
  }

  receive = (receive: string) => {
    if (receive !== '0') {
      console.log(receive);
    }
  }

  poolIn() {
    this.send('poolIn', { id: 'single' });
  }

    
  
}
