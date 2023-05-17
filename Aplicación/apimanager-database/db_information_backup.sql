/* INFORMATION BACKUP */

INSERT INTO employee (name, email, is_admin)
VALUES
    ('Cristóbal Escamilla', 'a00827074@tec.mx', 1),
    ('Fernando Doddoli', 'a00827038@tec.mx', 1),
    ('Aldo Beráin', 'a00827874@tec.mx', 0),
    ('Juan Pablo Yáñez', 'a00829598@tec.mx', 0),
    ('Samuel Vieira', 'a00828215@tec.mx', 0);
GO

INSERT INTO api (name, author, description, base_url)
VALUES
    ('Spotify', 'Spotify Inc.', 'Lets your applications fetch data from the Spotify music catalog and manage user''s playlists and saved music', 'https://api.spotify.com/v1'),
    ('Amazon Pinpoint', 'Amazon Web Services', 'Amazon Pinpoint API.', 'https://pinpoint.amazonaws.com'),
    ('Instagram', 'Meta Inc.', 'The Instagram API Platform can be used to build non-automated, authentic, high-quality apps.', 'https://api.instagram.com/v1'),
    ('Oxford Dictionaries API', 'Oxford English Dictionary', 'Oxford Dictionaries.', 'https://od-api-demo.oxforddictionaries.com:443/api/v1'),
    ('YouTube Data', 'YouTube Inc.', 'Supports core YouTube features, such as uploading videos, creating and managing playlists, searching for content, and much more.', 'https://www.googleapis.com/youtube/v3'),
    ('Calendar', 'Google Inc.', 'Manipulates events and other calendar data.', 'https://www.googleapis.com/calendar/v3'),
    ('GitHub', 'GitHub Inc.', 'Powerful collaboration, code review and code management for open source and private projects.', 'https://api.github.com'),
    ('Wikimedia', 'Wikimedia Foundation', 'This API provides cacheable and straightforward access to Wikimedia content and data, in machine-readable formats. Global Rules Limit your clients.', 'https://wikimedia.org/api/rest_v1'),
    ('Buy Marketing', 'eBay Inc.', 'The Marketing API retrieves eBay products based on a metric, such as Best Selling, as well as products that were also bought and also viewed.', 'https://api.ebay.com/buy/marketing/v1_beta'),
    ('The Movie Database', 'IMDb', 'Millions of movies, TV shows and people to discover.', 'https://api.themoviedb.org/3'),
    ('Nationalize', 'Demografix ApS', 'Nationalize.io predicts the nationality of a person given their name. Use the API for analytics, ad segmenting, demographic statistics etc.', 'https://api.nationalize.io'),
    ('IPify', 'Greg Ceccarelli', 'Ever needed to get your public IP address programmatically? Sometimes having a public IP address API is useful!', 'https://api64.ipify.org'),
    ('Jokes Api', 'Sven Fehler', 'JokeAPI is a REST API that serves uniformly and well formatted jokes.', 'https://v2.jokeapi.dev');
GO

INSERT INTO category (api_id, name)
VALUES
    (1, 'albums'),
    (1, 'artists'),
    (2, 'apps'),
    (3, 'users'),
    (3, 'relationships'),
    (3, 'locations'),
    (4, 'entries'),
    (4, 'languages'),
    (5, 'channels'),
    (6, 'calendars'),
    (7, 'events'),
    (8, 'miscellaneous'),
    (9, 'products'),
    (10, 'movies'),
    (11, 'names'),
    (12, 'IP'),
    (13, 'Jokes');
GO

INSERT INTO method (name)
VALUES
    ('GET'),
    ('POST'),
    ('PUT'),
    ('DELETE');
GO

