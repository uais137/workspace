# CLAUDE.md - Mandatory Coding Methodology for SaaS Platform

## 🚨 CRITICAL: This Document Contains EXACT Instructions You MUST Follow

### Every Single Coding Session MUST Follow This Exact Process

---

## 📖 PHASE 1: MANDATORY READING (Before Writing ANY Code)

### Step 1.1: Read Current State Files
```bash
# YOU MUST READ THESE IN THIS EXACT ORDER:
1. cat PROJECT_STATE.md          # Current project state and active work
2. cat CURRENT_SPRINT.md         # What's being worked on right now
3. cat ERROR_LOG.md             # Unresolved errors from previous sessions
4. cat TEST_RESULTS.md          # Latest test run results
5. cat git_log_latest.txt       # Last 20 commits (git log --oneline -20 > git_log_latest.txt)
```

### Step 1.2: Read Task Context
```bash
# READ THE SPECIFIC TASK FILES:
1. cat PRPs/current_task.md      # Current task requirements
2. cat context/current_module/   # Read ALL files in current module's context
3. cat examples/similar_feature/ # Find and read similar implementations
```

### Step 1.3: Generate Implementation Plan
```bash
# CREATE YOUR PLAN BEFORE CODING:
1. Create file: IMPLEMENTATION_PLAN_[timestamp].md
2. Write:
   - Current understanding of task
   - Files that will be modified
   - New files that will be created
   - Tests that will be written
   - Potential error scenarios
```

---

## 🔨 PHASE 2: IMPLEMENTATION PROCESS

### Step 2.1: Pre-Implementation Checklist
```bash
# EXECUTE THESE COMMANDS FIRST:
git status                       # Ensure clean working directory
npm test                        # Ensure all tests pass before starting
npm run lint                    # Ensure no linting errors
echo "Starting: [task_name] at $(date)" >> WORK_LOG.md
```

### Environment Setup
```bash
# FIRST TIME SETUP:
cp .env.template .env          # Copy template to .env
# Edit .env with your actual credentials

# LOAD ENVIRONMENT VARIABLES:
source .env

# STANDARD GIT OPERATIONS:
git add .                        # Stage all changes
git commit -m "descriptive message"  # Commit with clear message

# PUSH TO REMOTE (using environment variables):
git push https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/$GITHUB_USERNAME/workspace.git main

# ALTERNATIVE PUSH METHODS:
git push -u origin main          # Set upstream and push
git push origin main             # Standard push to origin

# CREDENTIAL CONFIGURATION (using environment variables):
git config --global credential.helper store
git config --global user.name "$GITHUB_USERNAME"
git config --global user.email "$GITHUB_EMAIL"
```

### Application Login Commands
```bash
# LOAD ENVIRONMENT VARIABLES:
source .env

# DATABASE CONNECTION:
psql -h $DB_HOST -p $DB_PORT -U $DB_USERNAME -d $DB_NAME

# REDIS CONNECTION:
redis-cli -h $REDIS_HOST -p $REDIS_PORT -a $REDIS_PASSWORD

# APPLICATION STARTUP:
PORT=$APP_PORT npm start

# ENVIRONMENT REFERENCE:
echo "GitHub: $GITHUB_USERNAME"
echo "Database: $DB_USERNAME@$DB_HOST:$DB_PORT/$DB_NAME"
echo "App Port: $APP_PORT"
```

### Step 2.2: Write Code in Small Chunks
```bash
# AFTER EVERY 20-30 LINES OF CODE:
1. Save the file
2. Run: npm run lint [filename]
3. If errors exist:
   - Fix immediately
   - Document fix in ERROR_LOG.md
4. Update PROGRESS.md with:
   - What was just implemented
   - What's next
   - Any blockers discovered
```

### Step 2.3: Test Immediately
```bash
# AFTER EACH FUNCTION/COMPONENT:
1. Write the test FIRST (TDD)
2. Run: npm test [test_file]
3. If test fails:
   - DO NOT CONTINUE
   - Fix until test passes
   - Log error and solution in ERROR_LOG.md
4. Update TEST_RESULTS.md
```

---

## 📝 PHASE 3: DOCUMENTATION UPDATES (After EVERY Feature)

