const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const userRouter = require('./server/routes/user');




//parse request body for POST and PUT requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join( __dirname, 'client/index.html'));
})

//define route handler
app.use('/user', userRouter);

//redirect to 404.html if page does not exist
app.use((req, res) => {
    res.status(404).sendFile(path.join( __dirname, 'client/404.html'));
})

//global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`)
});


module.exports = app;

// const express = require('express');
// const path = require('path');

// const app = express();

// const PORT = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use((req, res) => {
//     res.status(404).sendFile(path.join( __dirname, 'client/404.html'));
// })


// app.listen(PORT, () => {
//     console.log(`Server listening on port: ${PORT}...`)
// });
// module.exports = app;
