'use client';
import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ContactForm() {
  const { t } = useTranslation();
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log('Form Data:', Object.fromEntries(formData.entries()));
    const recaptcaResponse = await recaptchaRef.current?.executeAsync();
    if (!recaptcaResponse) {
      alert(t('contact.form.recaptchaMissing'));
      return;
    }
    formData.append('g-recaptcha-response', recaptcaResponse);
    const templateProperties = Object.fromEntries(formData.entries());
    try {
      const response = await emailjs.send(
        'service_p3l06sf',
        'template_zem3rml',
        templateProperties,
        {publicKey: 'aw__uXPnTqpkI3j9J'}
      );
      console.log('Email sent successfully:', response);
      toast({
        title: t('contact.form.sendSuccess.title'),
        description: t('contact.form.sendSuccess.description'),
        variant: 'default',
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      toast({
        title: t('contact.form.sendError.title'),
        description: t('contact.form.sendError.description'),
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="holographic neon-glow scan-line">
      <CardHeader>
        <CardTitle className="font-heading neon-text">
          {t('contact.form.title')}
        </CardTitle>
        <CardDescription>{t('contact.form.description')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t('contact.form.label.name')}
              </label>
              <input
                name="name"
                type="text"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all neon-glow"
                placeholder={t('contact.form.placeholder.name')}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                {t('contact.form.label.company')}
              </label>
              <input
                name="company"
                type="text"
                className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all neon-glow"
                placeholder={t('contact.form.placeholder.company')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('contact.form.label.email')}
            </label>
            <input
              name="email"
              type="email"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all neon-glow"
              placeholder={t('contact.form.placeholder.email')}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('contact.form.label.phone')}
            </label>
            <input
              name="phone"
              type="tel"
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all neon-glow"
              placeholder={t('contact.form.placeholder.phone')}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t('contact.form.label.message')}
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full px-4 py-3 bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all neon-glow resize-none"
              placeholder={t('contact.form.placeholder.message')}
            />
          </div>

          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6Lc01aUrAAAAAAAJGo8eiRCBWu13ncdGCGafkBuf"
            onChange={() => console.log('reCAPTCHA changed')}
            size="invisible"
          />

          <Button
            className="w-full tech-button neon-glow hover:scale-105 transition-all"
            type="submit"
          >
            {t('contact.form.submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}