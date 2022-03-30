import './style.css'
import {OrderProduct} from "./infrastructure/http/order";
import {
	orderByShippingNo$,
	orderProducts$,
	OrderByShippingNo, removeLastOrderProduct, fetchAll
} from "./stream/order";

const app = document.querySelector<HTMLDivElement>('#app');

if(app) app.innerHTML = `
  <h1>Hello RxJS!</h1>
  <button id="remove-product"><span data-name="productName"></span> 상품 주문 취소</button>
  <ul id="orders"></ul>
`;

const el = document.querySelector('#orders') as HTMLDivElement;
const removeProductButtonEl = document.querySelector('#remove-product') as HTMLButtonElement;

(function () {
	const init = () => {
		fetchAll() // promise ignored
		subscribeDataStream()
		bindEvent()
	}

	const subscribeDataStream = () => {
		orderByShippingNo$.subscribe(renderOrders)
		orderProducts$.subscribe(renderButtonProductName)
	}

	const renderOrders = (data: OrderByShippingNo[]) => {
		el.innerHTML = data.map(getHTMLTemplate).join("")
	}

	const renderButtonProductName = (data: OrderProduct[]) => {
		const el = removeProductButtonEl.querySelector('[data-name="productName"]') as HTMLSpanElement;
		const lastProduct = data.at(-1)
		el.innerHTML = lastProduct ? lastProduct.productName : '';
	}

	const getHTMLTemplate = (data: OrderByShippingNo) => `
		<li>
			<h2>shippingNo : ${data.shippingNo}</h2>
			<p>배송지 : ${data.address}</p>
			<p>배송사 : ${data.deliveryCompanyName}</p>
			<p>구매 상품명 : ${data.products.map(({ productName }) => productName).join(', ')}</p>
		</li>
	`

	const bindEvent = () => {
		removeProductButtonEl.addEventListener('click', () => removeLastOrderProduct())
	}

	init()
}())