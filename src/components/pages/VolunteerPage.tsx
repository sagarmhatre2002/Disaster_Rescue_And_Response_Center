import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Users, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BaseCrudService } from '@/integrations';
import { VolunteerRegistrations } from '@/entities';

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    skills: '',
    availability: '',
    pastExperience: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const registration: VolunteerRegistrations = {
      _id: crypto.randomUUID(),
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      skills: formData.skills,
      availability: formData.availability,
      pastExperience: formData.pastExperience,
      registrationDate: new Date().toISOString(),
    };

    await BaseCrudService.create('volunteerregistrations', registration);
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <section className="pt-32 pb-16 px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-24 h-24 rounded-full bg-safe-green/20 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-12 h-12 text-safe-green" />
              </motion.div>
              <h2 className="font-heading text-4xl font-bold text-foreground mb-4">
                Registration Successful!
              </h2>
              <p className="font-paragraph text-lg text-foreground/70 mb-8">
                Thank you for joining our volunteer team. We'll review your application and contact you within 48 hours.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    fullName: '',
                    email: '',
                    phoneNumber: '',
                    skills: '',
                    availability: '',
                    pastExperience: '',
                  });
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Submit Another Registration
              </Button>
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

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
              <Users className="w-12 h-12 text-primary" />
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground">
                Become a Volunteer
              </h1>
            </div>
            <p className="font-paragraph text-xl text-foreground/70 max-w-3xl mx-auto">
              Join our global team of dedicated volunteers and make a real difference in disaster response operations
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                  Registration Form
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-heading text-sm font-semibold text-foreground/80 mb-2 block">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="bg-white/5 border-white/10 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="font-heading text-sm font-semibold text-foreground/80 mb-2 block">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="bg-white/5 border-white/10 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="font-heading text-sm font-semibold text-foreground/80 mb-2 block">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 000-0000"
                      className="bg-white/5 border-white/10 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="font-heading text-sm font-semibold text-foreground/80 mb-2 block">
                      Skills & Expertise *
                    </label>
                    <Textarea
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      required
                      placeholder="List your relevant skills (e.g., medical training, construction, communication, logistics)"
                      rows={4}
                      className="bg-white/5 border-white/10 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="font-heading text-sm font-semibold text-foreground/80 mb-2 block">
                      Availability *
                    </label>
                    <Input
                      type="text"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Weekends, Full-time, On-call"
                      className="bg-white/5 border-white/10 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="font-heading text-sm font-semibold text-foreground/80 mb-2 block">
                      Past Experience
                    </label>
                    <Textarea
                      name="pastExperience"
                      value={formData.pastExperience}
                      onChange={handleChange}
                      placeholder="Describe any previous volunteer or disaster response experience"
                      rows={4}
                      className="bg-white/5 border-white/10 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="font-heading text-sm font-semibold text-foreground/80 mb-2 block">
                      Upload ID Document
                    </label>
                    <div className="bg-white/5 border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-white/10 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-foreground/40 mx-auto mb-3" />
                      <p className="font-paragraph text-sm text-foreground/70 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="font-paragraph text-xs text-foreground/50">
                        PDF, JPG, PNG (max 5MB)
                      </p>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading text-lg py-6 rounded-xl"
                  >
                    {loading ? 'Submitting...' : 'Submit Registration'}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Why Volunteer?
                </h2>
                <ul className="space-y-4">
                  {[
                    'Make a real impact in disaster-affected communities',
                    'Gain valuable emergency response training',
                    'Join a global network of dedicated volunteers',
                    'Flexible scheduling to fit your availability',
                    'Receive certificates and recognition',
                    'Access to exclusive volunteer resources',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-safe-green flex-shrink-0 mt-0.5" />
                      <span className="font-paragraph text-base text-foreground/80">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-md border border-primary/30 rounded-2xl p-8">
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-4">
                  What We're Looking For
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'Medical Professionals', desc: 'Doctors, nurses, paramedics' },
                    { title: 'Logistics Experts', desc: 'Supply chain, transportation' },
                    { title: 'Communication Specialists', desc: 'Translators, coordinators' },
                    { title: 'Technical Support', desc: 'IT, engineering, construction' },
                  ].map((role, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <h4 className="font-heading text-lg font-semibold text-foreground mb-1">
                        {role.title}
                      </h4>
                      <p className="font-paragraph text-sm text-foreground/70">
                        {role.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                  Next Steps
                </h3>
                <ol className="space-y-3 list-decimal list-inside font-paragraph text-base text-foreground/80">
                  <li>Submit your registration form</li>
                  <li>Complete background verification</li>
                  <li>Attend orientation training</li>
                  <li>Start making a difference!</li>
                </ol>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
