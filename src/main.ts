import './style.css'
import { api } from "./infrastructure/http/order";

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello RxJS!</h1>
`;

(function main() {
	const promises = Promise.all([
		api.getDeliveries(),
		api.getDeliveryCompanies(),
		api.getOrderProducts()
	])

	promises.then(console.log)
}())