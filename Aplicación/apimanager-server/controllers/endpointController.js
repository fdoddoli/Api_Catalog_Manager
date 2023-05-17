const sql = require('mssql');
const poolPromise = require('../database/dbpool');

class EndpointController {
  async getEndpointDetails(req, res) {
    try {
      if (req.params.id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input('inputId', sql.Int, req.params.id)
          .query('EXEC getEndpointDetails @id = @inputId');
        res.json(
          JSON.parse(
            result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']
          )
        );
      } else {
        res.status(400);
        res.send('Missing data');
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async testEndpoint(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .input('result', sql.Int, req.body.result)
        .query('EXEC testEndpoint @id, @result');
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
}

const controller = new EndpointController();
module.exports = controller;
