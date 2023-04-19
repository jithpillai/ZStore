import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function informations() {
  return (
    <div className="container my-24 px-6 mx-auto">
      <section id="contact-us" className="mb-32 text-gray-800">
        <div className="flex flex-col justify-between mb-5">
          <header>
          <div className="py-2 font-semibold m-4">
            <Link href="/">Back to Home</Link>
          </div>
            <nav className="flex h-16 items-center px-4 justify-between">
              <Link href="/" className="text-lg font-bold">
                <Image
                  className="headerLogo"
                  src="/images/ZeroTo5Logo.png"
                  alt="ZeroTo5"
                  width="80"
                  height="40"
                />
              </Link>
            </nav>
          </header>
        </div>
        <h2 className="text-3xl font-bold mb-12">Contact us</h2>
        <div className="block rounded-lg shadow-lg bg-white">
          <div className="flex flex-wrap items-center">
            <div className="grow-0 shrink-0 basis-auto block w-full lg:flex lg:w-6/12 xl:w-4/12">
              <div className="map-container-2 w-full">
                <iframe
                  src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=ZeroTo5+Baby+Shop, Edavaka+Mananthavady+Kerala&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  className="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
              <div className="flex flex-wrap pt-12 lg:pt-0">
                <div className="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="p-4 bg-amber-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="headset"
                          className="w-5 text-white"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="grow ml-6">
                      <p className="font-bold mb-1">Customer Support</p>
                      <p className="text-gray-500">ZeroTo5@outlook.com</p>
                      <p className="text-gray-500">+91 9595 333 556</p>
                    </div>
                  </div>
                </div>
                <div className="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <div className="p-4 bg-amber-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="dollar-sign"
                          className="w-3 text-white"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 288 512"
                        >
                          <path
                            fill="currentColor"
                            d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="grow ml-6">
                      <p className="font-bold mb-1">Order Questions</p>
                      <p className="text-gray-500">ZeroTo5@outlook.com</p>
                      <p className="text-gray-500">+91 7406 469 765</p>
                    </div>
                  </div>
                </div>
                <div className="mb-12 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12">
                  <div className="flex align-start">
                    <div className="shrink-0">
                      <div className="p-4 bg-amber-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="newspaper"
                          className="w-5 text-white"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 576 512"
                        >
                          <path
                            fill="currentColor"
                            d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="grow ml-6">
                      <p className="font-bold mb-1">Office Details</p>
                      <p className="text-gray-500">ZeroTo5 Baby Shop</p>
                      <p className="text-gray-500">
                        Calicut Road, Payod, Mananthavady, Wayanad, Kerala
                        670645
                      </p>
                      <p className="text-gray-500">+91 9946 246 146</p>
                    </div>
                  </div>
                </div>
                <div className="mb-12 lg:mb-0 grow-0 shrink-0 basis-auto w-full md:w-6/12 lg:w-full xl:w-6/12 px-3 md:px-6 xl:px-12">
                  <div className="flex align-start">
                    <div className="shrink-0">
                      <div className="p-4 bg-amber-600 rounded-md shadow-md w-14 h-14 flex items-center justify-center">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="bug"
                          className="w-5 text-white"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="grow ml-6">
                      <p className="font-bold mb-1">Bug report</p>
                      <p className="text-gray-500">rrb@ihue.in</p>
                      <p className="text-gray-500">+91 7406 469 765</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cancel-refund">
        <h2 className="text-3xl font-bold mb-12">
          Cancellation and Refund Policy
        </h2>
        <p>
          An order can be cancelled only if, the order is not already shipped. In that case the customer should collect the courier and return the product back to us. Then we can cancel the order.
        </p>
        <p>
          Goods purchased can be exchanged only within 5 days from the date of
          delivery
        </p>
        <p>
          To cancel or exchange and order please reach out to us through zeroto5@outlook.com or 9595333556
        </p>
        <p>The refund amount once approved, will be credited to your account within 7 working days once we receive the returned item, if the item is shipped already.</p>
        <p>
          The return or exchange of the order, courier charges to be borne by
          the customer, unless if there was any mistake in the items shipped
        </p>
        <p>
          No exchange or refund for inner garments, fancy items and sealed items
          like baby wipes, diapers etc.
        </p>

        <p>
          No exchange or refund if the item seems used or dirty after the
          purchase.
        </p>

        <p>Fancy Items, no gurantee.</p>

        <p>
          In case of any confusion or inconvenience, please reach out to us.
        </p>
      </section>

      <section id="shipping-delivery">
        <h2 className="text-3xl font-bold mb-12 mt-12">
          Shipping and Delivery Policy
        </h2>
        <p>Order shipped cannot be cancelled</p>
        <p>Shipping cost (if any) will vary depending on the location of the customer and delivery partner who are available for that particular location</p>
        <p>At present we do not provide any international shipping.</p>
        <p>
          Orders will be shipped within 2 days of the payment confirmation.
          Unless if there is some constraints.
        </p>
        <p>
          Shipping charges (if Any), will not be refunded, unless if there is
          any mistake in the items delivered
        </p>
        <p>
          Date of delivery is not a gurantee and can change based on the
          delivery partners constraints.
        </p>
        <p>
          In case of any confusion or inconvenience, please reach out to us.{' '}
        </p>
      </section>

      <section id="terms-conditions">
        <h2 className="text-3xl font-bold mt-12 mb-12">Terms and Conditions</h2>

        <p>Welcome to zeroto5.in!</p>

        <p>
          These terms and conditions outline the rules and regulations for the
          use of ZeroTo5&apos;s Website, located at https://zeroto5.in.
        </p>

        <p>
          By accessing this website we assume you accept these terms and
          conditions. Do not continue to use zeroto5.in if you do not agree to
          take all of the terms and conditions stated on this page.
        </p>

        <p>
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and all Agreements:
          &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to
          you, the person log on this website and compliant to the
          Company&apos;s terms and conditions. &quot;The Company&quot;,
          &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and
          &quot;Us&quot;, refers to our Company. &quot;Party&quot;,
          &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client and
          ourselves. All terms refer to the offer, acceptance and consideration
          of payment necessary to undertake the process of our assistance to the
          Client in the most appropriate manner for the express purpose of
          meeting the Client&apos;s needs in respect of provision of the
          Company&apos;s stated services, in accordance with and subject to,
          prevailing law of in. Any use of the above terminology or other words
          in the singular, plural, capitalization and/or he/she or they, are
          taken as interchangeable and therefore as referring to same.
        </p>

        <h3>
          <strong>Cookies</strong>
        </h3>

        <p>
          We employ the use of cookies. By accessing zeroto5.in, you agreed to
          use cookies in agreement with the ZeroTo5&apos;s Privacy Policy.{' '}
        </p>

        <p>
          Most interactive websites use cookies to let us retrieve the
          user&apos;s details for each visit. Cookies are used by our website to
          enable the functionality of certain areas to make it easier for people
          visiting our website. Some of our affiliate/advertising partners may
          also use cookies.
        </p>

        <h3>
          <strong>License</strong>
        </h3>

        <p>
          Unless otherwise stated, ZeroTo5 and/or its licensors own the
          intellectual property rights for all material on zeroto5.in. All
          intellectual property rights are reserved. You may access this from
          zeroto5.in for your own personal use subjected to restrictions set in
          these terms and conditions.
        </p>

        <p>You must not:</p>
        <ul>
          <li>Republish material from zeroto5.in</li>
          <li>Sell, rent or sub-license material from zeroto5.in</li>
          <li>Reproduce, duplicate or copy material from zeroto5.in</li>
          <li>Redistribute content from zeroto5.in</li>
        </ul>

        <p>
          This Agreement shall begin on the date hereof. Our Terms and
          Conditions were created with the help of the{' '}
          <a href="https://www.termsfeed.com/terms-conditions-generator/">
            Terms and Conditions Generator
          </a>
          .
        </p>

        <p>
          Parts of this website offer an opportunity for users to post and
          exchange opinions and information in certain areas of the website.
          ZeroTo5 does not filter, edit, publish or review Comments prior to
          their presence on the website. Comments do not reflect the views and
          opinions of ZeroTo5,its agents and/or affiliates. Comments reflect the
          views and opinions of the person who post their views and opinions. To
          the extent permitted by applicable laws, ZeroTo5 shall not be liable
          for the Comments or for any liability, damages or expenses caused
          and/or suffered as a result of any use of and/or posting of and/or
          appearance of the Comments on this website.
        </p>

        <p>
          ZeroTo5 reserves the right to monitor all Comments and to remove any
          Comments which can be considered inappropriate, offensive or causes
          breach of these Terms and Conditions.
        </p>

        <p>You warrant and represent that:</p>

        <ul>
          <li>
            You are entitled to post the Comments on our website and have all
            necessary licenses and consents to do so;
          </li>
          <li>
            The Comments do not invade any intellectual property right,
            including without limitation copyright, patent or trademark of any
            third party;
          </li>
          <li>
            The Comments do not contain any defamatory, libelous, offensive,
            indecent or otherwise unlawful material which is an invasion of
            privacy
          </li>
          <li>
            The Comments will not be used to solicit or promote business or
            custom or present commercial activities or unlawful activity.
          </li>
        </ul>

        <p>
          You hereby grant ZeroTo5 a non-exclusive license to use, reproduce,
          edit and authorize others to use, reproduce and edit any of your
          Comments in any and all forms, formats or media.
        </p>

        <h3>
          <strong>Hyperlinking to our Content</strong>
        </h3>

        <p>
          The following organizations may link to our Website without prior
          written approval:
        </p>

        <ul>
          <li>Government agencies;</li>
          <li>Search engines;</li>
          <li>News organizations;</li>
          <li>
            Online directory distributors may link to our Website in the same
            manner as they hyperlink to the Websites of other listed businesses;
            and
          </li>
          <li>
            System wide Accredited Businesses except soliciting non-profit
            organizations, charity shopping malls, and charity fundraising
            groups which may not hyperlink to our Web site.
          </li>
        </ul>

        <p>
          These organizations may link to our home page, to publications or to
          other Website information so long as the link: (a) is not in any way
          deceptive; (b) does not falsely imply sponsorship, endorsement or
          approval of the linking party and its products and/or services; and
          (c) fits within the context of the linking party&apos;s site.
        </p>

        <p>
          We may consider and approve other link requests from the following
          types of organizations:
        </p>

        <ul>
          <li>commonly-known consumer and/or business information sources;</li>
          <li>dot.com community sites;</li>
          <li>associations or other groups representing charities;</li>
          <li>online directory distributors;</li>
          <li>internet portals;</li>
          <li>accounting, law and consulting firms; and</li>
          <li>educational institutions and trade associations.</li>
        </ul>

        <p>
          We will approve link requests from these organizations if we decide
          that: (a) the link would not make us look unfavorably to ourselves or
          to our accredited businesses; (b) the organization does not have any
          negative records with us; (c) the benefit to us from the visibility of
          the hyperlink compensates the absence of ZeroTo5; and (d) the link is
          in the context of general resource information.
        </p>

        <p>
          These organizations may link to our home page so long as the link: (a)
          is not in any way deceptive; (b) does not falsely imply sponsorship,
          endorsement or approval of the linking party and its products or
          services; and (c) fits within the context of the linking party&apos;s
          site.
        </p>

        <p>
          If you are one of the organizations listed in paragraph 2 above and
          are interested in linking to our website, you must inform us by
          sending an e-mail to ZeroTo5. Please include your name, your
          organization name, contact information as well as the URL of your
          site, a list of any URLs from which you intend to link to our Website,
          and a list of the URLs on our site to which you would like to link.
          Wait 2-3 weeks for a response.
        </p>

        <p>Approved organizations may hyperlink to our Website as follows:</p>

        <ul>
          <li>By use of our corporate name; or</li>
          <li>By use of the uniform resource locator being linked to; or</li>
          <li>
            By use of any other description of our Website being linked to that
            makes sense within the context and format of content on the linking
            party&apos;s site.
          </li>
        </ul>

        <p>
          No use of ZeroTo5&apos;s logo or other artwork will be allowed for
          linking absent a trademark license agreement.
        </p>

        <h3>
          <strong>iFrames</strong>
        </h3>

        <p>
          Without prior approval and written permission, you may not create
          frames around our Webpages that alter in any way the visual
          presentation or appearance of our Website.
        </p>

        <h3>
          <strong>Content Liability</strong>
        </h3>

        <p>
          We shall not be hold responsible for any content that appears on your
          Website. You agree to protect and defend us against all claims that is
          rising on your Website. No link(s) should appear on any Website that
          may be interpreted as libelous, obscene or criminal, or which
          infringes, otherwise violates, or advocates the infringement or other
          violation of, any third party rights.
        </p>

        <h3>
          <strong>Reservation of Rights</strong>
        </h3>

        <p>
          We reserve the right to request that you remove all links or any
          particular link to our Website. You approve to immediately remove all
          links to our Website upon request. We also reserve the right to amen
          these terms and conditions and it&apos;s linking policy at any time.
          By continuously linking to our Website, you agree to be bound to and
          follow these linking terms and conditions.
        </p>

        <h3>
          <strong>Removal of links from our website</strong>
        </h3>

        <p>
          If you find any link on our Website that is offensive for any reason,
          you are free to contact and inform us any moment. We will consider
          requests to remove links but we are not obligated to or so or to
          respond to you directly.
        </p>

        <p>
          We do not ensure that the information on this website is correct, we
          do not warrant its completeness or accuracy; nor do we promise to
          ensure that the website remains available or that the material on the
          website is kept up to date.
        </p>

        <h3>
          <strong>Disclaimer</strong>
        </h3>

        <p>
          To the maximum extent permitted by applicable law, we exclude all
          representations, warranties and conditions relating to our website and
          the use of this website. Nothing in this disclaimer will:
        </p>

        <ul>
          <li>
            limit or exclude our or your liability for death or personal injury;
          </li>
          <li>
            limit or exclude our or your liability for fraud or fraudulent
            misrepresentation;
          </li>
          <li>
            limit any of our or your liabilities in any way that is not
            permitted under applicable law; or
          </li>
          <li>
            exclude any of our or your liabilities that may not be excluded
            under applicable law.
          </li>
        </ul>

        <p>
          The limitations and prohibitions of liability set in this Section and
          elsewhere in this disclaimer: (a) are subject to the preceding
          paragraph; and (b) govern all liabilities arising under the
          disclaimer, including liabilities arising in contract, in tort and for
          breach of statutory duty.
        </p>

        <p>
          As long as the website and the information and services on the website
          are provided free of charge, we will not be liable for any loss or
          damage of any nature.
        </p>
      </section>
      <section id="privacy-policy">
        <h2 className="text-3xl font-bold mt-12 mb-12">Privacy Policy</h2>
        <p>Last updated: April 19, 2023</p>
        <p>
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law
          protects You.
        </p>
        <p>
          We use Your Personal data to provide and improve the Service. By using
          the Service, You agree to the collection and use of information in
          accordance with this Privacy Policy.{' '}
        </p>
        <h1>Interpretation and Definitions</h1>
        <h2>Interpretation</h2>
        <p>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </p>
        <h2>Definitions</h2>
        <p>For the purposes of this Privacy Policy:</p>
        <ul>
          <li>
            <p>
              <strong>Account</strong> means a unique account created for You to
              access our Service or parts of our Service.
            </p>
          </li>
          <li>
            <p>
              <strong>Affiliate</strong> means an entity that controls, is
              controlled by or is under common control with a party, where
              &quot;control&quot; means ownership of 50% or more of the shares,
              equity interest or other securities entitled to vote for election
              of directors or other managing authority.
            </p>
          </li>
          <li>
            <p>
              <strong>Application</strong> refers to ZeroTo5, the software
              program provided by the Company.
            </p>
          </li>
          <li>
            <p>
              <strong>Company</strong> (referred to as either &quot;the
              Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot;
              in this Agreement) refers to ZeroTo5, Calicut Road, Payod,
              Mananthavady, Wayanad, Kerala 670645.
            </p>
          </li>
          <li>
            <p>
              <strong>Cookies</strong> are small files that are placed on Your
              computer, mobile device or any other device by a website,
              containing the details of Your browsing history on that website
              among its many uses.
            </p>
          </li>
          <li>
            <p>
              <strong>Country</strong> refers to: Kerala, India
            </p>
          </li>
          <li>
            <p>
              <strong>Device</strong> means any device that can access the
              Service such as a computer, a cellphone or a digital tablet.
            </p>
          </li>
          <li>
            <p>
              <strong>Personal Data</strong> is any information that relates to
              an identified or identifiable individual.
            </p>
          </li>
          <li>
            <p>
              <strong>Service</strong> refers to the Application or the Website
              or both.
            </p>
          </li>
          <li>
            <p>
              <strong>Service Provider</strong> means any natural or legal
              person who processes the data on behalf of the Company. It refers
              to third-party companies or individuals employed by the Company to
              facilitate the Service, to provide the Service on behalf of the
              Company, to perform services related to the Service or to assist
              the Company in analyzing how the Service is used.
            </p>
          </li>
          <li>
            <p>
              <strong>Usage Data</strong> refers to data collected
              automatically, either generated by the use of the Service or from
              the Service infrastructure itself (for example, the duration of a
              page visit).
            </p>
          </li>
          <li>
            <p>
              <strong>Website</strong> refers to ZeroTo5.in, accessible from{' '}
              <a href="https://zeroto5.in" rel="noreferrer" target="_blank">
                https://zeroto5.in
              </a>
            </p>
          </li>
          <li>
            <p>
              <strong>You</strong> means the individual accessing or using the
              Service, or the company, or other legal entity on behalf of which
              such individual is accessing or using the Service, as applicable.
            </p>
          </li>
        </ul>
        <h1>Collecting and Using Your Personal Data</h1>
        <h2>Types of Data Collected</h2>
        <h3>Personal Data</h3>
        <p>
          While using Our Service, We may ask You to provide Us with certain
          personally identifiable information that can be used to contact or
          identify You. Personally identifiable information may include, but is
          not limited to:
        </p>
        <ul>
          <li>
            <p>Email address</p>
          </li>
          <li>
            <p>First name and last name</p>
          </li>
          <li>
            <p>Phone number</p>
          </li>
          <li>
            <p>Address, State, Province, ZIP/Postal code, City</p>
          </li>
          <li>
            <p>Usage Data</p>
          </li>
        </ul>
        <h3>Usage Data</h3>
        <p>Usage Data is collected automatically when using the Service.</p>
        <p>
          Usage Data may include information such as Your Device&apos;s Internet
          Protocol address (e.g. IP address), browser type, browser version, the
          pages of our Service that You visit, the time and date of Your visit,
          the time spent on those pages, unique device identifiers and other
          diagnostic data.
        </p>
        <p>
          When You access the Service by or through a mobile device, We may
          collect certain information automatically, including, but not limited
          to, the type of mobile device You use, Your mobile device unique ID,
          the IP address of Your mobile device, Your mobile operating system,
          the type of mobile Internet browser You use, unique device identifiers
          and other diagnostic data.
        </p>
        <p>
          We may also collect information that Your browser sends whenever You
          visit our Service or when You access the Service by or through a
          mobile device.
        </p>
        <h3>Tracking Technologies and Cookies</h3>
        <p>
          We use Cookies and similar tracking technologies to track the activity
          on Our Service and store certain information. Tracking technologies
          used are beacons, tags, and scripts to collect and track information
          and to improve and analyze Our Service. The technologies We use may
          include:
        </p>
        <ul>
          <li>
            <strong>Cookies or Browser Cookies.</strong> A cookie is a small
            file placed on Your Device. You can instruct Your browser to refuse
            all Cookies or to indicate when a Cookie is being sent. However, if
            You do not accept Cookies, You may not be able to use some parts of
            our Service. Unless you have adjusted Your browser setting so that
            it will refuse Cookies, our Service may use Cookies.
          </li>
          <li>
            <strong>Web Beacons.</strong> Certain sections of our Service and
            our emails may contain small electronic files known as web beacons
            (also referred to as clear gifs, pixel tags, and single-pixel gifs)
            that permit the Company, for example, to count users who have
            visited those pages or opened an email and for other related website
            statistics (for example, recording the popularity of a certain
            section and verifying system and server integrity).
          </li>
        </ul>
        <p>
          Cookies can be &quot;Persistent&quot; or &quot;Session&quot; Cookies.
          Persistent Cookies remain on Your personal computer or mobile device
          when You go offline, while Session Cookies are deleted as soon as You
          close Your web browser.{' '}
        </p>
        <p>
          We use both Session and Persistent Cookies for the purposes set out
          below:
        </p>
        <ul>
          <li>
            <p>
              <strong>Necessary / Essential Cookies</strong>
            </p>
            <p>Type: Session Cookies</p>
            <p>Administered by: Us</p>
            <p>
              Purpose: These Cookies are essential to provide You with services
              available through the Website and to enable You to use some of its
              features. They help to authenticate users and prevent fraudulent
              use of user accounts. Without these Cookies, the services that You
              have asked for cannot be provided, and We only use these Cookies
              to provide You with those services.
            </p>
          </li>
          <li>
            <p>
              <strong>Cookies Policy / Notice Acceptance Cookies</strong>
            </p>
            <p>Type: Persistent Cookies</p>
            <p>Administered by: Us</p>
            <p>
              Purpose: These Cookies identify if users have accepted the use of
              cookies on the Website.
            </p>
          </li>
          <li>
            <p>
              <strong>Functionality Cookies</strong>
            </p>
            <p>Type: Persistent Cookies</p>
            <p>Administered by: Us</p>
            <p>
              Purpose: These Cookies allow us to remember choices You make when
              You use the Website, such as remembering your login details or
              language preference. The purpose of these Cookies is to provide
              You with a more personal experience and to avoid You having to
              re-enter your preferences every time You use the Website.
            </p>
          </li>
        </ul>
        <p>
          For more information about the cookies we use and your choices
          regarding cookies, please visit our Cookies Policy or the Cookies
          section of our Privacy Policy.
        </p>
        <h2>Use of Your Personal Data</h2>
        <p>The Company may use Personal Data for the following purposes:</p>
        <ul>
          <li>
            <p>
              <strong>To provide and maintain our Service</strong>, including to
              monitor the usage of our Service.
            </p>
          </li>
          <li>
            <p>
              <strong>To manage Your Account:</strong> to manage Your
              registration as a user of the Service. The Personal Data You
              provide can give You access to different functionalities of the
              Service that are available to You as a registered user.
            </p>
          </li>
          <li>
            <p>
              <strong>For the performance of a contract:</strong> the
              development, compliance and undertaking of the purchase contract
              for the products, items or services You have purchased or of any
              other contract with Us through the Service.
            </p>
          </li>
          <li>
            <p>
              <strong>To contact You:</strong> To contact You by email,
              telephone calls, SMS, or other equivalent forms of electronic
              communication, such as a mobile application&apos;s push
              notifications regarding updates or informative communications
              related to the functionalities, products or contracted services,
              including the security updates, when necessary or reasonable for
              their implementation.
            </p>
          </li>
          <li>
            <p>
              <strong>To provide You</strong> with news, special offers and
              general information about other goods, services and events which
              we offer that are similar to those that you have already purchased
              or enquired about unless You have opted not to receive such
              information.
            </p>
          </li>
          <li>
            <p>
              <strong>To manage Your requests:</strong> To attend and manage
              Your requests to Us.
            </p>
          </li>
          <li>
            <p>
              <strong>For business transfers:</strong> We may use Your
              information to evaluate or conduct a merger, divestiture,
              restructuring, reorganization, dissolution, or other sale or
              transfer of some or all of Our assets, whether as a going concern
              or as part of bankruptcy, liquidation, or similar proceeding, in
              which Personal Data held by Us about our Service users is among
              the assets transferred.
            </p>
          </li>
          <li>
            <p>
              <strong>For other purposes</strong>: We may use Your information
              for other purposes, such as data analysis, identifying usage
              trends, determining the effectiveness of our promotional campaigns
              and to evaluate and improve our Service, products, services,
              marketing and your experience.
            </p>
          </li>
        </ul>
        <p>
          We may share Your personal information in the following situations:
        </p>
        <ul>
          <li>
            <strong>With Service Providers:</strong> We may share Your personal
            information with Service Providers to monitor and analyze the use of
            our Service, to contact You.
          </li>
          <li>
            <strong>For business transfers:</strong> We may share or transfer
            Your personal information in connection with, or during negotiations
            of, any merger, sale of Company assets, financing, or acquisition of
            all or a portion of Our business to another company.
          </li>
          <li>
            <strong>With Affiliates:</strong> We may share Your information with
            Our affiliates, in which case we will require those affiliates to
            honor this Privacy Policy. Affiliates include Our parent company and
            any other subsidiaries, joint venture partners or other companies
            that We control or that are under common control with Us.
          </li>
          <li>
            <strong>With business partners:</strong> We may share Your
            information with Our business partners to offer You certain
            products, services or promotions.
          </li>
          <li>
            <strong>With other users:</strong> when You share personal
            information or otherwise interact in the public areas with other
            users, such information may be viewed by all users and may be
            publicly distributed outside.
          </li>
          <li>
            <strong>With Your consent</strong>: We may disclose Your personal
            information for any other purpose with Your consent.
          </li>
        </ul>
        <h2>Retention of Your Personal Data</h2>
        <p>
          The Company will retain Your Personal Data only for as long as is
          necessary for the purposes set out in this Privacy Policy. We will
          retain and use Your Personal Data to the extent necessary to comply
          with our legal obligations (for example, if we are required to retain
          your data to comply with applicable laws), resolve disputes, and
          enforce our legal agreements and policies.
        </p>
        <p>
          The Company will also retain Usage Data for internal analysis
          purposes. Usage Data is generally retained for a shorter period of
          time, except when this data is used to strengthen the security or to
          improve the functionality of Our Service, or We are legally obligated
          to retain this data for longer time periods.
        </p>
        <h2>Transfer of Your Personal Data</h2>
        <p>
          Your information, including Personal Data, is processed at the
          Company&apos;s operating offices and in any other places where the
          parties involved in the processing are located. It means that this
          information may be transferred to — and maintained on — computers
          located outside of Your state, province, country or other governmental
          jurisdiction where the data protection laws may differ than those from
          Your jurisdiction.
        </p>
        <p>
          Your consent to this Privacy Policy followed by Your submission of
          such information represents Your agreement to that transfer.
        </p>
        <p>
          The Company will take all steps reasonably necessary to ensure that
          Your data is treated securely and in accordance with this Privacy
          Policy and no transfer of Your Personal Data will take place to an
          organization or a country unless there are adequate controls in place
          including the security of Your data and other personal information.
        </p>
        <h2>Delete Your Personal Data</h2>
        <p>
          You have the right to delete or request that We assist in deleting the
          Personal Data that We have collected about You.
        </p>
        <p>
          Our Service may give You the ability to delete certain information
          about You from within the Service.
        </p>
        <p>
          You may update, amend, or delete Your information at any time by
          signing in to Your Account, if you have one, and visiting the account
          settings section that allows you to manage Your personal information.
          You may also contact Us to request access to, correct, or delete any
          personal information that You have provided to Us.
        </p>
        <p>
          Please note, however, that We may need to retain certain information
          when we have a legal obligation or lawful basis to do so.
        </p>
        <h2>Disclosure of Your Personal Data</h2>
        <h3>Business Transactions</h3>
        <p>
          If the Company is involved in a merger, acquisition or asset sale,
          Your Personal Data may be transferred. We will provide notice before
          Your Personal Data is transferred and becomes subject to a different
          Privacy Policy.
        </p>
        <h3>Law enforcement</h3>
        <p>
          Under certain circumstances, the Company may be required to disclose
          Your Personal Data if required to do so by law or in response to valid
          requests by public authorities (e.g. a court or a government agency).
        </p>
        <h3>Other legal requirements</h3>
        <p>
          The Company may disclose Your Personal Data in the good faith belief
          that such action is necessary to:
        </p>
        <ul>
          <li>Comply with a legal obligation</li>
          <li>Protect and defend the rights or property of the Company</li>
          <li>
            Prevent or investigate possible wrongdoing in connection with the
            Service
          </li>
          <li>
            Protect the personal safety of Users of the Service or the public
          </li>
          <li>Protect against legal liability</li>
        </ul>
        <h2>Security of Your Personal Data</h2>
        <p>
          The security of Your Personal Data is important to Us, but remember
          that no method of transmission over the Internet, or method of
          electronic storage is 100% secure. While We strive to use commercially
          acceptable means to protect Your Personal Data, We cannot guarantee
          its absolute security.
        </p>
        <h1>Children&apos;s Privacy</h1>
        <p>
          Our Service does not address anyone under the age of 13. We do not
          knowingly collect personally identifiable information from anyone
          under the age of 13. If You are a parent or guardian and You are aware
          that Your child has provided Us with Personal Data, please contact Us.
          If We become aware that We have collected Personal Data from anyone
          under the age of 13 without verification of parental consent, We take
          steps to remove that information from Our servers.
        </p>
        <p>
          If We need to rely on consent as a legal basis for processing Your
          information and Your country requires consent from a parent, We may
          require Your parent&apos;s consent before We collect and use that
          information.
        </p>
        <h1>Links to Other Websites</h1>
        <p>
          Our Service may contain links to other websites that are not operated
          by Us. If You click on a third party link, You will be directed to
          that third party&apos;s site. We strongly advise You to review the
          Privacy Policy of every site You visit.
        </p>
        <p>
          We have no control over and assume no responsibility for the content,
          privacy policies or practices of any third party sites or services.
        </p>
        <h1>Changes to this Privacy Policy</h1>
        <p>
          We may update Our Privacy Policy from time to time. We will notify You
          of any changes by posting the new Privacy Policy on this page.
        </p>
        <p>
          We will let You know via email and/or a prominent notice on Our
          Service, prior to the change becoming effective and update the
          &quot;Last updated&quot; date at the top of this Privacy Policy.
        </p>
        <p>
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </p>
        <h1>Contact Us</h1>
        <p>
          If you have any questions about this Privacy Policy, You can contact
          us:
        </p>
        <ul>
          <li>
            <p>By email: zeroto5@outlook.com</p>
          </li>
          <li>
            <p>By phone number: +919595333556</p>
          </li>
        </ul>
      </section>
    </div>
  );
}
