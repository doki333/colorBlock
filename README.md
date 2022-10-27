# Color Block Game with React

>제가 예전에 언니 핸드폰으로 즐겨했었던 게임인데, 게임 이름이 생각이 안나서 직접 만들어봤습니다. 


### 1. 게임 방법
- 6개의 색 중에 3개의 색이 랜덤으로 선택된 가로 혹은 세로 블럭을 판에 올립니다. 가로 혹은 세로로 같은 색이 3개 이상 연속될 경우 색이 일치한 블럭들만 사라지고 점수가 올라갑니다. 블럭을 더 이상 놓을 곳이 없어졌을 때 게임은 오버됩니다.
- 첫 번째 아이템은 블럭 한 칸을 지워주는 것이고, 두 번째 아이템은 컬러 블럭들을 새로 가져오는 것입니다. 그리고 마지막 아이템은 점수는 유지한 채로 테이블을 초기화하는 것입니다.   

### 1-1. 코드 흐름   
- 게임을 처음에 시작한 경우, 중복되지 않은 3개의 색으로 구성된 블럭을 3개 만들어줍니다.
- 빈 테이블 판은 null값으로 구성되어 있고 블럭을 드래그해서 원하는 곳에 드롭해서 놓을 수 있습니다. 
- 드롭을 한 위치의 행과 열 인덱스를 조회하여 블럭의 숫자값으로 데이터를 대체합니다. 숫자에 따라 할당해놓은 색으로 테이블이 채워집니다.
- 만약 같은 블럭이 세 칸 이상 가로 혹은 세로로 연달아 있는 경우 블럭은 사라지고 점수가 올라갑니다.
- 다음 블럭이 들어갈 자리가 더이상 없는 경우, 게임은 종료되고, 다시 시작을 누르면 점수와 테이블이 초기화됩니다.   


### 2. 라이브러리   
- @tanstack/react-table : 게임 판으로 사용한 테이블 관련 라이브러리 입니다.   
- classnames: 조건부 클래스네임 지정 관련 라이브러리 입니다.  
- @redux-toolkit, react-redux : 전역 상태 관리 라이브러리 입니다.     
- react-sweetalert2, sweetalert2 : 팝업창 라이브러리 입니다.   

### 3. 폴더 구조

````
├─components
│  ├─ColorChips
│  ├─DataTable
│  ├─ItemTabs
│  └─Portal
├─data
├─routes
│  ├─EndPage
│  └─ItemPage
├─store
│  └─reducers
├─styles
│  ├─base
│  ├─constants
│  └─mixins
├─types
└─utils
````

### 4. 예시   
![dropblock](https://user-images.githubusercontent.com/88841429/197381865-9b3d930f-7e9c-49d7-8b55-b43ec4a99989.gif)
![gameend](https://user-images.githubusercontent.com/88841429/197381866-9b2b2b4e-2151-4d5f-8090-398be9978609.gif)   

### 5. 수정 사항    
- (221024) 웹 상에서 드래그 앤 드롭을 이용하여 게임을 구현했는데, 모바일 환경에서 드래그 앤 드롭이 되지 않는 것을 확인하였습니다. 그래서 touchstart, touchmove, touchend를 통해 모바일 상에서 드래그 앤 드롭이 되도록 수정하였습니다. touchStart 시에 블럭의 첫 시작 좌표를 저장한 후 touchMove 이벤트에서 현재 좌표를 가져와서 블럭이 이동할 수 있게 하였고, touchEnd 시에 좌표를 초기화해주었습니다.
- (221027) 게임 중에 사용할 수 있는 아이템을 추가하였습니다. 아이템 팝업을 띄우기 위해 sweetalert2를 사용하였습니다.   
-  (221028) 터치 이벤트 시에 마우스 이벤트가 같이 발생하여, 모바일 특히 사파리에서 블럭을 옮길 때 스크롤 되는 현상을 발견하였습니다. touchEnd에 event.preventDefault()를 추가하여 마우스 이벤트가 발생하지 않도록 수정하였습니다.   