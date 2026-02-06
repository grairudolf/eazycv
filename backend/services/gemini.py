import os
import logging
from google import genai

logger = logging.getLogger(__name__)
_cached_model_name = None

def optimize_summary_with_gemini(summary: str) -> str:
    """
    Optimizes a CV summary using the Gemini API.
    """
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key or api_key.startswith("your-"):
        raise RuntimeError(
            "GEMINI_API_KEY (or GOOGLE_API_KEY) is not set. Add it to backend/.env before using AI optimization."
        )

    client = _get_client(api_key)
    model_name = _resolve_model_name()

    # Create a detailed prompt for the Gemini API
    prompt = f"""
    As a professional career coach, please rewrite the following CV summary to be more professional, achievement-oriented, and ATS-friendly.
    Focus on transforming the user's simple description into a powerful statement that highlights their skills and impact.
    
    **User's Summary:**
    "{summary}"

    **Rewrite this into a compelling, professional summary for a CV.**
    """

    try:
        response = client.models.generate_content(model=model_name, contents=prompt)
        text = getattr(response, "text", None)
        if not text:
            raise RuntimeError("Gemini returned an empty response.")
        return text.strip()
    except Exception as exc:
        logger.exception("Gemini API request failed.")
        raise RuntimeError(f"Gemini API request failed: {exc}") from exc


def _get_client(api_key: str) -> genai.Client:
    return genai.Client(api_key=api_key)


def _resolve_model_name() -> str:
    """Pick a Gemini model name for generate_content."""
    global _cached_model_name
    if _cached_model_name:
        return _cached_model_name

    configured = os.environ.get("GEMINI_MODEL")
    if configured:
        _cached_model_name = configured
        return configured

    # Default to a stable, fast model when none is configured.
    _cached_model_name = "gemini-2.0-flash-001"
    return _cached_model_name
