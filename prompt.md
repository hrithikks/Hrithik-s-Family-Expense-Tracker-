You are an expert full-stack engineer. Build the complete production-ready application described below from scratch.

IMPORTANT:
- Do not merely scaffold the project.
- Implement the complete working application end-to-end.
- Do not leave TODOs, placeholders, fake APIs, mock dashboards, or unfinished screens.
- Make sensible engineering decisions without asking unnecessary clarification questions.
- The application must be fully dynamic. Normal administration/configuration must never require code changes.
- Seed the initial users, responsibilities, and required configuration provided below.
- Keep the stack lightweight, maintainable, and easy to deploy.

==================================================
1. PRODUCT OVERVIEW
==================================================

Build a multi-user family expense tracking application.

The purpose is to replace the family's daily expense notebook with a centralized web application.

There are four family members/users. Each member has their own financial responsibilities.

Each user logs in and records expenses only for the responsibilities/categories assigned to them.

An administrator can:
- Manage all family members
- Create/edit/deactivate users
- Manage responsibilities
- Assign responsibilities to users
- Remove responsibilities from users
- Reassign responsibilities between users
- View all expenses
- See which user entered which expense
- Edit/delete expenses
- View family-wide analytics
- Generate reports
- Export reports to Excel and PDF
- Manage application configuration through the UI

A normal member can:
- Log in
- See only their assigned responsibilities
- Add expenses for their assigned responsibilities
- View their own expenses
- View analytics for their own expenses/responsibilities
- Generate their own reports
- Export their own reports
- Manage their own profile
- Change password
- Upload/change profile picture
- Update first name and last name

==================================================
2. INITIAL USERS AND RESPONSIBILITIES
==================================================

Create these initial users and responsibility assignments.

USER 1:
Name: Ravi

Responsibilities:
1. Loans
   Examples/sub-items:
   - Home Loan
   - Personal Loan
   - etc.

2. EMIs
   Examples/sub-items:
   - EMI 1
   - EMI Phone
   - EMI Laptop
   - etc.


USER 2:
Name: Ravindra

Responsibilities:
1. Heavy Grocery
2. Bike Fuels and Maintenance
3. Medical Expenses
4. Gas Bill
5. Electricity Bill
6. LIC Mom
7. Lift Maintenance
8. Building Maintenance


USER 3:
Name: Riya

Responsibilities:
1. Vegetables
2. Fruits
3. Groceries
4. Puja Path
5. Sweets


USER 4:
Name: Hrithik

Responsibilities:
1. Milk
2. Dahi
3. Chicken
4. Eggs
5. Paneer
6. Retail Shopping upto 0-50-100
7. Buy New Things

IMPORTANT:
These are initial seeded responsibilities only.

The application MUST NOT hard-code these responsibilities into frontend dropdowns or business logic.

The database must contain responsibilities/categories and user-responsibility assignments.

An administrator must be able to:
- Add a new responsibility
- Edit a responsibility
- Delete/deactivate a responsibility
- Assign it to one or more users where appropriate
- Remove an assignment
- Reassign it
- Change responsibility names
- Manage sub-items where applicable

After the admin changes assignments, the member's UI should automatically reflect the changes without requiring a deployment or code modification.

==================================================
3. RESPONSIBILITY MODEL
==================================================

Use a proper normalized database model.

Do NOT store responsibilities as a JSON array inside the user record.

Recommended conceptual structure:

User
Role
Responsibility
UserResponsibility
Expense
ExpenseAttachment (optional if needed for future extensibility)
AuditLog

Potentially:

ResponsibilitySubItem

if sub-items such as:
- Home Loan
- Personal Loan
- EMI Phone
- EMI Laptop

need to be managed separately.

The design should support both simple responsibilities and responsibility-specific sub-items.

Example:

Responsibility:
Loans

Sub-items:
- Home Loan
- Personal Loan

Responsibility:
EMIs

Sub-items:
- EMI 1
- EMI Phone
- EMI Laptop

However, do not force sub-items into the UI if they are not necessary for an expense. Keep the experience simple.

==================================================
4. ROLES AND ACCESS CONTROL
==================================================

Implement proper role-based access control.

At minimum:

ADMIN
MEMBER

