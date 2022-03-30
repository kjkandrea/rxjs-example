import {orderProducts, deliveries, deliveryCompanies} from "./order/fixture";

const dummyPromise = <T>(dummyData: T): Promise<T> =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve(dummyData);
		}, 250);
	});


export const api = {
	getOrderProducts: () => dummyPromise(orderProducts),
	getDeliveries: () => dummyPromise(deliveries),
	getDeliveryCompanies: () => dummyPromise(deliveryCompanies)
}