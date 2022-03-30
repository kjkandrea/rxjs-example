import {orderProducts, deliveries, deliveryCompanies} from "./order/fixture";

const dummyPromise = <T>(dummyData: T): Promise<T> =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve(dummyData);
		}, 250);
	});

type TypeOfDelivery = typeof deliveries[number]
export interface Delivery extends TypeOfDelivery {
	deliveryCompanyType: 'CJ'|'DHL'
}

export const api = {
	getOrderProducts: () => dummyPromise(orderProducts),
	getDeliveries: () => dummyPromise(deliveries as Delivery[]),
	getDeliveryCompanies: () => dummyPromise(deliveryCompanies)
}