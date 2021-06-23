const mongoose = require('mongoose');

const mongoDbConnect = async () => {
  const uri = "mongodb+srv://Reservation:khaled123@cluster0.4mio9.mongodb.net/enchérTn?retryWrites=true&w=majority";
  mongoose.set('useFindAndModify', false);
  //mongoose.set('debug', true)
  try {
    return await mongoose.connect(uri, 
        { useNewUrlParser: true, 
          useCreateIndex: true, 
          useUnifiedTopology: true 
        })
  } catch(err) {
    console.error(err)
    throw err
  }
}

module.exports = mongoDbConnect