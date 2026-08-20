// app/api/contact/route.ts
// Contact / Order form handler

import { NextRequest, NextResponse } from 'next/server';
import { CONTACT } from '@/config/site';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, email, message, type = 'general' } = data;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    // Process inquiry
    return NextResponse.json({
      success: true,
      message: `Thank you, ${name}. Your ${type} inquiry has been logged. We will contact you at ${email} shortly.`,
      recipient: CONTACT.email
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Failed to process inquiry.' },
      { status: 500 }
    );
  }
}
