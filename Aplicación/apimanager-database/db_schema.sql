DROP DATABASE IF EXISTS api_management_db;
CREATE DATABASE api_management_db;
GO

USE api_management_db;
GO

/* TABLE CREATIONS */

CREATE TABLE employee (
    id INT PRIMARY KEY IDENTITY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    is_admin BIT NOT NULL,
);
DBCC CHECKIDENT (employee, RESEED, 1);
GO

CREATE TABLE api (
    id INT PRIMARY KEY IDENTITY,
    name VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    description VARCHAR(200) NOT NULL,
    availability INT NOT NULL CHECK (availability BETWEEN 0 AND 3) DEFAULT 0,
    is_safe BIT NOT NULL DEFAULT 0,
    base_url VARCHAR(100) NOT NULL
);
DBCC CHECKIDENT (api, RESEED, 1);
GO

CREATE TABLE category (
    id INT PRIMARY KEY IDENTITY,
    api_id INT FOREIGN KEY REFERENCES api(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(100) NOT NULL
);
DBCC CHECKIDENT (category, RESEED, 1);
GO

CREATE TABLE method (
   id INT PRIMARY KEY IDENTITY,
   name VARCHAR(10) NOT NULL
);
DBCC CHECKIDENT (method, RESEED, 1);
GO

CREATE TABLE endpoint (
    id INT PRIMARY KEY IDENTITY,
    category_id INT FOREIGN KEY REFERENCES category(id) ON DELETE CASCADE NOT NULL,
    method_id INT FOREIGN KEY REFERENCES method(id) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(200) NOT NULL,
    url VARCHAR(100) NOT NULL,
    requires_auth BIT NOT NULL,
    is_available BIT NULL,
    last_tested DATETIME NULL
);
DBCC CHECKIDENT (endpoint, RESEED, 1);
GO

CREATE TABLE data_type (
  id INT PRIMARY KEY IDENTITY,
  type VARCHAR(10) NOT NULL
);
DBCC CHECKIDENT (data_type, RESEED, 1);
GO

CREATE TABLE parameter_type (
    id INT PRIMARY KEY IDENTITY,
    type VARCHAR(10) NOT NULL
);
DBCC CHECKIDENT (parameter_type, RESEED, 1);
GO

CREATE TABLE parameter (
    id INT PRIMARY KEY IDENTITY,
    endpoint_id INT FOREIGN KEY REFERENCES endpoint(id) ON DELETE CASCADE NOT NULL,
    param_type_id INT FOREIGN KEY REFERENCES parameter_type(id) NOT NULL,
    data_type_id INT FOREIGN KEY REFERENCES data_type(id) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(200) NULL,
    payload VARCHAR(max) NULL,
    is_required BIT NOT NULL
);
DBCC CHECKIDENT (parameter, RESEED, 1);
GO

CREATE TABLE response_type (
    id INT PRIMARY KEY IDENTITY,
    code INT NOT NULL,
    status VARCHAR(50) NOT NULL
);
DBCC CHECKIDENT (response_type, RESEED, 1);
GO

CREATE TABLE response (
    id INT PRIMARY KEY IDENTITY,
    endpoint_id INT FOREIGN KEY REFERENCES endpoint(id) ON DELETE CASCADE NOT NULL,
    response_type_id INT FOREIGN KEY REFERENCES response_type(id) NOT NULL,
    json_string VARCHAR(max) NULL
);
DBCC CHECKIDENT (response, RESEED, 1);
GO