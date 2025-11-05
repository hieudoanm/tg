type InitData = {
	auth_date: string;
	chat_instance: string;
	chat_type: string;
	hash: string;
	user: string;
};

type TelegramUser = {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	language_code: string;
	allows_write_to_pm: boolean;
	photo_url: string;
};
