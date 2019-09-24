const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_live_MY_PUBLISHABLE_KEY'
    : 'pk_test_LxOqWDg39nYC9LYbQ4AKMDmR00QERDkUL7'
export default STRIPE_PUBLISHABLE
