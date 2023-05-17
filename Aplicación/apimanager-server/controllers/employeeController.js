const sql = require('mssql');
const poolPromise = require('../database/dbpool');

class EmployeeController {
  async validateEmployee(req, res) {
    const notAuthenticated = [
      {
        status: 'user-not-authenticated',
      },
    ];

    try {
      if (req.query.email != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input('email', sql.VarChar, req.query.email)
          .query('select * from userVerification(@email)');
        if (result.recordset.length === 0) {
          res.json(notAuthenticated);
        } else {
          res.json(result.recordset);
        }
      } else {
        res.status(400);
        res.send('Missing data');
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async getEmployees(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .query('SELECT * FROM employee ORDER BY is_admin DESC, name');
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async updateEmployee(req, res) {
    try {
      const pool = await poolPromise;
      const auxReq = pool.request();
      let queryBegin = 'UPDATE employee SET is_admin = CASE ';
      let queryEnd = 'END WHERE id IN (';
      const updatesArr = req.body.updates;
      updatesArr.forEach((update, i) => {
        auxReq.input(`id${i}`, sql.Int, update.id);
        auxReq.input(`is_admin${i}`, sql.Bit, update.is_admin);
        queryBegin += `WHEN id = @id${i} THEN @is_admin${i} `;
        queryEnd += updatesArr.length - 1 == i ? `@id${i})` : `@id${i}, `;
      });
      const result = await auxReq.query(queryBegin + queryEnd);
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
}

const controller = new EmployeeController();
module.exports = controller;
