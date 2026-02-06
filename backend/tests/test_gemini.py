import services.gemini as gemini


class DummyResponse:
    def __init__(self, text):
        self.text = text


class DummyModels:
    def generate_content(self, model, contents):
        return DummyResponse("Optimized summary")


def test_optimize_summary(monkeypatch):
    # Replace the client with a dummy that returns a predictable response
    monkeypatch.setenv("GEMINI_API_KEY", "test-key")
    monkeypatch.setenv("GEMINI_MODEL", "test-model")
    dummy_client = type("DummyClient", (), {"models": DummyModels()})()
    monkeypatch.setattr(gemini, "_get_client", lambda *a, **k: dummy_client)
    res = gemini.optimize_summary_with_gemini("summary")
    assert "Optimized summary" in res
