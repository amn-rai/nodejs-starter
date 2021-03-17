import mongoose from 'mongoose';
let connectMongoDB = mongoose.connect(
    'mongodb://localhost:27017/BookStore',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err: any) => {
        if (err) return console.log(err);
        console.log('MongoDB Connected!');
    }
);
export default connectMongoDB;
