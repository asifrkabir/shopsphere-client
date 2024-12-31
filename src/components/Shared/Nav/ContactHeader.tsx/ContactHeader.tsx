import { Mail, Phone } from "lucide-react";

export default function ContactHeader() {
  return (
    <header className="sticky w-full bg-emerald-900 px-4 py-2 hidden lg:block">
      <div className="h-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5" />
          <span className="text-sm">Inquiries: asifrkabir.work@gmail.com</span>
        </div>

        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5" />
          <span className="text-sm">Hotline: +1 234 567 890</span>
        </div>
      </div>
    </header>
  );
}
