import './style.css'
import { api } from "./infrastructure/http/order";
import {deliveries$, deliveryCompanies$, orderProducts$} from "./stream/order";

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello RxJS!</h1>
`;

(function main() {
	const init = async () => {
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

	init()
}())