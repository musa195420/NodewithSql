const {createLogger,transports,format} = require('winston');
require('winston-mongodb');
const logger = createLogger(
    {
        transports:[
            new transports.File(
                {
                    filename:"info.log",
                    level:'info',
                    format:format.combine(format.timestamp(),format.json())
                }
            ),

            new transports.MongoDB({
                level:"error",
                db:process.env.MONGODB_URL,
                collection:"MongoDB Errors",
                format:format.combine(format.timestamp(),format.json())
            })
        ]
    }

    
)
console.log("MONGODB_URL:", process.env.MONGODB_URL);
module.exports=logger;