ADMIN:
- Full access
- Manage users
- Manage responsibilities
- Assign responsibilities
- View all expenses
- Edit/delete any expense
- View all reports
- Export all reports
- View audit logs
- Manage own profile

MEMBER:
- View own dashboard
- View own expenses
- Add own expenses
- Edit own expenses if allowed
- Delete own expenses if allowed
- View only assigned responsibilities
- Generate reports for their own data
- Export their own data
- Manage own profile
- Change password

A member MUST NOT be able to:
- See another member's private expense records
- Select another member's responsibility
- Manipulate responsibility assignments
- Access admin APIs
- Access admin screens

Do not rely only on frontend hiding.

EVERY authorization rule must also be enforced on the backend.

==================================================
5. AUTHENTICATION
==================================================

Implement secure authentication.

Requirements:
- Login
- Logout
- Password hashing
- Secure session/token handling
- Protected routes
- Role-based route protection
- Forgot password
- Reset password
- Change password
- Proper authentication error handling

Use secure password hashing such as bcrypt/argon2.

Do not store plaintext passwords.

Use HTTP-only secure cookies/session handling where appropriate.

The exact authentication implementation is up to you, but it must be production-conscious and secure.

==================================================
6. PROFILE SETTINGS
==================================================

Create a proper profile/settings page.

Users should be able to:

- View profile
- Update first name
- Update last name
- Update profile picture
- Change password
- View basic account information

Do NOT allow users to arbitrarily change their username/email if that is being used as the login identifier unless the architecture safely supports it.

Profile image storage must use Cloudinary.

Implement:
- Image upload
- Image replacement
- Proper Cloudinary URL persistence
- Basic image validation
- Reasonable file-size/type restrictions

==================================================
7. TECH STACK
==================================================

Use this architecture:

FRONTEND:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui or another lightweight modern component system
- Recharts or equivalent lightweight charting library

BACKEND:
- Node.js
- Express.js
- TypeScript

DATABASE:
- PostgreSQL
- Neon PostgreSQL

ORM:
- Prisma

ASSET STORAGE:
- Cloudinary

REPORTING:
- Excel export using a suitable Node library such as ExcelJS
- PDF export using a suitable Node PDF/report library

AUTH:
- Secure JWT/session architecture
- bcrypt or argon2

Use environment variables for:
- Database URL
- Authentication secrets
- Cloudinary credentials
- Any other sensitive configuration

Do not hard-code secrets.

==================================================
8. PROJECT ARCHITECTURE
==================================================

Prefer a clean monorepo or clearly separated frontend/backend structure.

Example:

/frontend
/backend

or another equally clean structure.

Backend should have clear separation between:

- routes
- controllers
- services
- middleware
- validation
- database/prisma
- utilities
- authentication
- authorization
- reporting/export services

Frontend should have clear separation between:

- pages/routes
- components
- layouts
- API client
- hooks
- state management where actually needed
- types
- utilities

Avoid unnecessary complexity.

==================================================
9. DATABASE DESIGN
==================================================

Design a normalized PostgreSQL schema.

At minimum support:

users
roles
responsibilities
user_responsibilities
expenses
audit_logs

Suggested fields:

USER:
- id
- firstName
- lastName
- email/username
- passwordHash
- profileImageUrl
- roleId
- isActive
- createdAt
- updatedAt
- lastLoginAt

ROLE:
- id
- name
- createdAt
- updatedAt

RESPONSIBILITY:
- id
- name
- description
- isActive
- createdAt
- updatedAt

USER_RESPONSIBILITY:
- id
- userId
- responsibilityId
- assignedAt
- assignedBy
- unique constraint on userId + responsibilityId

EXPENSE:
- id
- userId
- responsibilityId
- subItemId if implemented
- expenseDate
- amount
- remark
- createdAt
- updatedAt
- createdBy
- updatedBy

AUDIT_LOG:
- id
- actorUserId
- action
- entityType
- entityId
- metadata/details
- createdAt

Use foreign keys and appropriate indexes.

Important indexes should exist for:
- expenseDate
- userId
- responsibilityId
- combinations frequently used by reports

Use decimal/numeric database types for monetary amounts rather than floating point.

==================================================
10. EXPENSE ENTRY
==================================================

Create a beautiful, fast expense-entry form.

Fields:

