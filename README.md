# Accounting System API

## Getting started

Accounting System API is the double-entry accounting system

## Prerequisities
1. NodeJS
2. PostgreSQL

## How To Run
1. Create env file
    - Create the env file by copy the example
        ```sh
        cp .env.example .env
        ```
    - Write down the value of env files. Please fill the env values below with the PostgreSQL settings
    ```sh
    DB_HOST=DB_HOST #PostgreSQL Host
    DB_PORT=DB_PORT #PostgreSQL Port
    DB_USERNAME=DB_USER #PostgreSQL Username
    DB_PASSWORD=DB_PASSWORD #PostgreSQL Password
    DB_NAME=DB_NAME #PostgreSQL DB Name
    ```
2. Install the dependencies by running
    ```sh
    npm i
    ```
3. Run the migration for create the tables in the db by
    ```sh
    npm run migrate:config && npm run migrate:up
    ```
4. Run the service by
    ```sh
    npm start
    ```
If you want to test the code, run
```sh
npm test
```

## API Docs

### Create Account Book (POST /books)
#### Request
##### Body
{
    "fiscal_start_date": "2024-04-01T00:00:00+07:00",
    "fiscal_end_date": "2025-03-31T23:59:59+07:00",
    "description": "Book of 2024 year"    
}
Note: fiscal_start_date must be less than fiscal_end_date

#### Response (200)
{
    "ok": true,
    "message": "Success",
    "data": {
        "description": "Book of 2024 year",
        "fiscal_start_date": "2024-03-31T17:00:00.000Z",
        "fiscal_end_date": "2025-03-31T16:59:59.000Z",
        "created_at": "2024-05-09T23:26:57.247Z",
        "updated_at": "2024-05-09T23:26:57.247Z"
    }
}

#### Response (400)
{
    "ok": false,
    "message": "Bad Request",
}

#### Response (500)
{
    "ok": false,
    "message": "Internal Server Error",
}

### Get Balance by Book ID (GET /books/:id/balance)
#### Request

#### Response (200)
{
    "ok": true,
    "message": "Success",
    "data": {
        "balance": 0,
        "debit_total": 6000000.555,
        "credit_total": 6000000.555,
        "accounts": [
            {
                "root_type": "ASSETS",
                "total": 6000000.555,
                "accounts": [
                    {
                        "code": "BNK-1",
                        "name": "Commonwealth Bank",
                        "debit_total": 6000000.555,
                        "credit_total": 0
                    }
                ]
            },
            {
                "root_type": "EXPENSES",
                "total": 0,
                "accounts": []
            },
            {
                "root_type": "LIABILITIES",
                "total": 0,
                "accounts": []
            },
            {
                "root_type": "EQUITY",
                "total": 0,
                "accounts": []
            },
            {
                "root_type": "REVENUE",
                "total": 6000000.555,
                "accounts": [
                    {
                        "code": "PR-1",
                        "name": "Product Cost",
                        "debit_total": 0,
                        "credit_total": 6000000.555
                    }
                ]
            }
        ]
    }
}

#### Response (400)
{
    "ok": false,
    "message": "Bad Request",
    "error": "Bad Request"
}

#### Response (404)
{
    "ok": false,
    "message": "Record Not Found",
    "error": "Record Not Found"
}

#### Response (500)
{
    "ok": false,
    "message": "Internal Server Error",
    "error": "Internal Server Error"
}

### Get All Entries by Book ID (GET /books/:id/entries)

#### Response (200)
{
    "ok": true,
    "message": "Success",
    "data": {
        "items": [
            {
                "id": 3,
                "account_type_id": 6,
                "journal": "JO/2024/V/IX/1",
                "datetime": "2024-05-09T16:05:00.000Z",
                "notes": null,
                "debit": 1000000,
                "credit": 0,
                "account_type": {
                    "code": "BNK-1",
                    "name": "Commonwealth Bank",
                    "root_type": "ASSETS"
                }
            },
            {
                "id": 4,
                "account_type_id": 7,
                "journal": "JO/2024/V/IX/1",
                "datetime": "2024-05-09T16:05:00.000Z",
                "notes": null,
                "debit": 0,
                "credit": 1000000,
                "account_type": {
                    "code": "PR-1",
                    "name": "Product Cost",
                    "root_type": "REVENUE"
                }
            },
            ...
        ]
    }
}

