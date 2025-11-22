# Fix Backend Embedded Git Repository

## The Problem
The `backend` folder has its own `.git` folder, making it a nested git repository. This prevents it from being tracked in your main repository.

## Solution: Remove the Embedded Git Repository

Run these commands **in order**:

```powershell
# Step 1: Remove the .git folder from backend
Remove-Item -Recurse -Force backend\.git

# Step 2: Remove backend from git cache (if it's already tracked)
git rm --cached -r backend

# Step 3: Add backend files properly to your main repository
git add backend/

# Step 4: Verify it worked (should NOT show the warning)
git status

# Step 5: Commit
git commit -m "Add backend code to main repository"
```

## Alternative: If Step 1 Fails

If you get a "file is in use" error, try:

```powershell
# Close any IDEs/editors that might have backend files open
# Then try again:
Remove-Item -Recurse -Force backend\.git

# Or use this PowerShell command to force close handles:
Get-Process | Where-Object {$_.Path -like "*backend*"} | Stop-Process -Force
Remove-Item -Recurse -Force backend\.git
```

## Verify It's Fixed

After removing `.git`, when you run `git add backend/`, you should:
- ✅ See backend files being added
- ❌ NOT see the "embedded git repository" warning

## If You Still See the Warning

1. Make sure you removed `backend\.git` folder completely
2. Run: `git rm --cached -r backend`
3. Run: `git add backend/` again
4. Check: `git status` should show backend files as new files, not as a submodule

