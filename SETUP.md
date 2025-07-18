# SETUP.md - Context Engineering Setup for Multi-Tenant SaaS

## 🚀 Quick Start Guide

This repository implements Context Engineering methodology for building a multi-tenant SaaS platform. Follow these steps to set up your development environment for maximum productivity with Claude Code.

---

## 📁 Step 1: Create Directory Structure

```bash
# Create the required directories
mkdir -p .claude/commands
mkdir -p PRPs/templates
mkdir -p context/{auth,tenant,crm,documents,projects,shared}
mkdir -p examples/{auth,database,middleware,tests}
mkdir -p revisions
mkdir -p docs/{api,architecture,features}

# Create tracking files
touch PROJECT_STATE.md
touch CURRENT_SPRINT.md
touch PROGRESS.md
touch ERROR_LOG.md
touch TEST_RESULTS.md
touch WORK_LOG.md
touch API_DOCUMENTATION.md
touch PERFORMANCE_BASELINE.md
touch REGRESSION_LOG.md
touch REVERSION_LOG.md
touch git_log_latest.txt
```

## 📄 Step 2: Install Core Files

1. **Copy these methodology files**:
   - `CLAUDE.md` - The exact methodology (THIS IS LAW)
   - `PROJECT_STATE.md` - Current project state tracking
   - `PROGRESS.md` - Detailed progress log
   - `ERROR_LOG.md` - Error tracking database

2. **Copy PRP templates**:
   - `PRPs/templates/prp_base.md` - PRP template
   - `INITIAL.md` - Feature request template

3. **Copy Claude Code commands**:
   - `.claude/commands/generate-prp.md` - Generate PRPs
   - `.claude/commands/execute-prp.md` - Execute PRPs

4. **Copy context structure**:
   - `context/auth/*` - Authentication patterns
   - `context/shared/*` - Shared patterns

## 🔧 Step 3: Configure Claude Code

Create `.claude/settings.local.json`:
```json
{
  "maxFileSize": 100000,
  "gitEnabled": true,
  "commands": {
    "generate-prp": {
      "description": "Generate comprehensive PRP from INITIAL.md",
      "path": ".claude/commands/generate-prp.md"
    },
    "execute-prp": {
      "description": "Execute PRP implementation",
      "path": ".claude/commands/execute-prp.md"
    }
  }
}
```

## 🎯 Step 4: Initialize Your First Feature

1. **Create your first INITIAL.md**:
   ```bash
   cp INITIAL_EXAMPLE.md INITIAL_current.md
   # Edit to describe your first feature
   ```

2. **Generate the PRP**:
   ```bash
   /generate-prp INITIAL_current.md
   ```

3. **Execute the implementation**:
   ```bash
   /execute-prp PRPs/[generated-prp-name].md
   ```

## 📋 Step 5: Daily Workflow

### Every Morning:
```bash
# 1. Update your repo
git pull origin main

# 2. Read current state
cat PROJECT_STATE.md
cat CURRENT_SPRINT.md
cat ERROR_LOG.md

# 3. Check recent progress
tail -50 PROGRESS.md

# 4. Create daily plan
echo "## $(date +%Y-%m-%d) Daily Plan" > DAILY_PLAN_$(date +%Y%m%d).md
```

### Before Each Task:
```bash
# 1. Ensure clean state
git status
npm test

# 2. Read relevant context
cat PRPs/current_task.md
cat context/[module]/*.md

# 3. Create feature branch
git checkout -b feature/[task-name]
```

### During Development:
- **Every 20-30 lines**: Save, lint, update PROGRESS.md
- **Every function**: Write test first, implement, verify
- **Every error**: Log in ERROR_LOG.md with solution
- **Every pattern**: Update context/[module]/patterns.md

