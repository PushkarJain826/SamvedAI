from sentence_transformers import CrossEncoder


model = CrossEncoder("BAAI/bge-reranker-v2-m3")


question = "What is the unit of insurance under PMFBY?"

correct_chunk = """
Scheme: PMFBY
Section: 5. UNIT OF INSURANCE

The Scheme shall be implemented on an ‘Area Approach basis’ i.e., Defined Areas for each notified crop for widespread calamities with the assumption that all the insured farmers, in a Unit of Insurance, to be defined as ‘Notified Area’ for a crop, face similar risk exposures.

Defined Area (i.e., unit area of insurance) is Village/Village Panchayat level by whatsoever name these areas may be called for major crops and for other crops it may be a unit of size above the level of Village/Village Panchayat.
"""

premium_chunk = """
Scheme: PMFBY
Section: 10. PREMIUM RATES

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