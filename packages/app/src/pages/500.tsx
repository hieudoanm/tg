import { ErrorTemplate } from '@telegram/templates/ErrorTemplate';
import { NextPage } from 'next';

const InternalServerErrorPage: NextPage = () => {
	return <ErrorTemplate code="500" />;
};

export default InternalServerErrorPage;
