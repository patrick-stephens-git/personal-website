from config import response_token_limit
from langchain_openai import ChatOpenAI
from generate_embeddings import create_or_load_vector_store
from utils.logging_config import setup_logging
from config import DOC_PATH, VECTOR_STORE_PATH, OPENAI_API_KEY

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

    Response Rules: 
    Your response MUST be under {response_token_limit} tokens. 
    Answer with a complete thought, do not end the response mid-sentence.
    The author of the document is Patrick Stephens, so if you receive a question referring to Patrick then you can assume it is applicable to the entire document.
    If the response contains information about a "startup" then replace it with "product".
    If the response contains information about an "app" then replace it with "product".
    If the response contains information about an "co-founder" then replace it with "team".
    If the question asks to summarize information without providing a specific topic to summarize, then you should respond with "Notes Patrick has taken include information about product strategy, surfacing problems, user understanding, setting goals, taking strategic actions, product vision, and other product management topics. What would you like to know about?"
    If the answer to the question is not in the document context, say: "I'm sorry, the notes Patrick has taken do not contain this information." 
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