import { FAQ_Category } from '@/types/faq';

export const FAQCategory: FAQ_Category[] = [
  {
    id: 'popular',
    title: 'Popular Questions',
    questions: [
      {
        id: 'contact-support',
        title: 'How do I contact Support Team?',
        content: (
          <div className="space-y-4">
            <p>We offer two main ways to get in touch with our support team:</p>
            <ol className="list-decimal space-y-2 pl-4">
              <li>
                <strong>Live Chat Support (Fastest Method)</strong>
                <p>Available 24/7 for quick resolutions.</p>
                <p className="text-sm text-muted-foreground">
                  To start a chat: Look for the &quot;Support&quot; or
                  &quot;Chat&quot; button, usually in the bottom right corner of
                  any page on our website.
                </p>
              </li>
              <li>
                <strong>Email Support</strong>
                <p>For non-urgent inquiries, email us at support@example.com</p>
                <p className="text-sm text-muted-foreground">
                  Tip: Include screenshots and detailed information about your
                  issue for faster resolution.
                </p>
              </li>
            </ol>
          </div>
        ),
      },
      {
        id: 'account-settings',
        title: 'How do I change my account settings?',
        content: (
          <div className="space-y-4">
            <p>Changing your account settings is easy:</p>
            <ol className="list-decimal space-y-2 pl-4">
              <li>
                Click on your profile picture or name (usually in the top right
                corner)
              </li>
              <li>
                Look for an option that says &quot;Settings&quot; or
                &quot;Account Settings&quot;
              </li>
              <li>
                You&apos;ll see different sections like &quot;Profile&quot;,
                &quot;Notifications&quot;, &quot;Privacy&quot;, etc.
              </li>
              <li>Click on the section you want to change</li>
              <li>
                Make your changes and look for a &quot;Save&quot; or
                &quot;Update&quot; button to confirm
              </li>
            </ol>
            <p className="text-sm text-muted-foreground">
              Remember: Some changes (like email address) might require you to
              verify your identity for security reasons.
            </p>
          </div>
        ),
      },
    ],
  },
  {
    id: 'account',
    title: 'Account & Settings',
    questions: [
      {
        id: 'reset-password',
        title: 'How do I reset my password?',
        content: (
          <div className="space-y-4">
            <p>
              If you&apos;ve forgotten your password, here&apos;s how to reset
              it:
            </p>
            <ol className="list-decimal space-y-2 pl-4">
              <li>Go to the login page</li>
              <li>
                Click on &quot;Forgot Password&quot; or &quot;Reset
                Password&quot; (usually below the password field)
              </li>
              <li>Enter the email address associated with your account</li>
              <li>
                Check your email for a message from us (it might take a few
                minutes)
              </li>
              <li>Click the link in the email</li>
              <li>Follow the instructions to create a new password</li>
            </ol>
            <p className="text-sm text-muted-foreground">
              Tip: If you don&apos;t see the email, check your spam folder. If
              you still can&apos;t find it, try requesting another reset email.
            </p>
          </div>
        ),
      },
    ],
  },
];
