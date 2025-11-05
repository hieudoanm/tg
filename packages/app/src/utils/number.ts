export const commas = (number: number | bigint) => {
	if (typeof number !== 'number' && typeof number !== 'bigint') return '';
	return number.toLocaleString('en-US');
};

export const currency = (
	number: number | bigint,
	currency = 'USD',
	locale = 'en-US',
) => {
	if (typeof number !== 'number' && typeof number !== 'bigint') return '';
	return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
		number,
	);
};
