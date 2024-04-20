import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Rules.css";

function Rules() {
  return (
    <div
      className="rules_container"
      style={{ overflowX: "hidden", overflowY: "auto" }}
    >
      <div className="beginning">
        <h1>Terms of Use</h1>
      </div>
      <div className="content">
        <ul>
          <li>
            1. <a href="#Use of Services">Use of Services</a>
            <ul>
              <li className="subtitle">
                1.1. <a href="#Membership">Membership</a>
              </li>
              <li className="subtitle">
                1.2. <a href="#Account">Account</a>
              </li>
              <li className="subtitle">
                1.3. <a href="#User Content"> User Content</a>
              </li>
            </ul>
          </li>
          <li>
            2. <a href="#Prohibited Conduct">Prohibited Conduct</a>
          </li>
          <li>
            3. <a href="#Privacy">Privacy</a>
          </li>
          <li>
            4. <a href="#Intellectual Property">Intellectual Property</a>
          </li>
          <li>
            5. <a href="#Disclaimer of Warranties">Disclaimer of Warranties</a>
          </li>
          <li>
            6. <a href="#Limitation of Liability">Limitation of Liability</a>
          </li>
          <li>
            7. <a href="#Governing Law">Governing Law</a>
          </li>
          <li>
            8. <a href="#Changes to Terms">Changes to Terms</a>
          </li>
          <li>
            9. <a href="#Contact Us"> Contact Us</a>
          </li>
          <li>
            10. <a href="#Entire Agreement">Entire Agreement</a>
          </li>
        </ul>
      </div>
      <p className="introduction">
        Welcome to AOT! These Terms of Use govern your use of our website and
        services. By accessing or using our services, you agree to be bound by
        these Terms.
      </p>
      <div className="rules_list">
        <section id="Use of Services">
          <h2>1. Use of Services</h2>
          <section>
            <h3 id="Membership">1.1. Membership</h3>
            <p className="paragraph">
              Membership: Access to AOT (Anonymous Online Talks) is limited to
              students and staff members of the Faculty of Computer Science
              (FII) in Iasi, Romania. By using the Services, you represent and
              warrant that you are a student or staff member of FII.
            </p>
          </section>

          <section>
            <h3 id="Account">1.2. Account</h3>
            <p className="paragraph">
              You may need to create an account to access certain features of
              the Services. You are responsible for maintaining the
              confidentiality of your account credentials and for all activities
              that occur under your account.
            </p>
          </section>

          <section>
            <h3 id="User Content">1.3. User Content</h3>
            <p className="paragraph">
              You are solely responsible for any content you post or transmit
              through the Services ("User Content"). You retain ownership of
              your User Content, but by posting it on the Services, you grant us
              a non-exclusive, worldwide, royalty-free, sublicensable, and
              transferable license to use, reproduce, modify, adapt, distribute,
              and display your User Content in connection with the Services.
            </p>
          </section>

          <section>
            <h2 id="Prohibited Conduct">2. Prohibited Conduct</h2>
            <p className="paragraph">
              You agree not to use the Services for any unlawful or prohibited
              purpose or in any manner that could damage, disable, overburden,
              or impair the Services.
            </p>
            <p className="paragraph">
              Post or transmit any User Content that is unlawful, harmful,
              threatening, abusive, harassing, defamatory, vulgar, obscene,
              libellous, invasive of another's privacy, hateful, or racially,
              ethnically, or otherwise objectionable. Any use of profanity,
              hateful comments, or insults will result in an immediate ban for a
              minimum of 5 minutes, with the duration increasing with each
              subsequent offence.
            </p>
            <p className="paragraph">
              Impersonate any person or entity or falsely state or otherwise
              misrepresent your affiliation with a person or entity.
            </p>
            <p className="paragraph">
              Post or transmit any unsolicited or unauthorized advertising,
              promotional materials, spam, or any other form of solicitation.
            </p>
            <p className="paragraph">
              Interfere with or disrupt the Services or servers or networks
              connected to the Services, or disobey any requirements,
              procedures, policies, or regulations of networks connected to the
              Services.
            </p>
            <p className="paragraph">
              Use any robot, spider, scraper, or other automated means to access
              the Services for any purpose without our express written
              permission.
            </p>
            <p className="paragraph">
              Additionally, disclosing any personal information will result in
              the forfeiture of any right to privacy, as AOT cannot be held
              responsible for the consequences of such actions.
            </p>
          </section>

          <section>
            <h2 id="Privacy">3. Privacy</h2>
            <p className="paragraph">
              Your privacy is important to us. Our Privacy Policy explains how
              we collect, use, and disclose information about you. By using the
              Services, you consent to the collection, use, and disclosure of
              your information as described in our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 id="Intellectual Property">4. Intellectual Property</h2>
            <p className="paragraph">
              The Services and all content, features, and functionality thereof
              are owned by AOT and are protected by copyright, trademark, and
              other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 id="Disclaimer of Warranties">5. Disclaimer of Warranties</h2>
            <p className="paragraph">
              THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS,
              WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE
              DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, IMPLIED
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              AND NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 id="Limitation of Liability">6. Limitation of Liability</h2>
            <p className="paragraph">
              IN NO EVENT SHALL AOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, ARISING OUT OF OR IN
              CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SERVICES,
              WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE),
              OR ANY OTHER LEGAL THEORY.
            </p>
          </section>

          <section>
            <h2 id="Governing Law">7. Governing Law</h2>
            <p className="paragraph">
              These Terms shall be governed by and construed by the laws of
              Romania, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 id="Changes to Terms">8. Changes to Terms</h2>
            <p className="paragraph">
              We reserve the right to modify or replace these Terms at any time.
              If we make material changes, we will notify you by posting the
              revised Terms of the Services. Your continued use of the Services
              after the effective date of the revised Terms constitutes your
              acceptance of the Terms.
            </p>
          </section>

          <section>
            <h2 id="Contact Us">9. Contact Us</h2>
            <p className="paragraph">
              If you have any questions about these Terms, please contact us at
              aot@contact.com.
            </p>
          </section>

          <section>
            <h2 id="Entire Agreement">10. Entire Agreement</h2>
            <p className="paragraph">
              These Terms constitute the entire agreement between you and AOT
              regarding your use of the Services and supersede all prior and
              contemporaneous understandings, agreements, representations, and
              warranties, both written and oral, regarding the Services.
            </p>
          </section>
        </section>
      </div>
    </div>
  );
}

export default Rules;
