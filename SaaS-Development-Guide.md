# SaaS Development Environment - Complete Guide

**Multi-tenant SaaS Platform for Unified AI Solutions**  
**Environment**: Ubuntu 24.04.2 LTS (Noble Numbat)  
**Server IP**: 168.231.74.45  
**Domain**: saas-dev.unifiedaisolutions.com  

---

## 📁 File System & Volume Mounts

### **Understanding the Volume Mount Structure**

Your docker-compose.yml uses **overlapping volume mounts** for better organization:

```yaml
volumes:
  # Main workspace mount
  - ./workspace:/workspace
  
  # Individual directory mounts (these OVERRIDE the main mount)
  - ./scripts:/workspace/scripts
  - ./frontend:/workspace/frontend
  - ./backend:/workspace/backend
  - ./api:/workspace/api
  - ./database:/workspace/database
  - ./config:/workspace/config
  - ./docs:/workspace/docs
  - ./tests:/workspace/tests
  - ./uploads:/workspace/uploads
  - ./temp:/workspace/temp
```

### **File Location Mapping**

| Container Path | Host Path | Purpose |
|----------------|-----------|---------|
| `/workspace/scripts/` | `/app/data/dev/scripts/` | Development scripts |
| `/workspace/frontend/` | `/app/data/dev/frontend/` | React frontend code |
| `/workspace/backend/` | `/app/data/dev/backend/` | FastAPI backend code |
| `/workspace/api/` | `/app/data/dev/api/` | API definitions |
| `/workspace/database/` | `/app/data/dev/database/` | Database migrations |
| `/workspace/config/` | `/app/data/dev/config/` | Configuration files |
| `/workspace/docs/` | `/app/data/dev/docs/` | Documentation |
| `/workspace/tests/` | `/app/data/dev/tests/` | Test files |
| `/workspace/uploads/` | `/app/data/dev/uploads/` | File uploads |
| `/workspace/temp/` | `/app/data/dev/temp/` | Temporary files |
| `/workspace/` | `/app/data/dev/workspace/` | Main workspace (other files) |

### **How Volume Mounts Work**

1. **Individual mounts override the main mount** for specific directories
2. **Files created in container directories map to specific host directories**
3. **This provides better organization** than one large workspace mount

### **Example File Creation**

```bash
# Inside container
docker compose exec saasdevbuilder bash
cd /workspace/scripts
touch deploy.sh

# File appears on host at:
# /app/data/dev/scripts/deploy.sh (NOT /app/data/dev/workspace/scripts/deploy.sh)
```

### **Directory Structure**

```
/app/data/dev/
├── scripts/           ← Container: /workspace/scripts/
├── frontend/          ← Container: /workspace/frontend/
├── backend/           ← Container: /workspace/backend/
├── api/               ← Container: /workspace/api/
├── database/          ← Container: /workspace/database/
├── config/            ← Container: /workspace/config/
├── docs/              ← Container: /workspace/docs/
├── tests/             ← Container: /workspace/tests/
├── uploads/           ← Container: /workspace/uploads/
├── temp/              ← Container: /workspace/temp/
├── workspace/         ← Container: /workspace/ (other files)
├── postgres_data/     ← Database data (not mounted in container)
├── redis_data/        ← Redis data (not mounted in container)
└── docker-compose.yml ← Host configuration files
```

### **Working with Files**

```bash
# Create frontend components
docker compose exec saasdevbuilder bash
cd /workspace/frontend
# Files appear in: /app/data/dev/frontend/

# Create backend API
cd /workspace/backend
# Files appear in: /app/data/dev/backend/

# Create utility scripts
cd /workspace/scripts
# Files appear in: /app/data/dev/scripts/

# Create documentation
cd /workspace/docs
# Files appear in: /app/data/dev/docs/
```

This setup provides **clean separation** of different project components while maintaining shared access between container and host! 🎯

---

## 🚀 Quick Start

