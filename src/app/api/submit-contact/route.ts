import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, company, topic, message } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !topic) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    // Save to database (optional - you can skip this if you don't want to store contact messages)
    const contactData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || null,
      company: company || null,
      topic,
      message: message || null,
      created_at: new Date().toISOString()
    }

    // Insert into database
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([contactData])

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue with email even if database fails
    }

    // Send email using Resend API
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'contact@amanmodular.com',
        to: ['akashaman0426@gmail.com'],
        subject: `New Contact Form Submission - ${topic}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0;">Aman Modular Buildings</p>
            </div>
            
            <div style="padding: 30px; background: #f8fafc;">
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <h2 style="color: #1e3a8a; margin-top: 0;">Contact Details</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Name:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #6b7280;">${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Email:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #6b7280;">${email}</td>
                  </tr>
                  ${phone ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Phone:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #6b7280;">${phone}</td>
                  </tr>
                  ` : ''}
                  ${company ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Company:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #6b7280;">${company}</td>
                  </tr>
                  ` : ''}
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #374151;">Topic:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #6b7280;">${topic}</td>
                  </tr>
                </table>

                ${message ? `
                <div style="margin-top: 25px;">
                  <h3 style="color: #1e3a8a; margin-bottom: 10px;">Message:</h3>
                  <div style="background: #f1f5f9; padding: 15px; border-radius: 5px; border-left: 4px solid #3b82f6;">
                    <p style="margin: 0; color: #374151; line-height: 1.6;">${message}</p>
                  </div>
                </div>
                ` : ''}
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
                  <p style="color: #6b7280; font-size: 14px; margin: 0;">
                    Submitted on ${new Date().toLocaleString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZoneName: 'short'
                    })}
                  </p>
                </div>
              </div>
            </div>
            
            <div style="background: #1e293b; padding: 20px; text-align: center;">
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">
                This message was sent from the contact form on your website.
              </p>
            </div>
          </div>
        `,
      }),
    })

    if (!emailResponse.ok) {
      const emailError = await emailResponse.text()
      console.error('Email sending failed:', emailError)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to send email notification' 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Contact form submitted successfully! We\'ll get back to you within 2 hours.' 
    })

  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}