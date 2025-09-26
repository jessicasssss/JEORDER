const db = require('./database');

const userModel ={
    register:(username, email, dob, password, callback) =>{
        const sql = 'INSERT INTO msuser (username, email, date_of_birth, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [username, email, dob, password], callback)
    },

    verifyEmail: (email, callback) => {
        const sql = `UPDATE msuser SET isVerified = true WHERE email =?`;
        db.query(sql, [email], callback);
    },

    checkVerif: (email, callback) => {
        const sql =  `SELECT * FROM msuser  WHERE isVerified = true AND email = ?`;
        db.query(sql, [email], callback);
    },

    findByEmail: (email, callback) =>{
        const sql = 'SELECT * FROM msuser WHERE email =?';
        db.query(sql, [email], callback)
    },

    profile: (id, callback) => {
        const sql = `SELECT username, email, date_of_birth, role, address FROM msuser WHERE id = ?`;
        db.query(sql, [id], callback);

    },

    updateProfile: (id, updates, callback) => {
        if(Object.keys(updates).length === 0){
            return callback("No Fields to be updated!");
        }

        const field = Object.keys(updates).map(keys => `${keys} = ?`).join(", ");
        const values = Object.values(updates);
        values.push(id);

        const sql = `UPDATE msuser SET ${field} WHERE id = ?`

        db.query(sql, values, callback);
    }
}

module.exports = userModel;