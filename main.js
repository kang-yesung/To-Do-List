const addBtn = document.querySelector(".fa-plus"); // 추가버튼
const input = document.querySelector(".footer_input"); //input 요소
const items = document.querySelector(".items"); // ul
const reset = document.querySelector(".reset");
const light = document.querySelector(".fa-sun");
const dark = document.querySelector(".fa-moon");

//li 요소 생성함수
function createItem(text) {
  console.log(text);
  const itemRow = document.createElement("li");
  itemRow.className = "item";
  itemRow.innerHTML = `<span>${text}</span>
          <i class="fa-solid fa-check"></i>
          <i class="fa-solid fa-trash"></i>
        </li>`;

  // 체크버튼 클릭시 클래스 추가 이벤트
  itemRow.querySelector(".fa-check").addEventListener("click", () => {
    itemRow.classList.toggle("item_done");
    saveItems();
  });

  //삭제 버튼 클릭시 itemRow 제거 이벤트
  itemRow.querySelector(".fa-trash").addEventListener("click", () => {
    itemRow.remove();
    saveItems();
  });

  //setTimeout(() => itemRow.scrollIntoView({ block: 'center' }), 0);
  requestAnimationFrame(() => itemRow.scrollIntoView({ block: "center" }));

  return itemRow;
}

// 추가함수
function onAdd() {
  const text = input.value.trim();
  if (!text) {
    input.value = "";
    input.focus();
    return;
  }

  // li생성하는 함수 - createItem(text)
  // ul에 생성값을 추가함

  items.appendChild(createItem(text));
  saveItems();
  input.value = "";
  input.focus();
}

// 이벤트 등록
addBtn.addEventListener("click", onAdd);
// input.addEventListener('keypress', (e) => {
//   console.log(e);
//   if (e.key === 'Enter') {
//     onAdd();
//   }
// });

input.addEventListener("keyup", (e) => e.key === "Enter" && onAdd());

// 모든 리스트 초기화
reset.addEventListener("click", () => {
  items.innerHTML = "";
  saveItems();
});

//다크모드
dark.addEventListener("click", () => {
  const body = document.querySelector(".body");
  body.className = "body-dark";

  const container = document.querySelector(".container");
  container.className = "container-dark";

  const header = document.querySelector(".header");
  header.className = "header-dark";

  const footer = document.querySelector(".footer");
  footer.className = "footer-dark";

  const footer_input = document.querySelector(".footer_input");
  footer_input.className = "footer_input-dark";

  light.style.visibility = "visible"; // 라이트모드 아이콘 표시
  dark.style.visibility = "hidden"; // 다크모드 아이콘 숨기기
});

//라이트 모드
light.addEventListener("click", () => {
  const body = document.querySelector(".body-dark");
  body.className = "body";

  const container = document.querySelector(".container-dark");
  container.className = "container";

  const header = document.querySelector(".header-dark");
  header.className = "header";

  const footer = document.querySelector(".footer-dark");
  footer.className = "footer";

  const footer_input = document.querySelector(".footer_input-dark");
  footer_input.className = "footer_input";

  light.style.visibility = "hidden"; // 라이트모드 아이콘 숨기기
  dark.style.visibility = "visible"; // 다크모드 아이콘 표시
});

//로컬스토리지 저장
function saveItems() {
  const itemsArr = [];
  //itemsArr 배열을 생성하여, 이 배열에 할 일 목록을 저장
  document.querySelectorAll(".item").forEach((item) => {
    //document.querySelectorAll(".item")는 모든 .item 클래스를 가진 요소를 찾아서
    // 배열처럼 순회할 수 있도록 반환합니다. forEach 메서드를 사용하여
    // 각 항목(item)을 하나씩 처리합니다.
    const text = item.querySelector("span").textContent;
    //각 .item 요소 안에 있는 span 요소의 텍스트(textContent)를 가져옵니다.
    // 이 텍스트는 할 일 목록의 내용이 됩니다.
    const isDone = item.classList.contains("item_done");
    //.item 요소에 item_done 클래스가 포함되어 있는지 확인하여,
    // 완료 상태(isDone)를 boolean 값으로 반환합니다.
    // item_done 클래스가 있으면 할 일이 완료된 것으로 간주합니다.
    itemsArr.push({ text, isDone });
    //text와 isDone 값을 객체로 묶어서 itemsArr 배열에 추가합니다.
    // 각 항목은 { text: "항목 내용", isDone: true/false } 형식의 객체로 저장됩니다.
  });
  localStorage.setItem("todoitem", JSON.stringify(itemsArr));
  //itemsArr 배열을 JSON.stringify()를 사용하여 JSON 형식의 문자열로 변환한 뒤,
  // localStorage.setItem() 메서드를 사용해 todoitems라는 키로 로컬 스토리지에 저장
}

function loadItems() {
  const saveItems = JSON.parse(localStorage.getItem("todoitem"));
  //localStorage.getItem("todoitem")을 사용하여 todoitem이라는 키로 저장된 데이터를 가져옵니다.
  // 이 데이터는 문자열 형태로 저장되어 있기 때문에,
  // JSON.parse()를 사용해 다시 객체나 배열로 변환합니다.
  // 변환된 데이터는 saveItems 변수에 저장
  if (saveItems) {
    saveItems.forEach(({ text, isDone }) => {
      //saveItems는 배열 형식이기 때문에, forEach를 사용하여 배열의 각 항목에 대해 반복
      //각 항목은 객체 형식으로, { text, isDone }의 두 속성을 가지고 있습니다.
      //text는 할 일의 내용이고, isDone은 해당 항목이 완료되었는지 여부를 나타냅니다.
      const newItem = createItem(text);
      //createItem(text) 함수가 호출되어 새로운 할 일 항목(newItem)을 생성합니다.
      // createItem 함수는 할 일의 텍스트를 받아 li 요소를 만들어 반환
      if (isDone) {
        newItem.classList.add("item_done"); // 완료된 아이템으로 표시
        //isDone 값이 true라면, 해당 항목이 완료된 것으로 간주하고, newItem에 item_done 클래스를 추가
      }
      items.appendChild(newItem);
      //최종적으로 생성된 newItem을 items 요소 (즉, ul)에 추가하여 할 일 목록을 화면에 표시
    });
  }
}

// function saveItems() {
//   const itmsArr = [];
//   document.querySelectorAll(".item").forEach((item) => {
//     itmsArr.push(item.querySelector("span").textContent);
//   });
//   localStorage.setItem("todoitems", JSON.stringify(itmsArr));
// }

// function loadItems() {
//   const saveItems = JSON.parse(localStorage.getItem("todoitems"));
//   if (saveItems) {
//     saveItems.forEach((itemText) => {
//       items.appendChild(createItem(itemText));
//     });
//   }
// }

window.onload = loadItems;
