import { ErrorTemplate } from '@telegram/templates/ErrorTemplate';
import { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
	return <ErrorTemplate code="404" />;
};

export default NotFoundPage;
