import uuid

# Fixed demo user id used for local development without external auth
DEMO_USER_ID = uuid.UUID("00000000-0000-0000-0000-000000000001")


def get_current_user():
    """Return a simple demo user object.

    The application no longer uses Supabase or any external authentication
    provider. For local usage, all requests are treated as coming from a
    single demo user identified by ``DEMO_USER_ID``.
    """
    return {"id": DEMO_USER_ID}
