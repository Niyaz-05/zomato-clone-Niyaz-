# Git Setup Instructions

## Issues Found

1. **Embedded Git Repository**: The `backend` folder has its own `.git` folder, making it a nested repository
2. **Node Modules**: `node_modules` should not be committed
3. **Build Artifacts**: Build outputs should be ignored

## Solutions

### Option 1: Remove Backend's Git Repository (Recommended)

If you want to include the backend code in your main repository:

```powershell
# Remove the embedded git repository
Remove-Item -Recurse -Force backend\.git

# Remove backend from git cache
git rm --cached backend

# Add backend files properly
git add backend/
```

### Option 2: Keep Backend as Submodule

If backend is a separate project you want to track:

```powershell
# Remove backend from staging
git rm --cached backend

# Add as submodule (replace <url> with backend's git URL)
git submodule add <url> backend
```

### Option 3: Exclude Backend Entirely

If you don't want to track backend in this repository:

```powershell
# Remove from staging
git rm --cached backend

# Add to .gitignore
echo "backend/" >> .gitignore
```

## Fix Current Issues

After choosing an option above, run:

```powershell
# Remove node_modules from staging
git rm -r --cached frontend/node_modules

# Remove build artifacts
git rm -r --cached frontend/dist
git rm -r --cached backend/target

# Stage the .gitignore file
git add .gitignore

# Add files properly
git add .
```

## Line Ending Warnings

The LF/CRLF warnings are normal on Windows. To configure Git to handle this automatically:

```powershell
# Auto-convert line endings
git config core.autocrlf true

# Or for this repository only
git config --local core.autocrlf true
```

## Recommended: Complete Setup

```powershell
# 1. Remove embedded git repository (if exists)
if (Test-Path backend\.git) {
    Remove-Item -Recurse -Force backend\.git
    Write-Host "Removed backend/.git"
}

# 2. Remove from cache
git rm --cached -r backend 2>$null
git rm --cached -r frontend/node_modules 2>$null
git rm --cached -r frontend/dist 2>$null
git rm --cached -r backend/target 2>$null

# 3. Configure line endings
git config core.autocrlf true

# 4. Add .gitignore
git add .gitignore

# 5. Add all files
git add .

# 6. Check status
git status
```

