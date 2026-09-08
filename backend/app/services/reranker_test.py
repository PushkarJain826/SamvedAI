from sentence_transformers import CrossEncoder

model = CrossEncoder("BAAI/bge-reranker-v2-m3")

question = "What crops are covered under PMFBY?"

correct_chunk = """
Section 6. CROPS AND NOTIFIED AREA

6.1. CROPS: The Scheme can cover all the Crops for which past yield data is available and grown during the notified season, in a Notified Area and for which yield estimation at the Notified Area level will be available.
"""

premium_chunk = """
Section 10. PREMIUM RATES

The rate of Insurance Charges payable by the farmer will be as per the following table.

Kharif Food & Oilseeds crops (all cereals, millets, & oilseeds, pulses) 2.0% of SI or Actuarial rate, whichever is less.

Rabi Food & Oilseeds crops (all cereals, millets, & oilseeds, pulses) 1.5% of SI or Actuarial rate, whichever is less.

Kharif & Rabi Annual Commercial / Annual Horticultural crops 5% of SI or Actuarial rate, whichever is less.
"""

scores = model.predict([
    (question, correct_chunk),
    (question, premium_chunk),
])

print("Correct chunk:", scores[0])
print("Premium chunk:", scores[1])