1. Date
   - Date picker
   - Default to today's date
   - User can choose another date

2. Responsibility
   - Dropdown
   - Only show responsibilities assigned to logged-in user
   - Admin can select any responsibility when entering/editing an expense
   - Never trust the frontend; backend must verify assignment

3. Sub-item
   - Show only if relevant
   - Dynamically populated from the selected responsibility

4. Amount
   - Numeric/currency input
   - Must be greater than 0
   - Proper validation

5. Remark
   - Optional
   - Text field/textarea

6. Submit button

After successful submission:
- Show clear success feedback
- Reset appropriate fields
- Keep date convenient for entering multiple daily expenses
- Update dashboard/list data

The form must work well on mobile because family members may enter expenses from phones.

==================================================
11. EXPENSE LIST
==================================================

Create an expenses page.

Members:
- See only their own expenses.

Admin:
- Can see all family expenses.

Display:
- Date
- User
- Responsibility
- Sub-item where applicable
- Amount
- Remark
- Created timestamp

Provide:
- Search
- Date filters
- Responsibility filter
- User filter for admin
- Sorting
- Pagination or efficient infinite loading
- Edit
- Delete

Use confirmation before destructive actions.

==================================================
12. DASHBOARD
==================================================

Build a polished analytics dashboard.

The dashboard should immediately answer:

- How much have I spent?
- How much did the family spend?
- Which responsibility consumes the most?
- How much was spent this month?
- How much was spent in recent periods?
- How is spending distributed?

MEMBER DASHBOARD:
Show only the logged-in user's data.

ADMIN DASHBOARD:
Show family-wide data and allow filtering by member.

Dashboard cards:

- Total spending
- Current month spending
- Last 30 days
- Last 90 days
- Number of expenses
- Highest spending responsibility

Charts:

1. Spending over time
   - Daily/weekly/monthly depending on selected range

2. Spending by responsibility
   - Pie/donut/bar chart

3. Member-wise spending
   - Admin only

4. Monthly spending trend

Keep charts clean and useful rather than overloading the dashboard.

==================================================
13. REPORT FILTERING
==================================================

Reporting must support predefined filters:

- This month
- Last month
- Last 30 days
- Last 60 days
- Last 90 days
- Last 6 months
- This year
- Custom date range

Also allow filtering by:

ADMIN:
- User
- Responsibility
- Sub-item
- Date range

MEMBER:
- Their responsibility
- Sub-item
- Date range

Example:

Hrithik selects:

Date:
Last 90 days

Responsibility:
Milk

Then the report should show exactly how much was spent on Milk during those 90 days.

Another example:

Hrithik:
Last 90 days
Responsibility:
Chicken

Result:
- Number of transactions
- Total amount
- Average expense
- Date-wise records

Another:

ADMIN:
Last 6 months
User:
Hrithik
Responsibility:
Milk

Result:
Hrithik's Milk expenses for the selected period.

==================================================
14. REPORT PAGE
==================================================

Create a dedicated Reports page.

Layout:

Top:
- Date range selector
- Quick range buttons
- User filter (admin only)
- Responsibility filter
- Sub-item filter
- Apply filters
- Reset filters

Summary:
- Total
- Transaction count
- Average
- Highest expense
- Lowest expense

Data table:
- Date
- User
- Responsibility
- Sub-item
- Amount
- Remark

Charts:
- Spending trend
- Category/responsibility breakdown

Export actions:
- Export Excel
- Export PDF

==================================================
15. EXCEL EXPORT
==================================================

Excel export must respect currently selected filters.

Example:
If user selects:

Last 90 days
+
Milk

then Excel should contain only Milk expenses from the last 90 days.

Excel report should include:

Report title
Generated date
Applied filters

Summary:
- Total spending
- Number of transactions
- Average expense

Detailed rows:
- Date
- User
- Responsibility
- Sub-item
- Amount
- Remark

Make the spreadsheet clean and professional.

Use proper formatting:
- Currency/amount formatting
- Header styling
- Column widths
- Date formatting
- Totals

Admin export can contain all users.

Member export must never expose other users' data.

==================================================
16. PDF EXPORT
==================================================

PDF export must also respect all currently selected filters.

Include:

