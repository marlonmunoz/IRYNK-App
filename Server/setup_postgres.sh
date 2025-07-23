#!/bin/bash

# PostgreSQL Setup Script for macOS
echo "Setting up PostgreSQL for Toy Store App..."

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "Homebrew not found. Please install Homebrew first:"
    echo "/bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
    exit 1
fi

# Install PostgreSQL if not already installed
if ! command -v psql &> /dev/null; then
    echo "Installing PostgreSQL..."
    brew install postgresql@14
    brew services start postgresql@14
else
    echo "PostgreSQL is already installed."
fi

# Create database and user
echo "Creating database and user..."
createdb toy_store_db
psql toy_store_db -c "CREATE USER toy_user WITH PASSWORD 'toy_password';"
psql toy_store_db -c "GRANT ALL PRIVILEGES ON DATABASE toy_store_db TO toy_user;"
psql toy_store_db -c "ALTER USER toy_user CREATEDB;"

echo "PostgreSQL setup complete!"
echo "Database: toy_store_db"
echo "Username: toy_user"
echo "Password: toy_password"
echo "Host: localhost"
echo "Port: 5432"
echo ""
echo "You can now run the Flask app with PostgreSQL!"
