const { exec, spawn } = require('child_process');

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(router.middleware());

router.get('/', async (ctx) => {
  ctx.body = 'OK';
});

router.post('/copy', async (ctx) => {
  console.log([ctx.request.rawBody]);

  const clipExe = spawn('clip.exe ', []);
  clipExe.stdin.write(ctx.request.rawBody);
  clipExe.stdin.end();
});

router.get('/paste', async (ctx) => {
  ctx.body = exec('powershell.exe -C Get-Clipboard').stdout;
});


app.listen(process.argv[2] ? process.argv[2] : 80);