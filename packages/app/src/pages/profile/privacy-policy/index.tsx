import { PageTemplate } from '@telegram/templates/PageTemplate';

const PrivacyPolicyPage = () => {
	return (
		<PageTemplate activeId="profile">
			<div className="flex flex-col gap-y-4 p-4">
				<h1 className="text-3xl font-bold">Privacy Policy</h1>
				<p>
					Your privacy is important to us. This Privacy Policy explains how we
					collect, use, and protect your information.
				</p>
				<h2 className="text-xl font-semibold">1. Information We Collect</h2>
				<p>
					We may collect personal information you provide directly to us, such
					as your name, email address, and other contact details.
				</p>
				<h2 className="text-xl font-semibold">2. How We Use Information</h2>
				<p>
					We use the information to provide, maintain, and improve our services,
					and to communicate with you.
				</p>

				<h2 className="text-xl font-semibold">3. Data Security</h2>
				<p>
					We implement security measures to protect your data but cannot
					guarantee absolute security.
				</p>
				<h2 className="text-xl font-semibold">4. Changes to This Policy</h2>
				<p>
					We may update this Privacy Policy from time to time. We will notify
					you of any changes by posting the new Privacy Policy on this page.
				</p>
				<h2 className="text-xl font-semibold">5. Contact Us</h2>
				<p>
					If you have any questions about this Privacy Policy, please contact us
					at privacy@example.com.
				</p>
			</div>
		</PageTemplate>
	);
};

export default PrivacyPolicyPage;
