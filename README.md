# javascript-w3-todo

스프린트 3-4주차 웹 프로젝트 - 할일관리



## 설치방법

```
npm install
npx webpack
```



## 실행방법

```
npm start
```



## 실행화면

![image](https://user-images.githubusercontent.com/7006837/94221607-6b2a5d00-ff26-11ea-9b78-aff6da314b5f.png)

## 배포 URL

http://49.50.163.212/

<br>

-----

## ERD

![erd](https://user-images.githubusercontent.com/7006837/95014334-12bf3200-0681-11eb-95ee-232082d3ff50.PNG)



-----

## BE 프로그래밍 요구사항

- [x] Node.js와 Express를 활용한다.
- [x] 프론트엔드 기능구현에 필요한 API를 제공한다.
- [x] 템플릿 엔진보다는 json을 응답해주는 API형태로 구현한다.
- [x] MySQL을 사용하고 드라이버는 mysql2를 사용한다. ORM은 사용하지 않는다.
- [x] express-session을 사용해서 인증을 구현한다. passport는 사용하지 않는다.
- [x] session은 메모리에 저장한다. 별도의 외부 저장장치를 사용하지 않는다.
- [x] 배포는 클라우드 서버의 단일 인스턴스를 이용해서 배포를 진행한다.
- [x] 배포시 깃의 tag를 적극적으로 활용하고, 자주 배포작업을 수행한다.
- [x] <선택> 다사용자가 사용할 수 있도록 설계를 한다.
- [ ] <선택> 사용자별로 각 목록에 대한 접근권한 (읽기 / 쓰기) 제한 기능을 구현해 본다.

## FE 프로그래밍 요구사항

- Webpack과 Babel을 활용해서 기본적인 환경을 구성한다.
  - [x] sourceMap 설정을 해서 디버깅이 가능해야 함
  - [x] babel에서 전세계 2%이상의 점유율을 가진 브라우저에서 동작 가능하도록 설정한다.
  - [x] css 와 image도 import 되도록 한다.
  - [x] 환경설정이 끝나는 시점에는, 본인만의 boilerplate를 만들어서 개인 계정의 github에 올린다.(선택)
- ES Mdoules방식으로 모듈화를 구성한다.
  - [x] 각각의 모듈은 함수와 더불어 ES Classes도 활용하며 개발 한다.
  - [x] 하나의 모듈(파일)에는 가급적 하나의 클래스만 구현한다.
- [x] 비동기 통신은 fetch API를 활용하고 then 메서드를 통해서 통신 이후의 처리를 한다.
- [x] DOM 조작과정에서 template literal 을 활용한 문자열 기반의 파싱을 권장한다.
- [x] Drag and Drop
  - [x] [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)를 사용할 수 있다.
  - [ ] (권장) 위 API를 사용하지 않고 직접 구현한다.
- [x] 이벤트 위임방식을 적극 활용한다.
- [x] 코드 구현에 도움이 되는 외부 라이브러리를 사용할 수 없다.
- CSS
  - [x] CSS가 약간 익숙하다면, SASS와 같은 pre-processor 를 사용할 수 있다.
