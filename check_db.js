const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/plachub2';

console.log('Connecting to:', uri);

mongoose.connect(uri).then(async () => {
    console.log('Connected!');

    // List all databases
    const admin = new mongoose.mongo.Admin(mongoose.connection.db);
    const dbs = await admin.listDatabases();
    console.log('Databases:', dbs.databases.map(db => db.name));

    // Check current DB Stats
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections in ' + mongoose.connection.db.databaseName + ':', collections.map(c => c.name));

    // Check Students count
    const count = await mongoose.connection.db.collection('students').countDocuments();
    console.log('Documents in students collection:', count);

    // Fetch one student
    const student = await mongoose.connection.db.collection('students').findOne({});
    console.log('Sample Student:', student ? student.email : 'None');

    process.exit();
}).catch(err => {
    console.error('Connection Error:', err);
    process.exit(1);
});
