import json
import requests
#api에 요청해서 json파일을 내가 원하는 변수로 가져오는 파이썬 파일

# movietitle = models.CharField(max_length=20)
# actors = models.TextField()
# rate = models.FloatField()
# released_data = models.DateField( auto_now=False, auto_now_add=False)
# popularity = models.IntegerField()
# overview = models.TextField()
# posterpath = models.TextField()

# "poster_path": "/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg",
#       "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
#       "release_date": "1994-09-10",
#       "genre_ids": [
#         18,
#         80
#       ],
#       "id": 278,
#       "title": "The Shawshank Redemption",
#       "vote_count": 5238,
#       "vote_average": 8.32

#출처: https://gist.github.com/stynxh/5d162078c03ab3c9f16d9e7e0e42b253
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

for i in range(1,10):
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
      actors = obj.get('actors',[])
      rate = obj.get('vote_average',0)

      if obj.get('release_date',):
        released_data = obj.get('release_date',)
      else:
        released_data = '1900-01-01'

      overview = obj.get('overview','')
      posterpath = obj.get('poster_path','')
      pk = obj.get('id','')

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
        'movietitle' : movietitle,
        'actors' : actors,
        'director' : director,
        'rate' : rate,
        'released_data': released_data,
        'overview': overview,
        'posterpath': posterpath,
        'genres': genre_ids,
        }
      }
      if '' in e['fields'].values() or e['fields']['released_data'] == '1900-01-01':
        continue
      else:
          json_data.append(e)
  with open("./backend/movies/fixtures/movie_data.json", "w", encoding="utf-8") as w:
          json.dump(json_data, w, indent="\t", ensure_ascii=False)


