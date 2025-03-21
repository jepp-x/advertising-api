# advertising-api

# project-folder/
│
├── controllers/
│   ├── userController.js
│   └── advertController.js
│
├── middlewares/
│   ├── authMiddleware.js
│   └── uploadMiddleware.js
│
├── models/
│   ├── User.js
│   └── Advert.js
│
├── routes/
│   ├── userRoutes.js
│   └── advertRoutes.js
│
├── uploads/
│   └── (image files)
│
├── utils/
│   └── mailing.js
│
├── index.js
├── .env
├── package.json
|-- .gitignore

# folder structure 
/controllers   -> Houses business logic for your API endpoints.
/middlewares   -> Custom middleware like authentication and file handling.
/models        -> Schema and models.
/routes        -> Contains route definitions and links to controllers.
/uploads       -> Stores uploaded images (remotestorage setup).
/utils         -> Helper functions or utilities (e.g.,maailing,tokens).
app.js         -> Entry point to the backend application and configuration (app.use, port,DB connection)
.env           -> Environment variables file.

# API route endpoints need for your advertising web app, grouped by functionality:
# 1.Authentication & Authorization
a.Signup: For new users to register.
    Endpoint: POST /api/users/signup
    Required Payload: { "username": "string", "password": "string", "role": "vendor/user" }

b.Login: For users to log in and receive a JWT token.
    Endpoint: POST /api/users/login
    Required Payload: { "username": "string", "password": "string" }

# 2.Advert Management (Vendors Only)
a.Create Advert: For vendors to post a new advert.
    Endpoint: POST /api/adverts
    Headers: Authorization: Bearer <token>
    Required Payload: { "title": "string", "category": "string", "price": "number", "image": "file" }

b.Update Advert: For vendors to update their existing adverts.
    Endpoint: PUT /api/adverts/:id
    Headers: Authorization: Bearer <token>
    Required Payload: { "title": "string", "category": "string", "price": "number", "image": "file" }

c.Delete Advert: For vendors to delete their adverts.
    Endpoint: DELETE /api/adverts/:id
    Headers: Authorization: Bearer <token>

# 3.Advert Viewing (For All Users)
a.Get All Adverts: To retrieve a list of all adverts.
    Endpoint: GET /api/adverts
    Query Parameters (optional for filtering/search):title=<string>category=<string>price=<number>

b.Get Advert Details: To fetch details of a specific advert.
    Endpoint: GET /api/adverts/:id
c.GET all deleted Adverts
    Endpoint: GET /api/adverts/deleted

# 4.Additional Functionality
a.Search & Filtering: Handled via query parameters on the GET /api/adverts endpoint.
b.Image Uploads: Vendors can upload images when creating or updating an advert using multipart/form-data.
c. Restore deleted adverts by admins and vendors only
