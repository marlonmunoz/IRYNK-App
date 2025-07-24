#!/usr/bin/env python3
"""
Script to migrate data from SQLite to PostgreSQL
"""

import sqlite3
import psycopg2
from psycopg2.extras import RealDictCursor
import sys

# Database configurations
SQLITE_DB = "instance/app.db"
POSTGRES_CONFIG = {
    'host': 'localhost',
    'database': 'toy_store_db',
    'user': 'toy_user',
    'password': 'toy_password'
}

def connect_sqlite():
    """Connect to SQLite database"""
    try:
        conn = sqlite3.connect(SQLITE_DB)
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        print(f"Error connecting to SQLite: {e}")
        return None

def connect_postgres():
    """Connect to PostgreSQL database"""
    try:
        conn = psycopg2.connect(**POSTGRES_CONFIG)
        return conn
    except psycopg2.Error as e:
        print(f"Error connecting to PostgreSQL: {e}")
        return None

def migrate_categories():
    """Migrate categories from SQLite to PostgreSQL"""
    sqlite_conn = connect_sqlite()
    postgres_conn = connect_postgres()
    
    if not sqlite_conn or not postgres_conn:
        return False
    
    try:
        # Get data from SQLite
        sqlite_cursor = sqlite_conn.cursor()
        sqlite_cursor.execute("SELECT id, name FROM categories ORDER BY id")
        categories = sqlite_cursor.fetchall()
        
        # Clear PostgreSQL categories table
        postgres_cursor = postgres_conn.cursor()
        postgres_cursor.execute("TRUNCATE TABLE toys, categories RESTART IDENTITY CASCADE")
        
        # Insert into PostgreSQL
        for category in categories:
            postgres_cursor.execute(
                "INSERT INTO categories (name) VALUES (%s) RETURNING id",
                (category['name'],)
            )
        
        postgres_conn.commit()
        print(f"Migrated {len(categories)} categories")
        return True
        
    except Exception as e:
        print(f"Error migrating categories: {e}")
        if postgres_conn:
            postgres_conn.rollback()
        return False
    finally:
        if sqlite_conn:
            sqlite_conn.close()
        if postgres_conn:
            postgres_conn.close()

def migrate_toys():
    """Migrate toys from SQLite to PostgreSQL"""
    sqlite_conn = connect_sqlite()
    postgres_conn = connect_postgres()
    
    if not sqlite_conn or not postgres_conn:
        return False
    
    try:
        # Get data from SQLite
        sqlite_cursor = sqlite_conn.cursor()
        sqlite_cursor.execute("""
            SELECT name, image, age, price, description, category_id 
            FROM toys ORDER BY id
        """)
        toys = sqlite_cursor.fetchall()
        
        # Insert into PostgreSQL
        postgres_cursor = postgres_conn.cursor()
        for toy in toys:
            postgres_cursor.execute("""
                INSERT INTO toys (name, image, age, price, description, category_id) 
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (
                toy['name'],
                toy['image'],
                toy['age'],
                toy['price'],
                toy['description'],
                toy['category_id']
            ))
        
        postgres_conn.commit()
        print(f"Migrated {len(toys)} toys")
        return True
        
    except Exception as e:
        print(f"Error migrating toys: {e}")
        if postgres_conn:
            postgres_conn.rollback()
        return False
    finally:
        if sqlite_conn:
            sqlite_conn.close()
        if postgres_conn:
            postgres_conn.close()

def migrate_contact():
    """Migrate contact data from SQLite to PostgreSQL"""
    sqlite_conn = connect_sqlite()
    postgres_conn = connect_postgres()
    
    if not sqlite_conn or not postgres_conn:
        return False
    
    try:
        # Get data from SQLite
        sqlite_cursor = sqlite_conn.cursor()
        sqlite_cursor.execute("SELECT name, email, message FROM contact ORDER BY id")
        contacts = sqlite_cursor.fetchall()
        
        if not contacts:
            print("No contact data to migrate")
            return True
        
        # Clear PostgreSQL contact table
        postgres_cursor = postgres_conn.cursor()
        postgres_cursor.execute("TRUNCATE TABLE contact RESTART IDENTITY")
        
        # Insert into PostgreSQL
        for contact in contacts:
            postgres_cursor.execute(
                "INSERT INTO contact (name, email, message) VALUES (%s, %s, %s)",
                (contact['name'], contact['email'], contact['message'])
            )
        
        postgres_conn.commit()
        print(f"Migrated {len(contacts)} contact entries")
        return True
        
    except Exception as e:
        print(f"Error migrating contact data: {e}")
        if postgres_conn:
            postgres_conn.rollback()
        return False
    finally:
        if sqlite_conn:
            sqlite_conn.close()
        if postgres_conn:
            postgres_conn.close()

def verify_migration():
    """Verify the migration was successful"""
    sqlite_conn = connect_sqlite()
    postgres_conn = connect_postgres()
    
    if not sqlite_conn or not postgres_conn:
        return False
    
    try:
        sqlite_cursor = sqlite_conn.cursor()
        postgres_cursor = postgres_conn.cursor()
        
        # Check categories
        sqlite_cursor.execute("SELECT COUNT(*) FROM categories")
        sqlite_categories = sqlite_cursor.fetchone()[0]
        
        postgres_cursor.execute("SELECT COUNT(*) FROM categories")
        postgres_categories = postgres_cursor.fetchone()[0]
        
        # Check toys
        sqlite_cursor.execute("SELECT COUNT(*) FROM toys")
        sqlite_toys = sqlite_cursor.fetchone()[0]
        
        postgres_cursor.execute("SELECT COUNT(*) FROM toys")
        postgres_toys = postgres_cursor.fetchone()[0]
        
        print("\n=== Migration Verification ===")
        print(f"Categories - SQLite: {sqlite_categories}, PostgreSQL: {postgres_categories}")
        print(f"Toys - SQLite: {sqlite_toys}, PostgreSQL: {postgres_toys}")
        
        return sqlite_categories == postgres_categories and sqlite_toys == postgres_toys
        
    except Exception as e:
        print(f"Error verifying migration: {e}")
        return False
    finally:
        if sqlite_conn:
            sqlite_conn.close()
        if postgres_conn:
            postgres_conn.close()

def main():
    """Main migration function"""
    print("Starting migration from SQLite to PostgreSQL...")
    
    # Migrate in order (categories first due to foreign key constraint)
    if not migrate_categories():
        print("Failed to migrate categories")
        sys.exit(1)
    
    if not migrate_toys():
        print("Failed to migrate toys")
        sys.exit(1)
    
    if not migrate_contact():
        print("Failed to migrate contact data")
        sys.exit(1)
    
    if verify_migration():
        print("\n✅ Migration completed successfully!")
    else:
        print("\n❌ Migration verification failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
