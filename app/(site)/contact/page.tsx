import type { Metadata } from "next";
import { ContactPage } from "@/components/contact-page";

export const metadata: Metadata = {
  title: "Contact | Custom Bike",
};

export default function ContactRoute() {
  return <ContactPage />;
}
