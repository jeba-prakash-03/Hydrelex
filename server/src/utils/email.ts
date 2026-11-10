import nodemailer from 'nodemailer';

export async function sendEnquiryNotificationEmail(enquiry: {
  reference_no: string;
  full_name: string;
  phone: string;
  email: string;
  enquiry_type: string;
  product_service_interest: string;
  location: string;
  preferred_date: string;
  preferred_time: string;
  project_description: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@hydrelex.com';

  console.log(`\n======================================================`);
  console.log(`[EMAIL NOTIFICATION TO: ${adminEmail}]`);
  console.log(`NEW ENQUIRY RECEIVED: Ref #${enquiry.reference_no}`);
  console.log(`Client: ${enquiry.full_name} | Phone: ${enquiry.phone} | Email: ${enquiry.email}`);
  console.log(`Type: ${enquiry.enquiry_type} | Interest: ${enquiry.product_service_interest}`);
  console.log(`Location: ${enquiry.location}`);
  console.log(`Requested Time: ${enquiry.preferred_date} at ${enquiry.preferred_time}`);
  console.log(`Description: ${enquiry.project_description}`);
  console.log(`======================================================\n`);

  // If SMTP is configured in environment, send actual email
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"HYDRELEX Notification" <${process.env.SMTP_USER}>`,
        to: adminEmail,
        subject: `[HYDRELEX New Enquiry] Ref #${enquiry.reference_no} - ${enquiry.full_name}`,
        html: `
          <h2>New Customer Consultation Request</h2>
          <p><strong>Reference Number:</strong> ${enquiry.reference_no}</p>
          <p><strong>Name:</strong> ${enquiry.full_name}</p>
          <p><strong>Phone:</strong> ${enquiry.phone}</p>
          <p><strong>Email:</strong> ${enquiry.email}</p>
          <p><strong>Enquiry Type:</strong> ${enquiry.enquiry_type}</p>
          <p><strong>Product/Service:</strong> ${enquiry.product_service_interest}</p>
          <p><strong>Location:</strong> ${enquiry.location}</p>
          <p><strong>Preferred Appointment:</strong> ${enquiry.preferred_date} (${enquiry.preferred_time})</p>
          <p><strong>Project Details:</strong><br>${enquiry.project_description}</p>
          <hr/>
          <p><small>Review and manage this enquiry in the HYDRELEX Admin Dashboard.</small></p>
        `,
      });
    } catch (err) {
      console.warn('SMTP Send Failed (falling back to logged notice):', err);
    }
  }
}

