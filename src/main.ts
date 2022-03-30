import './style.css'
import {api, OrderProduct} from "./infrastructure/http/order";
import {
	deliveries$,
	deliveryCompanies$,
	orderByShippingNo$,
	orderProducts$,
	OrderByShippingNo, removeLastOrderProduct
} from "./stream/order";

const app = document.querySelector<HTMLDivElement>('#app');

if(app) app.innerHTML = `
  <h1>Hello RxJS!</h1>
  <button id="remove-product"><span data-name="productName"></span> 상품 주문 취소</button>
  <ul id="orders"></ul>
`;

const el = document.querySelector('#orders') as HTMLDivElement;
const removeProductButtonEl = document.querySelector('#remove-product') as HTMLButtonElement;
(function main() {
	const init = () => {
		fetch() // promise ignored
		subscribeDataStream()
		bindEvent()
	}

	const fetch = async () => {
		const promises = Promise.all([
			api.getOrderProducts(),
			api.getDeliveries(),
			api.getDeliveryCompanies()
		])
		const [orderProducts, deliveries, deliveryCompanies] = await promises

		orderProducts$.next(orderProducts)
		deliveries$.next(deliveries)
		deliveryCompanies$.next(deliveryCompanies)
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