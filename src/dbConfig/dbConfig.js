// import mongoose from 'mongoose';


// export default function connect(){
//     try {
//         console.log(process.env.MONGO_URL);

// mongoose.connect(process.env.MONGO_URL, () => {
//     mongoose.connection.on('connected', () => {
//         console.log('MongoDB connected successfully');
//     })
//     mongoose.connection.on('error', (err) => {
//         console.error('MongoDB connection error:', err);
//     })
// })
        
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error);
//     }
// }

import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
        
    }


}