### After Each Task:
```bash
# 1. Run all tests
npm test
npm run test:integration

# 2. Update documentation
# Update all context files
# Update API_DOCUMENTATION.md

# 3. Create revision snapshot
mkdir revisions/[feature]_$(date +%s)/
# Copy important files

# 4. Commit with detailed message
git add .
git commit -m "[module]: Description"

# 5. Update tracking
# Update PROJECT_STATE.md
# Update CURRENT_SPRINT.md
```

## 🔄 Step 6: Using the Reversion System

### Creating Snapshots:
```bash
# For major features
mkdir revisions/[feature]_[timestamp]/
cp -r src/modules/[module] revisions/[feature]_[timestamp]/
echo "Rollback instructions..." > revisions/[feature]_[timestamp]/ROLLBACK.md
```

### Reverting Changes:
```bash
# 1. Find target revision
ls -la revisions/
cat revisions/[feature]_[timestamp]/ROLLBACK.md

# 2. Follow rollback instructions
git log --oneline -20
git checkout [commit-hash] -- .

# 3. Update tracking
echo "Reverted [feature] at $(date)" >> REVERSION_LOG.md
```

## 🧪 Step 7: Testing Strategy

### Test Organization:
```
src/modules/[module]/
├── tests/
│   ├── unit/
│   │   ├── [service].spec.ts
│   │   └── [helper].spec.ts
│   ├── integration/
│   │   └── [controller].spec.ts
│   └── e2e/
│       └── [feature].e2e.spec.ts
```

### Running Tests:
```bash
# Unit tests only
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# With coverage
npm test -- --coverage

# Specific module
npm test -- auth
```

## 📚 Step 8: Documentation Standards

### After Each Feature:
1. **Update API Documentation**:
   ```markdown
   ## POST /api/v1/auth/login
   
   ### Request
   ```json
   {
     "email": "user@example.com",
     "password": "secure-password"
   }
   ```
   
   ### Response
   ```json
   {
     "accessToken": "jwt-token",
     "refreshToken": "refresh-token"
   }
   ```
   ```

2. **Update Context Files**:
   - New patterns → `context/[module]/patterns.md`
   - Code examples → `context/[module]/examples.md`
   - Issues found → `context/[module]/gotchas.md`

3. **Update Progress Tracking**:
   - What completed → `PROGRESS.md`
   - System state → `PROJECT_STATE.md`
   - Sprint progress → `CURRENT_SPRINT.md`

## 🚨 Step 9: Critical Rules

### NEVER:
- Write code without reading PROJECT_STATE.md first
- Commit with failing tests
- Skip documentation updates
- Ignore tenant isolation
- Leave errors undocumented

### ALWAYS:
- Follow CLAUDE.md methodology exactly
- Test tenant isolation explicitly
- Create revision snapshots
- Update all tracking files
- Use small, focused commits

## 🎯 Step 10: Success Metrics

Your setup is successful when:
- All tracking files are created and updated
- Claude Code commands work properly
- First feature implemented with full documentation
- All tests pass with >80% coverage
- Reversion tested and working

---

## 🆘 Troubleshooting

### Claude Code Commands Not Working:
```bash
# Check command files exist
ls -la .claude/commands/

# Verify permissions
chmod +x .claude/commands/*.md

# Check Claude Code settings
cat .claude/settings.local.json
```

### Tests Failing:
```bash
# Check test database
psql -U postgres -c "CREATE DATABASE saas_test;"

# Check environment
cp .env.example .env.test
# Edit with test values
```

### Git Issues:
```bash
# If branch is dirty
git stash
git checkout main
git pull
git checkout -b feature/new-feature
git stash pop
```

---

## 📞 Next Steps

1. **Start with Authentication**: Use the provided INITIAL.md example
2. **Generate Your First PRP**: `/generate-prp INITIAL.md`
3. **Execute Implementation**: `/execute-prp PRPs/auth_*.md`
4. **Review and Iterate**: Check all tracking files

Remember: The methodology in CLAUDE.md is LAW. Follow it exactly for consistent, high-quality development.

---

**Happy Context Engineering!** 🚀
