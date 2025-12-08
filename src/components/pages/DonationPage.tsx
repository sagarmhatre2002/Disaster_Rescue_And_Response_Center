import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heart, CreditCard, QrCode, Users, Shield, Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DonationPage() {
  const [donationType, setDonationType] = useState<'monthly' | 'onetime'>('monthly');
  const [amount, setAmount] = useState('50');

  const impactStats = [
    { value: '$2.5M', label: 'Total Donations', icon: Heart },
    { value: '15K+', label: 'Active Donors', icon: Users },
    { value: '50+', label: 'Countries Helped', icon: Globe },
    { value: '100%', label: 'Transparency', icon: Shield },
  ];

  const donationAmounts = ['25', '50', '100', '250', '500'];

  const impactExamples = [
    { amount: '$25', impact: 'Provides emergency food supplies for 1 family' },
    { amount: '$50', impact: 'Supplies medical kits for 5 people' },
    { amount: '$100', impact: 'Funds rescue equipment for 1 team member' },
    { amount: '$250', impact: 'Supports shelter for 10 displaced families' },
    { amount: '$500', impact: 'Enables full disaster response deployment' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Heart className="w-12 h-12 text-primary" />
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">
                Support Our Mission
              </h1>
            </div>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Your donation helps us save lives and provide critical support during disasters worldwide
            </p>
          </motion.div>

          {/* Impact Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="font-heading text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="font-paragraph text-sm text-foreground/70">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                  Make a Donation
                </h2>

                {/* Donation Type Toggle */}
                <div className="flex gap-4 mb-8">
                  <button
                    onClick={() => setDonationType('monthly')}
                    className={`flex-1 py-4 rounded-xl font-heading text-lg font-semibold transition-all ${
                      donationType === 'monthly'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white/5 text-foreground/70 hover:bg-white/10'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setDonationType('onetime')}
                    className={`flex-1 py-4 rounded-xl font-heading text-lg font-semibold transition-all ${
                      donationType === 'onetime'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white/5 text-foreground/70 hover:bg-white/10'
                    }`}
                  >
                    One-Time
                  </button>
                </div>

                {/* Amount Selection */}
                <div className="mb-8">
                  <label className="font-heading text-sm font-semibold text-foreground/80 mb-3 block">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {donationAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setAmount(amt)}
                        className={`py-3 rounded-xl font-heading text-lg font-semibold transition-all ${
                          amount === amt
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-white/5 text-foreground/70 hover:bg-white/10'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                    <button
                      onClick={() => setAmount('')}
                      className={`py-3 rounded-xl font-heading text-lg font-semibold transition-all ${
                        !donationAmounts.includes(amount)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white/5 text-foreground/70 hover:bg-white/10'
                      }`}
                    >
                      Custom
                    </button>
                  </div>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter custom amount"
                    className="bg-white/5 border-white/10 text-foreground"
                  />
                </div>

                {/* Payment Methods */}
                <div className="space-y-4 mb-8">
                  <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex items-center gap-4 transition-all">
                    <CreditCard className="w-6 h-6 text-primary" />
                    <span className="font-paragraph text-base text-foreground">
                      Credit / Debit Card
                    </span>
                  </button>
                  <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 flex items-center gap-4 transition-all">
                    <QrCode className="w-6 h-6 text-primary" />
                    <span className="font-paragraph text-base text-foreground">
                      Scan QR Code
                    </span>
                  </button>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-lg py-6 rounded-xl">
                  Donate ${amount || '0'} {donationType === 'monthly' ? '/ month' : ''}
                </Button>

                <p className="font-paragraph text-xs text-foreground/60 text-center mt-4">
                  Your donation is tax-deductible. You will receive a receipt via email.
                </p>
              </div>
            </motion.div>

            {/* Impact Examples */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Your Impact
                </h2>
                <p className="font-paragraph text-base text-foreground/70 mb-8">
                  Every donation makes a real difference in saving lives and supporting communities affected by disasters.
                </p>

                <div className="space-y-4">
                  {impactExamples.map((example, index) => (
                    <motion.div
                      key={example.amount}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Check className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-heading text-lg font-semibold text-primary mb-1">
                          {example.amount}
                        </div>
                        <div className="font-paragraph text-base text-foreground/80">
                          {example.impact}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-md border border-primary/30 rounded-2xl p-8">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                  Why Donate to DRRC?
                </h3>
                <ul className="space-y-3">
                  {[
                    '100% transparency in fund allocation',
                    'Direct impact on disaster relief operations',
                    'Tax-deductible donations',
                    'Regular updates on mission progress',
                    'Trusted by 15,000+ donors worldwide',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-base text-foreground/80">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
