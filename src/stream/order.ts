import { Subject, combineLatest, map } from 'rxjs'
import {orderProducts, deliveries, deliveryCompanies} from "../infrastructure/http/order/fixture";

type TypeOfDelivery = typeof deliveries[number]
interface Delivery extends TypeOfDelivery {
	deliveryCompanyType: 'CJ'|'DHL'
}


export const orderProducts$ = new Subject<typeof orderProducts>()
export const deliveries$ = new Subject<Delivery[]>()
export const deliveryCompanies$ = new Subject<typeof deliveryCompanies>()

const orderProductByDeliveryNo = combineLatest([orderProducts$, deliveries$, deliveryCompanies$]).pipe(
	map(([orderProducts, deliveries, deliveryCompanies]) => {
		return deliveries.map(({ shippingNo, address, deliveryCompanyType }) => ({
			shippingNo,
			address,
			products: orderProducts.filter(product => product.shippingNo === shippingNo),
			deliveryCompanyName: deliveryCompanies[deliveryCompanyType]
		}))
	})
)

orderProductByDeliveryNo.subscribe(console.log)