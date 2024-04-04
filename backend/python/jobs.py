from serpapi import GoogleSearch

def get_jobs(role, location):
    params = {
        "api_key": "af5ce4a05b46dd2be9269279239d840d8c9b69b6a1cfabc5bcb59f87ed289684",
        "engine": "google_jobs",
        "google_domain": "google.co.in",
        "q": role,
        "hl": "en",
        "gl": "in",
        "location": location,
    }

    search = GoogleSearch(params)
    results = search.get_dict()

    # Extract only the desired fields
    # Extract only the desired fields
    extracted_results = []
    for result in results['jobs_results']:
        description_lines = result['description'].split('\n')
        salary_line = next((line for line in description_lines if 'Salary:' in line), "Not mentioned")
        links = [link_dict['link'] for link_dict in result['related_links']]
        extracted_result = {
            'title': result['title'],
            'company_name': result['company_name'],
            'salary_info': salary_line,
            'links': links
        }
        extracted_results.append(extracted_result)

    return extracted_results

# jobs = jobs("Flutter Developer", "Maharashtra")
# print(jobs)