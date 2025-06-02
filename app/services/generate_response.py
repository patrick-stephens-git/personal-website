from config import DOC_PATH, VECTOR_STORE_PATH, OPENAI_API_KEY, response_token_limit, paragraph_writing_rules, general_writing_rules
from langchain_openai import ChatOpenAI
from services.generate_embeddings import create_or_load_vector_store
from utils.logging_config import setup_logging

logger = setup_logging() # setup logging

def retrieve_relevant_chunks(query, vector_store, k=10): # retrieve relevant document chunks
    retriever = vector_store.as_retriever(search_kwargs={"k": k}) # initialize retriever
    return retriever.invoke(query)

def generate_response(user_prompt, vector_store): # generate response
    # Initialize the LLM
    llm = ChatOpenAI(model="gpt-4o-mini",
                     temperature=0.7,
                     max_tokens=response_token_limit,
                     timeout=30,
                     max_retries=2,
                     n=1,
                     presence_penalty=-2.0,
                     frequency_penalty=0.0,
                     streaming=False)
    
    # Retrieve relevant document chunks from vector_store
    relevant_docs = retrieve_relevant_chunks(user_prompt, vector_store)
    logger.info(f"Retrieved {len(relevant_docs)} chunks")

    # Format retrieved documents as context
    context = "\n".join([doc.page_content for doc in relevant_docs]) if relevant_docs else "No relevant chunks found."
    logger.info(f"Retrieved chunks: {context}")

    # Create the final prompt
    final_prompt = f"""
    Role: You are an AI assistant that answers questions about product management.

    Goal: Using the question, the document context, and the response rules, generate a response to the question.

    Question: {user_prompt}
    
    Document Context: {context}

    Strict Writing Rules: 
    The author of the document is Patrick Stephens, so if you receive a question referring to Patrick then you can assume it is applicable to the entire document.
    If the question asks about Patrick's skills, then you should respond with "Patrick has skills in product strategy, surfacing problems, user understanding, setting goals, taking strategic actions, product vision, go-to-market strategy, and other product management competencies. What skills would you like to know more about?" Ignore the rest of the Response Writing Rules.
    If the question asks to summarize information without providing a specific topic to summarize, then you should only respond with "Notes Patrick has taken include information about product strategy, surfacing problems, user understanding, setting goals, taking strategic actions, product vision, go-to-market strategy, and other product management topics. What would you like to know about?" Ignore the rest of the Response Writing Rules.
    If the answer to the question is not in the document context, then respond with: "I'm sorry, the notes Patrick has taken do not contain this information." Ignore the rest of the Response Writing Rules.

    Response Writing Rules: 
    Your response MUST be under {response_token_limit} tokens. 
    {paragraph_writing_rules}
    {general_writing_rules}
    Answer with a complete thought, do not end the response mid-sentence.
    If the response contains information about a "startup" then replace it with "product".
    If the response contains information about an "app" then replace it with "product".
    If the response contains information about an "co-founder" then replace it with "team".
    """
    # logger.info(f"User Prompt: {user_prompt}")
    # logger.info(f"Final Prompt: {final_prompt}")
    
    # Generate response from OpenAI
    response = llm.invoke(final_prompt)
    # logger.info(f"API Response: {response}")

    # Extract the assistant's reply
    return response.content

if __name__ == '__main__':
    user_prompt: str = "Summarize this document for me."
    vector_store = create_or_load_vector_store(DOC_PATH, VECTOR_STORE_PATH, OPENAI_API_KEY)
    example_response = generate_response(user_prompt, vector_store)
    print(example_response)