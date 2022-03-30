import {Subject, combineLatest, map} from 'rxjs'
import {orderProducts, deliveryCompanies} from "../infrastructure/http/order/fixture";
import {Delivery} from "../infrastructure/http/order";

export const orderProducts$ = new Subject<typeof orderProducts>()
export const deliveries$ = new Subject<Delivery[]>()
export const deliveryCompanies$ = new Subject<typeof deliveryCompanies>()

export interface OrderProductsByShippingNo {
	shippingNo: number,
	address: string,
	products: { shippingNo: number, productName: string }[],
	deliveryCompanyName: string
}

export const orderProductsByShippingNo$ = combineLatest([orderProducts$, deliveries$, deliveryCompanies$])
	.pipe<OrderProductsByShippingNo[]>(
		map(([orderProducts, deliveries, deliveryCompanies]) => {
			return deliveries.map(({shippingNo, address, deliveryCompanyType}) => ({
				shippingNo,
				address,
				products: orderProducts.filter(product => product.shippingNo === shippingNo),
				deliveryCompanyName: deliveryCompanies[deliveryCompanyType]
			}))
		})
	)

orderProductsByShippingNo$.subscribe(console.log)