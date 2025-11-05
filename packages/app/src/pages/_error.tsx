import { ErrorTemplate } from '@telegram/templates/ErrorTemplate';
import { NextPage } from 'next';

const ErrorPage: NextPage = () => {
	return <ErrorTemplate code="500" />;
};

export default ErrorPage;
