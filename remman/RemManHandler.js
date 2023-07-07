import {LZString} from "./lz-string"

/**
 * Request processing class
 */
export class RemManHandler {
  constructor(basePath, clientConfig) {
    this.basePath = basePath;
    this.clientConfig = clientConfig;
  }

  onRequest(ctx, data) {
    try {
      this.handle(ctx, data);
    } catch(e) {
      this.onError(e);
      ctx.response({
        error: String(e)
      })
    }
  }

  onError(e) {
    hmUI.showToast({text: String(e)});
  }

  onPackageLog(e) {}

  handle(ctx, data) {
    if(data === "ping") return ctx.response({data: "ok"});
    const request = JSON.parse(LZString.decompressFromBase64(data));

    const response = this[request.action](request);
    if(request.tag) response.tag = request.tag;
    ctx.response({
      data: LZString.compressToBase64(JSON.stringify(response))
    });
    this.onPackageLog(request.action);
  }

  hello() {
    return this.clientConfig;
  }

  stat(request) {
    return this._statPath(request.path);
  }

  mkdir(request) {
    this.basePath.get(request.path).mkdir();
    return {"result": "ok"};
  }

  remove(request) {
    const entry = this.basePath.get(request.path);
    entry.removeTree();
    return {"result": "ok"};
  }

  read(request) {
    const entry = this.basePath.get(request.path);
    const offset = request.offset;
    const length = request.length;

    const buffer = new ArrayBuffer(length);
    entry.open(hmFS.O_RDONLY);
    entry.seek(offset);
    entry.read(buffer, 0, length);
    entry.close();

    const view = new Uint8Array(buffer);
    let out = "";
    for(let i = 0; i < request.length; i++)
      out += view[i].toString(16).padStart(2, "0");

    return {
      data: out
    };
  }

  write(request) {
    const entry = this.basePath.get(request.path);
    const offset = request.offset;
    const data = request.data;

    const view = new Uint8Array(data.length / 2);
    for(let i = 0; i < data.length; i += 2) {
      view[i / 2] = parseInt(data[i] + data[i + 1], 16);
    }

    if(offset === 0) entry.remove();
    entry.open(hmFS.O_WRONLY | hmFS.O_CREAT);
    entry.seek(offset);
    entry.write(view.buffer, 0, view.length);
    entry.close();

    return {
      result: "true"
    }
  }

  _statPath(path, children = true) {
    if(path[0] === "/") path = path.substring(1);

    const entry = this.basePath.get(path);
    console.log(entry.absolutePath)
    const [st, e] = entry.stat();
    if(e) return {error: "notfound"};

    let name = entry.absolutePath;
    if(name.endsWith("/"))
      name = name.substring(0, name.length - 1);
    if(name.indexOf("/") > -1)
      name = name.substring(name.lastIndexOf("/") + 1);

    const output = {
      name: name,
      mode: st.mode
    };

    if(entry.isFile()) {
      output.size = st.size;
      output.mtime = st.mtime;
    } else if(children) {
      output.files = [];
      const [list, _] = entry.list();
      for(const fn of list) {
        console.log(fn);
        output.files.push(this._statPath(path + "/" + fn, false));
      }
    }

    return output;
  }
}
