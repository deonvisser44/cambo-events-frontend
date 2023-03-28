import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className='min-h-screen min-w-screen flex flex-col items-center justify-start gap-8 py-8'>
      <h3 className='text-2xl text-slate-300'>Privacy Policy</h3>
      <p className='text-lg text-slate-300 w-4/5 md:w-2/5'>
        We take user privacy seriously and are committed to protecting the
        personal information of our users. When you sign up and post an event on our
        website, we collect basic information such as your email and the event
        coordinates. This information is used solely for the purpose of managing and
        displaying your event on our website.
        <br />
        <br /> We do not share your personal information with any third-party
        advertisers or marketers. We also take appropriate measures to secure
        your data against unauthorized access, disclosure, or alteration.
        <br />
        <br /> By posting an event on our website, you agree to allow us to
        display your event information publicly on our website. If you have any
        questions or concerns about our privacy policy, please contact us at
        deonvisser@protonmail.com.
      </p>
    </div>
  );
}
