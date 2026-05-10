import math
import json

class DomainAnalyzer:
    def __init__(self):
        pass

    def _calculate_entropy(self, s: str) -> float:
        if not s: return 0.0
        p, lns = list(s), float(len(s))
        return -sum(count/lns * math.log(count/lns, 2) for count in [p.count(c) for c in set(p)])

    def analyze(self, domain: str) -> dict:
        # Feature Extraction
        domain_length = len(domain)
        digit_count = sum(c.isdigit() for c in domain)
        entropy = self._calculate_entropy(domain)
        tld = domain.split('.')[-1] if '.' in domain else ""

        reasons = []
        threat_weight = 0.0

        # Specific XAI Logic
        if entropy > 3.8:
            reasons.append(f"High Entropy ({round(entropy, 2)})")
            threat_weight += 40
        if tld in ["ru", "cn", "top", "xyz", "bit"]:
            reasons.append(f"Risk-prone TLD (.{tld})")
            threat_weight += 35
        if digit_count > 4:
            reasons.append(f"High Digit Density ({digit_count})")
            threat_weight += 15
        if domain_length > 25:
            reasons.append("Anomalous Length")
            threat_weight += 10

        # Determine Prediction and Confidence
        if threat_weight > 50:
            prediction = "malicious"
            confidence = min(threat_weight + 20, 99.9)
            explanation = " | ".join(reasons)
        elif threat_weight > 0:
            prediction = "suspicious"
            confidence = threat_weight + 10
            explanation = " | ".join(reasons)
        else:
            prediction = "safe"
            confidence = 98.5  # High confidence for standard traffic
            explanation = "Standard Traffic - No Anomaly"

        return {
            "domain": domain,
            "tld": tld,
            "prediction": prediction,
            "score": round(confidence, 1),
            "entropy": round(entropy, 3),
            "digit_count": digit_count,
            "domain_length": domain_length,
            "explanation": explanation,
            "shap_summary": json.dumps(reasons)
        }