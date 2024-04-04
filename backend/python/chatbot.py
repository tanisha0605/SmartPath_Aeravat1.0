from langchain.llms import OpenAI
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain_core.prompts import (
    PromptTemplate,
)
import os
from dotenv import load_dotenv
load_dotenv()
OPENAI_API_KEY = os.getenv("OPEN_AI_API_KEY")
def chatbot_func(query):
    model = OpenAI(model_name="gpt-3.5-turbo-instruct")
    template="""
    Enquire about users skills.
    You are a querying bot which asks the user 1 relevant question based on what the user wants to become.If user mentions his skills or says generate roadmap or anything similiar, 
    thanks him first and then say that now his roadmap can be generated and prompt the user to press the generate button.
     {input}
    """
    prompt=PromptTemplate(template=template, input_variables=["input"],)
    query=prompt.format(input=query)
    return model.invoke(query)
# print(chatbot_func("I want to become a frontend developer"))