# Toy Store Server - PostgreSQL Migration

This Flask application has been migrated from SQLite to PostgreSQL.

## Prerequisites

1. **PostgreSQL**: Install PostgreSQL on your system
2. **Python 3.8+**: Ensure you have Python installed

## Setup Instructions

### Option 1: Automated Setup (macOS with Homebrew)

Run the setup script:
```bash
./setup_postgres.sh
```

This will:
- Install PostgreSQL via Homebrew
- Create the database `toy_store_db`
- Create user `toy_user` with password `toy_password`
- Grant necessary privileges

### Option 2: Manual Setup

1. **Install PostgreSQL**:
   ```bash
   # macOS with Homebrew
   brew install postgresql@14
   brew services start postgresql@14
   
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   
   # CentOS/RHEL
   sudo yum install postgresql-server postgresql-contrib
   ```

2. **Create Database and User**:
   ```bash
   # Connect to PostgreSQL
   psql postgres
   
   # Create database
   CREATE DATABASE toy_store_db;
   
   # Create user
   CREATE USER toy_user WITH PASSWORD 'toy_password';
   
   # Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE toy_store_db TO toy_user;
   ALTER USER toy_user CREATEDB;
   
   # Exit
   \q
   ```

## Installation

1. **Install Dependencies**:
   ```bash
   # Using pip
   pip install -r requirements.txt
   
   # OR using pipenv
   pipenv install
   pipenv shell
   ```

2. **Set Environment Variables** (Optional):
   ```bash
   export POSTGRES_USER=toy_user
   export POSTGRES_PASSWORD=toy_password
   export POSTGRES_HOST=localhost
   export POSTGRES_PORT=5432
   export POSTGRES_DB=toy_store_db
   export FLASK_ENV=development
   ```

3. **Initialize Database**:
   ```bash
   # Initialize migrations (if not already done)
   flask db init
   
   # Create migration
   flask db migrate -m "PostgreSQL migration"
   
   # Apply migration
   flask db upgrade
   ```

4. **Seed Database** (Optional):
   ```bash
   python seed.py
   ```

## Running the Application

```bash
python app.py
```

The server will start on `http://localhost:5002`

## Configuration

The application uses environment-based configuration:

- **Development**: Uses local PostgreSQL database
- **Production**: Configure environment variables for production database

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `POSTGRES_USER` | PostgreSQL username | `toy_user` |
| `POSTGRES_PASSWORD` | PostgreSQL password | `toy_password` |
| `POSTGRES_HOST` | PostgreSQL host | `localhost` |
| `POSTGRES_PORT` | PostgreSQL port | `5432` |
| `POSTGRES_DB` | Database name | `toy_store_db` |
| `FLASK_ENV` | Flask environment | `development` |
| `DATABASE_URL` | Full database URL | Auto-generated |

## API Endpoints

- `GET /toys` - Get all toys
- `POST /toys` - Create a new toy
- `GET /toys/<id>` - Get toy by ID
- `PATCH /toys/<id>` - Update toy by ID
- `DELETE /toys/<id>` - Delete toy by ID
- `GET /contacts` - Get all contacts
- `POST /contact` - Create a new contact
- `DELETE /contact/<id>` - Delete contact by ID

## Troubleshooting

1. **Connection Error**: Ensure PostgreSQL is running and credentials are correct
2. **Permission Error**: Make sure the user has proper database privileges
3. **Module Not Found**: Install required dependencies with `pip install -r requirements.txt`

## Migration Notes

The following changes were made during SQLite to PostgreSQL migration:

1. Added `psycopg2-binary` dependency for PostgreSQL connection
2. Updated database URI configuration
3. Created environment-based configuration system
4. Maintained all existing models and relationships
5. Added setup scripts for easier deployment