INSERT INTO endpoint (category_id, method_id, name, description, url, requires_auth)
VALUES
    (1, 1, 'Get Albums', 'Get several albums.', '/albums', 0),
    (2, 1, 'Get Artists', 'Get several artists.', '/artists', 0),
    (3, 1, 'Get Apps', 'Returns information about your apps.', '/apps', 1),
    (4, 1, 'Search Users', 'Search for a user by name.', '/users/search', 0),
    (5, 1, 'Get Requested by', 'List the users who have requested this user''s permission to follow.', '/users/self/requested-by', 0),
    (6, 1, 'Search Locations', 'Search for a location by geographic coordinate', '/locations/search', 0),
    (7, 1, 'Get Entries', 'Retrieve definitions, pronunciations, example sentences, grammatical information and word origins.', '/entries/{source_lang}/{word_id}', 1),
    (8, 1, 'Get Languages', 'Returns a list of monolingual and bilingual language databases available in the API.', '/languages', 1),
    (9, 1, 'Channels List', 'Returns a collection of zero or more channel results that match the request criteria.', '/channels', 1),
    (10, 1, 'Events List', 'Returns events on the specified calendar.', '/calendars/{calendarId}/events', 1),
    (11, 1, 'Get Events', 'List public events.', '/events', 0),
    (12, 1, 'Get Feed Availability', 'Gets availability of featured feed content for the apps by wiki domain.', '/feed/availability', 0),
    (13, 1, 'Get Merchandised Products', 'Returns an array of products based on the category and metric specified', '/merchandised_product', 0),
    (14, 1, 'Get Details', 'Gets the primary information about a movie.', '/movie/{movie_id}', 1),
    (14, 2, 'Rate Movie', 'Rate a movie.', '/movie/{movie_id}/rating', 1),
    (14, 4, 'Delete Rating', 'Remove your rating for a movie', '/movie/{movie_id}/rating', 1),
    (15, 1, 'Get Nationality', 'Returns probable nationality of entered name.', '/', 0),
    (16, 1, 'Get IP', 'Get your public IP address', '/', 0),
    (17, 1, 'Get Jokes', 'Get your favorite Jokes!', '/joke/{category}', 0);
GO

INSERT INTO data_type (type)
VALUES
    ('string'),
    ('int'),
    ('double'),
    ('boolean'),
    ('array'),
    ('object');
GO

INSERT INTO parameter_type(type)
VALUES
    ('Query'),
    ('Body'),
    ('Path'),
    ('Header')
GO

