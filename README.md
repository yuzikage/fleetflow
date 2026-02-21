# FleetFlow: Modular Fleet & Logistics Management System

## 🎉 Latest Updates (February 2026)

### All Dispatcher Issues Resolved ✅
- ✅ Complete trip management API implemented
- ✅ Driver management system added  
- ✅ Dispatcher dashboard now uses real-time API data
- ✅ Trip creation fully integrated with backend validation
- ✅ Database properly configured and seeded with test data
- ✅ All duplicate files removed for clean codebase
- ✅ Comprehensive validation and error handling

**Quick Start:** See [QUICK_START.md](QUICK_START.md) for setup instructions  
**Technical Details:** See [DISPATCHER_FIXES_SUMMARY.md](DISPATCHER_FIXES_SUMMARY.md) for complete fix documentation

### Test Credentials
```
Dispatcher: dispatcher@fleetflow.com / password123
Manager: manager@fleetflow.com / password123
Safety Officer: safety@fleetflow.com / password123
Financial Analyst: finance@fleetflow.com / password123
```

---

## Overview
FleetFlow is a centralized, rule-based digital hub designed to replace inefficient manual logbooks and optimize the complete lifecycle of delivery fleet operations. The system monitors vehicle health, driver safety, and financial performance in real-time.

## Objective
Transform fleet management from manual processes to an intelligent, automated system that:
- Optimizes vehicle lifecycle management
- Monitors driver safety and compliance
- Tracks comprehensive financial performance
- Enables data-driven decision making

## Target Users

### Fleet Managers
- Oversee vehicle health and asset lifecycle
- Manage scheduling and resource allocation
- Monitor overall fleet performance

### Dispatchers
- Create and manage trips
- Assign drivers to vehicles
- Validate cargo loads against capacity

### Safety Officers
- Monitor driver compliance
- Track license expirations
- Maintain safety scores and records

### Financial Analysts
- Audit fuel expenditure
- Calculate maintenance ROI
- Analyze operational costs

## System Architecture

### Frontend
- Modular UI with scannable data tables
- Status pills for quick visual identification
- Responsive design for desktop and mobile

### Backend
- Real-time state management for vehicle/driver availability
- Rule-based validation engine
- Automated status updates

### Database
- Relational structure linking expenses and trips to vehicle IDs
- Normalized data model for efficient querying
- Audit trail for all transactions

## Core Features

### 1. Login & Authentication
**Purpose:** Secure access with role-based permissions

**Features:**
- Email/Password authentication
- "Forgot Password" recovery
- Role-Based Access Control (RBAC)
- Session management

### 2. Command Center (Main Dashboard)
**Purpose:** High-level fleet oversight at a glance

**Key Performance Indicators:**
- **Active Fleet:** Count of vehicles currently "On Trip"
- **Maintenance Alerts:** Number of vehicles marked "In Shop"
- **Utilization Rate:** Percentage of fleet assigned vs. idle
- **Pending Cargo:** Shipments waiting for assignment

**Filters:**
- Vehicle Type (Truck, Van, Bike)
- Status (Available, On Trip, In Shop, Retired)
- Region/Location

### 3. Vehicle Registry (Asset Management)
**Purpose:** Complete CRUD operations for physical assets

**Data Points:**
- Name/Model
- License Plate (Unique Identifier)
- Max Load Capacity (kg/tons)
- Current Odometer Reading
- Acquisition Date and Cost
- Status (Available, On Trip, In Shop, Retired)

**Logic:**
- Manual toggle for "Out of Service" (Retired)
- Automatic status updates based on trip and maintenance activities

### 4. Trip Dispatcher & Management
**Purpose:** End-to-end workflow for cargo movement

**Features:**
- **Creation Form:** Select Available Vehicle + Available Driver
- **Validation Rule:** Prevent trip creation if `CargoWeight > MaxCapacity`
- **Trip Lifecycle:**
  - Draft → Dispatched → Completed → Cancelled

**Workflow:**
1. Select available vehicle and driver
2. Enter cargo details and weight
3. System validates capacity
4. Dispatch trip (updates vehicle/driver status to "On Trip")
5. Track progress
6. Complete trip (log final odometer, return to "Available")

