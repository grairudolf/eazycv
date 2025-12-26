import os
from supabase import create_client, Client

# Get Supabase credentials from environment variables
url: str = os.environ.get("SUPABASE_URL", "your-supabase-url")
key: str = os.environ.get("SUPABASE_KEY", "your-supabase-key")

# Initialize the Supabase client
supabase: Client = create_client(url, key)