#### Response (400)
{
    "ok": false,
    "message": "Bad Request",
    "error": "Bad Request"
}

#### Response (404)
{
    "ok": false,
    "message": "Record Not Found",
    "error": "Record Not Found"
}

#### Response (500)
{
    "ok": false,
    "message": "Internal Server Error",
    "error": "Internal Server Error"
}

### Get Book Detail with Entries Pagination (GET /books/:id/complete)

#### Description
Endpoint to get the account book detail and its paginated entries

#### Request

##### Query Params
1. `page` = the current page. Default value is 1
2. `limit` = number of data each page. Default value is 100

#### Response (200)
{
    "ok": true,
    "message": "Success",
    "data": {
        "id": 7,
        "description": "Book of 2024 year",
        "debit_total": 6000000.555,
        "credit_total": 6000000.555,
        "balance": 0,
        "entries_pagination": {
            "page": 4,
            "limit": 3,
            "total_page": 5,
            "items": [
                {
                    "id": 14,
                    "account_type_id": 7,
                    "book_id": 7,
                    "journal": "JO/2024/V/IX/6",
                    "datetime": "2024-05-09T16:05:00.000Z",
                    "notes": null,
                    "debit": 0,
                    "credit": 1000000,
                    "account_type": {
                        "code": "PR-1",
                        "name": "Product Cost",
                        "root_type": "REVENUE"
                    },
                    "account_book": {
                        "description": "Book of 2024 year",
                        "fiscal_start_date": "2024-04-30T17:00:00.000Z",
                        "fiscal_end_date": "2025-04-30T16:59:59.000Z"
                    }
                },
                {
                    "id": 15,
                    "account_type_id": 6,
                    "book_id": 8,
                    "journal": "JO/2024/IV/IX/1",
                    "datetime": "2024-04-09T16:05:00.000Z",
                    "notes": null,
                    "debit": 0,
                    "credit": 1500000,
                    "account_type": {
                        "code": "BNK-1",
                        "name": "Commonwealth Bank",
                        "root_type": "ASSETS"
                    },
                    "account_book": {
                        "description": "Book of 2024 year",
                        "fiscal_start_date": "2024-03-31T17:00:00.000Z",
                        "fiscal_end_date": "2025-03-31T16:59:59.000Z"
                    }
                },
                {
                    "id": 16,
                    "account_type_id": 7,
                    "book_id": 8,
                    "journal": "JO/2024/IV/IX/1",
                    "datetime": "2024-04-09T16:05:00.000Z",
                    "notes": null,
                    "debit": 1500000,
                    "credit": 0,
                    "account_type": {
                        "code": "PR-1",
                        "name": "Product Cost",
                        "root_type": "REVENUE"
                    },
                    "account_book": {
                        "description": "Book of 2024 year",
                        "fiscal_start_date": "2024-03-31T17:00:00.000Z",
                        "fiscal_end_date": "2025-03-31T16:59:59.000Z"
                    }
                }
            ]
        }
    }
}

#### Response (400)
{
    "ok": false,
    "message": "Bad Request",
}
{
    "ok": false,
    "message": "Record Not Found",
    "error": "Record Not Found"
}

#### Response (500)
{
    "ok": false,
    "message": "Internal Server Error",
}

### Create Account Type (POST /types)

#### Description
Endpoint to create account types

#### Request

##### Body
```json
{
    "code": "PR-1",
    "name": "Product Cost",
    "root_type": "REVENUE" // "ASSETS", "EXPENSES", "LIABILITIES", "EQUITY", "REVENUE"
}
```

#### Response (200)
```json
{
    "ok": true,
    "message": "Success",
    "data": {
        "code": "PR-1",
        "name": "Product Cost",
        "root_type": "REVENUE",
        "created_at": "2024-05-09T16:01:36.114Z",
        "updated_at": "2024-05-09T16:01:36.114Z"
    }
}
```

#### Response (400)
```json
{
    "ok": false,
    "message": "Bad Request",
}
```

#### Response (500)
```json
{
    "ok": false,
    "message": "Internal Server Error",
}
```