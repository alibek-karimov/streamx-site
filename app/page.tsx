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

export default function StreamXHomePage() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const recaptcaResponse = recaptchaRef.current?.getValue();
    if (!recaptcaResponse) {
      alert("Пожалуйста, подтвердите, что вы не робот.");
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
        title: "Сообщение отправлено",
        description: "Мы свяжемся с вами в ближайшее время.",
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      alert(
        "Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже."
      );
      toast({
        title: "Ошибка отправки",
        description:
          "Не удалось отправить сообщение. Пожалуйста, попробуйте позже.",
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
                STREAMX
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#solutions"
                className="text-foreground hover:text-primary transition-colors hover:neon-text"
              >
                Видеостена
              </a>
              <a
                href="#features"
                className="text-foreground hover:text-primary transition-colors hover:neon-text"
              >
                Возможности
              </a>
              <a
                href="#product"
                className="text-foreground hover:text-primary transition-colors hover:neon-text"
              >
                Продукция
              </a>
              <a
                href="#support"
                className="text-foreground hover:text-primary transition-colors hover:neon-text"
              >
                Поддержка
              </a>
            </div>
            <Button className="tech-button neon-glow hover:scale-105 transition-transform">
              <a href="#contact">Связаться с нами</a>
            </Button>
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
                  Новое поколение технологий
                </Badge>
                <h1 className="text-2xl lg:text-4xl font-heading font-black">
                  ВИДЕОСТЕНА
                </h1>
                <h1 className="text-2xl lg:text-4xl font-heading font-black">
                  ТРАНСЛЯЦИИ С ДРОНОВ
                </h1>
                <h1 className="text-2xl lg:text-4xl font-heading font-black">
                  WEB ПЛАТФОРМА
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
                          alt="StreamX Video Wall"
                          className="w-full h-auto rounded-lg object-cover"
                        />
                      </CarouselItem>
                      <CarouselItem>
                        <img
                          src="carousel2.png"
                          alt="StreamX Drone Broadcast"
                          className="w-full h-auto rounded-lg object-cover"
                        />
                      </CarouselItem>
                      <CarouselItem>
                        <img
                          src="carousel3.png"
                          alt="StreamX Web Platform"
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
              Наше решение
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              StreamX предоставляет комплексное программно-аппаратное решение
              для управления видеоконтентом с использованием передовых
              технологий
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Settings,
                title: "Управление видео-стеной",
                description:
                  "Интуитивное управление множественными экранами с поддержкой различных форматов контента",
              },
              {
                icon: EyeIcon,
                title: "Онлайн трансляции",
                description:
                  "Надежная передача видео в режиме реального времени с минимальной задержкой, в том числе с дронов и других БПЛА",
              },
              {
                icon: Cloud,
                title: "Веб решение",
                description:
                  "Организуй обмен видео, аудио и данными через WEB.",
              },
              {
                icon: Zap,
                title: "Аппаратный видеозахват",
                description:
                  "Аппаратный/программный захват и воспроизведение видео через сеть.",
              },
              {
                icon: PictureInPicture2,
                title: "Мультиоконный режим",
                description:
                  "Организация отображения со множеством окон в режиме картинка в картинке.",
              },
              {
                icon: Eye,
                title: "Интеграция с ИИ",
                description: "Возможность интеграции с ИИ компонентами",
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
                  <CardTitle className="font-heading">
                    {feature.title}
                  </CardTitle>
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
                  Контроллер видеостены SXWall
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Предназначены для профессионального использования в задачах,
                  где необходимы высокая производительность и устойчивость к
                  сбоям. Эти устройства эффективно применяются в диспетчерских,
                  ситуационных и мониторинговых центрах, а также в
                  конференц-залах и залах заседаний, обеспечивая надёжную
                  визуализацию и управление видеоконтентом
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2 p-4 glass-effect rounded-lg neon-glow">
                  <div className="text-2xl font-heading font-bold text-primary neon-text">
                    24/7
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Время работы
                  </div>
                </div>
                <div className="space-y-2 p-4 glass-effect rounded-lg neon-glow">
                  <div className="text-2xl font-heading font-bold text-primary neon-text">
                    8K+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Разрешение
                  </div>
                </div>
              </div>
              <Button size="lg" className="tech-button neon-glow">
                Узнать подробности
              </Button>
            </div>
            <div className="relative">
              <Card className="holographic neon-glow scan-line">
                <CardContent className="p-8">
                  <img
                    src="controller.png"
                    alt="StreamX Web Platform"
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
              Особенности
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Надежность",
                description:
                  "Максимальная защита от сбоев и непрерывная работа системы",
              },
              {
                icon: TrendingUp,
                title: "Производительность",
                description:
                  "Высокая скорость обработки и передачи видеоконтента",
              },
              {
                icon: MapPin,
                title: "Сделано в КЗ",
                description:
                  "Разработано и произведено в Казахстане с учетом местных требований",
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
                    alt="StreamX Videowall"
                    className="rounded-lg object-cover"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              <h4 className="text-2xl font-heading font-bold">
                Максимальная эффективность и стабильность работы
              </h4>
              <h4 className="text-2xl font-heading font-bold">
                Эффективный инструмент визуализации в реальном времени — для
                быстрого анализа и уверенного принятия решений.
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
              Возможности
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              "Построение экранов высокого разрешения",
              "Поддержка множества окон с функцией картинка в картинке",
              "Поддержка до 16 входящих физических сигналов",
              "Отображение медиа-контента",
              "Вывод изображения с камер видеонаблюдения и IP-источников",
              "Встроенные программные средства удаленного захвата и отображения видео изображения",
              "Встроенные программные средства удаленной передачи видео изображения со встроенных камер",
              "Поддержка внешнего потокового вещания",
              "Удаленное управление через браузерное приложение с любого устройства",
              "Настройка масштабирования и коммутации выходов",
              "Запуск WEB страниц и приложений HTML5 / WebGL",
              "Запуск и управление приложений Windows",
            ].map((value, index) => (
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
                Поддержка аппаратного ускорения видеопотоков с применением GPU
                позволяет системе эффективно обрабатывать и передавать множество
                источников (IP-камеры, рабочие столы и др.) в формате 2160p@60
                на внешние сетевые устройства без потери производительности.
              </h6>
            </div>
            <div className="space-y-4 w-auto">
              <Card className="holographic neon-glow pulse-glow scan-line">
                <CardContent className="p-4 flex w-auto items-center justify-center">
                  <img
                    style={{ height: "350px" }}
                    src="videowall-controller.png"
                    alt="StreamX Videowall"
                    className="rounded-lg object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Products line section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-heading font-bold neon-text">
              ЛИНЕЙКА МОДЕЛЕЙ
            </h2>
            <p className="text-xl text-muted-foreground max-w-6xl mx-auto">
              Линейка наших продуктов разработана таким образом, чтобы
              удовлетворять широкий спектр задач — от стандартных и базовых до
              наиболее комплексных и специализированных. Мы предлагаем как
              готовые модели, так и возможность индивидуальной комплектации в
              соответствии с конкретными требованиями заказчика.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                title: "Light",
                description:
                  "Базовая модель для стандартных задач видеостен с поддержкой 4K.",
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
                title: "Standard",
                description:
                  "Расширенная модель с поддержкой 8K для высококачественной визуализации.",
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
                title: "Pro",
                description:
                  "Профессиональная модель с расширенными возможностями и высокой производительностью.",
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
                    {Object.entries(product.properties).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-xs text-muted-foreground">
                          {key}
                        </span>
                        <span className="text-sm font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardAction className="w-full flex flex-col text-center justify-center items-center p-4 space-y-2">
                  <div className="w-full flex flex-row justify-center items-center">
                    <Button className="w-40 tech-button neon-glow hover:scale-105 transition-transform">
                      Узнать цену
                    </Button>
                  </div>
                  <div className="w-full flex flex-row justify-center items-center">
                    <Button className="w-40 tech-button neon-glow hover:scale-105 transition-transform">
                      Datasheet
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
              Поддержка и сервис
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Мы предоставляем полный спектр услуг поддержки для обеспечения
              бесперебойной работы вашей системы
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: Settings,
                title: "Техническая поддержка 24/7",
                description:
                  "Круглосуточная техническая поддержка для решения любых вопросов",
              },
              {
                icon: Shield,
                title: "Гарантийное обслуживание",
                description:
                  "Полная гарантия на оборудование и программное обеспечение",
              },
              {
                icon: Brain,
                title: "Обучение персонала",
                description:
                  "Комплексное обучение вашей команды работе с системой",
              },
              {
                icon: Zap,
                title: "Удаленная диагностика",
                description:
                  "Быстрая диагностика и устранение неисправностей удаленно",
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

          {/* <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-heading font-bold neon-text">
                Сервисные пакеты
              </h3>
              <div className="space-y-4">
                <Card className="glass-effect neon-glow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-heading font-bold text-primary">
                          Базовый пакет
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Стандартная поддержка в рабочие часы
                        </p>
                      </div>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        Включено
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="glass-effect neon-glow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-heading font-bold text-primary">
                          Премиум пакет
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          24/7 поддержка + приоритетное обслуживание
                        </p>
                      </div>
                      <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">
                        Рекомендуем
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="relative">
              <Card className="holographic neon-glow scan-line">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto neon-glow pulse-glow">
                      <Shield className="h-10 w-10 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-heading font-bold neon-text">
                        Время отклика
                      </h4>
                      <div className="text-3xl font-heading font-black text-primary neon-text">
                        15 мин
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Среднее время ответа службы поддержки
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div> */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-heading font-bold neon-text">
              Связаться с нами
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Готовы обсудить ваш проект? Свяжитесь с нашими экспертами для
              получения персонализированного решения
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-heading font-bold neon-text">
                  Контактная информация
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
                            Написать на Whatsapp
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
                            Написать на info@streamx.kz
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="holographic neon-glow scan-line">
                <CardHeader>
                  <CardTitle className="font-heading neon-text">
                    Отправить сообщение
                  </CardTitle>
                  <CardDescription>
                    Заполните форму и мы свяжемся с вами в ближайшее время
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Имя</label>
                        <input
                          name="name"
                          type="text"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all neon-glow"
                          placeholder="Ваше имя"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Компания</label>
                        <input
                          name="company"
                          type="text"
                          className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all neon-glow"
                          placeholder="Название компании"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input
                        name="email"
                        type="email"
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all neon-glow"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Телефон</label>
                      <input
                        name="phone"
                        type="tel"
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all neon-glow"
                        placeholder="+7 (___) ___-__-__"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Сообщение</label>
                      <textarea
                        name="message"
                        rows={4}
                        className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all neon-glow resize-none"
                        placeholder="Расскажите о вашем проекте..."
                      />
                    </div>
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6Lc01aUrAAAAAAAJGo8eiRCBWu13ncdGCGafkBuf"
                      onChange={() => console.log("reCAPTCHA changeed")}
                      size="invisible"
                    />
                    <Button
                      className="w-full tech-button neon-glow hover:scale-105 transition-all"
                      type="submit"
                    >
                      Отправить сообщение
                    </Button>
                  </form>
                </CardContent>
              </Card>
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
                STREAMX
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 StreamX. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
