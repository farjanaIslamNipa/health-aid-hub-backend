# Health Aid Hub Backend

### command to run the server:
 `npm run dev`.


## Configuration:
- Environment Variables:
  - `PORT`: Port number the server listens on. Default: 3000
  - `MONGODB_URI`: URI for MongoDB database.
  - `JWT_SECRET`: Secret key for JWT token generation.
  - `EXPIRES_IN`: Token expiration time.

## Usage:
- API Endpoints:
  - POST `/api/auth/login`
    - Description: Authenticates user and returns a JWT token.
    - Request: 
        ```json
        { 
            "email": "example@email.com", 
            "password": "password" 
        }
        ```
    - Response: 
        ```json
        {
            "success": true, 
            "message": "User registered successfully"
        }
        ```

  - POST `/api/auth/register`
    - Description: Registers a new user.
    - Request:
        ```json
        { 
            "name": "John", 
            "email": "example@email.com", 
            "password": "password" 
        }
        ```
    - Response: 
        ```json
        {
            "success": true,
            "message": "Login successful",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBoMkBleGFtcGxlLmNvbSIsImlhdCI6MTcwNzg1MDYyMSwiZXhwIjoxNzA3OTM3MDIxfQ.7EahSgmPLPNuZ_T9ok-B6TayWCJVdxPzi_Nx4UfrhvY"
        }
        ```

    - POST `/api/v1/add-supply`
    - Description: Add new supply.
    - Request:
        ```json
        { 
            "image": "https://media.e-valy.com/cms/products/images/6f9dbfbe-1e82-4d26-8daa-a7fedd9b1518", 
            "title": "Medical Service Coverage", 
            "category": "First aid kits",
            "amount": "200",
            "description" : "Waste of time and resources” during disasters can be considered the main determinant that can damage the resilience of the medication supply chain. Policymakers need to seek applied strategies for decreasing waste. Socio-cultural interventions, preparedness of information infrastructures and coordination among the stewards and the community during disasters can help the supply chain preserve its resilience and act more effectively"
        }
        ```
    - Response: 
        ```json
        {
            "success": true,
            "message": "New supply added successfully"
        }
        ```

    - GET `/api/v1/supplies`
    - Description: Get all supplies list.
    - Response: 
        ```json
        {
            "success": true,
            "message": "Supplies retrieved successfully"
        }
        ```
    - GET `/api/v1/supplies/:id`
    - Description: Get specific supply item.
    - Response: 
        ```json
        {
            "success": true,
            "message": "Supply retrieved successfully"
        }
        ```

    - PUT `/api/v1/update-supply/:id`
    - Description: Update existing supply.
    - Request:
        ```json
        { 
            "image": "https://media.e-valy.com/cms/products/images/6f9dbfbe-1e82-4d26-8daa-a7fedd9b1518", 
            "title": "Medical Service Coverage", 
            "category": "First aid kits",
            "amount": "400",
        }
        ```
    - Response: 
        ```json
        {
            "success": true,
            "message": "Supply updated successfully"
        }
        ```

    - GET `/api/v1/delete-supply/:id`
    - Description: Delete a supply from database.
    - Response: 
        ```json
        {
            "success": true,
            "message": "Supply deleted successfully"
        }
        ```

## Dependencies:
- `bcrypt`: Library for hashing passwords.
- `cors`: Express middleware for enabling CORS.
- `dotenv`: Loads environment variables from .env file.
- `express`: Web framework for Node.js.
- `jsonwebtoken`: Library for generating and verifying JWT tokens.
- `mongodb`: MongoDB driver for Node.js.
- `nodemon`: Utility for automatically restarting the server during development.

