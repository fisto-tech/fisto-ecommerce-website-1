import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Generate simulated order confirmation
    const orderId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    return NextResponse.json({
      success: true,
      orderId,
      message: "Order created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid checkout request payload" },
      { status: 500 }
    );
  }
}
