import {orderProducts, deliveries, deliveryCompanies} from "./order/fixture";

export type OrderProduct = typeof orderProducts[number]
export type DeliveryCompanies = typeof deliveryCompanies
type TypeOfDelivery = typeof deliveries[number]
export interface Delivery extends TypeOfDelivery {
	deliveryCompanyType: 'CJ'|'DHL'
}

const dummyPromise = <T>(dummyData: T): Promise<T> =>
	new Promise(resolve => {
		setTimeout(() => {
			resolve(dummyData);
		}, 250);
	});

export const api = {
	getOrderProducts: () => dummyPromise(orderProducts),
	getDeliveries: () => dummyPromise(deliveries as Delivery[]),
	getDeliveryCompanies: () => dummyPromise(deliveryCompanies)
}