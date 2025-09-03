import { X } from 'lucide-react';
import { useState } from 'react';

type BannerAlertProps = {
    type: 'info' | 'warning' | 'error' | 'success';
    message: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    dismissible?: boolean;
};

const COLORS = {
    info: { bg: 'bg-blue-50', text: 'text-blue-800', border: 'border-blue-200' },
    warning: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
    error: { bg: 'bg-red-50', text: 'text-red-800', border: 'border-red-200' },
    success: { bg: 'bg-green-50', text: 'text-green-800', border: 'border-green-200' },
};

export default function BannerAlert({
    type, message, description, actionLabel, onAction, dismissible = true
}: BannerAlertProps) {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;
    const color = COLORS[type];
    return (
        <div className={`w-full flex items-center justify-between px-4 py-2 border-l-4 ${color.bg} ${color.text} ${color.border} shadow-sm`}>
            <div>
                <p className="font-semibold">{message}</p>
                {description && <p className="text-sm opacity-80">{description}</p>}
                {actionLabel && onAction && (
                    <button
                        onClick={onAction}
                        className="mt-2 px-4 py-2 rounded bg-blue-700 text-white font-semibold text-sm hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-500"
                    >
                        {actionLabel}
                    </button>
                )}
            </div>
            {dismissible && (
                <button
                    onClick={() => setVisible(false)}
                    aria-label="Fechar alerta"
                    className="ml-4 p-1 rounded hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                    <X className="w-5 h-5" />
                </button>
            )}
        </div>
    );
}
