import os
from google import genai

# Configure the Gemini API key
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY", "your-gemini-api-key"))

def optimize_summary_with_gemini(summary: str) -> str:
    """
    Optimizes a CV summary using the Gemini API.
    """
    model = client.models.get('gemini-1.5-flash')

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
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return "Error: Could not optimize CV."
