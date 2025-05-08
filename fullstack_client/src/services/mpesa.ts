import { supabase } from './supabase';

interface PaymentRequest {
  phone: string;
  amount: number;
  shareholderId: string;
}

interface Payment {
  id: string;
  shareholder_id: string;
  amount: number;
  type: string;
  status: string;
  transaction_date: string;
  checkout_request_id?: string;
  confirmed_at?: string;
}

export const initiateMpesaPayment = async ({ phone, amount, shareholderId }: PaymentRequest) => {
  try {
    // Create pending payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        shareholder_id: shareholderId,
        amount,
        type: 'mpesa',
        status: 'pending',
        transaction_date: new Date().toISOString()
      })
      .select()
      .single();

    if (paymentError) throw paymentError;
    if (!payment) throw new Error('No payment data returned');

    // Make API call to M-Pesa (this is a mock - i will replace with actual M-Pesa API)
    const response = await fetch('/api/mpesa/stkpush', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone,
        amount,
        paymentId: payment.id
      })
    });

    const mpesaResponse = await response.json();

    // Update payment record with M-Pesa checkout request ID
    await supabase
      .from('payments')
      .update({
        checkout_request_id: mpesaResponse.CheckoutRequestID
      })
      .eq('id', payment.id);

    return mpesaResponse;
  } catch (error) {
    console.error('M-Pesa payment error:', error);
    throw error;
  }
};

export const confirmMpesaPayment = async (checkoutRequestId: string) => {
  try {
    const { data: payment } = await supabase
      .from('payments')
      .update({
        status: 'completed',
        confirmed_at: new Date().toISOString()
      })
      .eq('checkout_request_id', checkoutRequestId)
      .single();

    return payment;
  } catch (error) {
    console.error('M-Pesa confirmation error:', error);
    throw error;
  }
};