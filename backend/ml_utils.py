import requests
import json
from newspaper import Article
import readtime
import openai
import os
from dotenv import load_dotenv
load_dotenv()


def main_entities_main_article(url:str):
    try:
        article = Article(url)
        article.download()
        article.parse()
    except:
        return ""
    text_doc = article.text

    openai.api_key = os.getenv("OPENAI_API_KEY")

    title = openai.Completion.create(
        engine="text-davinci-003",
        prompt=text_doc+"\nGenerate a possible Google Search Query in less than 20 words that could return articles having the opposite sentiments to the main object of the above article. Return just the query.  Do not name anyone or any group except the main object. DO not use any proper nouns except the name of the main object. Keep in mind that the sentiment has to be opposite to what is reflected in the article. It should be a Google Search query. ",
        temperature=0.7,
        max_tokens=20,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        
    )
    title = title['choices'][0]['text'].replace("\"","")
    print(title)
    return title

def get_arts(title):
    #GET https://www.googleapis.com/customsearch/v1?key=AIzaSyBEkIbg_igQW74XXMsZ4I1ctjPjs-1AReM&cx=93ce7d57f86524684&q=lectures
    MY_API_KEY = os.getenv("MY_API_KEY")
    CX_KEY = os.getenv("CX_KEY")
    url_endpoint = "https://www.googleapis.com/customsearch/v1"
    key_query = "?key="+MY_API_KEY
    cx_query = "&cx="+CX_KEY
    query = "&q="+title
    url = url_endpoint+key_query+cx_query+query
    response = requests.get(url)
    response = json.loads(response.text)
    
    all_links = []
    for thing in response['items']:
        try:
            art = Article(thing["link"])
            art.download()
            art.parse()
        except:
            continue
        text = art.text
        read_time = str(readtime.of_text(text))
        dict = {"title": thing["title"],
                   "displayLink": thing["displayLink"],
                      "link": thing["link"],
                    "read_time": read_time}
                      
        print(dict)
        all_links.append(dict)
    return all_links




def driver(url):
    print("url",url)
    entities =main_entities_main_article(url)
    title = entities
    all_links = get_arts(title)
    print(all_links)
    return all_links