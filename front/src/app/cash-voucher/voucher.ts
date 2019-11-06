export interface Voucher {
	name_voucher: string;
	created_at: Date;
	quant_velem: number;
	amount_price_sum: number;
	amount_customer_sum: number;
	amount_customer_change: number;
	type_pay: number;
}

export interface GetVoucher{
	dateStart: string;
	dateEnd: string
}

export interface tableVoucher{
	element:Voucher
	}
