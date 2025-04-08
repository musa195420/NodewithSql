const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO registration (firstName, lastName, gender, email, password, number)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number,
                
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    createImgUser: (data, callBack) => {
        pool.query(
            `INSERT INTO registration (firstName, lastName, gender, email, password, number, image)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.image, // Make sure your table has an "image" column
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsers: callBack=>{
        pool.query(
            `select id,firstName,lastName,gender,email,number from registration`,
            [],
            (error,results,fields)=>{
                if(error)
                {
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    getUserByUserId:(id,callBack) =>{
        pool.query(
            `select id,firstName,lastName,gender,email,number from registration where id= ?`,
            [id],
            (error,results,fields)=>{
                if(error)
                {
                    return callBack(error);
                }
                return callBack(null,results[0]);
            }
        )
    },

    updateUser: (data, callBack) => {
        let fields = [];
        let values = [];
    
        if (data.firstName) {
            fields.push("firstName = ?");
            values.push(data.firstName);
        }
        if (data.lastName) {
            fields.push("lastName = ?");
            values.push(data.lastName);
        }
        if (data.gender) {
            fields.push("gender = ?");
            values.push(data.gender);
        }
        if (data.email) {
            fields.push("email = ?");
            values.push(data.email);
        }
        if (data.password) {
            fields.push("password = ?");
            values.push(data.password);
        }
        if (data.number) {
            fields.push("number = ?");
            values.push(data.number);
        }
    
        if (!data.id) {
            return callBack(new Error("User ID is required"));
        }
    
        values.push(data.id);
    
        const sql = `UPDATE registration SET ${fields.join(", ")} WHERE id = ?`;
    
        pool.query(sql, values, (error, results) => {
            if (error) {
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    

    deleteUser :(data,callBack)=>
        {
          pool.query(
            `delete from registration where id = ?`,
            [data.id],
            (error,results,fields)=>
            {
                if(error)
                {
                    callBack(error);
                }
                return callBack(null,results[0]);
            }
          );
        },

        getUserByUserEmail:(email,callBack) =>{
            pool.query(
                `select * from registration where email= ?`,
                [email],
                (error,results,fields)=>{
                    if(error)
                    {
                        return callBack(error);
                    }
                    return callBack(null,results[0]);
                }
            )
        },
};