**Reference:** [Mockup](https://link.excalidraw.com/l/65VNwvy7c4X/9gLrP9aS4YZ)

### 5. Maintenance & Service Logs
**Purpose:** Preventative and reactive vehicle health tracking

**Features:**
- Schedule preventative maintenance
- Log reactive repairs
- Track service history per vehicle
- Cost tracking per service event

**Logic Link:**
- Adding a vehicle to a "Service Log" automatically switches status to "In Shop"
- Vehicle is removed from Dispatcher's selection pool
- Upon completion, status returns to "Available"

### 6. Completed Trip, Expense & Fuel Logging
**Purpose:** Comprehensive financial tracking per asset

**Features:**
- Record fuel purchases (Liters, Cost, Date)
- Log trip-related expenses
- Automatic odometer-based calculations

**Calculations:**
- **Total Operational Cost** = Fuel + Maintenance (per Vehicle ID)
- **Cost per km** = Total Cost / Distance Traveled
- **Fuel Efficiency** = Distance / Liters

### 7. Driver Performance & Safety Profiles
**Purpose:** Human resource and compliance management

**Features:**
- **Compliance Tracking:**
  - License expiry monitoring
  - Automatic blocking of assignment if license expired
  - Vehicle category validation (e.g., Van license for Van vehicles)

- **Performance Metrics:**
  - Trip completion rates
  - On-time delivery percentage
  - Safety scores

- **Status Management:**
  - On Duty
  - Off Duty
  - Suspended

### 8. Operational Analytics & Financial Reports
**Purpose:** Data-driven decision making and reporting

**Metrics:**
- **Fuel Efficiency:** km / L per vehicle
- **Vehicle ROI:** `(Revenue - (Maintenance + Fuel)) / Acquisition Cost`
- **Utilization Rates:** Active time vs. idle time
- **Cost Analysis:** Breakdown by vehicle, driver, or time period

**Export Options:**
- One-click CSV export
- PDF reports for monthly payroll
- Vehicle health audit reports

## System Logic & Workflow Example

### Complete Operational Cycle

1. **Vehicle Intake**
   - Add "Van-05" with 500kg capacity
   - Status: Available

2. **Driver Compliance**
   - Add Driver "Alex"
   - System verifies license validity for "Van" category
   - Status: Available

3. **Trip Dispatching**
   - Assign "Alex" to "Van-05" for 450kg load
   - Validation: 450 < 500 ✓ (Pass)
   - Status Update: Vehicle & Driver → On Trip

4. **Trip Completion**
   - Driver marks trip "Done"
   - Enter final Odometer reading
   - Status Update: Vehicle & Driver → Available

5. **Maintenance Scheduling**
   - Manager logs "Oil Change" for "Van-05"
   - Auto-Logic: Status → In Shop
   - Vehicle hidden from Dispatcher selection pool

6. **Analytics Update**
   - System calculates "Cost-per-km" based on fuel logs
   - Updates vehicle ROI metrics
   - Generates performance reports

## Business Rules

### Vehicle Assignment Rules
- Vehicle must be in "Available" status
- Cargo weight must not exceed vehicle capacity
- Vehicle must not have pending maintenance alerts

### Driver Assignment Rules
- Driver must be in "On Duty" status
- Driver license must be valid (not expired)
- Driver must have appropriate license category for vehicle type
- Driver cannot be assigned to multiple trips simultaneously

### Maintenance Rules
- Vehicle automatically marked "In Shop" when service log created
- Vehicle unavailable for dispatch while in maintenance
- Maintenance costs automatically added to vehicle operational cost

### Financial Tracking Rules
- All expenses linked to specific Vehicle ID
- Fuel efficiency calculated automatically after each trip
- ROI updated in real-time as costs are logged

## Getting Started

### Prerequisites
- Node.js (v16+)
- Database (PostgreSQL/MySQL)
- Modern web browser

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Install backend dependencies
cd fleetflow/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration
1. Set up database connection in backend configuration
2. Configure environment variables
3. Run database migrations
4. Seed initial data (optional)

### Running the Application
```bash
# Start backend server
cd backend
npm run dev

# Start frontend (in separate terminal)
cd frontend
npm run dev
```

## Project Structure
```
fleetflow/
├── backend/          # API server and business logic
├── frontend/         # User interface
└── README.md         # This file
```

## Contributing
Contributions are welcome! Please follow the standard fork-and-pull request workflow.

## License
[Specify License]

## Support
For issues and questions, please open an issue in the repository.

---

**FleetFlow** - Driving efficiency through intelligent fleet management.
