const sql = require('mssql');
const poolPromise = require('../database/dbpool');

class ApiController {
  async getApis(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('page', sql.Int, req.query.page)
        .input('resultsPerPage', sql.Int, req.query.resultsPerPage)
        .input('inputSearchQuery', sql.VarChar, req.query.searchQuery)
        .input('inputAvailabilityFilter', sql.Int, req.query.availabilityFilter)
        .input('inputSecurityFilter', sql.Int, req.query.securityFilter)
        .query(
          'EXEC getApis @page, @resultsPerPage, @inputSearchQuery, @inputAvailabilityFilter, @inputSecurityFilter;'
        );
      const resultset = {
        pages: result.recordsets[0][0]['pages'],
        apis: result.recordsets[1],
      };
      res.json(resultset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async getFullApiDetails(req, res) {
    try {
      if (req.params.id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input('inputId', sql.Int, req.params.id)
          .query('EXEC getFullApiDetails @inputId');
        res.json(
          JSON.parse(
            result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']
          )[0]
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
  async getApiDetails(req, res) {
    try {
      if (req.params.id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input('inputId', sql.Int, req.params.id)
          .query('EXEC getApiDetails @inputId');
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
  async addApi(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('inputJsonStr', sql.NVarChar, JSON.stringify(req.body))
        .query('EXEC addApi @inputJsonStr');
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async editApi(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .input('inputJsonStr', sql.NVarChar, JSON.stringify(req.body))
        .query('EXEC editApi @id, @inputJsonStr');
      res.json(result);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async deleteApi(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .query('EXEC deleteApi @id');
      res.status(200);
      res.json(result.rowsAffected[0] + ' apis successfully deleted');
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
}

const controller = new ApiController();
module.exports = controller;
