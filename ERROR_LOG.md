# ERROR_LOG.md - Error Tracking and Solutions Database

## 🚨 EVERY Error MUST Be Logged Here With Its Solution

---

## ❌ UNRESOLVED ERRORS (Fix These First!)

### 1. [EXAMPLE - Delete when resolved]
**Date**: 2025-07-18 10:00:00
**File**: src/modules/auth/auth.service.ts
**Line**: 45
**Error**: 
```
TypeError: Cannot read property 'sign' of undefined
  at AuthService.generateToken (/src/modules/auth/auth.service.ts:45:15)
```
**Context**: Trying to generate JWT token during login
**Attempted Solutions**:
- Checked jwt import - seems correct
- Verified environment variables are loaded

**Status**: UNRESOLVED
**Assigned To**: Next developer

---

## ✅ RESOLVED ERRORS (Reference for Similar Issues)

### Template Entry
**Date**: YYYY-MM-DD HH:MM:SS
**File**: Full file path
**Line**: Line number
**Error**:
```
Full error message
Include stack trace
```
**Context**: What you were trying to do
**Root Cause**: Why it happened
**Solution**: 
```typescript
// Include code that fixed it
```
**Time to Resolve**: X minutes
**Prevented By**: What test/check would have caught this

---

## 📊 ERROR PATTERNS (Update When You See Repeats)

### TypeScript Type Errors
**Common Cause**: Missing type definitions or incorrect imports
**Quick Fixes**:
1. Check if @types package is installed
2. Verify import paths
3. Check tsconfig.json settings

### Database Connection Errors
**Common Cause**: Missing environment variables or wrong connection string
**Quick Fixes**:
1. Verify .env file exists and is loaded
2. Check DATABASE_URL format
3. Ensure PostgreSQL is running

### JWT/Authentication Errors
**Common Cause**: Missing secret or incorrect token format
**Quick Fixes**:
1. Check JWT_SECRET in environment
2. Verify token has all required claims
3. Check token expiration

---

## 🔍 ERROR SEARCH INDEX

### By Module
- **Auth**: Entries #1, #5, #12
- **Tenant**: Entries #3, #8
- **User**: Entries #2, #7, #9

### By Type
- **TypeError**: #1, #4, #8
- **ValidationError**: #2, #6
- **DatabaseError**: #3, #5, #7

### By Frequency
1. Missing environment variables (5 occurrences)
2. Type mismatches (4 occurrences)
3. Null reference errors (3 occurrences)

---

## 🛠 DEBUGGING CHECKLIST

When you encounter an error, check these FIRST:

### 1. Environment Issues
- [ ] All .env variables present?
- [ ] Running correct Node version?
- [ ] All dependencies installed?
- [ ] Database running and accessible?

### 2. Code Issues
- [ ] All imports correct?
- [ ] TypeScript types match?
- [ ] Async/await used properly?
- [ ] Error handling in place?

### 3. Test Issues
- [ ] Test database configured?
- [ ] Mocks set up correctly?
- [ ] Test data valid?
- [ ] Cleanup running after tests?

---

## 🎯 PREVENTION STRATEGIES

### Add These Checks to Prevent Common Errors:

1. **Null Checks**
```typescript
if (!user) {
  throw new Error('User not found');
}
```

2. **Environment Validation**
```typescript
const required = ['DATABASE_URL', 'JWT_SECRET'];
const missing = required.filter(key => !process.env[key]);
if (missing.length) {
  throw new Error(`Missing env vars: ${missing.join(', ')}`);
}
```

3. **Type Guards**
```typescript
function isValidUser(obj: any): obj is User {
  return obj && obj.id && obj.email;
}
```

---

## 📝 ERROR LOG ENTRY TEMPLATE

```markdown
### [ERROR NUMBER]. [Brief Description]
**Date**: YYYY-MM-DD HH:MM:SS
**File**: src/path/to/file.ts
**Line**: XX
**Error**:
```
Paste complete error here
```
**Context**: What you were doing
**Root Cause**: Why it happened
**Solution**: 
```typescript
// Code that fixed it
```
**Time to Resolve**: X minutes
**Prevented By**: Test/validation that would catch this
**Related Errors**: #X, #Y (if any)
```

---

## 🔄 RECURRING ERROR FIXES

### If you see these errors, try these solutions first:

1. **"Cannot find module"**
   - Run: `npm install`
   - Check: import path and file extension
   - Verify: tsconfig paths configuration

2. **"Connection refused"**
   - Check: Database is running
   - Verify: Connection string correct
   - Test: Can connect with psql

3. **"Invalid token"**
   - Check: Token hasn't expired
   - Verify: Secret keys match
   - Ensure: Token has all required fields

---

**CRITICAL**: Never mark an error as resolved without documenting the solution!
