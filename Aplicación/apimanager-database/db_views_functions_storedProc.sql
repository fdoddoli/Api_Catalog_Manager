/* VIEWS */

-- API Summary
CREATE VIEW summarizedApi AS
    SELECT a.id, a.name, a.availability, a.is_safe, author, a.description, aa.last_tested
    FROM api a
    LEFT JOIN (SELECT a.id AS id, CONVERT(VARCHAR, MAX(e.last_tested), 22) AS last_tested
                FROM api a
                JOIN category c
                    ON a.id = c.api_id
                JOIN endpoint e
                    ON c.id = e.category_id
                GROUP BY a.id) aa
        ON a.id = aa.id;
GO

/* FUNCTIONS */

-- Validate User
CREATE FUNCTION userVerification(@userEmail VARCHAR(100))
RETURNS TABLE
AS
RETURN
    SELECT status = 
    CASE
        WHEN is_admin = 0 THEN 'developer'
        WHEN is_admin = 1 THEN 'admin'
    END
    FROM employee
    WHERE email = @userEmail;
GO

-- Count Endpoints
CREATE FUNCTION countEndpoints
(
    @id INT,
    @availabilityStatus BIT = NULL
)
RETURNS INT
AS
BEGIN
    DECLARE @value INT;
    
    SELECT @value = COUNT(*)
    FROM api a, category c, endpoint e
    WHERE a.id = @id
    AND c.api_id = a.id
    AND e.category_id = c.id
    AND (@availabilityStatus IS NULL AND e.is_available IS NOT NULL OR e.is_available = @availabilityStatus);

    RETURN @value;
END
GO

/* STORED PROCEDURES */

-- Get Total Pages
CREATE PROCEDURE getTotalPages @rowCount INT, @resultsPerPage INT
AS
    SELECT pages = CASE
        WHEN @rowCount%@resultsPerPage > 0 THEN @rowCount/@resultsPerPage+1
        ELSE @rowCount/@resultsPerPage
    END;
GO

-- Get APIs
CREATE PROCEDURE getApis
    @pageNumber INT = 1,
    @resultsPerPage INT,
    @searchQuery VARCHAR(300) = NULL,
    @availabilityFilter INT = NULL,
    @securityFilter BIT = NULL
AS
    DECLARE @results TABLE(id INT, name VARCHAR(100), availability INT, is_safe BIT, author VARCHAR(100), description VARCHAR(200), last_tested VARCHAR(20));
    DECLARE @rowCount INT;
    
    INSERT INTO @results
    SELECT * FROM summarizedApi
    WHERE (@searchQuery IS NULL OR name LIKE '%' + @searchQuery + '%' OR author LIKE '%' + @searchQuery + '%' OR description LIKE '%' + @searchQuery + '%')
    AND (@availabilityFilter IS NULL OR availability = @availabilityFilter)
    AND (@securityFilter IS NULL OR is_safe = @securityFilter);
    SET @rowCount = @@ROWCOUNT;

    EXEC getTotalPages @rowCount, @resultsPerPage;

    SELECT * FROM @results
    ORDER BY name
    OFFSET ((@pageNumber-1)*@resultsPerPage) ROWS
    FETCH NEXT @resultsPerPage ROWS ONLY;
GO

