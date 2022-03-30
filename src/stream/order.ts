import {BehaviorSubject, Subject, combineLatest, map} from 'rxjs'
import {Delivery, OrderProduct, DeliveryCompanies} from "../infrastructure/http/order";

export const orderProducts$ = new BehaviorSubject<OrderProduct[]>([])
export const deliveries$ = new Subject<Delivery[]>()
export const deliveryCompanies$ = new Subject<DeliveryCompanies>()

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
					deliveryCompanyName: deliveryCompanies[deliveryCompanyType]
				}))
				.filter(({ products }) => products.length)
		})
	)

export const removeLastOrderProduct = () => {
	const nextOrderProducts = orderProducts$.value
	nextOrderProducts.pop()
	orderProducts$.next(nextOrderProducts)
}

orderByShippingNo$.subscribe(v => v.length && console.log(v))