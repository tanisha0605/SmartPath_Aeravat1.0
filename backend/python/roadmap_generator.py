from dotenv import load_dotenv
import os, json
# Load .env file
load_dotenv()

# Get OpenAI keys from .env file
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

from langchain_community.chat_models import ChatOpenAI
from langchain.output_parsers import ResponseSchema
from langchain.output_parsers import StructuredOutputParser

from langchain_core.prompts import (
    ChatPromptTemplate,
)

model = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)



def generate_map(role, year,tier="beginner",skills="none"):
    framework_schema=ResponseSchema(
        name="framework",
        description="a particular framework or library",
    )
    topics_schema=ResponseSchema(
        name="topics",
        description="This is a list of topics that the student should learn for the given framework or library"
    )
    optional_schema=ResponseSchema(
        name="optional",
        description="This is a boolean indicating if the suggested tech stack has any option or not.For eg:Node,Django for backend"
    )
    duration_schema=ResponseSchema(
        name="duration",
        description="This is the estimated time to learn(in months) each framework or library.Generate this based on user given year"
    )
    project_schema=ResponseSchema(
        name="project",
        description="Suggest a project for the user.An intermediate-advanced level project that the user should build to solidify his understanding of the concepts learned in the roadmap for each framework or library."
    )
    response_schema=[framework_schema,optional_schema,duration_schema,topics_schema,project_schema]
    output_parser=StructuredOutputParser.from_response_schemas(response_schema)
    format_instructions=output_parser.get_format_instructions()

    prompt_template = """
    Provide different framewords, libraries and topics with their concepts for an Engineering student who wants to be a {role} by {year}.
    Consider his skill level as {tier}.Based on this skill generate a roadmap for him.
    Each framewrork should have a list of topics.
    Each framework must have a duration
    It is essential that you provide topics and duration.
    Duration should consider user's {year}.Current year is 2022.
    So the amount of time left time for the user to achieve his goal is {year}-2022.
    generate the roadmap based on this time.
    You should assure that duration allows user to achieve his goal by {year}.Current year is 2022.
    Duration should be as less as possible and should be less if user is of higher tier.
    This are his existing skills:{skills}.
    If there are multiple frameworks for the same task ,set optional to true
    eg: 
    The output should be in the following format:
    HTML: [tags, attributes, forms, tables, etc.],
    {format_instructions}
    """

    prompt = ChatPromptTemplate.from_template(template=prompt_template)
    messages=prompt.format_messages(role=role, year=year,tier=tier,skills=skills,format_instructions=format_instructions)
    response = model.invoke(messages)
    
    print(response)
    return response


# print(generate_map("backend developer", 2026))