-- Get Full API Details
CREATE PROCEDURE getFullApiDetails @id INT
AS
    SELECT detailedApi.[name] AS name,
    detailedApi.[author] AS author,
    detailedApi.[description] AS description,
    detailedApi.[base_url] AS base_url,
        (SELECT category.[name] AS name,
                (SELECT endpoint.[method_id] AS method,
                    endpoint.[name] AS name,
                    endpoint.[description] AS description,
                    endpoint.[url] AS url,
                    endpoint.[requires_auth] AS requires_auth,
                    (SELECT ISNULL((SELECT parameter.[data_type_id] AS data_type,
                            parameter.[name] AS name, description = CASE WHEN parameter.[description] IS NOT NULL THEN parameter.[description] ELSE '' END,
                            parameter.[is_required] AS required
                    FROM parameter WHERE parameter.[endpoint_id] = endpoint.[id] AND parameter.param_type_id = 1 ORDER BY parameter.[name] FOR JSON PATH), '[]')) AS queryParameters,
                    (SELECT ISNULL((SELECT parameter.[data_type_id] AS data_type,
                            parameter.[name] AS name, description = CASE WHEN parameter.[description] IS NOT NULL THEN parameter.[description] ELSE '' END,
                            payload = CASE WHEN parameter.[payload] IS NOT NULL THEN parameter.[payload] ELSE '' END,
                            parameter.[is_required] AS required
                    FROM parameter WHERE parameter.[endpoint_id] = endpoint.[id] AND parameter.param_type_id = 2 ORDER BY parameter.[name] FOR JSON PATH), '[]')) AS bodyParameters,
                    (SELECT ISNULL((SELECT parameter.[data_type_id] AS data_type,
                            parameter.[name] AS name, description = CASE WHEN parameter.[description] IS NOT NULL THEN parameter.[description] ELSE '' END,
                            parameter.[is_required] AS required	
                    FROM parameter WHERE parameter.[endpoint_id] = endpoint.[id] AND parameter.param_type_id = 3 ORDER BY parameter.[name] FOR JSON PATH), '[]')) AS pathParameters,
                    (SELECT ISNULL((SELECT parameter.[data_type_id] AS data_type,
                            parameter.[name] AS name, description = CASE WHEN parameter.[description] IS NOT NULL THEN parameter.[description] ELSE '' END,
                            parameter.[is_required] AS required
                    FROM parameter WHERE parameter.[endpoint_id] = endpoint.[id] AND parameter.param_type_id = 4 ORDER BY parameter.[name] FOR JSON PATH), '[]')) AS headerParameters,						
                        (SELECT response.response_type_id AS type,
                        content = CASE
                            WHEN response.[json_string] IS NULL
                            THEN (SELECT response_type.[status]
                                    FROM response_type WHERE response.[response_type_id] = response_type.[id])
                            ELSE response.[json_string]
                        END
                        FROM response WHERE endpoint.[id] = response.[endpoint_id] FOR JSON PATH) AS responses
                FROM endpoint WHERE endpoint.[category_id] = category.[id] ORDER BY endpoint.[method_id], endpoint.[url], endpoint.[name] FOR JSON PATH) AS endpoints
        FROM category WHERE category.[api_id] = detailedApi.[id] ORDER BY category.[name] FOR JSON PATH) AS categories
    FROM api detailedApi WHERE detailedApi.[id] = @id FOR JSON PATH;
GO

-- Get API Details
CREATE PROCEDURE getApiDetails @id INT
AS
    SELECT detailedApi.[name] AS name,
	detailedApi.[description] AS description,
	detailedApi.[base_url] AS base_url,
	    (SELECT category.[name] AS name,
			(SELECT endpoint.[id],
					(SELECT method.[name]
					FROM method WHERE endpoint.[method_id] = method.[id]) AS method,
					endpoint.[url] AS label,
					endpoint.[name] AS name,  
                    is_available = CASE WHEN endpoint.[is_available] = 0 THEN 0 WHEN endpoint.[is_available] = 1 THEN 1 ELSE 2 END
 				FROM endpoint WHERE endpoint.[category_id] = category.[id] ORDER BY endpoint.[method_id], endpoint.[url], endpoint.[name] FOR JSON PATH) AS endpoints
		FROM category WHERE category.[api_id] = detailedApi.[id] ORDER BY category.[name] FOR JSON PATH) AS categories
    FROM api detailedApi WHERE detailedApi.[id] = @id FOR JSON PATH;
GO

