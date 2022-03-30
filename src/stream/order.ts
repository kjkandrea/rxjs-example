import { Subject } from 'rxjs'
import {orderProducts, deliveries, deliveryCompanies} from "../infrastructure/http/order/fixture";

export const orderProducts$ = new Subject<typeof orderProducts>()
export const deliveries$ = new Subject<typeof deliveries>()
export const deliveryCompanies$ = new Subject<typeof deliveryCompanies>()

orderProducts$.subscribe(console.log)