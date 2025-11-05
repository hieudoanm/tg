import { PageTemplate } from '@telegram/templates/PageTemplate';

const TermsOfServicePage = () => {
	return (
		<PageTemplate activeId="profile">
			<div className="flex flex-col gap-y-4 p-4">
				<h1 className="text-3xl font-bold">Terms of Service</h1>
				<p>
					Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms of
					Service&quot;) carefully before using our website or services.
				</p>
				<h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
				<p>
					By accessing or using our services, you agree to be bound by these
					Terms. If you disagree, please do not use our services.
				</p>
				<h2 className="text-xl font-semibold">2. Use of Services</h2>
				<p>
					You agree to use our services only for lawful purposes and in
					compliance with all applicable laws.
				</p>
				<h2 className="text-xl font-semibold">3. Intellectual Property</h2>
				<p>
					All content and materials on our site are our intellectual property
					and may not be used without our prior written consent.
				</p>
				<h2 className="text-xl font-semibold">4. Termination</h2>
				<p>
					We may suspend or terminate your access to our services at any time,
					without prior notice or liability.
				</p>
				<h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
				<p>
					We are not liable for any indirect, incidental, or consequential
					damages arising from your use of our services.
				</p>
				<h2 className="text-xl font-semibold">6. Changes to Terms</h2>
				<p>
					We reserve the right to modify these Terms at any time. Changes will
					be posted on this page.
				</p>
				<h2 className="text-xl font-semibold">7. Contact Us</h2>
				<p>
					If you have any questions about these Terms, please contact us at
					terms@example.com.
				</p>
			</div>
		</PageTemplate>
	);
};

export default TermsOfServicePage;
