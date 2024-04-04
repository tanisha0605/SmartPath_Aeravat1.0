from pypdf import PdfReader
import re
from dotenv import load_dotenv
from roadmap_generator import generate_map
def read_pdf(file_path):
    reader=PdfReader(file_path)
    return reader.pages[0].extract_text()



def extract_info(text):
    text_lower = text.lower()
    skills_index = text_lower.find("skills")
    experience_index = text_lower.find("experience")

    if skills_index == -1 or experience_index == -1:
        return "Skills or Experience not found in the text."

    skills_lines = text[skills_index:].split('\n')[1:5]
    experience_lines = text[experience_index:].split('\n')[1:5]

    return {'Skills': skills_lines, 'Experience': experience_lines}

import os
# Load .env file
load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

from langchain_community.chat_models import ChatOpenAI
from langchain.output_parsers import ResponseSchema
from langchain.output_parsers import StructuredOutputParser

from langchain_core.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)

model = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)
def generate_tier(input):

    tier_schema=ResponseSchema(
        name="tier",
        description="This is the estimate of user's skill level based on the given input.It can be beginner,intermediate,advanced"
    )


    response_schema=[tier_schema]
    output_parser=StructuredOutputParser.from_response_schemas(response_schema)
    format_instructions=output_parser.get_format_instructions()

    prompt_template = """

    {input}
    based on this information give a skill tier to the user.
    {format_instructions}
    """

    prompt = ChatPromptTemplate.from_template(template=prompt_template)
    messages=prompt.format_messages(
            input=input,
            format_instructions=format_instructions
        )
    return model.invoke(messages)