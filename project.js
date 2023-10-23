const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGVkYWI1NzZiNWY5OWI4Y2RhNDczNDI0NDRiZmE5NSIsInN1YiI6IjY1MzBhMzdmYWVkZTU5MDEyYjMxNDY0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bLHGuTiZBmgeQuHaq3OKzqQL_6ptv5eg8zpbD3Plfoc'
  }
};

const movieList = (title) => {
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())

    .then(response => movie(response.results, title))
    .catch(err => console.error(err));
}

const movie = (movieObj, title) => {
  let cardList = document.querySelector('.container');
  cardList.innerHTML = null;

  if (title !== undefined) { // 만약 title이 undefined가 아닌경우(검색어가 있는 경우에는) ~게 처리하라 라는 If로직을 생성
    // title과 검색값이 맞는지 비교할 수 있는 함수를 만들도록 하자.
    movieObj = movieObj.filter((obj) => {
      if (obj.title.toUpperCase().search(title.toUpperCase()) !== -1) {
        return true;
      }
    })

  }
  let containerView = document.querySelector(".container")
  movieObj.forEach(a => {
    // console.log(a.id, a.title, a.overview, a.vote_average, a.poster_path)
    let temp_html =
      `
    <div class="col" onclick="idAlert(${a.id})">
    <div class="card">
      <img src="https://image.tmdb.org/t/p/w500/${a.poster_path}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${a.title}</h5>;
        <p class="card-text">${a.overview}</p>;
        <p class="card-vote_average">${a.vote_average}</p>
      </div>
    </div>
    `
  
    containerView.insertAdjacentHTML('beforeend', temp_html);
  });

};

function idAlert (id){
  alert(`영화ID " ${id}`);
}

movieList()

// 검색기능 클릭 기능
// 1.  onclick기능을 이용하여 함수를 만들어줘서 작동하는지 확인해보기.
// html file.  <button id="searchButton" class="btn btn-outline-light" type="button" onclick="search()">검색<
// const search = () => {
//   alert("굿")
//  };

// 2. 입력한 검색어를 가져오는 방법
// html 파일   <input type="text" id ="searchBox" placeholder="영화 제목 입력"> 에 id를 준다.
// search(documnet.quarySelector('#searchBox').value); 를 입력해줘야함. 

// search 함수의 return값.

// ex ABC === 'A'
//    0.1.2
//    ABC === `D`
//    -1을 반환

// containerView.addEventListener("click", printID)
// const printID = () => {
//   alert('영화ID: ${a.id}');