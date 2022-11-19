// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

const schemas = require('./schemas');
const { middleware, mware2 } = require('./middleware');

const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>';
  responseText += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responseText);
});

const createBlog = function (req, res) {
  console.log('/update');

  res.json(req.body);
};

app.post('/blog', middleware(schemas.blogPOST, 'body'), createBlog);

app.get(
  '/products',
  middleware(schemas.blogLIST, 'query'),
  //the next() middleware execution
  function (req, res) {
    console.log('/products');
    const { page, pageSize } = req.query;

    res.json({ page, pageSize });
  }
);

app.get(
  '/products/:id',
  middleware(schemas.blogDETAIL, 'params'),
  function (req, res) {
    console.log('/products/:id');
    const { id } = req.params;
    res.json(req.params);
  }
);

// query params
app.get(
  '/phone',
  mware2(schemas.pList, 'query'),

  function (req, res) {
    const { qty } = req.query;
    const data = [
      {
        name: 'Gionee',
        qty: 2,
      },
      { qty: 22, name: 'Iphone 14pro max' },
    ];
    const product = data.find((elem) => elem.qty === +qty);
    res.json(product ? product : 'Not found');
  }
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
