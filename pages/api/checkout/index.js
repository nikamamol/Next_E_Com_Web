import Stripe from "stripe"


const stripe = new Stripe("sk_test_51O0gm1SBbzzARHI4i0m5tK5KfADFMgzgla77i5cMRv7B1ADUc3jFhNpgKRDhUFduN9fq5d1kJmikhpnIm4xyLQrc00nGGtyB1G")

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: req.body.lineItems,
                mode: 'payment',
                payment_method_types: ['card'],
                success_url: 'http://localhost:3000/success',
                cancel_url: 'http://localhost:3000'
            })

            return res.status(201).json(session)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}