#!/bin/bash

# PostgreSQL Connection Helper Script
# This script helps you connect to the toy_store_db with the correct credentials

echo "🔍 PostgreSQL Database Connection Helper"
echo "========================================"

# Database connection details (matching Flask config)
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="toy_store_db"
DB_USER="toy_user"
DB_PASSWORD="toy_password"

echo "Database: $DB_NAME"
echo "User: $DB_USER"
echo "Host: $DB_HOST:$DB_PORT"
echo ""

# Function to run a command
run_query() {
    echo "Running: $1"
    echo "----------------------------------------"
    PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "$1"
    echo ""
}

# Show tables
echo "📋 Listing all tables:"
run_query "\dt"

# Show table counts
echo "📊 Row counts in each table:"
run_query "SELECT 
    'toys' as table_name, COUNT(*) as row_count FROM toys
UNION ALL SELECT 
    'categories' as table_name, COUNT(*) as row_count FROM categories  
UNION ALL SELECT
    'contact' as table_name, COUNT(*) as row_count FROM contact;"

# Show sample data
echo "🎲 Sample toys (first 3):"
run_query "SELECT id, name, age, price, category_id FROM toys LIMIT 3;"

echo "🏷️ Sample categories (first 5):"
run_query "SELECT id, name FROM categories LIMIT 5;"

echo ""
echo "💡 To connect manually, use:"
echo "   PGPASSWORD=toy_password psql -h localhost -p 5432 -U toy_user -d toy_store_db"
