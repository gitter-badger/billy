import express    from 'express'
import { Config } from '../models';

const config = express();

config.get('/', (req, res, next) => {
  Config.getAll().then(configModel => {
    if (req.xhr) return res.status(200).json(configModel);
    res.locals.state.config = configModel;
    next();
  }).catch(err => {
    console.trace(err.stack);
    res.status(422).json({ error: err.toString() })
  });
});

config.post('/', (req, res, next) => {
  Promise.all(req.body.configs.map(config => Config.set(config.key, config.value))).then(() => {
    res.status(200).json({});
  }).catch(err => {
    console.trace(err.stack);
    res.status(422).json({ error: err.toString() })
  });
});

export default config;
