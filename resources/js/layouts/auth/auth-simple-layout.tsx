import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#fff6f1] p-6 md:p-10">
            <div className="w-full max-w-sm"> <div className="flex flex-col gap-8">
                <div className="flex flex-col items-center gap-4">
                    <div className="space-y-2 text-center">
                        <h1 className="text-xl font-bold text-[#4e2780]">{title}</h1>
                        <p className="text-center text-sm text-[#4e2780]/70">{description}</p>
                    </div>
                </div>
                {children}
            </div>
            </div>
        </div>
    );
}
