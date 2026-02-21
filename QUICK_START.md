# FleetFlow - Quick Start Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or pnpm

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend directory
cd fleetflow/backend

# Install dependencies
npm install

# Configure environment variables
# The .env file is already configured with MongoDB Atlas connection

# Seed the database with test data
npm run seed:test

# Start the backend server
npm run dev
```

Backend will run on: `http://localhost:5000`

### 2. Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd fleetflow/frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

Frontend will run on: `http://localhost:5173` (or the port shown in terminal)

## Test Credentials

After running the seed script, use these credentials to login:

| Role | Email | Password |
|------|-------|----------|
| Dispatcher | dispatcher@fleetflow.com | password123 |
| Manager | manager@fleetflow.com | password123 |
| Safety Officer | safety@fleetflow.com | password123 |
| Financial Analyst | finance@fleetflow.com | password123 |

## Testing Dispatcher Features

1. **Login**
   - Go to `http://localhost:5173`
   - Click "Sign In"
   - Use dispatcher credentials

2. **View Dashboard**
   - You'll see the Dispatcher Dashboard with:
     - Pending Cargo (Draft trips)
     - Active Trips (In Progress)
     - Available Vehicles
     - Available Drivers
     - Weekly Trip Statistics

3. **Create a Trip**
   - Click "Create Trip" button
   - Fill in the form:
     - Origin and Destination
     - Cargo Weight
     - Select an Available Vehicle
     - Select an On Duty Driver
     - Set Priority and Schedule Date
   - Click "Create Trip"
   - Trip will be created and appear in the cargo queue

4. **View All Trips**
   - Navigate to "Trips" page
   - See all trips with their status
   - Filter by status or priority

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Vehicles
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Create vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Drivers
- `GET /api/drivers` - Get all drivers
- `POST /api/drivers` - Create driver
- `PUT /api/drivers/:id` - Update driver
- `DELETE /api/drivers/:id` - Delete driver

### Trips
- `GET /api/trips` - Get all trips
- `POST /api/trips` - Create trip
- `PUT /api/trips/:id` - Update trip
- `DELETE /api/trips/:id` - Delete trip
- `PATCH /api/trips/:id/status` - Update trip status
- `PATCH /api/trips/:id/progress` - Update trip progress

### Dashboards
- `GET /api/dashboard/manager` - Manager dashboard data
- `GET /api/dashboard/dispatcher` - Dispatcher dashboard data
- `GET /api/dashboard/safety` - Safety officer dashboard data
- `GET /api/dashboard/financial` - Financial analyst dashboard data

## Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct in `.env`
- Ensure port 5000 is not in use
- Run `npm install` to ensure all dependencies are installed

### Frontend won't start
- Ensure port 5173 is not in use
- Check if backend is running
- Verify `VITE_API_URL` in frontend `.env` points to `http://localhost:5000/api`

### Database connection error
- Verify MongoDB Atlas credentials
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure internet connection is stable

### No data showing
- Run the seed script: `npm run seed:test` in backend directory
- Check browser console for errors
- Verify API calls are successful in Network tab

### Authentication issues
- Clear browser localStorage
- Check if JWT_SECRET is set in backend `.env`
- Verify token is being sent in Authorization header

## Database Schema

### Users
- name, email, password (hashed), role
- Roles: manager, dispatcher, safety_officer, financial_analyst

### Vehicles
- name, licensePlate, type, maxCapacity, odometer, status, healthScore
- Types: Motorcycle, Van, Truck, Trailer
- Status: Available, On Trip, In Shop, Retired

### Drivers
- name, email, phone, licenseNumber, licenseExpiry, licenseCategory, status
- Status: On Duty, Off Duty, Suspended

### Trips
- tripId, vehicle, driver, origin, destination, cargoWeight, status, priority, progress
- Status: Draft, Dispatched, In Progress, Completed, Cancelled
- Priority: low, medium, high

### Maintenance
- vehicle, type, description, status, scheduledDate, estimatedCost
- Type: Scheduled, Urgent
- Status: Pending, In Progress, Completed

### Expenses
- vehicle, type, amount, quantity, date, description
- Type: Fuel, Maintenance, Insurance, Registration, Other

## Development Tips

### Backend Development
- Use `npm run dev` for auto-restart on file changes
- Check terminal for error logs
- Use Postman or Thunder Client to test API endpoints

### Frontend Development
- React DevTools for component debugging
- Check browser console for errors
- Use Network tab to inspect API calls

### Database Management
- Use MongoDB Compass to view/edit data
- Connection string is in backend `.env`
- Run seed script to reset data

## Next Steps

1. Explore other dashboards (Manager, Safety, Financial)
2. Test vehicle and driver management
3. Create maintenance records
4. Add expenses
5. View analytics and reports

## Support

For issues or questions:
1. Check the FIXES_APPLIED.md for detailed changes
2. Review error messages in terminal/console
3. Verify all environment variables are set
4. Ensure database is seeded with test data
