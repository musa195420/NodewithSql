const pool = require("../../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `insert into registration (firstnName, lastName, gender, email, password, number)
            values(?,?,?,?,?,?) `,
            [
                data.firstnName,  // Ensure this matches the request body field
                data.lastName,    // Ensure this matches the request body field
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
    }
};
