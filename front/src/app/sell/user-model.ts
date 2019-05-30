export interface UserModel {
	ID_PARCEL:string
	barcode: string
	name:string
	newQuant?: NewSetQuant
	newSum?: NewSetSum
	price_sell_sum: number
	quant_div: number
	quant_float: number
	quant_int: number
	quant_num: number
}

export interface NewSetQuant{
	qant_int?: number
	quant_div?: number
}

export interface NewSetSum{
	newSumFloat?:number
}


export interface ChangeSum{
	priceSum?:number
	customerSum?:number
	customerChange?:number
	typeOfPay:number
	listOfProduct?:UserModel[]
}