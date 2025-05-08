import { supabase } from './supabase';

export const initiatePayment = async (amount: number, type: string, shareholderId: string) => {
  try {
    // Create payment record
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        shareholder_id: shareholderId,
        amount,
        type,
        status: 'pending',
        transaction_date: new Date().toISOString()
      })
      .single();

    if (paymentError) throw paymentError;

    // Here i will integrate with M-Pesa API
    // This is a placeholder for the actual implementation
    const mpesaResponse = await initiateMpesaPayment(amount, shareholderId);

    return { payment, mpesaResponse };
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};

const initiateMpesaPayment = async (amount: number, shareholderId: string) => {
  // Implement M-Pesa API integration here
  return { success: true, reference: 'MP' + Date.now() };
};