-- Get Endpoint Details
CREATE PROCEDURE getEndpointDetails @id INT
AS
    SELECT (SELECT method.[name]
        FROM method WHERE endpoint.[method_id] = method.[id]) AS method,
        endpoint.[url] AS label,
        endpoint.[name] AS name,
        endpoint.[description] AS description,
        endpoint.[is_available] AS last_test_result,
        CONVERT(VARCHAR, endpoint.[last_tested], 22) AS last_test_date,
        CONCAT((SELECT a.[base_url] FROM endpoint e RIGHT JOIN category c ON e.category_id = c.id RIGHT JOIN api a ON c.api_id = a.id WHERE e.id = endpoint.id), endpoint.[url]) AS url,
        endpoint.[requires_auth] AS requires_auth,
        (SELECT (SELECT data_type.[type]
                FROM data_type WHERE parameter.[data_type_id] = data_type.[id]) AS data_type,
                parameter.[name] AS name, parameter.[description] AS description,
                parameter.[is_required] AS required
        FROM parameter WHERE parameter.[endpoint_id] = endpoint.[id] AND parameter.param_type_id = 1 ORDER BY parameter.[name] FOR JSON PATH) AS queryParameters,
        (SELECT (SELECT data_type.[type]
                FROM data_type WHERE parameter.[data_type_id] = data_type.[id]) AS data_type,
                parameter.[name] AS name, parameter.[description] AS description, parameter.[payload] AS payload,
                parameter.[is_required] AS required
        FROM parameter WHERE parameter.[endpoint_id] = endpoint.[id] AND parameter.param_type_id = 2 ORDER BY parameter.[name] FOR JSON PATH) AS bodyParameters,
        (SELECT (SELECT data_type.[type]
                FROM data_type WHERE parameter.[data_type_id] = data_type.[id]) AS data_type,
                parameter.[name] AS name, parameter.[description] AS description,
                parameter.[is_required] AS required
        FROM parameter WHERE parameter.[endpoint_id] = endpoint.[id] AND parameter.param_type_id = 3 ORDER BY parameter.[name] FOR JSON PATH) AS pathParameters,
        (SELECT (SELECT data_type.[type]
                FROM data_type WHERE parameter.[data_type_id] = data_type.[id]) AS data_type,
                parameter.[name] AS name, parameter.[description] AS description,
                parameter.[is_required] AS required
        FROM parameter WHERE parameter.[endpoint_id] = endpoint.[id] AND parameter.param_type_id = 4 ORDER BY parameter.[name] FOR JSON PATH) AS headerParameters,						
                (SELECT (SELECT code
                        FROM response_type WHERE response.[response_type_id] = response_type.[id]) AS type,
                        CASE
                            WHEN response.[json_string] IS NULL
                            THEN (SELECT response_type.[status]
                                    FROM response_type WHERE response.[response_type_id] = response_type.[id])
                            ELSE response.[json_string]
                        END AS content
                FROM response WHERE endpoint.[id] = response.[endpoint_id] FOR JSON PATH) AS responses
    FROM endpoint WHERE endpoint.[id] = @id ORDER BY endpoint.[method_id], endpoint.[url], endpoint.[name] FOR JSON PATH;
GO

