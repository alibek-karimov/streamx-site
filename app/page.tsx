"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  EyeIcon,
  Shield,
  TrendingUp,
  MapPin,
  Zap,
  Eye,
  Brain,
  Cloud,
  Settings,
  PictureInPicture2,
  Car,
  Mail,
} from "lucide-react";
import { CarouselContent, CarouselItem } from "@/components/ui/carousel";
import CarouselClient from "@/components/ui/CarouselClient";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ContactForm from "@/components/ContactForm";

export default function StreamXHomePage() {
  const { t, i18n } = useTranslation();
  // guard: ensure capabilities.items is an array (some i18n setups return object/string)
  const capabilitiesItemsRaw = t("capabilities.items", { returnObjects: true });
  const capabilitiesItems: string[] = Array.isArray(capabilitiesItemsRaw)
    ? capabilitiesItemsRaw
    : typeof capabilitiesItemsRaw === "object" && capabilitiesItemsRaw !== null
    ? Object.values(capabilitiesItemsRaw).map(String)
    : [String(capabilitiesItemsRaw)];
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const recaptcaResponse = await recaptchaRef.current?.executeAsync();
    if (!recaptcaResponse) {
      alert(t("contact.form.recaptchaMissing"));
      return;
    }
    const formData = new FormData(event.currentTarget);
    formData.append("g-recaptcha-response", recaptcaResponse);
    const templateProperties = Object.fromEntries(formData.entries());
    try {
      const response = await emailjs.send(
        "service_p3l06sf",
        "template_zem3rml",
        templateProperties
      );
      console.log("Email sent successfully:", response);
      toast({
        title: t("contact.form.sendSuccess.title"),
        description: t("contact.form.sendSuccess.description"),
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      alert(t("contact.form.sendError.alert"));
      toast({
        title: t("contact.form.sendError.title"),
        description: t("contact.form.sendError.description"),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background tech-grid">
      {/* Navigation */}
      <nav className="glass-effect sticky top-0 z-50 border-b border-border/50 scan-line">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-lg neon-glow pulse-glow">
                <Play className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-heading font-black neon-text">
                {t("footer.brand")}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#controller"
                className="text-foreground hover:text-primary transition-colors hover:neon-text"
              >
                {t("nav.videoWall")}
              </a>
              <a
                href="#features"
                className="text-foreground hover:text-primary transition-colors hover:neon-text"
              >
                {t("nav.features")}
              </a>
              <a
                href="#products"
                className="text-foreground hover:text-primary transition-colors hover:neon-text"
              >
                {t("nav.products")}
              </a>
              <a
                href="#support"
                className="text-foreground hover:text-primary transition-colors hover:neon-text"
              >
                {t("nav.support")}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="tech-button neon-glow hover:scale-105 transition-transform">
                <a href="#contact">{t("nav.contact")}</a>
              </Button>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="neon-glow bg-primary/20 text-primary border-primary/30 pulse-glow">
                  {t("hero.badge")}
                </Badge>
                <h1 className="text-2xl lg:text-4xl font-heading font-black">
                  {t("hero.line1")}
                </h1>
                <h1 className="text-2xl lg:text-4xl font-heading font-black">
                  {t("hero.line2")}
                </h1>
                <h1 className="text-2xl lg:text-4xl font-heading font-black">
                  {t("hero.line3")}
                </h1>
              </div>
            </div>
            <div className="relative">
              <Card className="holographic neon-glow scan-line">
                <CardContent className="p-8">
                  <CarouselClient opts={{ loop: true }} delay={3000} playOnInit>
                    <CarouselContent className="h-full">
                      <CarouselItem>
                        <img
                          src="carousel1.png"
                          alt={t("hero.carouselAlt1")}
                          className="w-full h-auto rounded-lg object-cover"
                        />
                      </CarouselItem>
                      <CarouselItem>
                        <img
                          src="carousel2.png"
                          alt={t("hero.carouselAlt2")}
                          className="w-full h-auto rounded-lg object-cover"
                        />
                      </CarouselItem>
                      <CarouselItem>
                        <img
                          src="carousel3.png"
                          alt={t("hero.carouselAlt3")}
                          className="w-full h-auto rounded-lg object-cover"
                        />
                      </CarouselItem>
                    </CarouselContent>
                  </CarouselClient>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-heading font-bold neon-text">
              {t("solutions.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("solutions.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Settings,
                title: t("solutionFeatures.wallControl.title"),
                description: t("solutionFeatures.wallControl.description"),
              },
              {
                icon: EyeIcon,
                title: t("solutionFeatures.live.title"),
                description: t("solutionFeatures.live.description"),
              },
              {
                icon: Cloud,
                title: t("solutionFeatures.web.title"),
                description: t("solutionFeatures.web.description"),
              },
              {
                icon: Zap,
                title: t("solutionFeatures.capture.title"),
                description: t("solutionFeatures.capture.description"),
              },
              {
                icon: PictureInPicture2,
                title: t("solutionFeatures.pip.title"),
                description: t("solutionFeatures.pip.description"),
              },
              {
                icon: Eye,
                title: t("solutionFeatures.ai.title"),
                description: t("solutionFeatures.ai.description"),
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="holographic hover:neon-glow transition-all duration-300 group scan-line"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors neon-glow">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="controller" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-heading font-bold">
                  {t("productController.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t("productController.description")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 p-4 glass-effect rounded-lg neon-glow">
                  <div className="text-2xl font-heading font-bold text-primary neon-text">
                    {t("productController.stat.uptime")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("productController.stat.uptimeLabel")}
                  </div>
                </div>
                <div className="space-y-2 p-4 glass-effect rounded-lg neon-glow">
                  <div className="text-2xl font-heading font-bold text-primary neon-text">
                    {t("productController.stat.resolution")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {t("productController.stat.resolutionLabel")}
                  </div>
                </div>
              </div>
              <Button size="lg" className="tech-button neon-glow">
                {t("productController.learnMore")}
              </Button>
            </div>
            <div className="relative">
              <Card className="holographic neon-glow scan-line">
                <CardContent className="p-8">
                  <img
                    src="controller.png"
                    alt={t("hero.carouselAlt3")}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-heading font-bold neon-text">
              {t("advantages.title")}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: t("advantages.reliability.title"),
                description: t("advantages.reliability.description"),
              },
              {
                icon: TrendingUp,
                title: t("advantages.performance.title"),
                description: t("advantages.performance.description"),
              },
              {
                icon: MapPin,
                title: t("advantages.madeIn.kz.title"),
                description: t("advantages.madeIn.kz.description"),
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="holographic text-center hover:neon-glow transition-all duration-300 scan-line"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 neon-glow pulse-glow">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
            <div className="space-y-4 w-auto">
              <Card className="holographic neon-glow pulse-glow scan-line">
                <CardContent className="p-4 flex w-auto items-center justify-center">
                  <img
                    style={{ height: "350px" }}
                    src="videowall-scheme.png"
                    alt={t("nav.videoWall")}
                    className="rounded-lg object-cover"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              <h4 className="text-2xl font-heading font-bold">
                {t("advantages.efficiency.h1")}
              </h4>
              <h4 className="text-2xl font-heading font-bold">
                {t("advantages.efficiency.h2")}
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-heading font-bold neon-text">
              {t("capabilities.title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {capabilitiesItems.map((value, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 bg-card/20 rounded-lg hover:bg-card/30 transition-colors"
              >
                <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center neon-glow">
                  <Play className="h-4 w-4 text-primary" />
                </div>
                <p className="text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-12">
            <div className="space-y-8">
              <h6 className="text-2xl font-heading font-bold">
                {t("capabilities.gpuSupport")}
              </h6>
            </div>
            <div className="space-y-4 w-auto">
              <Card className="holographic neon-glow pulse-glow scan-line">
                <CardContent className="p-4 flex w-auto items-center justify-center">
                  <img
                    style={{ height: "350px" }}
                    src="videowall-controller.png"
                    alt={t("nav.videoWall")}
                    className="rounded-lg object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Products line section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-heading font-bold neon-text">
              {t("catalog.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-6xl mx-auto">
              {t("catalog.description")}
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                key: "light",
                title: t("catalog.models.light.title"),
                description: t("catalog.models.light.description"),
                image: "product-light.png",
                properties: {
                  outputInterfeices: "4 mini DisplayPort",
                  maxResolution: "2x8K60/5K120 или 4x5K60 HDR 12b",
                  inputs: "2хHDMI",
                  CPU: "Intel® Core® i7",
                  RAM: "до 64 Гб",
                  videoMemory: "4Гб GDDR6",
                },
              },
              {
                key: "standard",
                title: t("catalog.models.standard.title"),
                description: t("catalog.models.standard.description"),
                image: "product-stnd.png",
                properties: {
                  outputInterfeices: "8 DisplayPort",
                  maxResolution: "8x5K60 HDR 12 bit или 4x8K60/5K120",
                  inputs: "4хHDMI",
                  CPU: "Intel® Core® i7/i9",
                  RAM: "до 64 Гб",
                  videoMemory: "6Гб GDDR6",
                },
              },
              {
                key: "pro",
                title: t("catalog.models.pro.title"),
                description: t("catalog.models.pro.description"),
                image: "product-pro.png",
                properties: {
                  outputInterfeices: "16 DisplayPort",
                  maxResolution: "16x5K60 HDR 12 bit или 8x8K60/5K120",
                  inputs: "4хHDMI",
                  CPU: "Intel® Xeon",
                  RAM: "до 64 Гб",
                  videoMemory: "6Гб GDDR6",
                },
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="holographic hover:neon-glow transition-all duration-300 group scan-line"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-heading font-bold neon-text text-center">
                    {product.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <img
                      style={{ height: "150px" }}
                      src={product.image}
                      alt={product.title}
                      className="rounded-lg mb-4"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    {Object.entries(product.properties).map(([key, value]) => {
                      // map property keys to translation keys in catalog.properties
                      const map: Record<string, string> = {
                        outputInterfeices: "outputInterfaces",
                        outputInterfaces: "outputInterfaces",
                        maxResolution: "maxResolution",
                        inputs: "inputs",
                        CPU: "cpu",
                        cpu: "cpu",
                        RAM: "ram",
                        ram: "ram",
                        videoMemory: "videoMemory",
                      };
                      const labelKey = map[key] ?? key;
                      return (
                        <div key={key} className="flex justify-between">
                          <span className="text-xs text-muted-foreground">
                            {t(`catalog.properties.${labelKey}`)}
                          </span>
                          <span className="text-sm font-semibold">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
                <CardAction className="w-full flex flex-col text-center justify-center items-center p-4 space-y-2">
                  <div className="w-full flex flex-row justify-center items-center gap-12">
                    <Button className="w-auto tech-button neon-glow hover:scale-105 transition-transform">
                      {t("catalog.actions.price")}
                    </Button>                  
                    <Button className="w-auto tech-button neon-glow hover:scale-105 transition-transform">
                      {t("catalog.actions.datasheet")}
                    </Button>
                  </div>
                </CardAction>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-heading font-bold neon-text">
              {t("support.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("support.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: Settings,
                title: t("support.services.tech.title"),
                description: t("support.services.tech.description"),
              },
              {
                icon: Shield,
                title: t("support.services.warranty.title"),
                description: t("support.services.warranty.description"),
              },
              {
                icon: Brain,
                title: t("support.services.training.title"),
                description: t("support.services.training.description"),
              },
              {
                icon: Zap,
                title: t("support.services.remote.title"),
                description: t("support.services.remote.description"),
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="holographic hover:neon-glow transition-all duration-300 group scan-line"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors neon-glow">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-heading font-bold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-heading font-bold neon-text">
              {t("contact.title")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("contact.description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-heading font-bold neon-text">
                  {t("contact.contactInfo.title")}
                </h3>
                <div className="space-y-4">
                  <Card className="glass-effect neon-glow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center neon-glow">
                          <img className="w-24" src="whatsapp.png" />
                        </div>
                        <div>
                          <a
                            href="https://wa.me/"
                            target="_blank"
                            className="font-heading font-bold"
                          >
                            {t("contact.whatsapp")}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="glass-effect neon-glow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center neon-glow">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <a
                            href="mailto:info@streamx.kz"
                            className="font-heading font-bold"
                          >
                            {t("contact.emailLink")}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="relative">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 glass-effect">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-primary p-2 rounded-lg neon-glow">
                <Play className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-heading font-black neon-text">
                {t("footer.brand")}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {t("footer.copyright")}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