INSERT INTO parameter (endpoint_id, param_type_id, data_type_id, name, description, payload, is_required)
VALUES
    (1, 1, 1, 'ids', 'A comma-separated list of IDs', NULL, 1),
    (1, 1, 1, 'market', 'The market (an ISO 3166-1 alpha-2 country code', NULL, 0),
    (2, 1, 1, 'ids', 'A coma-separated list of IDs', NULL, 1),
    (3, 1, 1, 'page-size', 'The number of entries you want on each page in the response', NULL, 1),
    (3, 1, 1, 'token', 'The NextToken string returned on a previous page that you use to get the next page of results in a paginated response.', NULL, 1),
    (3, 4, 1, 'X-Amz-Content-Sha256', NULL, NULL, 1),
    (3, 4, 1, 'X-Amz-Date', NULL, NULL, 1),
    (3, 4, 1, 'X-Amz-Algorithm', NULL, NULL, 1),
    (3, 4, 1, 'X-Amz-Credential', NULL, NULL, 1),
    (3, 4, 1, 'X-Amz-Security-Token', NULL, NULL, 1),
    (3, 4, 1, 'X-Amz-Signature', NULL, NULL, 1),
    (3, 4, 1, 'X-Amz-SignedHeaders', NULL, NULL, 1),
    (4, 1, 1, 'q', 'A query string.', NULL, 1),
    (4, 1, 2, 'count', 'Number of users to return.', NULL, 0),
    (6, 1, 2, 'distance', 'Default is 1000m (distance=1000), max distance is 5000.', NULL, 0),
    (6, 1, 1, 'foursquare_id', 'Returns a location mapped off a foursquare v1 api location id. If used, you are not required to use lat and lng.', NULL, 0),
    (6, 1, 3, 'lat', 'Latitude of the center search coordinate. If used, lng is required.', NULL, 0),
    (6, 1, 3, 'lng', 'Longitude of the center search coordinate. If used, lat is required.', NULL, 0),
    (6, 1, 1, 'foursquare_v2_id', 'Returns a location mapped off of a foursquare v2 api location id. If used, you are not required to use lat and lng.', NULL, 0),
    (7, 3, 1, 'source-lang', 'IANA language code. Allowed values are: en, es, lv, hi, sw, ta, gu.', NULL, 1),
    (7, 3, 1, 'word-id', 'An Entry identifier. Case-sensitive', NULL, 1),
    (7, 4, 1, 'app_id', 'App ID Authentication Parameter.', NULL, 1),
    (7, 4, 1, 'app_key', 'App Key Authentication Parameter.', NULL, 1),
    (8, 1, 1, 'sourceLanguage', 'IANA language code. If provided output will be filtered by source language. Allowed values are: es, en, lv, nso, zu, ms, id, tn, ur, hi, sw, ro, de, pt, ta, gu.', NULL, 0),
    (8, 1, 1, 'targetLanguage', 'IANA language code. If provided output will be filtered by source language. Allowed values are: es, en lv, nso, zu, ms, id, tn, ur, hi, sw, ro.', NULL, 0),
    (8, 4, 1, 'app_id', 'App ID Authentication Parameter.', NULL, 1),
    (8, 4, 1, 'app_key', 'App Key Authentication Parameter.', NULL, 1),
    (9, 1, 1, 'categoryId', 'The categoryId parameter specifies a YouTube guide category, thereby requesting YouTube channels associated with that category.', NULL, 0),
    (9, 1, 1, 'forUsername', 'The forUsername parameter specifies a YouTube username, thereby requesting the channel associated with that username.', NULL, 0),
    (9, 1, 1, 'hl', 'The hl parameter should be used for filter out the properties that are not in the given language. Used for the brandingSettings part.', NULL, 0),
    (9, 1, 1, 'id', 'The id parameter specifies a comma-separated list of the YouTube channel ID(s) for the resource(s) that are being retrieved.', NULL, 0),
    (9, 1, 4, 'managedByMe', 'This parameter is intended exclusively for YouTube content partners.', NULL, 0),
    (9, 1, 2, 'maxResults', 'The maxResults parameter specifies the maximum number of items that should be returned in the result set.', NULL, 0),
    (9, 1, 4, 'mine', 'Set this parameter''s value to true to instruct the API to only return channels owned by the authenticated user.', NULL, 0),
    (9, 1, 4, 'mySubscribers', 'Use the subscriptions.list method and its mySubscribers parameter to retrieve a list of subscribers to the authenticated user''s channel.', NULL, 0),
    (9, 1, 1, 'onBehalfOfContentOwner', 'Note: This parameter is intended exclusively for YouTube content partners.', NULL, 0),
    (9, 1, 1, 'pageToken', 'The pageToken parameter identifies a specific page in the result set that should be returned.', NULL, 0),
    (9, 1, 1, 'part', 'The part parameter specifies a comma-separated list of one or more channel resource properties that the API response will include.', NULL, 1),
    (9, 1, 1, 'alt', 'Data format for the response. Allowed values are: json.', NULL, 0),
    (9, 1, 1, 'fields', 'Selector specifying which fields to include in a partial response.', NULL, 0),
    (9, 1, 1, 'key', 'API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.', NULL, 0),
    (9, 1, 1, 'oauth_token', 'OAuth 2.0 token for the current user.', NULL, 0),
    (9, 1, 4, 'prettyPrint', 'Returns response with indentations and line breaks.', NULL, 0),
    (9, 1, 1, 'quotaUser', 'An opaque string that represents a user for quota purposes. Must not exceed 40 characters.', NULL, 0),
    (9, 1, 1, 'userIp', 'Deprecated. Please use quotaUser instead.', NULL, 0),
    (10, 3, 1, 'calendarId', 'Calendar identifier. To retrieve calendar IDs call the calendar List.list method. If you want to access the primary calendar of the currently logged in user, use the "primary" keyword.', NULL, 1),
    (10, 1, 4, 'alwaysIncludeEmail', 'Whether to always include a value in the email field for the organizer, creator and attendees, even if no real email is available (i.e. a generated, non-working value will be provided).', NULL, 0),
    (10, 1, 1, 'iCalUID', 'Specifies event ID in the iCalendar format to be included in the response. Optional.', NULL, 0),
    (10, 1, 2, 'maxAttendees', 'The maximum number of attendees to include in the response. If there are more than the specified number of attendees, only the participants is required. Optional.', NULL, 0),
    (10, 1, 2, 'maxResults', 'Maximum number of events returned on one result page. The number of events in the resulting page may be less than this value, or none at all, even if there are more events matching the query.', NULL, 0),
    (10, 1, 1, 'orderBy', 'The order of the events returned in the result. Optional. The default is an unspecified, stable order. Allowed values are: startTime, updated.', NULL, 0),
    (10, 1, 1, 'pageToken', 'Token specifying which result page ot return. Optional.', NULL, 0),
    (10, 1, 5, 'privateExtendedProperty', 'Extended properties constraint specified as propertyName=value. Matches only private properties. This parameter might be repeated multiple times to return events that match all given constraints.', NULL, 0),
    (10, 1, 1, 'q', 'Free text search terms to find events that match these terms in any field, except for extended properties. Optional.', NULL, 0),
    (10, 1, 5, 'sharedExtendedProperty', 'Extended properties constraint specified as propertyName=value. Matches only shared properties. This parameter might be repeated multiple times to return events that match all given constraints.', NULL, 0),
    (10, 1, 4, 'showDeleted', 'Whether to include deleted events (with status equals "cancelled") in the result.', NULL, 0),
    (10, 1, 4, 'showHiddenInvitations', 'Whether to include hidden invitations in the result. Optional. The default is False.', NULL, 0),
    (10, 1, 4, 'singleEvents', 'Whether to expand recurring events into instances and only return single one-off events and instances of recurring events, but not the underlying recurring events themselves. Optional.', NULL, 0),
    (10, 1, 1, 'syncToken', 'Token obtained from the nextSyncToken field returned on the last page of results from the previous list request.', NULL, 0),
    (10, 1, 1, 'timeMax', 'Upper bound (exclusive) for an event''s start time to filter by. Optional.', NULL, 0),
    (10, 1, 1, 'timeMin', 'Lower bound (inclusive) for an event''s end time to filter by. Optional.', NULL, 0),
    (10, 1, 1, 'timeZone', 'Time zone used in response. Optional. The default is the time zone of the calendar.', NULL, 0),
    (10, 1, 1, 'updatedMin', 'Lower bound for an event''s last modification time (as a RFC3339 timestamp) to filter by.', NULL, 0),
    (10, 1, 1, 'alt', 'Data format for the response. Allowed values are: json', NULL, 0),
    (10, 1, 1, 'fields', 'Selector specifying which fields to include in a partial response.', NULL, 0),
    (10, 1, 1, 'key', 'API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.', NULL, 0),
    (10, 1, 1, 'oauth_token', 'OAuth 2.0 token for the current users.', NULL, 0),
    (10, 1, 4, 'prettyPrint', 'Returns response with indentations and line breaks.', NULL, 0),
    (10, 1, 1, 'quotaUsers', 'An opaque string that represents a user for quota purposes. Must not exceed 40 characters.', NULL, 0),
    (10, 1, 1, 'userIp', 'Deprecated. Please use quotaUser instead.', NULL, 0),
    (11, 4, 1, 'Accept', 'Is used to set specified media type.', NULL, 0),
    (12, 4, 1, 'Accept', 'Allowed values are: application/json; charset=utf-8; profile="https://www.mediawiki.org/wiki/Specs/Availability/, application/problem+json.', NULL, 0),
    (13, 1, 1, 'aspect_filter', 'The aspect name/value pairs used to further refine product results.', NULL, 0),
    (13, 1, 1, 'category_id', 'This query parameter limits the products returned to a specific eBay category. The list of eBay category Ids is not published and category Ids are not all the same across all the eBay marketplace.', NULL, 1),
    (13, 1, 1, 'limit', 'This value specifies the maximum number of products to return in a result set.', NULL, 0),
    (13, 1, 1, 'metric_name', 'This value filters the result set by the specified metric. Only products in this metric are returned.', NULL, 0),
    (14, 3, 2, 'movie_id', NULL, NULL, 1),
    (14, 1, 1, 'api_key', NULL, NULL, 1),
    (14, 1, 1, 'language', NULL, NULL, 0),
    (14, 1, 1, 'append_to_response', NULL, NULL, 0),
    (15, 3, 2, 'movie_id', NULL, NULL, 1),
    (15, 4, 1, 'Content-Type', NULL, NULL, 1),
    (15, 1, 1, 'api_key', NULL, NULL, 1),
    (15, 1, 1, 'guest_session_id', NULL, NULL, 0),
    (15, 1, 1, 'session_id', NULL, NULL, 0),
    (15, 2, 2, 'value', NULL, NULL, 1),
    (16, 3, 2, 'movie_id', NULL, NULL, 1),
    (16, 4, 1, 'Content-Type', NULL, NULL, 1),
    (16, 1, 1, 'api_key', NULL, NULL, 1),
    (16, 1, 1, 'guest_session_id', NULL, NULL, 0),
    (16, 1, 1, 'session_id', NULL, NULL, 0),
    (17, 1, 1, 'name', 'Name of any person', NULL, 1),
    (18, 1, 1, 'format', 'Response format (json, text)', NULL, 0),
    (19, 3, 1, 'category', 'Joke category (Any, Programming, Miscellaneous, Dark, Pun, Spooky, Christmas)', NULL, 1),
    (19, 1, 1, 'format', 'Response format (json (default), xml, yaml, txt)', NULL, 0),
    (19, 1, 1, 'type', 'Type of joke (single/twopart)', NULL, 0),
    (19, 1, 2, 'amount', 'Amount of jokes', NULL, 1);
