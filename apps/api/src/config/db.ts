import * as mongoose from "mongoose"
import colors from 'colors';

// activate colors/cmd foreground
colors.enable();

// connect to mongodb
const connectDb = async ()=>{
    
    const mongodb = await mongoose.connect(`${process.env.MONGO_URI}post_db` || "");
    const host = mongodb.connection.host;
    const port = mongodb.connection.port;
    const dbname = mongodb.connection.db?.databaseName;

 console.log(`Mongodb connected : http://${host}:${port}/${dbname}`.magenta.bold);
   
}

export {connectDb}