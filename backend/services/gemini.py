import os
import logging
import google.generativeai as genai

logger = logging.getLogger(__name__)
_cached_model_name = None

def optimize_summary_with_gemini(summary: str) -> str:
    """
    Optimizes a CV summary using the Gemini API.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key or api_key.startswith("your-"):
        raise RuntimeError(
            "GEMINI_API_KEY is not set. Add it to backend/.env before using AI optimization."
        )

    genai.configure(api_key=api_key)
    model_name = _resolve_model_name()
    model = genai.GenerativeModel(model_name)

    # Create a detailed prompt for the Gemini API
    prompt = f"""
    As a professional career coach, please rewrite the following CV summary to be more professional, achievement-oriented, and ATS-friendly.
    Focus on transforming the user's simple description into a powerful statement that highlights their skills and impact.
    
    **User's Summary:**
    "{summary}"

    **Rewrite this into a compelling, professional summary for a CV.**
    """

    try:
        response = model.generate_content(prompt)
        text = getattr(response, "text", None)
        if not text:
            raise RuntimeError("Gemini returned an empty response.")
        return text.strip()
    except Exception as exc:
        logger.exception("Gemini API request failed.")
        raise RuntimeError(f"Gemini API request failed: {exc}") from exc


def _resolve_model_name() -> str:
    """Pick a supported Gemini model name for generateContent."""
    global _cached_model_name
    if _cached_model_name:
        return _cached_model_name

    configured = os.environ.get("GEMINI_MODEL")
    if configured:
        _cached_model_name = configured
        return configured

    try:
        models = list(genai.list_models())
    except Exception as exc:
        raise RuntimeError(f"Unable to list Gemini models: {exc}") from exc

    candidates = [
        model for model in models
        if "generateContent" in getattr(model, "supported_generation_methods", [])
    ]

    if not candidates:
        raise RuntimeError("No Gemini models support generateContent for this API key.")

    preferred_order = [
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-1.0-pro",
    ]

    for preferred in preferred_order:
        for model in candidates:
            if preferred in model.name:
                _cached_model_name = model.name
                return model.name

    _cached_model_name = candidates[0].name
    return candidates[0].name