### Step 3.1: Update Context Files
```bash
# THESE UPDATES ARE MANDATORY:
1. Update context/[module]/patterns.md with any new patterns used
2. Update context/[module]/examples.md with code snippets
3. Update context/[module]/gotchas.md with any tricky parts
4. Update context/[module]/dependencies.md if new packages added
```

### Step 3.2: Update Project State
```bash
# UPDATE THESE FILES:
1. PROJECT_STATE.md:
   - Mark completed items as DONE
   - Add any new discoveries
   - Update next steps

2. PROGRESS.md:
   - Timestamp entry
   - What was completed
   - Test results
   - Any issues encountered

3. API_CHANGES.md (if applicable):
   - New endpoints
   - Modified endpoints
   - Breaking changes
```

### Step 3.3: Create Revision Snapshot
```bash
# FOR SIGNIFICANT FEATURES:
1. Create: revisions/[feature]_[timestamp]/
2. Copy:
   - All modified files
   - Current test results
   - Implementation notes
3. Create: revisions/[feature]_[timestamp]/ROLLBACK.md
   - Exact commands to revert
   - Database rollback if needed
   - Configuration changes
```

---

## 🧪 PHASE 4: VALIDATION PROCESS

### Step 4.1: Run Full Test Suite
```bash
# MANDATORY BEFORE CONSIDERING TASK COMPLETE:
1. npm test                     # All unit tests
2. npm run test:integration     # Integration tests
3. npm run test:e2e            # E2E tests for affected flows
4. Results → TEST_RESULTS.md with timestamp
```

### Step 4.2: Check for Regressions
```bash
# COMPARE WITH BASELINE:
1. diff TEST_RESULTS.md TEST_RESULTS_baseline.md
2. If new failures:
   - STOP everything
   - Fix regressions first
   - Document in REGRESSION_LOG.md
```

### Step 4.3: Performance Check
```bash
# FOR API ENDPOINTS OR DATA OPERATIONS:
1. Run performance test
2. Compare with PERFORMANCE_BASELINE.md
3. If degraded by >10%:
   - Optimize
   - Document changes
```

---

## 🔄 PHASE 5: COMMIT PROCESS

### Step 5.1: Pre-Commit Validation
```bash
# RUN THIS CHECKLIST:
□ All tests passing
□ No linting errors  
□ Documentation updated
□ Context files updated
□ No commented out code
□ No console.logs in production code
```

### Step 5.2: Commit Structure
```bash
# COMMIT MESSAGE FORMAT:
[module]: Brief description

- Detailed change 1
- Detailed change 2
- Tests added/modified

References: #ticket_number
```

### Step 5.3: Post-Commit Updates
```bash
# IMMEDIATELY AFTER COMMIT:
1. Update git_log_latest.txt
2. Update CURRENT_SPRINT.md progress
3. If feature complete:
   - Move task to COMPLETED_TASKS.md
   - Update PROJECT_STATE.md
```

---

## 🔥 ERROR HANDLING PROTOCOL

### When ANY Error Occurs:
```bash
1. STOP coding immediately
2. Document in ERROR_LOG.md:
   - Timestamp
   - Error message (full)
   - File and line number
   - What was being attempted
   
3. Read these before fixing:
   - context/[module]/known_issues.md
   - ERROR_LOG.md (previous similar errors)
   
4. After fixing:
   - Update ERROR_LOG.md with solution
   - Add to context/[module]/gotchas.md if tricky
   - Write test to prevent recurrence
```

---

## 🔙 REVERSION PROTOCOL

### To Revert to Previous State:
```bash
1. Read: revisions/REVERSION_GUIDE.md
2. Identify target revision:
   - Check git tags
   - Check revisions/[feature]_[timestamp]/
   
3. Execute reversion:
   - git log --oneline -30  # Find target commit
   - Read revision snapshot notes
   - Follow ROLLBACK.md instructions
   
4. After reversion:
   - Update PROJECT_STATE.md
   - Document reason in REVERSION_LOG.md
   - Update CURRENT_SPRINT.md
```

---

## 📋 DAILY STARTUP PROTOCOL

### Every Day Before Any Coding:
```bash
1. git pull origin main
2. npm install                  # Check for new dependencies
3. Read PROJECT_STATE.md       # Understand current state
4. Read CURRENT_SPRINT.md      # Know priorities
5. Read ERROR_LOG.md           # Check unresolved issues
6. Read last 10 entries in PROGRESS.md
7. Create DAILY_PLAN_[date].md with specific goals
```

