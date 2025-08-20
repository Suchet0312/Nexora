"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Brain, Wallet, BarChart3, Quote } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      if (!imageElement) return;
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-28 pb-20 px-4 bg-black text-orange-600">
      <div className="container mx-auto text-center pt-30">
        {/* Hero */}
        <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
        className="text-5xl md:text-8xl lg:text-[105px] pb-8 font-bold">
          Manage Your Finances <br /> with Intelligence
        </motion.h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="px-8 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-black"
            >
              Get Started
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="px-8 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-black"
            >
              Watch Demo
            </Button>
          </Link>
        </div>

        {/* Image wrapper with ref */}
        <div className="mt-10" ref={imageRef}>
          <Image
            src="/logo.png"
            width={1000}
            height={500}
            alt="Dashboard Preview"
            className="rounded-lg shadow-2xl border mx-auto"
            priority
          />
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold mb-10 text-orange-600">
            Powerful Features
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-zinc-900 border border-orange-600 text-left hover:scale-105 transition-transform">
              <CardHeader className="flex flex-row items-center space-x-3">
                <Brain className="text-orange-600 w-8 h-8" />
                <CardTitle className="text-orange-600 text-xl">
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Get personalized financial insights driven by advanced AI to
                help you make better decisions.
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border border-orange-600 text-left hover:scale-105 transition-transform">
              <CardHeader className="flex flex-row items-center space-x-3">
                <Wallet className="text-orange-600 w-8 h-8" />
                <CardTitle className="text-orange-600 text-xl">
                  Expense Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Track your income and expenses in real-time with detailed
                analytics and visual reports.
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border border-orange-600 text-left hover:scale-105 transition-transform">
              <CardHeader className="flex flex-row items-center space-x-3">
                <BarChart3 className="text-orange-600 w-8 h-8" />
                <CardTitle className="text-orange-600 text-xl">
                  Smart Budgeting
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-400">
                Create budgets that adapt dynamically based on your spending
                patterns and goals.
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold mb-10 text-orange-600">
            What Our Users Say
          </h2>
          <div className="grid gap-8 md:grid-cols-4">
            <Card className="bg-zinc-900 border border-orange-600 hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <Quote className="text-orange-600 w-10 h-10 mb-4" />
                <p className="text-gray-300 italic mb-4">
                  "This platform completely changed the way I manage my
                  finances. The AI insights are spot on!"
                </p>
                <p className="text-orange-600 font-bold">
                  — Sarah K., Entrepreneur
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border border-orange-600 hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <Quote className="text-orange-600 w-10 h-10 mb-4" />
                <p className="text-gray-300 italic mb-4">
                  "I love the clean interface and smart budgeting features. It
                  keeps me on track effortlessly."
                </p>
                <p className="text-orange-600 font-bold">
                  — Daniel M., Software Engineer
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border border-orange-600 hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <Quote className="text-orange-600 w-10 h-10 mb-4" />
                <p className="text-gray-300 italic mb-4">
                  "I love the clean interface and smart budgeting features. It
                  keeps me on track effortlessly."
                </p>
                <p className="text-orange-600 font-bold">
                  — Daniel M., Software Engineer
                </p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border border-orange-600 hover:scale-105 transition-transform">
              <CardContent className="p-6">
                <Quote className="text-orange-600 w-10 h-10 mb-4" />
                <p className="text-gray-300 italic mb-4">
                  "I love the clean interface and smart budgeting features. It
                  keeps me on track effortlessly."
                </p>
                <p className="text-orange-600 font-bold">
                  — Daniel M., Software Engineer
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