-- Add API
CREATE PROCEDURE addApi @JSONSTR NVARCHAR(max)
AS
    INSERT api ([name], [author], [description], [base_url])
    SELECT [name], [author], [description], [base_url]
    FROM OPENJSON(@JSONSTR, '$')
    WITH (
        [name] VARCHAR(100),
        [author] VARCHAR(100),
        [description] VARCHAR(200),
        [base_url] VARCHAR(100)
    );

    DECLARE @apiId INT = SCOPE_IDENTITY();
    DECLARE @endpInput TABLE([category_id] INT, [endpoints] NVARCHAR(max));
    DECLARE @paramAndResponseInput TABLE([endpoint_id] INT, [queryParameters] NVARCHAR(max), [bodyParameters] NVARCHAR(max), [pathParameters] NVARCHAR(max), [headerParameters] NVARCHAR(max), [responses] NVARCHAR(max));

    MERGE category
    USING (
        SELECT [name], [endpoints]
        FROM OPENJSON(@JSONSTR, '$.categories')
        WITH (
            [name] VARCHAR(100),
            [endpoints] NVARCHAR(max) AS JSON
        )
    ) AS CATEG
    ON 1 = 0
    WHEN NOT MATCHED THEN
        INSERT([api_id], [name])
        VALUES (@apiId, CATEG.[name])
        OUTPUT INSERTED.ID, CATEG.[endpoints]
        INTO @endpInput([category_id], [endpoints]);

    MERGE endpoint
    USING (
    SELECT [category_id], ENDP.[method], ENDP.[name], ENDP.[description], ENDP.[url], ENDP.[requires_auth], ENDP.[queryParameters], ENDP.[bodyParameters], ENDP.[pathParameters], ENDP.[headerParameters], ENDP.[responses]
        FROM @endpInput CROSS APPLY (
            SELECT [method], [name], [description], [url], [requires_auth], [queryParameters], [bodyParameters], [pathParameters], [headerParameters], [responses]
            FROM OPENJSON([endpoints])
            WITH (
                [method] INT,
                [name] VARCHAR(100),
                [description] VARCHAR(200),
                [url] VARCHAR(100),
                [requires_auth] BIT,
                [queryParameters] NVARCHAR(max) AS JSON,
                [bodyParameters] NVARCHAR(max) AS JSON,
                [pathParameters] NVARCHAR(max) AS JSON,
                [headerParameters] NVARCHAR(max) AS JSON,
                [responses] NVARCHAR(max) AS JSON
            )
        ) AS ENDP
    ) AS NEWENDP
    ON 1 = 0
    WHEN NOT MATCHED THEN
        INSERT([category_id], [method_id], [name], [description], [url], [requires_auth])
        VALUES(NEWENDP.[category_id], NEWENDP.[method], NEWENDP.[name], NEWENDP.[description], NEWENDP.[url], NEWENDP.[requires_auth])
        OUTPUT INSERTED.ID, NEWENDP.[queryParameters], NEWENDP.[bodyParameters], NEWENDP.[pathParameters], NEWENDP.[headerParameters], NEWENDP.[responses]
        INTO @paramAndResponseInput([endpoint_id], [queryParameters], [bodyParameters], [pathParameters], [headerParameters], [responses]);

    INSERT parameter([endpoint_id], [param_type_id], [data_type_id], [name], [description], [payload], [is_required])
    SELECT [endpoint_id], 1, PAR.[data_type], PAR.[name], PAR.[description], PAR.[payload], PAR.[required]
    FROM @paramAndResponseInput CROSS APPLY (
        SELECT [data_type], [name], [description], [payload], [required]
        FROM OPENJSON([queryParameters])
        WITH (
            [data_type] INT,
            [name] VARCHAR(100),
            [description] VARCHAR(200),
            [payload] VARCHAR(max),
            [required] BIT
        )
    )AS PAR;

    INSERT parameter([endpoint_id], [param_type_id], [data_type_id], [name], [description], [payload], [is_required])
    SELECT [endpoint_id], 2, PAR.[data_type], PAR.[name], PAR.[description], PAR.[payload], PAR.[required]
    FROM @paramAndResponseInput CROSS APPLY (
        SELECT [data_type], [name], [description], [payload], [required]
        FROM OPENJSON([bodyParameters])
        WITH (
            [data_type] INT,
            [name] VARCHAR(100),
            [description] VARCHAR(200),
            [payload] VARCHAR(max),
            [required] BIT
        )
    )AS PAR;

    INSERT parameter([endpoint_id], [param_type_id], [data_type_id], [name], [description], [payload], [is_required])
    SELECT [endpoint_id], 3, PAR.[data_type], PAR.[name], PAR.[description], PAR.[payload], PAR.[required]
    FROM @paramAndResponseInput CROSS APPLY (
        SELECT [data_type], [name], [description], [payload], [required]
        FROM OPENJSON([pathParameters])
        WITH (
            [data_type] INT,
            [name] VARCHAR(100),
            [description] VARCHAR(200),
            [payload] VARCHAR(max),
            [required] BIT
        )
    )AS PAR;

    INSERT parameter([endpoint_id], [param_type_id], [data_type_id], [name], [description], [payload], [is_required])
    SELECT [endpoint_id], 4, PAR.[data_type], PAR.[name], PAR.[description], PAR.[payload], PAR.[required]
    FROM @paramAndResponseInput CROSS APPLY (
        SELECT [data_type], [name], [description], [payload], [required]
        FROM OPENJSON([headerParameters])
        WITH (
            [data_type] INT,
            [name] VARCHAR(100),
            [description] VARCHAR(200),
            [payload] VARCHAR(max),
            [required] BIT
        )
    )AS PAR;

    INSERT response([endpoint_id], [response_type_id], [json_string])
    SELECT [endpoint_id], RESP.[type], RESP.[content]
    FROM @paramAndResponseInput CROSS APPLY (
        SELECT [type], [content]
        FROM OPENJSON([responses])
        WITH (
            [type] INT,
            [content] VARCHAR(max)
        )
    )AS RESP;
