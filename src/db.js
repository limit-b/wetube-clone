import mongoose from 'mongoose';

console.log('db is here :', process.env.MONGO_DB_URL);

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});

const db = mongoose.connection;

const handleError = (error) => console.log('❌ DB Error', error);
const handleOpen = () => console.log('✅ Connected to DB');

db.on('error', handleError);
db.once('open', handleOpen);
