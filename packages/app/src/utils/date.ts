const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const getSuffix = (number: number) => {
	const j = number % 10,
		k = number % 100;

	if (j === 1 && k !== 11) {
		return 'st';
	}
	if (j === 2 && k !== 12) {
		return 'nd';
	}
	if (j === 3 && k !== 13) {
		return 'rd';
	}
	return 'th';
};

export const formatDate = (d: Date) => {
	const monthIndex = d.getMonth();
	const month = months[monthIndex];
	const date = d.getDate();
	const year = d.getFullYear();
	const suffix = getSuffix(date);
	return `${month} ${date}${suffix} ${year}`;
};