GO

INSERT INTO response_type (code, status)
VALUES
    (200, 'Success'),
    (201, 'Resource Created'),
    (400, 'Bad Request'),
    (401, 'Unauthorized'),
    (403, 'Forbidden'),
    (404, 'Not Found'),
    (405, 'Method Not Allowed'),
    (409, 'Conflict'),
    (500, 'Internal Server Error'),
    (503, 'Service Unavailable');
GO

INSERT INTO response (endpoint_id, response_type_id, json_string)
VALUES
    (1, 1, '{ "albums": [ { "album_type": "", "artists": [ null ], "available_markets": [ null ], "copyrights": [ null ], "external_ids": {}, "external_urls": {}, "genres": [ null ], "href": "", "id": "", "images": [ null ], "name": "", "popularity": 0, "release_date": "", "release_date_precision": "", "tracks": {}, "type": "", "uri": "" } ] }'),
    (2, 1, '{ "artists": [ { "external_urls": {}, "followers": {}, "genres": [ null ], "href": "", "id": "", "images": [ null ], "name": "", "popularity": 0, "type": "", "uri": "" } ] }'),
    (3, 1, '{ "ApplicationsResponse": { "Item": [ {} ], "NextToken": "" } }'),
    (3, 3, NULL),
    (3, 5, NULL),
    (3, 6, NULL),
    (4, 1, '{ "data": [ { "full_name": "", "id": "", "profile_picture": "", "username": "" } ], "meta": { "code": 0 } }'),
    (5, 1, '{ "data": [ { "full_name": "", "id": "", "profile_picture": "", "username": "" } ], "meta": { "code": 0 } }'),
    (6, 1, '{ "data": [ { "id": "", "latitude": 0, "longitude": 0, "name": "" } ], "meta": { "code": 0 } }'),
    (7, 1, '{ "metadata": {}, "results": [ { "id": "", "language": "", "lexicalEntries": [ null ], "pronunciations": [ null ], "type": "", "word": "" } ] }'),
    (7, 6, 'No entry is found matching supplied id and source_lang or filters are not recognized.'),
    (7, 9, NULL),
    (8, 1, '{ "metadata": {}, "results": [ { "region": "", "source": "", "sourceLanguage": {}, "targetLanguage": {}, "type": "monolingual" } ] }'),
    (8, 6, 'Unknown sourceLanguage and/or targetLanguage.'),
    (8, 9, NULL),
    (9, 1, '{ "etag": "", "eventId": "", "items": [ { "auditDetails": {}, "brandingSettings": {}, "contentDetails": {}, "contentOwnerDetails": {}, "conversionPings": {}, "etag": "", "id": "", "invideoPromotion": {}, "kind": "youtube#channel", "localizations": {}, "snippet": {}, "statistics": {}, "status": {}, "topicDetails": {} } ], "kind": "youtube#channelListResponse", "nextPageToken": "", "pageInfo": { "resultsPerPage": 0, "totalResults": 0 }, "prevPageToken": "", "tokenPagination": {}, "visitorId": "" }'),
    (10, 1, '{ "accessRole": "", "defaultReminders": [ { "method": "", "minutes": 0 } ], "description": "", "etag": "", "items": [ { "anyoneCanAddSelf": true, "attachments": [ null ], "attendees": [ null ], "attendeesOmitted": true, "colorId": "", "conferenceData": {}, "created": "", "creator": {}, "description": "", "end": {}, "endTimeUnspecified": true, "etag": "", "extendedProperties": {}, "gadget": {}, "guestsCanInviteOthers": true, "guestsCanModify": true, "guestsCanSeeOtherGuests": true, "hangoutLink": "", "htmlLink": "", "iCalUID": "", "id": "", "kind": "calendar#event", "location": "", "locked": true, "organizer": {}, "originalStartTime": {}, "privateCopy": true, "recurrence": [ null ], "recurringEventId": "", "reminders": {}, "sequence": 0, "source": {}, "start": {}, "status": "", "summary": "", "transparency": "opaque", "updated": "", "visibility": "default" } ], "kind": "calendar#events", "nextPageToken": "", "nextSyncToken": "", "summary": "", "timeZone": "", "updated": "" }'),
    (11, 1, '[ { "actor": { "avatar_url": "", "bio": "", "blog": "", "collaborators": 0, "company": "", "created_at": "", "disk_usage": 0, "email": "", "followers": 0, "followers_url": "", "following": 0, "following_url": "", "gists_url": "", "gravatar_id": "", "hireable": true, "html_url": "", "id": 0, "location": "", "login": "", "name": "", "organizations_url": "", "owned_private_repos": 0, "plan": {}, "private_gists": 0, "public_gists": 0, "public_repos": 0, "starred_url": "", "subscriptions_url": "", "total_private_repos": 0, "type": {}, "updated_at": "", "url": "" }, "created_at": {}, "id": 0, "org": { "avatar_url": "", "bio": "", "blog": "", "collaborators": 0, "company": "", "created_at": "", "disk_usage": 0, "email": "", "followers": 0, "followers_url": "", "following": 0, "following_url": "", "gists_url": "", "gravatar_id": "", "hireable": true, "html_url": "", "id": 0, "location": "", "login": "", "name": "", "organizations_url": "", "owned_private_repos": 0, "plan": {}, "private_gists": 0, "public_gists": 0, "public_repos": 0, "starred_url": "", "subscriptions_url": "", "total_private_repos": 0, "type": {}, "updated_at": "", "url": "" }, "payload": {}, "public": true, "repo": { "id": 0, "name": "", "url": "" }, "type": "" } ]'),
    (11, 5, 'API rate limit exceeded. See http://developer.github.com/v3/#rate-limiting for details.'),
    (12, 1, '{ "in_the_news": [ "" ], "most_read": [ "" ], "on_this_day": [ "" ], "picture_of_the_day": [ "" ], "todays_featured_article": [ "" ] }'),
    (12, 3, '{ "detail": "", "method": "", "status": 0, "title": "", "type": "", "uri": "" }'),
    (13, 1, '{ "merchandisedProducts": [ { "averageRating": "", "epid": "", "image": {}, "marketPriceDetails": [ null ], "ratingAspects": [ null ], "ratingCount": 0, "reviewCount": 0, "title": "" } ], "warnings": [ { "category": "", "domain": "", "errorId": 0, "inputRefIds": [ null ], "longMessage": "", "message": "", "outputRefIds": [ null ], "parameters": [ null ], "subdomain": "" } ] }'),
    (13, 3, NULL),
    (13, 9, NULL),
    (14, 1, '{ "adult": false, "backdrop_path": "/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg", "belongs_to_collection": null, "budget": 63000000, "genres": [ { "id": 18, "name": "Drama" } ], "homepage": "", "id": 550, "imdb_id": "tt0137523", "original_language": "en", "original_title": "Fight Club", "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.", "popularity": 0.5, "poster_path": null, "production_companies": [ { "id": 508, "logo_path": "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png", "name": "Regency Enterprises", "origin_country": "US" }, { "id": 711, "logo_path": null, "name": "Fox 2000 Pictures", "origin_country": "" }, { "id": 20555, "logo_path": null, "name": "Taurus Film", "origin_country": "" }, { "id": 54050, "logo_path": null, "name": "Linson Films", "origin_country": "" }, { "id": 54051, "logo_path": null, "name": "Atman Entertainment", "origin_country": "" }, { "id": 54052, "logo_path": null, "name": "Knickerbocker Films", "origin_country": "" }, { "id": 25, "logo_path": "/qZCc1lty5FzX30aOCVRBLzaVmcp.png", "name": "20th Century Fox", "origin_country": "US" } ], "production_countries": [ { "iso_3166_1": "US", "name": "United States of America" } ], "release_date": "1999-10-12", "revenue": 100853753, "runtime": 139, "spoken_languages": [ { "iso_639_1": "en", "name": "English" } ], "status": "Released", "tagline": "How much can you know about yourself if you''ve never been in a fight?", "title": "Fight Club", "video": false, "vote_average": 7.8, "vote_count": 3439 }'),
    (14, 4, '{ "status_message": "Invalid API key: You must be granted a valid key.", "success": false, "status_code": 7 }'),
    (14, 6, '{ "status_message": "The resource you requested could not be found.", "status_code": 34 }'),
    (15, 2, '{ "status_code": 1, "status_message": "Success." }'),
    (15, 4, '{ "status_message": "Invalid API key: You must be granted a valid key.", "success": false, "status_code": 7 }'),
    (15, 6, '{ "status_message": "The resource you requested could not be found.", "status_code": 34 }'),
    (16, 1, '{ "status_code": 13, "status_message": "The item/record was deleted successfully." }'),
    (16, 4, '{ "status_code": 3, "status_message": "Authentication failed: You do not have permissions to access the service." }'),
    (17, 1, '{ "name": "", "country": [] }'),
    (18, 1, '{ "ip": "" }'),
    (19, 1, '{ "error": false, "category": "Dark", "type": "twopart", "setup": "Jokes about anti-vaxxer parents never get old.", "delivery": "Just like their kids.", "flags": { "nsfw": false, "religious": false, "political": false, "racist": false, "sexist": false, "explicit": false }, "id": 118, "safe": false, "lang": "en" }'),
    (19, 3, NULL),
    (19, 9, NULL);
GO