- Application/family expense report title
- Date generated
- Selected date range
- User filter
- Responsibility filter
- Summary statistics
- Expense table
- Total spending

The PDF should be readable and professional.

Handle multi-page reports correctly.

==================================================
17. ADMIN PANEL
==================================================

Create a proper Admin Dashboard.

Admin sections:

A. Overview
B. Users
C. Responsibilities
D. Assign Responsibilities
E. All Expenses
F. Reports
G. Audit Logs
H. Settings/Profile

==================================================
18. USER MANAGEMENT
==================================================

Admin can:

- View all users
- Search users
- Add user
- Edit user
- Activate/deactivate user
- Reset user password where appropriate
- View assigned responsibilities
- Assign responsibilities
- Remove responsibilities

User list should show:

- Profile picture
- Name
- Login identifier
- Role
- Active/inactive status
- Number of assigned responsibilities
- Total expenses
- Last activity/login where available

Do not allow an admin to accidentally remove their own final admin access.

==================================================
19. RESPONSIBILITY MANAGEMENT
==================================================

This is a critical feature.

Create a dedicated responsibility management interface.

Admin should be able to:

- View all responsibilities
- Add responsibility
- Edit responsibility
- Deactivate responsibility
- Reactivate responsibility
- Delete responsibility only when safe
- Add/edit/remove sub-items
- Assign responsibility to users

Provide a clear assignment interface.

Recommended UI:

Responsibility matrix:

                 Ravi   Ravindra   Riya   Hrithik
Loans             ✓
EMIs              ✓
Heavy Grocery             ✓
Vegetables                            ✓
Milk                                             ✓
Dahi                                             ✓

Allow admin to quickly assign/unassign.

Also provide a user-centric view:

Ravi
[Loans] [EMIs]

Riya
[Vegetables] [Fruits] [Groceries] ...

This must be dynamic.

If tomorrow admin decides:

Riya should also manage Milk

Admin simply assigns Milk to Riya.

Riya logs in and Milk immediately appears in her expense-entry dropdown.

NO CODE CHANGE.

==================================================
20. RESPONSIBILITY ASSIGNMENT RULES
==================================================

A responsibility can potentially be assigned to multiple users if the admin chooses.

However, each individual expense belongs to:
- One user
- One responsibility

The backend must always validate:

logged-in member
    ↓
assigned responsibility
    ↓
expense creation

If a member attempts to manually submit a responsibility ID that isn't assigned to them, reject the request.

Never trust frontend filtering as security.

==================================================
21. AUDIT LOG
==================================================

Implement audit logging.

Track important admin/member actions such as:

- User created
- User updated
- User deactivated
- Responsibility created
- Responsibility updated
- Responsibility assigned
- Responsibility unassigned
- Expense created
- Expense updated
- Expense deleted
- Password changed
- Profile updated

Admin should have an Audit Logs page.

Display:
- Date/time
- User
- Action
- Entity
- Relevant details

Do not store sensitive data such as plaintext passwords in logs.

==================================================
22. UI/UX
==================================================

The UI should feel like a polished modern personal finance application.

Design goals:
- Clean
- Minimal
- Modern
- Fast
- Mobile-first
- Responsive
- Easy for non-technical family members

Use:
- Cards
- Tables
- Charts
- Modals/dialogs
- Toast notifications
- Skeleton loaders
- Empty states
- Confirmation dialogs
- Form validation messages

Create:
- Desktop sidebar
- Mobile navigation
- Top header
- User avatar/profile menu

Dashboard should not feel like an enterprise accounting system.

It should feel simple and approachable.

==================================================
23. MOBILE EXPERIENCE
==================================================

Mobile usability is extremely important.

Expense entry should be extremely quick.

Ideal flow:

Open app
→ Dashboard
→ Add Expense
→ Date already selected
→ Select responsibility
→ Enter amount
→ Optional remark
→ Save

The form must work comfortably on small screens.

Tables should become mobile-friendly cards or horizontally scroll when necessary.

==================================================
24. SEARCH / FILTER PERFORMANCE
==================================================

Do not retrieve the entire database and filter everything in the browser.

Filtering, pagination, sorting, aggregation, and reporting should happen server-side.

Use PostgreSQL queries/Prisma efficiently.

Avoid N+1 queries.

Create proper indexes.

