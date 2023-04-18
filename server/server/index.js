import 'reflect-metadata';
import config from './config/index.js';

import express from 'express';
import Logger from './loaders/logger.js';

import loader from './loaders/index.js';
function print (path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split (thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}
async function startServer() {
  const app = express();
  app.get('/', function(req, res){
      res.send("vSamurai service is running...");
  })
  await loader({ app })


  app.listen(config.port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
  // Logger.info(app._router.stack.map(r=>r.route)
  // .filter(r=>r).map(r=>`${Object.keys(r.methods).join('\n')} ${r.path}`)
  // );
  app._router.stack.forEach(print.bind(null, []));
    Logger.info(`
      ################################################
      ⚛️  Server listening on port: ${config.port}    ⚛️
      ################################################
    `);
  });
}

startServer();
