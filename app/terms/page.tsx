import { Metadata } from 'next'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Terms of Service | Modern Life Maven',
  description: 'Read the Terms of Service for Modern Life Maven. Understand the rules and guidelines for using our website and content.',
}

export default function TermsOfServicePage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Terms of Service' },
  ]

  const today = new Date()
  const lastUpdated = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container-custom py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      {/* Main Content */}
      <article className="py-12 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">Agreement to Terms</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Welcome to Modern Life Maven. These Terms of Service (&quot;Terms,&quot; &quot;Terms of Service&quot;) govern your access to and use of our website, including all content, features, and services provided by Modern Life Maven (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  By accessing or using our website, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our website.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We reserve the right to modify these Terms at any time. Your continued use of the website after any changes constitutes your acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">Use of Website</h2>
                
                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8 mb-3">Permitted Use</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You may use our website for lawful purposes only and in accordance with these Terms. You agree to:
                </p>
                <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Use the website only for personal, non-commercial purposes</li>
                  <li>Respect intellectual property rights of all content</li>
                  <li>Provide accurate information when required</li>
                  <li>Maintain the security of your account credentials, if applicable</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>

                <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mt-8 mb-3">Prohibited Activities</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Use the website in any way that violates any applicable law or regulation</li>
                  <li>Attempt to gain unauthorized access to any portion of the website or related systems</li>
                  <li>Interfere with or disrupt the website or servers connected to the website</li>
                  <li>Use automated systems, robots, or scrapers to access the website without permission</li>
                  <li>Transmit any viruses, malware, or other harmful code</li>
                  <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity</li>
                  <li>Collect or harvest any information about other users without their consent</li>
                  <li>Engage in any activity that could damage, disable, or impair the website</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">Intellectual Property Rights</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  The website and its original content, features, and functionality are owned by Modern Life Maven and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without prior written permission, except as follows:
                </p>
                <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
                  <li>You may store files that are automatically cached by your web browser for display enhancement purposes</li>
                  <li>You may print or download one copy of a reasonable number of pages of the website for your own personal, non-commercial use and not for further reproduction, publication, or distribution</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If you wish to use any material from our website beyond these exceptions, please contact us for permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">User-Generated Content</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If you submit comments, feedback, or other content to our website, you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You represent and warrant that:
                </p>
                <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>You own or have the necessary rights to submit the content</li>
                  <li>The content is accurate and not misleading</li>
                  <li>The content does not violate any third-party rights or applicable laws</li>
                  <li>The content is not defamatory, obscene, harassing, or otherwise objectionable</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We reserve the right to remove any user-generated content that violates these Terms or is otherwise objectionable, at our sole discretion.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">Affiliate Relationships and Disclosures</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Our website contains affiliate links. When you click on an affiliate link and make a purchase, we may receive a commission at no additional cost to you. This helps support our website and allows us to continue providing free content.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We only recommend products and services that we believe will be valuable to our readers. However, we are not responsible for:
                </p>
                <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>The quality, accuracy, or availability of products or services sold through affiliate links</li>
                  <li>Any issues you may encounter when purchasing products or services through affiliate links</li>
                  <li>Price changes, product availability, or terms of sale on third-party websites</li>
                  <li>Customer service or support provided by third-party merchants</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  All purchases made through affiliate links are subject to the terms and conditions of the third-party merchant. We recommend that you review the merchant&apos;s terms and privacy policy before making a purchase.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">Disclaimer of Warranties</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  THE INFORMATION ON THIS WEBSITE IS PROVIDED ON AN &quot;AS IS&quot; BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
                </p>
                <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
                  <li>Accuracy, completeness, or reliability of any information on the website</li>
                  <li>That the website will be available, uninterrupted, secure, or error-free</li>
                  <li>That defects will be corrected or that the website or servers are free of viruses or other harmful components</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We do not warrant, endorse, guarantee, or assume responsibility for any product or service advertised or offered by a third party through the website or any hyperlinked website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL MODERN LIFE MAVEN, ITS AFFILIATES, AGENTS, DIRECTORS, EMPLOYEES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE, THE WEBSITE.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATING TO THE USE OF THE WEBSITE SHALL NOT EXCEED THE AMOUNT YOU PAID TO US, IF ANY, IN THE 12 MONTHS PRIOR TO THE EVENT GIVING RISE TO LIABILITY.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so the above limitation may not apply to you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">Indemnification</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You agree to defend, indemnify, and hold harmless Modern Life Maven, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to your violation of these Terms or your use of the website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">Third-Party Links and Content</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Our website may contain links to third-party websites, products, or services. These links are provided for your convenience only. We do not endorse, warrant, or assume responsibility for the content, privacy policies, or practices of any third-party websites.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Your interactions with third-party websites are solely between you and the third party. We are not responsible for any loss or damage of any sort incurred as a result of any such dealings or as a result of the presence of such third parties on the website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">Termination</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We may terminate or suspend your access to the website immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Upon termination, your right to use the website will cease immediately. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">Governing Law and Jurisdiction</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. You agree to submit to the personal and exclusive jurisdiction of the courts located in [Your Jurisdiction] for the resolution of any disputes arising from or relating to these Terms or the website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">Severability</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect and enforceable.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">Entire Agreement</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and Modern Life Maven regarding your use of the website and supersede all prior and contemporaneous written or oral agreements between you and Modern Life Maven.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mt-10 mb-4">Contact Information</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong className="text-gray-900 dark:text-white">Modern Life Maven</strong><br />
                  Email: [Your contact email]<br />
                  Website: modernlifemaven.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

