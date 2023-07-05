export class RemManSideService {
  constructor(messageBuilder, server="https://zepp.mmk.pw/zf") {
    this.state = "closed";
    this.server = server;
    this.counter = 0;
    this.messageBuilder = messageBuilder;
    this.startCheckServerLoop();
  }

  onRequest(ctx, request) {
    if(request.package != "remman") return;

    switch(request.action) {
      case "init":
        return this.init(ctx);
    }
  }

  async init(ctx) {
    const res = await fetch({
      url: `${this.server}/device`,
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uuid: settings.settingsStorage.getItem("remman_uuid")
      })
    });
    const data = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;

    this.uuid = data.uuid;
    this.code = data.code;
    settings.settingsStorage.setItem("remman_uuid", this.uuid);

    console.log("Ready to accept requests");
    this.state = "ready";
    ctx.response({
      data
    });
  }

  async performCheckServer() {
    if(this.state != "ready") throw new ValueError("nodevice");

    console.log("PING'ing device app...");
    await this.messageBuilder.request("ping");
    console.log("App ready, waiting for request from server...");

    const res = await fetch(`${this.server}/device/${this.uuid}/request`);
    if(res.status == 404) {
      console.log("Drop UUID: server removed!");
      this.state = "closed";
      return;
    }

    const data = typeof res.body === 'string' ?  JSON.parse(res.body) : res.body
    if(data.status == "ready") 
      return;

    console.log(`Handle task ${data.data}`);
    const output = await this.messageBuilder.request(data.data);
    fetch({
      url: `${this.server}/device/${this.uuid}/response`,
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: output
    });
  }

  startCheckServerLoop() {
    const ctx = this;
    this.performCheckServer().then(() => {
      ctx.startCheckServerLoop();
    }).catch((e) => {
      console.log("ERROR", e);
      setTimeout(() => {
        ctx.startCheckServerLoop();
      }, 2000);
    })
  }
}