```bash
# Start the complete development environment
cd /app/data/dev
docker compose up -d

# Check all services are running
docker compose ps

# Enter development container
docker compose exec saasdevbuilder bash
```

---

## 🌐 Access Points & URLs

### **Development Environment URLs**

| Service | Direct IP Access | Cloudflare Subdomain | Status |
|---------|------------------|---------------------|---------|
| **VS Code Server** | `http://168.231.74.45:8070` | `https://vscode.saas-dev.unifiedaisolutions.com` | ✅ Ready |
| **Frontend Dev** | `http://168.231.74.45:3010` | `https://dev.saas-dev.unifiedaisolutions.com` | ⚠️ Need to start React |
| **Backend API** | `http://168.231.74.45:8010` | `https://api.saas-dev.unifiedaisolutions.com` | ⚠️ Need to start FastAPI |
| **Main Portal** | `http://168.231.74.45:8085` | `https://saas-dev.unifiedaisolutions.com` | ⚠️ Nginx proxy |
| **Database** | `168.231.74.45:5440` | N/A | ✅ PostgreSQL Ready |
| **Redis Cache** | `168.231.74.45:6390` | N/A | ✅ Redis Ready |

### **Existing Production Services (Available for Integration)**

| Service | URL | Purpose |
|---------|-----|---------|
| **n8n Workflows** | `https://n8n.unifiedaisolutions.com` | Automation & workflows |
| **Crawl4AI** | `https://crawl.unifiedaisolutions.com` | Web scraping & data extraction |
| **PgAdmin** | `https://pgadmin.unifiedaisolutions.com` | PostgreSQL database management |
| **phpMyAdmin** | `https://myadmin.unifiedaisolutions.com` | MySQL database management |
| **DataForSEO** | `https://dataforseo.unifiedaisolutions.com` | SEO data & analytics |
| **Production SaaS** | `https://saas.unifiedaisolutions.com` | Live SaaS platform |

---

## 🧪 Testing Commands

### **1. Test Container Access**

```bash
# Enter development container
docker compose exec saasdevbuilder bash

# Check installed tools and versions
node --version          # Node.js 20.x
python --version        # Python 3.9.x
npm --version          # npm latest
yarn --version         # yarn latest
git --version          # Git latest
docker --version       # Docker CLI
gh --version           # GitHub CLI

# Check development tools
vite --version         # Vite build tool
tsc --version         # TypeScript compiler
eslint --version      # Code linting
prettier --version    # Code formatting
jest --version        # Testing framework

# Check Python packages
pip list | grep fastapi      # FastAPI web framework
pip list | grep sqlalchemy   # Database ORM
pip list | grep openai       # OpenAI integration
pip list | grep anthropic    # Anthropic Claude integration
```

### **2. Test VS Code Server**

```bash
# Open VS Code Server in browser
# URL: http://168.231.74.45:8070
# Should see VS Code interface with /workspace directory loaded
# File explorer should show: frontend/, backend/, api/, database/, etc.
```

### **3. Test Database Connections**

```bash
# Inside development container
cd /workspace

# Test PostgreSQL connection
psql -h saas-postgres -U saas_dev -d saas_platform
# Password: saas_dev_pass
# Should connect to PostgreSQL database

# Test Redis connection
redis-cli -h saas-redis ping
# Should return: PONG

# Alternative Redis test
redis-cli -h saas-redis -p 6379
# Should open Redis CLI
```

### **4. Test Service Health**

```bash
# Check all container status
docker compose ps

# View service logs
docker compose logs -f saasdevbuilder  # Main dev container
docker compose logs -f saas-postgres   # Database logs
docker compose logs -f saas-redis      # Redis logs
docker compose logs -f saas-nginx      # Nginx logs

# Check container health
docker compose exec saasdevbuilder curl -f http://localhost:8000/health || echo "API not started yet"
```

---

## 🛠 Development Workflow

### **1. Start Frontend Development**

