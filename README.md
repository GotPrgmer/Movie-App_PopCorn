## 🗓 프로젝트 기간

---

- 일시 : 2022.11.16(수) ~ 2022.11.25(금)

---

## 👨🏻‍💻👨🏼‍💻 팀원

| 이름  | 담당 영역                                                          |
| --- | -------------------------------------------------------------- |
| 김민준 | - 디자인(10%) / 프론트엔드(25%) / 백엔드(90%)<br/>- ERD작성 디비모델링, 시스템 주요기능 데이터 송수신 함수 작성, 각종 시리얼라이저 작성, 응답 전송 시스템 구축 |
| 김진희 | - 디자인(90%) / 프론트엔드(75%) / 백엔드(10%)<br/>- 사용자의 요청 전송 시스템 구축, 출력 화면 디자인, 쟝고 프레임워크와 소통하는 함수 작성   |

---

## 📋 Description

- 사용자 맞춤 영화 추천 시스템 구축

- 간단한 게임을 통한 영화 추천 시스템

- 좋아요와 팔로우를 통한 커뮤니티 영화 추천시스템

---

## 💻 기술 스택

- Front-end : VUE, SWIPER,  

- Back-end  : Django REST Framework

---

## 📚 데이터베이스 모델링

erd구조
![Screen Shot 2022-12-05 at 7 04 16 PM](https://user-images.githubusercontent.com/55742497/205609809-06ac1906-6db4-4276-bd1c-f5765e94abc8.png)
---

## 🧮 컴포넌트 구조

컴포넌트 구조
![뷰컴포넌트구조](https://user-images.githubusercontent.com/55742497/205604780-1fa40034-2df4-4cbd-abe3-2f7a0995702c.png)
---

## 📌 서비스 구현

- 메인 페이지 ( 간단한 게임을 통한 개인별 맞춤 추천 / 평점 순 영화 추천)
<img width="1440" alt="메인화면" src="https://user-images.githubusercontent.com/55742497/205604840-02bca1b7-dbe1-42c0-b09a-d032ed9f8145.png">
<img width="1439" alt="메인화면2" src="https://user-images.githubusercontent.com/55742497/205605101-eece9546-5fb3-4084-bb7f-8b0ccb32e884.png">
<img width="1439" alt="취향에맞춘영화" src="https://user-images.githubusercontent.com/55742497/205604952-00680a90-25a9-4701-ac84-4e19b8743e3f.png">

- 회원가입 및 로그인 페이지
<img width="1439" alt="회원가입" src="https://user-images.githubusercontent.com/55742497/205605011-03f7e5ef-9ba9-431f-87bf-064165c15529.png">

<img width="1439" alt="로그인" src="https://user-images.githubusercontent.com/55742497/205605172-31e783fe-d05c-43b2-826e-7f17daaf5bdb.png">


<img width="1439" alt="받아주지않는고양이" src="https://user-images.githubusercontent.com/55742497/205605240-9cbf578c-aa2e-455b-a51d-4b51340c5088.png">
<img width="1439" alt="누구시냐는고양이" src="https://user-images.githubusercontent.com/55742497/205605288-14a31f59-90b6-43bf-9b1a-282c41b28c1f.png">




- 영화 상세정보 페이지 및 댓글
<img width="1439" alt="무비테이블" src="https://user-images.githubusercontent.com/55742497/205605371-874d4837-326b-4967-942e-65209bdae1b1.png">

-사용자가 작성한 댓글
<img width="1439" alt="사용자가쓴댓글" src="https://user-images.githubusercontent.com/55742497/205605780-e883e190-1757-4cbd-aefd-7addb81ee402.png">


  
- 댓글 좋아요 구현 & 댓글 작성 · 수정 · 삭제 
<img width="1439" alt="댓글좋아요작성수정삭제" src="https://user-images.githubusercontent.com/55742497/205605468-cf3b6e6c-bfcf-45e8-ab99-a0e05887d297.png">





- 영화 맞춤 콘텐츠 
  
- 배우 맞추기 게임, 영화 명장면으로 제목 맞추기
  <img width="1439" alt="배우맞추기" src="https://user-images.githubusercontent.com/55742497/205604528-f9cc52e8-5b4c-42a7-9020-5e90f4f9317c.png">
  <img width="1439" alt="게임첫씬" src="https://user-images.githubusercontent.com/55742497/205604081-b20a9bbb-8b2d-4da1-a77c-b486d21db14d.png">

- 프로필 페이지 (마이페이지, 상대방 페이지)
<img width="1439" alt="친구가좋아한영화" src="https://user-images.githubusercontent.com/55742497/205605547-475fe501-72c5-4464-85be-589cc890fb26.png">

- 팔로우 정보 & 찜한 영화 목록 확인 가능
<img width="1439" alt="취향에맞춘영화" src="https://user-images.githubusercontent.com/55742497/205605602-c5d2ef73-e4e9-411d-8489-fd8139dacce1.png">

---

## 💻 프로젝트 실행 순서
백엔드
```
python -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata totalmovie.json
python manage.py runserver
```


프론트엔드
```
npm install or npm i
npm run serve
```


## 🤔 프로젝트 후기

- 김민준

```
처음에는 개발자로서 누군가와 같이 협업을 한다는 것이 처음에는 믿기지 않았고,
싸피에 들어오고 얼마되지 않는 시간동안 내가 무언가를 만들 수 있는 역량이 있을까에 대한 의심이 들었던 것 같습니다. 하지만 어찌저찌 한단계 한단계를 나아가면서
만족할 만큼은 아니지만 그래도 조금 흉내낼 수는 있구나 하는 생각이 드는 시간이었습니다. 또한, 같이 일하는 팀원과 때로는 입장의 차이가 있었지만, 그때마다 서로의
의견에 귀를 기울였고 서로의 의견을 수렴하기 위해 노력하였습니다. 그러면서 혼자 개발하는 실력도 물론 중요하지만 함께 일하는 능력도 필수적이라는 것을 알게되었습니다.

코드를 작성하면서 내가 깊숙하게 알고있는 부분과 그렇지 않은 부분이 확실하게 드러났던 것 같습니다. 코드를 완벽하게 이해하고 사용하진 못하여서 아쉬웠고 혼자 공부할 때
보충해 나가야할 것들이 많이 보였던 시간이라고 생각합니다. 그것을 기반으로 조금씩 채워나가면 지속적으로 성장하는 개발자가 되지 않을까 싶습니다.

하나의 간단한 웹사이트를 구현해보고 느낀 것은 우리가 사용하는 유명한 시스템들을 개발하는 개발자들이 참으로 대단하다고 생각했습니다. 우리가 사용할 정도로 에러가 적고
완성도가 높은 서비스를 만드려면 얼마나 공부를 하고 경험을 쌓아야하는지 가늠조차 안되지만, 이러한 경험들을 발판삼아 열심히 노력해서 언젠가는 사람들이 많이 사용하는
서비스를 유지보수하는 개발자가 되고 싶습니다.

마지막으로 페어야, 프로젝트 기간동안 정말 고마웠어!
```