GO

-- Delete API
CREATE PROCEDURE deleteApi @id INT
AS
    DELETE FROM api WHERE id = @id;
GO

-- Edit API
CREATE PROCEDURE editApi @id INT, @JSONSTR NVARCHAR(max)
AS
    EXEC deleteApi @id;
    EXEC addApi @JSONSTR;
GO

-- Test Endpoint
CREATE PROCEDURE testEndpoint @id INT, @result BIT
AS
    UPDATE endpoint SET is_available = @result, last_tested = DATEADD(HOUR, -5, GETDATE()) WHERE id = @id
GO

/* TRIGGERS */

-- Trigger to check http safety
CREATE TRIGGER tr_api_http_safety
ON api
AFTER INSERT
AS
BEGIN
    DECLARE @apiId INT;
    DECLARE @protocol VARCHAR(5);
    DECLARE API_CURSOR CURSOR FOR SELECT id FROM inserted;

    OPEN API_CURSOR
    FETCH NEXT FROM API_CURSOR INTO @apiId
    WHILE @@FETCH_STATUS = 0
    BEGIN
        SELECT @protocol = SUBSTRING(base_url, 1, 5) FROM inserted WHERE id = @apiId;
        IF @protocol = 'https'
            UPDATE api SET is_safe = 1 WHERE id = @apiId;

        FETCH NEXT FROM API_CURSOR INTO @apiId
    END
    CLOSE API_CURSOR;
    DEALLOCATE API_CURSOR;
END
GO

-- Trigger for endpoint test
CREATE TRIGGER tr_endpoint_test
ON endpoint
AFTER UPDATE
AS
BEGIN
    IF(UPDATE(is_available))
    BEGIN
        DECLARE @apiId INT = (SELECT a.id FROM api a, category c, inserted i WHERE i.category_id = c.id AND c.api_id = a.id), @numerator INT, @denominator INT;
        EXEC @numerator = countEndpoints @apiId, 1;
        EXEC @denominator = countEndpoints @apiId;
        DECLARE @status INT = ROUND(CAST(@numerator AS FLOAT)/CAST(@denominator AS FLOAT)*100, 0);
        
        UPDATE api SET availability = 
        CASE
            WHEN @status < 50 THEN 1
            WHEN @status < 75 THEN 2
            ELSE 3
        END
        WHERE id = @apiId;
    END;
END
GO