==================================================
25. API DESIGN
==================================================

Create clean REST APIs.

Example:

AUTH:
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/change-password
GET  /api/auth/me

USERS:
GET    /api/users
POST   /api/users
GET    /api/users/:id
PATCH  /api/users/:id
DELETE /api/users/:id

RESPONSIBILITIES:
GET    /api/responsibilities
POST   /api/responsibilities
GET    /api/responsibilities/:id
PATCH  /api/responsibilities/:id
DELETE /api/responsibilities/:id

ASSIGNMENTS:
GET    /api/users/:id/responsibilities
POST   /api/users/:id/responsibilities
DELETE /api/users/:id/responsibilities/:responsibilityId

EXPENSES:
GET    /api/expenses
POST   /api/expenses
GET    /api/expenses/:id
PATCH  /api/expenses/:id
DELETE /api/expenses/:id

REPORTS:
GET /api/reports/summary
GET /api/reports/expenses
GET /api/reports/export/excel
GET /api/reports/export/pdf

PROFILE:
GET   /api/profile
PATCH /api/profile
POST  /api/profile/avatar

AUDIT:
GET /api/audit-logs

These are examples. You may structure the APIs differently if there is a strong architectural reason, but keep them clean and RESTful.

==================================================
26. VALIDATION
==================================================

Use strong backend and frontend validation.

Validate:
- Required fields
- Date
- Amount
- Responsibility ownership
- User permissions
- File uploads
- Password requirements
- Duplicate assignments
- Invalid IDs

Use a validation library such as Zod where appropriate.

Return consistent API error responses.

==================================================
27. ERROR HANDLING
==================================================

Implement proper global error handling.

Frontend:
- Friendly error messages
- Toasts
- Retry where appropriate
- Loading states
- Empty states

Backend:
- Central error middleware
- Correct HTTP status codes
- No sensitive stack traces in production
- Structured errors

==================================================
28. SECURITY
==================================================

Take security seriously.

Implement:
- Password hashing
- Secure authentication
- Authorization middleware
- Input validation
- SQL injection protection through Prisma
- Rate limiting on authentication endpoints
- CORS configuration
- Secure cookies where applicable
- Security headers
- File upload validation
- No secret values committed to source
- No sensitive information in logs

Never trust:
- userId from request body
- role from request body
- responsibility ownership from frontend

Derive identity from authenticated session/token.

==================================================
29. DATA INTEGRITY
==================================================

Use database transactions where needed.

Examples:
- Assigning responsibilities
- Removing assignments
- User operations
- Expense mutations

Do not allow orphaned expenses.

If a responsibility is no longer active, historical expenses must remain intact.

Prefer soft deactivation rather than destructive deletion for entities referenced by historical data.

Historical reports must continue working.

==================================================
30. SEED DATA
==================================================

Create Prisma seed functionality.

Seed:

Roles:
- ADMIN
- MEMBER

Users:
- Ravi
- Ravindra
- Riya
- Hrithik

Seed all responsibilities listed above and assign them appropriately.

Create safe development credentials through environment variables or clearly documented seed configuration.

Do not expose real passwords in production.

Make the seed idempotent where practical.

==================================================
31. ENVIRONMENT CONFIGURATION
==================================================

Create a .env.example.

Include placeholders such as:

DATABASE_URL=
DIRECT_URL=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

FRONTEND_URL=
BACKEND_URL=

Do not commit actual credentials.

==================================================
32. DATABASE MIGRATIONS
==================================================

Use Prisma migrations.

Provide:
- Initial migration
- Seed script
- Clear commands in README

The application should be easy to set up on a new machine.

==================================================
33. README
==================================================

Create a professional README containing:

- Project overview
- Architecture
- Tech stack
- Folder structure
- Environment variables
- Local setup
- Database setup
- Prisma migration commands
- Seed commands
- Development commands
- Production build commands
- How Cloudinary is configured
- How frontend communicates with backend
- API overview
- Role/permission model
- Deployment guidance

==================================================
34. TESTING
==================================================

Add meaningful tests for critical backend behavior.

At minimum test:

Authentication
Authorization
Member responsibility restrictions
Admin responsibility assignment
Expense creation
Invalid responsibility rejection
Report filtering
Basic aggregation

