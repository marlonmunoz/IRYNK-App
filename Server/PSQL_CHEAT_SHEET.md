# PostgreSQL Connection Cheat Sheet for Toy Store App

## The Problem
When you type `psql toy_store_db`, you connect as your macOS user "Marlon"
Your Flask app connects as database user "toy_user" - different users see different data!

## Solution: Connect as the same user as your Flask app

### Method 1: Full Command
```bash
PGPASSWORD=toy_password psql -h localhost -U toy_user toy_store_db
```

### Method 2: Use the shortcut script (easier)
```bash
cd /Users/Marlon/Development/App_Toys/Server
./toy_psql
```

## Common Commands

### See all tables
```bash
./toy_psql -c "\dt"
```

### Count rows in tables
```bash
./toy_psql -c "SELECT COUNT(*) FROM toys;"
./toy_psql -c "SELECT COUNT(*) FROM categories;"
```

### See sample data
```bash
./toy_psql -c "SELECT id, name, price FROM toys LIMIT 5;"
./toy_psql -c "SELECT id, name FROM categories LIMIT 5;"
```

### Interactive mode (like normal psql)
```bash
./toy_psql
```
Then you can type SQL commands directly:
```sql
\dt                    -- list tables
SELECT * FROM toys;    -- see all toys
\q                     -- quit
```

### Join tables (toys with categories)
```bash
./toy_psql -c "
SELECT t.name as toy_name, c.name as category_name, t.price 
FROM toys t 
JOIN categories c ON t.category_id = c.id 
LIMIT 5;
"
```

## Your Current Data
- **20 toys** in the toys table
- **40 categories** in the categories table  
- **0 contacts** in the contact table
- All tables owned by "toy_user" (same as Flask app)

## Quick Test
Run this to verify everything works:
```bash
./toy_psql -c "SELECT 'Database connected successfully!' as status;"
```
