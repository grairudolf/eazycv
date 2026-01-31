import os
import sys

# Ensure the backend package directory is on sys.path so tests can import
# modules using the same layout as the application (e.g. "from database.database import ...").
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
