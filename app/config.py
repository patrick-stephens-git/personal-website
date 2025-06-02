import os
from dotenv import load_dotenv

# paths to the source doc and vector store
DOC_PATH: str = "documents/source.pdf"
VECTOR_STORE_PATH: str = "vector_store/faiss_index"

# limits
response_token_limit: int = 350

# prompt rules
paragraph_writing_rules: str = """
Use the Inverted Pyramid when writing response paragraphs. Each paragraph in the response should contain a starter sentence, middle sentences, and an ending sentence. Use less than 30 words per sentence. For example:
Starter Sentence: Start the response paragraph with the “lede” sentence (the key message) of the response paragraph, by summarizing the most important facts. Readers who are short on time should only need to skim the paragraph “lede” to learn everything they need.
Middle Sentences: Expand on the “lede” sentence (the key message). The middle sentences should support the “lede” sentence with more information.
Ending Sentence: End the response paragraph with an ending sentence that sets the stage for what's next. The ending sentence should make each response paragraph logically complete. End by asking what they would like to know next about this topic or about product management.
"""

general_writing_rules: str = """
Use a professional tone.
Avoid including the “—” symbol in the response.
Use active voice instead of passive voice: instead of writing “each meal is prepared with loving care by the award-winning chef”, write “the award-winning chef prepares each meal with loving care.”
Replace nouns with verbs: instead of writing “I made a decision to exercise daily”, write “I decided to exercise daily.”
Do not use relative pronouns: instead of writing “the family searched for houses that had four bedrooms”, write “the family searched for four-bedroom houses.”
Replace “to be” verbs: instead of writing “the parent and teenager are in a state of disagreement about the curfew”, write “the parent and teenager disagree on the curfew.”
Replace “make” verbs: instead of writing “calcium makes the bones stronger”, write “calcium strengthens the bones.”
Replace adverbs with stronger verbs: instead of writing “the child cried loudly”, write “the child screamed.”
Replace adjectives with data to tell an objective story: instead of writing “something is faster”, write by how much; instead of writing “something is better”, write by what metric.
Turn prepositional phrases into adjectives: instead of writing “CEOs in the tech sector”, write “tech CEOs.”
Avoid intensifiers: instead of writing “it's extremely cold outside,” write “it's freezing outside.”
Use positive description, not negative: instead of writing “the living room lacks sunlight”, write “the living room is dark.”
Avoid adjective strings: instead of writing “the customers are happy and excited about today's product launch”, write “the customers are thrilled about today's product launch.”
Remove unnecessary “that” when you can: instead of writing “I hope that my colleagues enjoy my presentation”, write “I hope my colleagues enjoy my presentation.”
Cut wordy phrases: instead of writing “in order to use their time effectively, the employees worked through lunch”, write “to use their time effectively, the employees worked through lunch.”
Choose to use numbers instead of words: instead of writing “ten years”, write “10 years.”
"""

# Load the environment variables
load_dotenv('.env')
OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY")
RECAPTCHA_SECRET_KEY: str = os.getenv("RECAPTCHA_SECRET_KEY")
DATABASE_URL = os.getenv("DATABASE_URL")