```bash
# Enter development container
docker compose exec saasdevbuilder bash
cd /workspace/frontend

# Create React application
npx create-react-app . --template typescript
# OR
npm create vite@latest . -- --template react-ts

# Install dependencies
npm install

# Install additional packages for SaaS platform
npm install @tanstack/react-query axios react-router-dom
npm install -D tailwindcss postcss autoprefixer
npm install @headlessui/react @heroicons/react

# Start development server
npm start
# Frontend will be available at: http://168.231.74.45:3010
```

### **2. Start Backend Development**

```bash
# Enter development container
docker compose exec saasdevbuilder bash
cd /workspace/backend

# Create FastAPI application structure
mkdir -p app/{auth,crm,leadgen,kanban,documents,core}
touch app/__init__.py app/main.py

# Create basic FastAPI app
cat > app/main.py << 'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SaaS Platform API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "SaaS Platform API", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "saas-platform-api"}
EOF

# Start FastAPI development server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
# Backend API will be available at: http://168.231.74.45:8010
```

### **3. Database Setup**

```bash
# Inside development container
cd /workspace/database

# Create database migration structure
mkdir -p migrations/versions
touch migrations/alembic.ini migrations/env.py

# Connect to PostgreSQL and create tables
psql -h saas-postgres -U saas_dev -d saas_platform << 'EOF'
-- Create basic SaaS platform tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    tenant_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
EOF
```

---

## 🎯 Claude Code Integration

### **Install and Use Claude Code**

```bash
# Inside development container
npm install -g @anthropic-ai/claude-code

# Set up Claude Code workspace
claude-code --workspace /workspace

# Example Claude Code commands
claude-code "Create a user authentication system for the SaaS platform"
claude-code "Build a CRM module with contact management"
claude-code "Create a lead generation dashboard with React components"
claude-code "Set up database models for multi-tenant architecture"
```

### **Claude Code Environment Variables**

```bash
# Set in .env file
ANTHROPIC_API_KEY=your_anthropic_api_key_here
CLAUDE_CODE_WORKSPACE=/workspace
CLAUDE_CODE_LOG_LEVEL=info
```

---

## 🔧 Container Management

### **Basic Commands**

```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# Restart specific service
docker compose restart saasdevbuilder

# View logs
docker compose logs -f saasdevbuilder

# Rebuild containers
docker compose build --no-cache
docker compose up -d

# Enter container shell
docker compose exec saasdevbuilder bash

# Execute commands in container
docker compose exec saasdevbuilder npm install
docker compose exec saasdevbuilder python manage.py migrate
```

### **Volume Management**

```bash
# Check volumes
docker volume ls

# Backup database
docker compose exec saas-postgres pg_dump -U saas_dev saas_platform > backup.sql

# Restore database
docker compose exec -T saas-postgres psql -U saas_dev saas_platform < backup.sql
```

---

## 📦 Installed Software & Tools

### **Development Environment**
- **Node.js**: v20.x with npm, yarn, pnpm
- **Python**: v3.9 with pip, venv, dev tools
- **Git**: Version control with GitHub CLI
- **Docker CLI**: Container management
- **VS Code Server**: Browser-based IDE

### **Frontend Tools**
- **Vite**: Fast build tool and dev server
- **Webpack**: Module bundler
- **Create React App**: React project generator
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing tool
- **Sass**: CSS preprocessor

### **Backend Tools**
- **FastAPI**: Modern Python web framework
- **Uvicorn**: ASGI server
- **SQLAlchemy**: Database ORM
- **Alembic**: Database migration tool
- **Pytest**: Testing framework
- **Black**: Code formatter
- **ESLint**: Code linting

### **Database & Cache**
- **PostgreSQL 15**: Primary database
- **Redis 7**: Caching and sessions
- **Database clients**: psql, redis-cli

### **AI & ML Integration**
- **OpenAI**: GPT integration
- **Anthropic**: Claude integration
- **LangChain**: AI application framework
- **Transformers**: Hugging Face models
- **NumPy/Pandas**: Data processing

