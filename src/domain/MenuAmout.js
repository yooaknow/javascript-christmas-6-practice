/*
inputview.js 에서 주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)
티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1

Input에서 받은 문자열을 각각의 메뉴에 매핑해서 넣어주는 기능이 필요할듯함.

원래 메뉴는 
<애피타이저>
양송이수프(6,000), 타파스(5,500), 시저샐러드(8,000)

<메인>
티본스테이크(55,000), 바비큐립(54,000), 해산물파스타(35,000), 크리스마스파스타(25,000)

<디저트>
초코케이크(15,000), 아이스크림(5,000)

<음료>
제로콜라(3,000), 레드와인(60,000), 샴페인(25,000) 
이렇게임
*/

// const menu = [
//   { type: '애피타이저', name: '양송이수프', price: 6000},
//   { type: '애피타이저', name: '타파스', price: 5500},
//   { type: '애피타이저', name: '시저샐러드', price: 8000},
//   { type: '메인', name: '양송이수프', price: 20000},
//   { type: '메인', name: '바비큐립', price: 54000},
//   { type: '메인', name: '해산물파스타', price: 35000},
//   { type: '메인', name: '크리스마스파스타', price: 25000},
//   { type: '디저트', name: '초코케이크', price: 15000},
//   { type: '디저트', name: '아이스크림', price: 5000},
//   { type: '음료', name: '제로콜라', price: 3000},
//   { type: '음료', name: '레드와인', price: 60000},
//   { type: '음료', name: '샴페인', price: 25000}
// ];


export function MenuAmount(Usermenu) {
  const itemsArray = Usermenu.split(',');
  const orderObject = {};
  itemsArray.forEach(item => {
  const [menu, quantity] = item.split('-');
  orderObject[menu] = Number(quantity);
});

  return orderObject ;
}

// 형식 -> 객체의 배열로 반환 { '티본스테이크': 1, '바비큐립': 1, '초코케이크': 2, '제로콜라': 1 }