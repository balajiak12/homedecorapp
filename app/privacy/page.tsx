import { Metadata } from 'next'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy Policy | Modern Life Maven',
  description: 'Learn how Modern Life Maven collects, uses, and protects your personal information. Our commitment to your privacy and data security.',
}

export default function PrivacyPolicyPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacy Policy' },
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
      <article className="py-8 sm:py-12 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="prose prose-lg max-w-none">
              <section className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mt-8 sm:mt-10 mb-3 sm:mb-4">Introduction</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Welcome to Modern Life Maven (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  By using our website, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mt-8 sm:mt-10 mb-3 sm:mb-4">Information We Collect</h2>
                
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-white mt-6 sm:mt-8 mb-2 sm:mb-3">Information You Provide</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We may collect information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Subscribe to our newsletter or email list</li>
                  <li>Leave comments on our blog posts</li>
                  <li>Contact us through our contact form or email</li>
                  <li>Participate in surveys, contests, or promotions</li>
                  <li>Engage with us on social media platforms</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  This information may include your name, email address, and any other information you choose to provide.
                </p>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 dark:text-white mt-6 sm:mt-8 mb-2 sm:mb-3">Automatically Collected Information</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  When you visit our website, we automatically collect certain information about your device and browsing behavior, including:
                </p>
                <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>IP address and general location information</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Pages you visit on our site</li>
                  <li>Time and date of your visit</li>
                  <li>Referring website addresses</li>
                  <li>Clickstream data and navigation patterns</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mt-8 sm:mt-10 mb-3 sm:mb-4">How We Use Your Information</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>To provide, maintain, and improve our website and services</li>
                  <li>To send you newsletters, updates, and promotional communications (with your consent)</li>
                  <li>To respond to your comments, questions, and requests</li>
                  <li>To analyze website usage and trends to improve user experience</li>
                  <li>To detect, prevent, and address technical issues and security threats</li>
                  <li>To comply with legal obligations and enforce our terms of service</li>
                  <li>To personalize your experience and deliver content relevant to your interests</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mt-8 sm:mt-10 mb-3 sm:mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We use cookies, web beacons, and similar tracking technologies to collect and store information about your preferences and activity on our website. Cookies are small text files placed on your device when you visit a website.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We use cookies for:
                </p>
                <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Essential website functionality and security</li>
                  <li>Analytics to understand how visitors use our site</li>
                  <li>Advertising and affiliate marketing purposes</li>
                  <li>Remembering your preferences and settings</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  You can control cookies through your browser settings. However, disabling cookies may limit your ability to use certain features of our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mt-8 sm:mt-10 mb-3 sm:mb-4">Third-Party Services and Advertising</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Our website uses third-party services and advertising partners, including:
                </p>
                <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Google Analytics for website analytics</li>
                  <li>Advertising networks (such as Google AdSense) for displaying advertisements</li>
                  <li>Affiliate marketing networks for tracking and managing affiliate links</li>
                  <li>Social media platforms for embedded content and sharing features</li>
                  <li>Email service providers for newsletter delivery</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  These third-party services may collect information about your visits to our website and other websites to provide you with relevant advertisements and content. They may use cookies and similar tracking technologies.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We are not responsible for the privacy practices of these third-party services. We encourage you to review their privacy policies to understand how they collect and use your information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mt-8 sm:mt-10 mb-3 sm:mb-4">Affiliate Links</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Our website contains affiliate links. When you click on an affiliate link and make a purchase, we may receive a commission at no additional cost to you. Affiliate links are tracked through cookies and other tracking technologies to properly attribute sales to our website.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We only recommend products and services that we believe will be valuable to our readers. Your purchase through our affiliate links helps support our website and allows us to continue providing free content.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mt-8 sm:mt-10 mb-3 sm:mb-4">Data Security</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security. You use our services at your own risk.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mt-8 sm:mt-10 mb-3 sm:mb-4">Your Rights and Choices</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc list-outside ml-6 my-4 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>The right to access and receive a copy of your personal information</li>
                  <li>The right to rectify inaccurate or incomplete information</li>
                  <li>The right to request deletion of your personal information</li>
                  <li>The right to restrict or object to certain processing of your information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent at any time</li>
                  <li>The right to opt-out of marketing communications</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  To exercise any of these rights, please contact us using the information provided in the Contact Us section below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mt-8 sm:mt-10 mb-3 sm:mb-4">Children&apos;s Privacy</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If we learn that we have collected personal information from a child under 13, we will take steps to delete that information promptly.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mt-8 sm:mt-10 mb-3 sm:mb-4">Changes to This Privacy Policy</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Your continued use of our website after any changes to this Privacy Policy constitutes your acceptance of those changes. We encourage you to review this Privacy Policy periodically.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white mt-8 sm:mt-10 mb-3 sm:mb-4">Contact Us</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  <strong className="text-gray-900 dark:text-white">Modern Life Maven</strong><br />
                  Email: [Your contact email]<br />
                  Website: modernlifemaven.com
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  We will respond to your inquiry as soon as possible and within a reasonable timeframe.
                </p>
              </section>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

