import express    from 'express';
import { Invoice } from '../models';

const invoices = express();

invoices.get('/', (req, res, next) => {
  Invoice.find().then(invoices => {
    const items = invoices.map( i => i.toJSON() );
    if (req.xhr) return res.status(200).json(items);
    res.locals.state.invoices = { items, invoice: { items: [] } };
    next();
  }).catch(err => {
    console.trace(err);
    res.status(422).json({ error: err.toString() });
  })
});

invoices.post('/new', (req, res, next) => {
  let invoice = new Invoice(req.body);
  invoice.save().then( invoice => {
    console.log(invoice);
    res.status(201).json({ invoice });
  }).catch( err => {
    console.trace(err);
    res.status(422).json({ error: err.toString() });
  });

})

export default invoices;
