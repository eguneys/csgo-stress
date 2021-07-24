import { Xhr, Websocket, Emit } from 'rhx';

export default class User {

  xhr: Xhr
  ws: Websocket

  sri: string = Math.random().toString(36).slice(2, 12);
  
  headers: any = {}

  constructor(baseUrl: string,
              setSend: (_: Emit) => void,
              receive: Emit) {

    this.xhr = new Xhr(baseUrl);

    this.ws = new Websocket({
      baseUrl,
      setSend,
      receive
    });
  }

  auth() {
    return this.xhr.headers('/auth/guest').then(headers => {
      let cookies = headers['set-cookie'] || [];

      this.headers['cookie'] =
        cookies.map(cookie =>
          cookie.split(';')[0]).join('; ');
    });
  }

  wsconnect(endpoint: string) {
    console.log(this.sri);
    return this.ws.connect(endpoint + '?sri=' + this.sri, this.headers)
  }  
}
