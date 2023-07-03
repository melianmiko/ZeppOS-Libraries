export class RemManSideService {
  constructor(messageBuilder, server="https://zepp.mmk.pw") {
    this.state = "closed";
    this.server = server;
    this.counter = 0;
    this.messageBuilder = messageBuilder;
    this.startCheckServerLoop();
  }

  onRequest(ctx, request) {
    if(!request.remManSetState && !request.remManPing) return;
    this.counter = 0;

    if(request.remManSetState == "ready") {
      console.log(`================ ${request.remManSetState} ===================`);
      this.init(ctx);
    } else if(request.remManSetState) {
      this.state = request.remManSetState;
      ctx.response({
        data: []
      });
    }
  }

  async init(ctx) {
    const res = await fetch({
      url: `${this.server}/device`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: "{}"
    });
    const data = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;

    this.uuid = data.uuid;
    this.code = data.code;

    console.log("Ready to accept requests");
    this.state = "ready";
    this.counter = 0;
    ctx.response({
      data: {"code": this.code}
    });
  }

  async performCheckServer() {
    if(this.state != "ready" || this.counter > 10) return;

    const res = await fetch(`${this.server}/device/${this.uuid}/zepp_status`);
    this.counter++;

    if(res.status == 404) {
      console.log("Drop UUID: server removed!");
      this.uuid = null;
      return;
    }
    const data = typeof res.body === 'string' ?  JSON.parse(res.body) : res.body
    if(data.status == "ready") 
      return;

    console.log(`Handle task ${data.request}`);
    const output = await this.messageBuilder.request(data.request);
    fetch({
      url: `${this.server}/device/${this.uuid}/zepp_respond`,
      method: "POST",
      body: output
    });
  }

  startCheckServerLoop() {
    const ctx = this;
    this.performCheckServer().then(() => {
      setTimeout(() => {
        ctx.startCheckServerLoop();
      }, 2000);
    }).catch((e) => {
      setTimeout(() => {
        ctx.startCheckServerLoop();
      }, 2000);
    })
  }
}