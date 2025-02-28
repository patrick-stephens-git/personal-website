import os
from config import VECTOR_STORE_PATH, DOC_PATH, OPENAI_API_KEY
from langchain_community.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_openai import OpenAIEmbeddings

###################################
# Load and Chunk the PDF
###################################
def load_and_chunk_pdf(DOC_PATH):
    loader = PyMuPDFLoader(DOC_PATH)
    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=50)
    chunks = text_splitter.split_documents(documents)
    return chunks

###################################
# Create Embeddings and Store in Vector Database
###################################
VECTOR_STORE_PATH = "vector_store/faiss_index"

def create_or_load_vector_store(DOC_PATH):
    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
    # Check if FAISS index already exists
    if os.path.exists(VECTOR_STORE_PATH):
        print("Loading existing vector store.")
        vector_store = FAISS.load_local(VECTOR_STORE_PATH, embeddings, allow_dangerous_deserialization=True)
        return vector_store
    else:
        print("Creating new vector store.")
        chunks = load_and_chunk_pdf(DOC_PATH)
        vector_store = FAISS.from_documents(chunks, embeddings)
        vector_store.save_local(VECTOR_STORE_PATH) # Save vector_store to disk
        print("New vector store saved.")
        return vector_store

# Load document, chunk text, create embeddings & store in FAISS at app startup
if os.path.exists(VECTOR_STORE_PATH):
    vector_store = create_or_load_vector_store(DOC_PATH) # Initialize the vector store
    print("Document processing complete.")
else:
    print("Loading & chunking a new document...")
    vector_store = create_or_load_vector_store(DOC_PATH) # Initialize the vector store
    print("Document processing complete.")

