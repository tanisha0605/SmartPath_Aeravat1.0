from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import roadmap_generator, resume_reader, PyPDF2
import courses, chatbot
from quiz_generator import generate_quiz
from jobs import get_jobs
import re
app = Flask(__name__)
CORS(app)  

def slice_json(content):
    json_data = []
    start_index = 0
    while True:
        start_index = content.find('{', start_index)
        if start_index == -1:
            break
        end_index = content.find('}', start_index)
        if end_index == -1:
            break
        json_part = content[start_index:end_index + 1]
        try:
            json_data.append(json.loads(json_part))
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
        start_index = end_index + 1
    return json_data

@app.route('/generate/roadmap', methods=['POST'])
def generate_roadmap():
    arr = []
    data = request.get_json()
    year = data["year"]
    role = data["role"]
    roadmap = roadmap_generator.generate_map(role, year)
    output = slice_json(str(roadmap.content))
    print(output)
    for item in output:
        tech_obj = {'framework': item['framework'], 'topics': item['topics'],'optional':item['optional'],'duration':item['duration']}
        arr.append(tech_obj)
    print(arr)
    return jsonify({"roadmap": arr})


@app.route('/generate/quiz',methods=['POST'])
def quiz():
    data = request.get_json()
    input = data["input"]
    # skill=data["skill"]
    quiz=generate_quiz(input)
    print(quiz)
    print(quiz.content)
    output=slice_json(str(quiz.content))
    print(output)
    return jsonify({"quiz":output})

@app.route('/generate/resume-roadmap',methods=['POST'])
def resume_roadmap():
    arr = []
    year = request.form.get("year")
    role = request.form.get("role")
    file = request.files.get('file')
    if file:
        pdf_reader = PyPDF2.PdfReader(file)
        
        text = ""
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()
        info = resume_reader.extract_info(text)
        skills = info['Skills']
        tier = resume_reader.generate_tier(info)
        print(tier)
        print(skills)
        roadmap = roadmap_generator.generate_map(tier=tier, skills=skills, role=role, year=year)
        print(roadmap.content)
        output = slice_json(str(roadmap.content))
        print(output)
        for item in output:
            tech_obj = {'framework': item['framework'], 'topics': item['topics'],'optional':item['optional'],'duration':item['duration'],'project': item['project']}
            arr.append(tech_obj)
        print(arr)
        return jsonify({"roadmap": arr})
    
    # If file is not found or any other error occurs, return an error response
    return jsonify({"error": "File not found or error processing the resume"})


@app.route('/get/jobs', methods=['POST'])
def get_job():
    data = request.get_json()
    role = data["role"]
    location = data["location"]
    jobs = get_jobs(role, location)
    return jsonify({"jobs": jobs})

@app.route("/chatbot", methods=["POST"])
def chatbot_route():
    data = request.json
    query = data['query']
    output = chatbot.chatbot_func(query)
    cleaned_message = re.sub(r'\nHuman:.*?(?=\nAI:|$)', '', output)
    cleaned_message = re.sub(r'\nAI:', '\n', cleaned_message)
    return jsonify({"answer": cleaned_message})

@app.route("/courses", methods=["POST"])
def courses_route():
    data=request.json
    subject=data['subject']
    output=courses.get_courses(subject)
    return jsonify({"courses":output})
if __name__ == "__main__":
    app.run(port=5000)


