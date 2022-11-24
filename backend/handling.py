import json
import requests
#api에 요청해서 json파일을 내가 원하는 변수로 가져오는 파이썬 파일

def isKorean(word):
    if len(word) <= 0:
        return False
    # UNICODE RANGE OF KOREAN: 0xAC00 ~ 0xD7A3 (in cp949)
    # word parameter must str.decode('cp949')
    for c in range(len(word)):
        if word[c] < u"\uac00" or word[c] > u"\ud7a3":
            return False
    return True




url_tmdb = 'https://api.themoviedb.org/3/movie/popular'
genre = {
12:'모험',
14 : '판타지',      
16:'애니메이션',    
18 : '드라마',           
27 : '공포',          
28:'액션',
35 : '코미디',          
36 : '역사',         
37 : '서부',
53 : '스릴러',
80 : '범죄',           
99 : '다큐멘터리',
878 : 'SF',
9648 : '미스터리',         
10402 : '음악',           
10749 : '로맨스',
10751 : '가족',      
10752 : '전쟁',
10770 : 'TV 영화',        
}
json_data = []
for key, value in genre.items():
    genre_pk = key
    genre_name = value
    e = {
      "model": "movies.genre",
      "pk":genre_pk,
      "fields": {
        "genre_name": genre_name,
      }
    }
    json_data.append(e)

for i in range(1,400):
  params = {"api_key": '94de22f213abfdca42d59ca86f1deb34',
            "language": "ko-KR",
            "page" : i,
  }
  params2 = {
            "api_key": '94de22f213abfdca42d59ca86f1deb34',
            "language": "ko-KR",
  }
  #columns작성
  res = requests.get(url_tmdb, params=params)
  data = res.json()['results']


 



  for obj in data:

      
      movietitle = obj.get('title','')
      original_title = obj.get('original_title','')
      actors = obj.get('actors',[])
      rate = obj.get('vote_average',0)

      if obj.get('release_date',):
        released_date = obj.get('release_date',)
      else:
        released_date = '1900-01-01'

      if obj.get('adult'):
         continue
      

      overview = obj.get('overview','')
      posterpath = obj.get('poster_path','')
      backdrop = obj.get('backdrop_path','')
      pk = obj.get('id','')
      adult = obj.get('adult')

      url_credit = f'https://api.themoviedb.org/3/movie/{pk}/credits'
      res_credit = requests.get(url_credit, params=params2)
      data_cast = res_credit.json()['cast']
      data_crew = res_credit.json()['crew']

      #배우받아오기
      actors = []
      cnt = 0
      for i in data_cast:
        if cnt <= 5:
          actors.append(i['name'])
          cnt += 1
        else:
          break
      #감독받아오기
      director = ''
      for i in range(len(data_crew)):
        if data_crew[i]['job'] == 'Director':
          director = data_crew[i]['name']
          break
        else:
          continue



      genre_ids = obj.get('genre_ids',[])
      
      e = {
        "pk": pk,
        "model": "movies.movie",
        "fields" : {
        'adult' : adult,
        'movietitle' : movietitle,
        'original_title' : original_title,
        'actors' : actors,
        'director' : director,
        'rate' : rate,
        'released_date': released_date,
        'overview': overview,
        'posterpath': posterpath,
        'backdrop': backdrop,
        'genres': genre_ids,
        }
      }
      if '' in e['fields'].values() or e['fields']['released_date'] == '1900-01-01' or e['fields']['backdrop'] == None:
        continue
      else:
          json_data.append(e)
  with open("./movies/fixtures/totalmovie.json", "w", encoding="utf-8") as w:
          json.dump(json_data, w, indent="\t", ensure_ascii=False)


