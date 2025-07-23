import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Email sending function using a free service like Resend or similar
async function sendEmailNotification(submissionData: any) {
  try {
    // For now, we'll use a simple fetch to a service like Resend
    // You'll need to add RESEND_API_KEY to your environment variables
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: ['aka8292@gmail.com'],
        subject: 'New Quote Request - Aman Modular',
        html: `
          <h2>New Quote Request Received</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact Information:</h3>
            <p><strong>Name:</strong> ${submissionData.first_name} ${submissionData.last_name}</p>
            <p><strong>Email:</strong> ${submissionData.email}</p>
            <p><strong>Phone:</strong> ${submissionData.phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${submissionData.company || 'Not provided'}</p>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Project Information:</h3>
            <p><strong>Project Type:</strong> ${submissionData.project_type}</p>
            <p><strong>Project Details:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #007bff;">
              ${submissionData.project_details.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send email. Status:', response.status);
      console.error('Error response:', errorText);
      return false;
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);

    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received form data:', body);
    
    // Validate required fields
    const { firstName, lastName, email, projectType, projectDetails } = body;
    
    if (!firstName || !lastName || !email || !projectType || !projectDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare data for database
    const submissionData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: body.phone || null,
      company: body.company || null,
      project_type: projectType,
      project_details: projectDetails,
    };
    
    console.log('Prepared submission data:', submissionData);

    // Insert into Supabase
    const { data, error } = await supabase
      .from('quote_submissions')
      .insert([submissionData])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save submission', details: error },
        { status: 500 }
      );
    }
    
    console.log('Successfully inserted data:', data);

    // Send email notification
    const emailSent = await sendEmailNotification(submissionData);
    
    if (!emailSent) {
      console.warn('Email notification failed, but submission was saved');
    }

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      id: data.id,
      emailSent
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}