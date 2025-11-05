import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { FC } from 'react';

const Document: FC = () => {
	return (
		<Html lang="en">
			<Head>
				<Script
					src="https://telegram.org/js/telegram-web-app.js"
					strategy="beforeInteractive"
				/>
				<Script></Script>
			</Head>
			<body className="antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
