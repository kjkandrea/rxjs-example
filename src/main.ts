import './style.css'
import { api } from "./infrastructure/http/order";
import {
	deliveries$,
	deliveryCompanies$,
	orderByShippingNo$,
	orderProducts$,
	OrderByShippingNo
} from "./stream/order";

const app = document.querySelector<HTMLDivElement>('#app');

if(app) app.innerHTML = `
  <h1>Hello RxJS!</h1>
  <ul id="orders"></ul>
`;

const el = document.querySelector('#orders') as HTMLDivElement;
(function main() {
	const init = () => {
		fetch() // promise ignored
		subscribeDataStream()
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

	const subscribeDataStream = () => orderByShippingNo$.subscribe(render)

	const render = (data: OrderByShippingNo[]) => {
		el.innerHTML = data.map(getHTMLTemplate).join("")
	}

	const getHTMLTemplate = (data: OrderByShippingNo) => `
		<li>
			<h2>shippingNo : ${data.shippingNo}</h2>
			<p>배송지 : ${data.address}</p>
			<p>배송사 : ${data.deliveryCompanyName}</p>
			<p>구매 상품명 : ${data.products.map(({ productName }) => productName).join(', ')}</p>
		</li>
	`

	init()
}())