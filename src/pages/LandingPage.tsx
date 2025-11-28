import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, CheckCircle, CreditCard, PieChart } from "lucide-react";
import dashboardImg from "@/assets/logo/finexa.png";
import heroImg from "@/assets/logo/finexa.png";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

// Color palette reference
// Primary: #00D1B2 (Electric Teal), #0A2540 (Deep Navy)
// Secondary variations: subtle teals and gradients

const features = [
  { title: "Track all your expenses in one place", icon: Activity },
  { title: "Smart budgets & insights", icon: PieChart },
  { title: "Recurring payments management", icon: CreditCard },
  { title: "Detailed reports & analytics", icon: CheckCircle },
];

export default function LandingPage() {
  return (
    <div className="w-full font-sans text-gray-900 bg-[#F6F9FB] overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full bg-linear-to-br from-[#0A2540] via-[#09325C] to-[#00D1B2] text-white py-24 px-6">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <motion.h1
              className="text-4xl lg:text-6xl font-bold leading-tight drop-shadow-xl"
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Manage Your Money With Finexa
            </motion.h1>

            <motion.p
              className="mt-6 text-lg lg:text-xl text-gray-200 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              A modern financial dashboard that helps you track, plan, and grow.
              Insights powered by clarity, designed for people who want control.
            </motion.p>

            <motion.div
              className="mt-8 flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Link to={ROUTES.AUTH.LOGIN}>
                <Button className="px-6 py-3 text-lg rounded-xl bg-[#00D1B2] hover:bg-[#0fbfa4] text-[#0A2540] font-semibold shadow-lg transition-all cursor-pointer">
                  Get Started
                </Button>
              </Link>

              <Button
                variant="outline"
                className="px-6 py-3 text-lg rounded-xl border-white  hover:bg-gray-200 hover:text-[#0A2540] shadow-lg transition-all text-black cursor-pointer"
              >
                Learn More
              </Button>
            </motion.div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <motion.img
              src={heroImg}
              alt="Finexa Hero"
              className="w-full max-w-md rounded-2xl shadow-2xl border-4 border-[#0A2540] px-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2540]">
            Powerful Features To Empower You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div key={index} whileHover={{ scale: 1.08 }}>
                  <Card className="rounded-2xl shadow-lg hover:shadow-xl border-teal-100 ">
                    <CardContent className="p-6 flex flex-col items-center">
                      <Icon size={48} className="text-[#00D1B2]" />
                      <p className="mt-4 text-lg font-medium text-[#0A2540]">
                        {feature.title}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="py-20 bg-linear-to-br from-[#00D1B2] to-[#0A2540] text-white">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-14">
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Your Finances, Beautifully Visualized
            </h2>
            <p className="mb-6 text-lg text-gray-200 max-w-lg">
              Track expenses, monitor upcoming bills, and understand your
              spending habits with a polished and intuitive dashboard.
            </p>
            <Button className="bg-white text-[#0A2540] px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 shadow-xl transition-all cursor-pointer">
              Try Dashboard
            </Button>
          </div>

          <motion.img
            src={dashboardImg}
            alt="Dashboard"
            className="lg:w-1/2 rounded-2xl shadow-2xl border-4 border-[#0A2540] px-2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-[#F0FBFA] text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#0A2540] mb-4">
          Start Your Financial Transformation
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands using Finexa to simplify their financial life.
        </p>
        <Link to={ROUTES.AUTH.LOGIN}>
          <Button className="bg-[#0A2540] text-white px-8 py-4 text-lg rounded-xl hover:bg-[#0d335c] shadow-xl transition-all cursor-pointer">
            Get Started Free
          </Button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A2540] text-gray-300 py-10 text-center">
        <p>&copy; 2025 Finexa. All rights reserved.</p>
      </footer>
    </div>
  );
}
