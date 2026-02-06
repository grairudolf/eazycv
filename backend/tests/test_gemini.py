import services.gemini as gemini


class DummyResponse:
    def __init__(self, text):
        self.text = text


class DummyModel:
    def generate_content(self, prompt):
        return DummyResponse("Optimized summary")


def test_optimize_summary(monkeypatch):
    # Replace the genai.GenerativeModel with a dummy that returns a predictable response
    monkeypatch.setenv("GEMINI_API_KEY", "test-key")
    monkeypatch.setenv("GEMINI_MODEL", "test-model")
    monkeypatch.setattr(gemini.genai, "GenerativeModel", lambda *a, **k: DummyModel())
    res = gemini.optimize_summary_with_gemini("summary")
    assert "Optimized summary" in res
