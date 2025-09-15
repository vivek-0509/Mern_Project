## Taskify — To-Do App Backend (Express + MongoDB Atlas)

Backend API for Taskify: user auth with JWT and CRUD tasks with categories.

### Tech
- **Runtime**: Node.js (ES Modules)
- **Server**: Express
- **DB**: MongoDB Atlas via Mongoose
- **Auth**: JWT, bcrypt

### Setup
1. Copy env example and fill values:
```bash
cp .env.example .env
```
2. Install deps:
```bash
npm install
```
3. Run dev server:
```bash
npm run dev
```

### Environment
- **PORT**: default 4000
- **MONGO_URI**: MongoDB Atlas connection string
- **MONGO_DB_NAME**: database name (e.g., taskify)
- **JWT_SECRET**: long random string

### API

Auth
- POST `/auth/register`
  - Body: `{ "name": "Alice", "email": "alice@test.com", "password": "secret123" }`
  - 201 Created
- POST `/auth/login`
  - Body: `{ "email": "alice@test.com", "password": "secret123" }`
  - Response: `{ "token": "<jwt>" }`

Tasks (Bearer token required)
- GET `/tasks?category=work`
- POST `/tasks`
  - Body: `{ "title": "Buy groceries", "description":"Milk", "category":"personal" }`
- PATCH `/tasks/:id`
  - Body: partial e.g. `{ "isDone": true }`
- DELETE `/tasks/:id`

### Project Structure
```
src/
  config/db.js
  controllers/
    authController.js
    taskController.js
  middleware/auth.js
  models/
    User.js
    Task.js
  routes/
    authRoutes.js
    taskRoutes.js
  app.js
  server.js
```

### Notes
- Timestamps include `createdAt` only as per requirements.
- Passwords are hashed; JWT expires in 7d.