---

## 🏁 TASK COMPLETION CHECKLIST

### Before Marking ANY Task as Complete:
```bash
□ All acceptance criteria met (from PRP)
□ All tests written and passing
□ Documentation fully updated
□ Context files updated
□ No TODO comments left
□ Performance benchmarks met
□ Security review completed (if applicable)
□ Revision snapshot created
□ PROGRESS.md updated with completion note
□ PROJECT_STATE.md updated
□ Next developer can understand everything from docs alone
```

---

## ⚠️ NEVER SKIP THESE RULES

1. **NEVER** write code without reading current state files first
2. **NEVER** commit without all tests passing
3. **NEVER** leave errors undocumented in ERROR_LOG.md
4. **NEVER** complete a task without updating context files
5. **NEVER** assume - always verify by reading the files
6. **NEVER** continue if confused - re-read context and ask for clarification

---

## 🎯 SUCCESS METRICS

Your code session is successful when:
- Zero errors in ERROR_LOG.md from your session
- All tests pass (100%)
- Documentation is so complete another developer needs no explanation
- Context files contain all learnings
- Reversion would be simple using your snapshots
- PROJECT_STATE.md accurately reflects reality

---

---

## 📁 PROJECT STRUCTURE & FILE LOCATIONS

### SaaS Platform Directory Structure
Based on SaaS-Development-Guide.md, use this EXACT structure for all file creation:

```
/workspace/
├── frontend/           # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page-level components
│   │   ├── auth/          # Authentication components
│   │   ├── modules/       # Module-specific components (CRM, LeadGen, etc.)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # React context providers
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # Global styles and Tailwind config
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
│
├── backend/            # FastAPI Python backend
│   ├── app/
│   │   ├── main.py          # FastAPI application entry
│   │   ├── auth/            # Authentication module
│   │   ├── crm/             # CRM module
│   │   ├── leadgen/         # Lead generation module
│   │   ├── kanban/          # Kanban board module
│   │   ├── documents/       # Document management module
│   │   ├── core/            # Core utilities and models
│   │   ├── database/        # Database models and connection
│   │   └── api/             # API route definitions
│   └── requirements.txt     # Python dependencies
│
├── database/           # Database scripts and migrations
│   ├── migrations/       # Alembic migrations
│   ├── init/            # Initial database setup
│   └── backups/         # Database backups
│
├── api/                # API documentation and schemas
│   ├── schemas/         # Pydantic models
│   └── docs/            # API documentation
│
├── scripts/            # Development and deployment scripts
│   ├── deploy.sh        # Deployment script
│   ├── backup.sh        # Backup script
│   └── setup.sh         # Environment setup
│
├── config/             # Configuration files
│   ├── nginx/           # Nginx configuration
│   ├── redis/           # Redis configuration
│   └── docker/          # Docker configurations
│
├── tests/              # Test files
│   ├── frontend/        # Frontend tests
│   ├── backend/         # Backend tests
│   └── integration/     # Integration tests
│
├── docs/               # Project documentation
│   ├── api/             # API documentation
│   ├── user/            # User guides
│   └── development/     # Development guides
│
├── uploads/            # User uploaded files
├── temp/               # Temporary files
├── shared/             # Shared utilities
└── logs/               # Application logs
```

### Authentication Module Structure (Current Task)
```
/workspace/frontend/src/auth/
├── components/
│   ├── GodLogin.tsx         # Level 0 God Admin login
│   ├── BusinessCreation.tsx # Business owner creation form
│   ├── CompanySwitch.tsx    # Company profile switching
│   └── UserManagement.tsx   # User role management
├── pages/
│   ├── AuthPage.tsx         # Main authentication page
│   └── GodDashboard.tsx     # God admin dashboard
├── hooks/
│   ├── useAuth.tsx          # Authentication hook
│   └── useGodPermissions.tsx # God-level permissions
├── context/
│   └── AuthContext.tsx      # Authentication context
└── styles/
    └── auth.css             # Authentication styles
```

### ALWAYS use this structure when creating files. Never deviate from these paths.

---

**THIS DOCUMENT IS LAW. FOLLOW IT EXACTLY.**
