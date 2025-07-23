#!/usr/bin/env python3
"""
PostgreSQL Migration Verification Script
This script verifies that the Flask app is successfully connected to PostgreSQL
"""

import requests
import psycopg2
from config import config
import os

def test_database_connection():
    """Test direct PostgreSQL connection"""
    try:
        config_obj = config['development']
        conn = psycopg2.connect(
            host=config_obj.POSTGRES_HOST,
            database=config_obj.POSTGRES_DB,
            user=config_obj.POSTGRES_USER,
            password=config_obj.POSTGRES_PASSWORD,
            port=config_obj.POSTGRES_PORT
        )
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        version = cursor.fetchone()
        print(f"✅ PostgreSQL connection successful!")
        print(f"   Database version: {version[0]}")
        
        # Check tables
        cursor.execute("SELECT COUNT(*) FROM toys;")
        toy_count = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM categories;")
        category_count = cursor.fetchone()[0]
        cursor.execute("SELECT COUNT(*) FROM contact;")
        contact_count = cursor.fetchone()[0]
        
        print(f"   Toys: {toy_count}")
        print(f"   Categories: {category_count}")
        print(f"   Contacts: {contact_count}")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ PostgreSQL connection failed: {e}")
        return False

def test_api_endpoints():
    """Test Flask API endpoints"""
    base_url = "http://localhost:5002"
    
    try:
        # Test GET /toys
        response = requests.get(f"{base_url}/toys", timeout=5)
        if response.status_code == 200:
            toys = response.json()
            print(f"✅ API endpoint /toys working! ({len(toys)} toys)")
        else:
            print(f"❌ API endpoint /toys failed: {response.status_code}")
            return False
            
        # Test GET /contacts
        response = requests.get(f"{base_url}/contacts", timeout=5)
        if response.status_code == 200:
            contacts = response.json()
            print(f"✅ API endpoint /contacts working! ({len(contacts)} contacts)")
        else:
            print(f"❌ API endpoint /contacts failed: {response.status_code}")
            return False
            
        return True
        
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to Flask server. Make sure it's running on port 5002.")
        return False
    except Exception as e:
        print(f"❌ API test failed: {e}")
        return False

def main():
    """Main verification function"""
    print("🔍 PostgreSQL Migration Verification")
    print("=" * 40)
    
    db_success = test_database_connection()
    api_success = test_api_endpoints()
    
    print("\n" + "=" * 40)
    if db_success and api_success:
        print("🎉 PostgreSQL migration SUCCESSFUL!")
        print("   Your Flask app is now running with PostgreSQL.")
    else:
        print("⚠️  Some issues were found. Please check the errors above.")
    
    print("\n📝 Next Steps:")
    print("   1. Update your client to use the PostgreSQL-backed API")
    print("   2. Set environment variables for production deployment")
    print("   3. Consider using connection pooling for production")

if __name__ == "__main__":
    main()