Especially test this security scenario:

Hrithik logs in.

Hrithik is assigned:
Milk
Dahi
Chicken
Eggs
Paneer
Retail Shopping upto 0-50-100
Buy New Things

Hrithik attempts to create an expense using Riya's "Vegetables" responsibility by manually changing the responsibility ID in the API request.

The backend MUST reject it.

Also test:

Admin can view all expenses.

Member cannot view another member's expenses.

==================================================
35. IMPORTANT DYNAMIC BEHAVIOR
==================================================

The application should be metadata-driven.

Do NOT do this:

if user === "Hrithik":
    show Milk
    show Dahi
    ...

That is forbidden.

Instead:

Database
    ↓
UserResponsibility
    ↓
Authenticated user
    ↓
API
    ↓
Frontend dropdown

Similarly, do not hard-code:
- Responsibility names
- User-specific categories
- Dashboard category lists
- Reports
- Admin assignment logic

Everything must come from the database/configuration.

==================================================
36. ADMIN EXPERIENCE
==================================================

The admin should effectively be able to operate the application without developer intervention.

For example:

Tomorrow a new family member joins.

Admin:
1. Opens Users
2. Adds user
3. Assigns role
4. Creates/assigns responsibilities
5. User logs in

No code changes.

Another example:

Admin wants to move "Milk" responsibility from Hrithik to Riya.

Admin:
1. Opens Responsibility Management
2. Finds Milk
3. Removes Hrithik
4. Assigns Riya

Riya immediately sees Milk in her expense form.

No deployment.

Another example:

Admin creates:
"Internet Bill"

Assigns it to Ravi.

Ravi immediately sees it.

==================================================
37. DASHBOARD PERMISSION BEHAVIOR
==================================================

Member:

Dashboard data must be scoped to:

authenticatedUser.id

Admin:

Dashboard can be:
- Family-wide by default
- Filterable by member
- Filterable by responsibility
- Filterable by date

Admin should be able to answer:

"How much did everyone spend this month?"

"How much did Hrithik spend in the last 90 days?"

"How much was spent on Milk?"

"How much did Riya spend on Vegetables?"

"Which responsibility costs the family the most?"

==================================================
38. REPORT EXAMPLES
==================================================

Example 1:

Hrithik
Last 30 days
All responsibilities

→ Show all Hrithik expenses.

Example 2:

Hrithik
Last 90 days
Milk

→ Show only Milk expenses.

Example 3:

Admin
Last 6 months
Hrithik
Milk

→ Show Hrithik's Milk spending.

Example 4:

Admin
This month
All users
All responsibilities

→ Family monthly expense report.

Example 5:

Admin
Custom:
2026-01-01 → 2026-03-31
Responsibility:
Electricity Bill

→ Show family expenses recorded against Electricity Bill during that period.

All of these filters must also work for Excel and PDF exports.

==================================================
39. UI ROUTES
==================================================

Create appropriate routes.

Suggested:

/login

/dashboard

/expenses

/expenses/new

/reports

/profile
/settings

/admin

/admin/users

/admin/users/[id]

/admin/responsibilities

/admin/assignments

/admin/expenses

/admin/reports

/admin/audit-logs

You may adjust the route structure if your architecture benefits from it.

Protect routes appropriately.

==================================================
40. EMPTY STATES
==================================================

Handle cases such as:

- No expenses yet
- No responsibilities assigned
- No report results
- No users
- No search results
- No audit logs

Do not display broken-looking tables.

Show useful empty-state messages and actions.

==================================================
41. LOADING STATES
==================================================

Every asynchronous operation should have proper loading feedback.

Examples:
- Login
- Dashboard
- Expense submission
- Expense deletion
- User creation
- Responsibility assignment
- Report generation
- Excel export
- PDF export
- Cloudinary upload

==================================================
42. ACCESSIBILITY
==================================================

Follow reasonable accessibility practices:

- Labels for inputs
- Keyboard navigation
- Visible focus states
- Accessible dialogs
- Accessible buttons
- Proper contrast
- Semantic HTML
- Screen-reader-friendly form errors

==================================================
43. PERFORMANCE
==================================================

Keep the application lightweight.

Avoid:
- unnecessary libraries
- unnecessary global state
- huge UI frameworks
- excessive API calls
- client-side processing of large datasets