### **Testing & Quality**
- **Jest**: JavaScript testing
- **Playwright**: Browser automation
- **Cypress**: E2E testing
- **Pytest**: Python testing
- **Prettier**: Code formatting

---

## 🔐 Environment Configuration

### **Database Credentials**
```bash
# PostgreSQL
Host: saas-postgres (internal) / 168.231.74.45:5440 (external)
Database: saas_platform
Username: saas_dev
Password: saas_dev_pass

# Redis
Host: saas-redis (internal) / 168.231.74.45:6390 (external)
Port: 6379
```

### **Environment Variables**
```bash
# Set these in .env file
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
GITHUB_TOKEN=your_github_token
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## 🚨 Troubleshooting

### **Common Issues**

#### **Container Won't Start**
```bash
# Check logs
docker compose logs saasdevbuilder

# Rebuild container
docker compose down
docker compose build --no-cache
docker compose up -d
```

#### **Port Already in Use**
```bash
# Check what's using the port
ss -tlnp | grep :8070

# Kill process if needed
sudo lsof -ti:8070 | xargs kill -9
```

#### **Database Connection Issues**
```bash
# Test database connection
docker compose exec saasdevbuilder psql -h saas-postgres -U saas_dev -d saas_platform

# Reset database
docker compose down
docker volume rm $(docker volume ls -q | grep postgres)
docker compose up -d
```

#### **File Permission Issues**
```bash
# Fix ownership
sudo chown -R node:node /app/data/dev/workspace
sudo chmod -R 755 /app/data/dev/workspace
```

### **Health Checks**

```bash
# Check all services
curl http://168.231.74.45:8070  # VS Code Server
curl http://168.231.74.45:3010  # Frontend (after started)
curl http://168.231.74.45:8010  # Backend (after started)
curl http://168.231.74.45:8085  # Nginx

# Check databases
docker compose exec saas-postgres pg_isready -U saas_dev
docker compose exec saas-redis redis-cli ping
```

---

## 📝 Git Workflow

### **Repository Information**
- **Repository**: `https://github.com/uais137/saas-platform.git`
- **Branch**: `main`
- **Git User**: `uais137`

### **Common Git Commands**

```bash
# Check status
git status

# Add files
git add .

# Commit changes
git commit -m "Add authentication module"

# Push to GitHub
git push origin main

# Create feature branch
git checkout -b feature/crm-module

# Merge feature
git checkout main
git merge feature/crm-module
git push origin main
```

---

## 🎯 Next Steps

### **1. Build Core SaaS Features**
- [ ] User authentication system
- [ ] Multi-tenant database architecture
- [ ] Role-based access control
- [ ] API rate limiting
- [ ] Payment processing integration

### **2. Develop SaaS Modules**
- [ ] CRM (Customer Relationship Management)
- [ ] Lead Generation with web scraping
- [ ] Kanban board project management
- [ ] Document management system
- [ ] Analytics dashboard

### **3. Production Deployment**
- [ ] Configure production database
- [ ] Set up SSL certificates
- [ ] Configure nginx for production
- [ ] Set up monitoring and logging
- [ ] Deploy to production domain

---

## 📞 Support & Resources

### **Documentation**
- **FastAPI**: https://fastapi.tiangolo.com/
- **React**: https://react.dev/
- **Docker**: https://docs.docker.com/
- **PostgreSQL**: https://www.postgresql.org/docs/

### **AI Development**
- **OpenAI API**: https://platform.openai.com/docs
- **Anthropic Claude**: https://docs.anthropic.com/
- **LangChain**: https://python.langchain.com/

### **Project Repository**
- **GitHub**: https://github.com/uais137/saas-platform
- **Issues**: https://github.com/uais137/saas-platform/issues

---

**Last Updated**: July 18, 2025  
**Environment Version**: 1.0.0  
**Status**: ✅ Ready for Development
