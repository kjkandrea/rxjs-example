import { Subject } from 'rxjs'

interface RawOrder {
	asd: string
}

const rawOrders$ = new Subject<RawOrder[]>()

console.log(rawOrders$)