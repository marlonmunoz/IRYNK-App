#!/bin/bash
# PostgreSQL Database Connection and Management Script for Toy Store

echo "🏪 Toy Store Database Management"
echo "================================"

# Database connection details
DB_HOST="localhost"
DB_USER="toy_user"
DB_NAME="toy_store_db"
DB_PASSWORD="toy_password"

# Function to run psql commands
run_psql() {
    PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U "$DB_USER" "$DB_NAME" "$@"
}

# Function to show connection info
show_connection_info() {
    echo "📊 Database Connection Info:"
    run_psql -c "\conninfo"
    echo ""
}

# Function to list all tables
show_tables() {
    echo "📋 All Tables:"
    run_psql -c "\dt+"
    echo ""
}

# Function to show table structures
show_table_structures() {
    echo "🏗️  Table Structures:"
    echo ""
    echo "--- CATEGORIES ---"
    run_psql -c "\d categories"
    echo ""
    echo "--- TOYS ---"
    run_psql -c "\d toys"
    echo ""
    echo "--- CONTACT ---"
    run_psql -c "\d contact"
    echo ""
}

# Function to show data counts
show_data_counts() {
    echo "📊 Data Counts:"
    run_psql -c "
        SELECT 
            'Categories' as table_name, 
            COUNT(*) as record_count 
        FROM categories
        UNION ALL
        SELECT 
            'Toys' as table_name, 
            COUNT(*) as record_count 
        FROM toys
        UNION ALL
        SELECT 
            'Contacts' as table_name, 
            COUNT(*) as record_count 
        FROM contact;
    "
    echo ""
}

# Function to show sample data
show_sample_data() {
    echo "🎯 Sample Data:"
    echo ""
    echo "--- CATEGORIES (first 5) ---"
    run_psql -c "SELECT * FROM categories LIMIT 5;"
    echo ""
    echo "--- TOYS (first 5) ---"
    run_psql -c "SELECT id, name, price, category_id FROM toys LIMIT 5;"
    echo ""
}

# Main menu
case "${1:-info}" in
    "info")
        show_connection_info
        show_tables
        show_data_counts
        ;;
    "tables")
        show_tables
        ;;
    "structure")
        show_table_structures
        ;;
    "data")
        show_sample_data
        ;;
    "full")
        show_connection_info
        show_tables
        show_table_structures
        show_data_counts
        show_sample_data
        ;;
    "connect")
        echo "🔌 Opening interactive PostgreSQL session..."
        run_psql
        ;;
    *)
        echo "Usage: $0 [info|tables|structure|data|full|connect]"
        echo ""
        echo "Commands:"
        echo "  info       - Show connection info, tables, and data counts (default)"
        echo "  tables     - List all tables"
        echo "  structure  - Show table structures"
        echo "  data       - Show sample data"
        echo "  full       - Show everything"
        echo "  connect    - Open interactive PostgreSQL session"
        ;;
esac
