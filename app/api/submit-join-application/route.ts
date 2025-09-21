// app/api/submit-application/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// Create SMTP transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Save application data to JSON file
const saveApplicationData = async (data: any) => {
  const dataDir = path.join(process.cwd(), 'data');
  const filePath = path.join(dataDir, 'applications.json');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  let applications = [];
  
  // Read existing applications
  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      applications = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error reading applications file:', error);
    }
  }
  
  // Add new application
  applications.push({
    id: Date.now(),
    ...data,
    submittedAt: new Date().toISOString(),
  });
  
  // Save back to file
  fs.writeFileSync(filePath, JSON.stringify(applications, null, 2));
  
  return applications.length;
};

// Format email content
const formatEmailContent = (data: any) => {
  return `
MAEGA TECHNICIAN APPLICATION
============================

Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

PERSONAL DETAILS:
- Name: ${data.fullName || 'N/A'}
- ID Number: ${data.idNumber || 'N/A'}
- Date of Birth: ${data.dob || 'N/A'}
- Aadhar: ${data.aadhaar || 'N/A'}
- Mobile 1: ${data.mobile1 || 'N/A'}
- Mobile 2: ${data.mobile2 || 'N/A'}
- PAN: ${data.pan || 'N/A'}

BANK DETAILS:
- Bank: ${data.bankName || 'N/A'}
- Branch: ${data.branch || 'N/A'}
- IFSC: ${data.ifsc || 'N/A'}
- Account Type: ${data.accountType || 'N/A'}
- Account Number: ${data.accountNumber || 'N/A'}

SHOP DETAILS:
- Shop Name: ${data.shopName || 'N/A'}
- Address: ${data.shopDoor || ''} ${data.shopStreet || ''}, ${data.shopArea || ''}
- Location: ${data.shopLocation || 'N/A'}
- PIN: ${data.shopPin || 'N/A'}

HOUSE DETAILS:
- Father: ${data.fatherName || 'N/A'}
- Marital Status: ${data.maritalStatus || 'N/A'}
- Spouse: ${data.spouseName || 'N/A'}
- Spouse Mobile: ${data.spouseMobile || 'N/A'}
- Address: ${data.houseDoor || ''} ${data.houseStreet || ''}, ${data.houseArea || ''}
- Location: ${data.houseLocation || 'N/A'}
- PIN: ${data.housePin || 'N/A'}

TECHNICAL DETAILS:
- Technicians Count: ${data.techniciansCount || 'N/A'}
- Appliances: ${data.appliances || 'N/A'}
- Academic Qualification: ${data.academicQualification || 'N/A'}
- Technical Qualification: ${data.technicalQualification || 'N/A'}

EMERGENCY & OTHER:
- Blood Group: ${data.bloodGroup || 'N/A'}
- Emergency Contact: ${data.emergencyContact || 'N/A'}
- Emergency Relation: ${data.emergencyRelation || 'N/A'}
- Experience: ${data.experience || 'N/A'}
- Old ID: ${data.oldId || 'N/A'}

---
Application submitted via MAEGA website
  `;
};

export async function POST(request: NextRequest) {
  try {
    // Check if required environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing email configuration in environment variables');
      return NextResponse.json({ 
        success: false, 
        message: 'Server configuration error' 
      }, { status: 500 });
    }

    // Parse form data
    const formData = await request.formData();
    
    // Convert FormData to regular object
    const data: any = {};
    const files: File[] = [];
    
    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.size > 0) {
        files.push(value);
      } else if (typeof value === 'string') {
        data[key] = value;
      }
    }

    // Save application data
    const applicationCount = await saveApplicationData(data);
    
    // Prepare email attachments
    const attachments = [];
    
    // Handle file attachments (if any)
    for (const file of files) {
      if (file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        attachments.push({
          filename: file.name,
          content: buffer,
        });
      }
    }

    // Send email
    const transporter = createTransporter();
    const emailContent = formatEmailContent(data);
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.CLIENT_EMAIL || process.env.EMAIL_USER,
      subject: `New MAEGA Application #${applicationCount} - ${data.fullName || 'Unknown'}`,
      text: emailContent,
      attachments: attachments,
    };

    console.log('Sending email to:', mailOptions.to);
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully',
      applicationId: applicationCount 
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit application',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    }, { status: 500 });
  }
}