const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');


//////Middlewares
app.use(morgan('dev'));

app.use(express.json());


app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
req.requestTime = new Date().toISOString();
next();
});


// app.get('/', (req, res) => {
//   res.status(200).json('Hello World!');
// });

// app.post('/', (req, res) => {
//  res.send('Got a POST request');
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//////Route Handlers

const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestedAt:req.requestTime,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      mesage: 'invalid id',
    });
  }

  res.status(200).json({
    status: 'success',

    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      mesage: 'invalid id',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      mesage: 'invalid id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

const getAllUsers =(req,res)=>{
  res.status(500).json({
    status:'error',
    message:'This route is not yet defined'
  })
}
const getUser =(req,res)=>{
  res.status(500).json({
    status:'error',
    message:'This route is not yet defined'
  })
}
const createUser =(req,res)=>{
  res.status(500).json({
    status:'error',
    message:'This route is not yet defined'
  })
}
const updateUser =(req,res)=>{
  res.status(500).json({
    status:'error',
    message:'This route is not yet defined'
  })
}
const deleteUser =(req,res)=>{
  res.status(500).json({
    status:'error',
    message:'This route is not yet defined'
  })
}
//app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.patch('/api/v1/tours/:id', updateTour);


/////Routes
app.route('/api/v1/tours')
.get(getAllTours)
.post(createTour);

app.route('/api/v1/tours/:id')
.delete(deleteTour)
.patch(updateTour)
.get(getTour);


app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);
app.route('/api/v1/users').get(getAllUsers).post(createUser);


////Start Server

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
