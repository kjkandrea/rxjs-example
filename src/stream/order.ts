import {BehaviorSubject, combineLatest, map} from 'rxjs'
import {Delivery, OrderProduct, DeliveryCompanies} from "../infrastructure/http/order";

export const orderProducts$ = new BehaviorSubject<OrderProduct[]>([])
export const deliveries$ = new BehaviorSubject<Delivery[]>([])
export const deliveryCompanies$ = new BehaviorSubject<DeliveryCompanies|null>(null)

export interface OrderByShippingNo {
	shippingNo: number,
	address: string,
	products: { shippingNo: number, productName: string }[],
	deliveryCompanyName: string
}

export const orderByShippingNo$ = combineLatest([orderProducts$, deliveries$, deliveryCompanies$])
	.pipe<OrderByShippingNo[]>(
		map(([orderProducts, deliveries, deliveryCompanies]) => {
			return deliveries
				.map(({shippingNo, address, deliveryCompanyType}) => ({
					shippingNo,
					address,
					products: orderProducts.filter(product => product.shippingNo === shippingNo),
					deliveryCompanyName: deliveryCompanies ? deliveryCompanies[deliveryCompanyType] : 'unknown'
				}))
				.filter(({ products }) => products.length)
		})
	)

export const removeLastOrderProduct = () => {
	const nextOrderProducts = orderProducts$.value
	nextOrderProducts.pop()
	orderProducts$.next(nextOrderProducts)
}

orderByShippingNo$.subscribe(console.log)