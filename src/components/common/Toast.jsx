import React from 'react';
import { useQuran } from '../../context/QuranContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useQuran();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    info: <Info className="w-5 h-5 text-gold-400" />
  };

  const bgStyles = {
    success: 'bg-emerald-950/95 border-emerald-500/40 text-emerald-100',
    error: 'bg-rose-950/95 border-rose-500/40 text-rose-100',
    info: 'bg-slate-900/95 border-gold-500/40 text-slate-100'
  };

  return (
    <div className="fixed bottom-24 md:bottom-28 right-6 z-50 animate-bounce-in max-w-sm">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md transition-all ${bgStyles[toastMessage.type] || bgStyles.info}`}>
        {icons[toastMessage.type] || icons.info}
        <p className="text-sm font-medium">{toastMessage.message}</p>
      </div>
    </div>
  );
}
