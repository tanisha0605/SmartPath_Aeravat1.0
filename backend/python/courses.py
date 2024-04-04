from serpapi import GoogleSearch

def get_courses(subject):
    params = {
    "api_key": "af5ce4a05b46dd2be9269279239d840d8c9b69b6a1cfabc5bcb59f87ed289684",
    "engine": "google",
    "q": subject+" courses",
    "google_domain": "google.com",
    "gl": "us",
    "hl": "en"
    }

    search = GoogleSearch(params)
    results = search.get_dict()
    if 'inline_videos' in results:
        video_links = [video['link'] for video in results['inline_videos'][:2]]
    else:
        video_links = []
    redirect_links = [result['redirect_link'].replace("https://www.google.com", "") for result in results['organic_results'][:5]]
    video_links.extend(redirect_links)
    return video_links

print(get_courses("Frontend"))