Use server-side aggregation and filtering.

Cache only where useful.

==================================================
44. CODE QUALITY
==================================================

Use TypeScript properly.

Avoid:
- any everywhere
- duplicated business logic
- massive components
- hard-coded user/category mappings
- secrets in source
- unnecessary abstraction

Use:
- reusable components
- typed API responses
- service layers
- clear naming
- reusable validation
- centralized error handling

==================================================
45. FINAL IMPLEMENTATION REQUIREMENT
==================================================

Build the application completely.

Do not stop after:
- creating schema
- creating UI
- creating APIs
- creating authentication

Everything must be connected.

The expected flow is:

Login
 ↓
Authenticated session
 ↓
Role detection
 ↓
Dashboard
 ↓
User-specific responsibilities
 ↓
Expense entry
 ↓
Database
 ↓
Analytics
 ↓
Reports
 ↓
Excel/PDF export

Admin flow:

Login
 ↓
Admin dashboard
 ↓
Users
 ↓
Responsibilities
 ↓
Assignments
 ↓
Expenses
 ↓
Analytics
 ↓
Reports
 ↓
Audit logs

==================================================
46. ACCEPTANCE CRITERIA
==================================================

The implementation is considered complete only if all of the following work:

[ ] User can log in.
[ ] Admin can log in.
[ ] Role-based access works.
[ ] Member sees only assigned responsibilities.
[ ] Backend prevents unauthorized responsibility usage.
[ ] User can add an expense.
[ ] Expense is persisted in Neon PostgreSQL.
[ ] User can see their expense history.
[ ] Admin can see all family expenses.
[ ] Admin can filter expenses by user.
[ ] Admin can filter by responsibility.
[ ] Admin can add users.
[ ] Admin can edit users.
[ ] Admin can activate/deactivate users.
[ ] Admin can create responsibilities.
[ ] Admin can edit responsibilities.
[ ] Admin can deactivate responsibilities.
[ ] Admin can assign responsibilities.
[ ] Admin can remove responsibilities.
[ ] Assignment changes immediately affect member dropdowns.
[ ] No code change is required for responsibility changes.
[ ] Dashboard analytics work.
[ ] Date filters work.
[ ] Custom date range works.
[ ] Last 30 days works.
[ ] Last 60 days works.
[ ] Last 90 days works.
[ ] Last 6 months works.
[ ] This month works.
[ ] This year works.
[ ] Responsibility-specific reports work.
[ ] User-specific reports work.
[ ] Admin family reports work.
[ ] Excel export works.
[ ] PDF export works.
[ ] Export respects filters.
[ ] Member exports contain only their own authorized data.
[ ] Profile editing works.
[ ] Profile picture upload works through Cloudinary.
[ ] Password change works.
[ ] Forgot/reset password flow works.
[ ] Audit logs work.
[ ] Mobile UI works.
[ ] Loading states work.
[ ] Error handling works.
[ ] Database migrations work.
[ ] Seed data works.
[ ] README is complete.
[ ] No critical TODOs remain.

==================================================
47. IMPORTANT FINAL INSTRUCTION
==================================================

Before considering the task complete:

1. Inspect the entire generated project.
2. Verify frontend/backend integration.
3. Verify Prisma schema and migrations.
4. Verify seed data.
5. Verify authentication.
6. Verify authorization.
7. Verify member responsibility restrictions.
8. Verify admin responsibility assignment.
9. Verify expense CRUD.
10. Verify dashboard aggregation.
11. Verify date filtering.
12. Verify responsibility filtering.
13. Verify user filtering.
14. Verify Excel generation.
15. Verify PDF generation.
16. Verify Cloudinary integration.
17. Verify profile settings.
18. Verify audit logging.
19. Run available tests.
20. Run lint/type checks/build.
21. Fix any errors found.
22. Ensure the final project can actually be started using the documented commands.

Do not tell me that something is "left for later."

Implement it.

If you encounter an implementation decision that is not explicitly specified, choose the simplest production-quality solution consistent with the requirements above.

The priority order is:

1. Correctness
2. Security
3. Dynamic/admin-driven behavior
4. Data integrity
5. Excellent UX
6. Performance
7. Maintainability

Build the complete application now.