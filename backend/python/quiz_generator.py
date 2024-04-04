
import os
from dotenv import load_dotenv
# Load .env file
load_dotenv()

# Get OpenAI keys from .env file
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
def generate_quiz(input):

    tier_schema=ResponseSchema(
        name="tier",
        description="This is the tier of the question.It can be beginner,intermediate,advanced. This hsould contain the questions"
    )
    question_schema=ResponseSchema(
        name="question",
        description="This is the question.Its should contain 4 options from which one is correct"
    )
    options_schema=ResponseSchema(
        name="options",
        description="This is the options for the question.This should be a list of 4 options"
    )
    correct_schema=ResponseSchema(
        name="correct",
        description="This is the correct option for the question.This should be a seperate field from the options."
    )
    response_schema=[question_schema,correct_schema,options_schema,tier_schema]
    output_parser=StructuredOutputParser.from_response_schemas(response_schema)
    format_instructions=output_parser.get_format_instructions()

    prompt_template = """
    Generate 5 MCQ based question for the following topics and frameworks
    The questions should contain 1 beginner,2 intermediate,2 advanced questions.
  
    Each of the  question should be difficult enough so that user can test their knowledge for the framework.
    Also provide the correct answer for each question.
    {input}
    {format_instructions}
    """

    prompt = ChatPromptTemplate.from_template(template=prompt_template)
    messages=prompt.format_messages(
            input=input,
            format_instructions=format_instructions
        )
    return model.invoke(messages)