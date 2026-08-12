import { Link } from 'wouter';
import { AlertTriangle, ChevronRight } from 'lucide-react';

export default function PaymentNotice() {
  return (
    <Link
      href="/payment-information"
      className="flex h-8 items-center gap-1.5 bg-[#C8102E] px-3 text-white transition-colors hover:bg-[#A50D25]"
      data-testid="payment-notice"
    >
      <AlertTriangle size={13} className="flex-shrink-0" strokeWidth={2.5} />
      <span className="min-w-0 flex-1 truncate text-center text-[11px] font-semibold tracking-wide sm:hidden">
        Pay only to our official Japan bank account
      </span>
      <span className="hidden min-w-0 flex-1 truncate text-center text-[11px] font-semibold tracking-wide sm:inline">
        Payment Notice — We ONLY accept payments to our official Wazir Trading LLC bank account in Japan. Beware of fraud.
      </span>
      <ChevronRight size={12} className="flex-shrink-0 opacity-75" strokeWidth={2.5} />
    </Link>
  );
}
