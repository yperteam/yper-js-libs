import { loadStripe } from "@stripe/stripe-js";
import { OrderRepository } from "../../../data/repository/order.repository";

export class PayOrder {
  /** Repository */
  private orderRepository: OrderRepository = new OrderRepository();

  public async call(orderId: string, paymentId?: string): Promise<void> {
    await this.orderRepository.validateOrder(orderId);
    // TODO  check if pro is in levy
    if (paymentId != null) {
      try {
        await this.orderRepository.payOrder(orderId, paymentId);
      } catch (e) {
        // TODO put it in a usecase
        if (e.result.paymentIntentClientSecret) {
          const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);
          await stripe.confirmCardPayment(e.result.paymentIntentClientSecret);
        } else {
          throw e;
        }
      }
    }
  }
}
