
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>();
  const { toast } = useToast();
  
  const onSubmit = (data: ContactFormValues) => {
    console.log('Form submitted:', data);
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll respond shortly.",
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <div className="space-y-4">
        <div>
          <Input
            {...register("name", { required: "Name is required" })}
            placeholder="Your Name"
            className="w-full"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            placeholder="Your Email"
            type="email"
            className="w-full"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("phone", { 
              required: "Phone number is required",
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: "Invalid phone number"
              }
            })}
            placeholder="Your Phone"
            className="w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Textarea
            {...register("message", { required: "Message is required" })}
            placeholder="Your Message"
            className="w-full min-h-[120px]"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-telecom-blue hover:bg-telecom-light-blue text-white"
        >
          Send Message
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
