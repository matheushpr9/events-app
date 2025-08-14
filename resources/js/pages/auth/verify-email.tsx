// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';
import Header from '../components/Header';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <Header />
            <AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
                <Head title="Email verification" />

                {status === 'verification-link-sent' && (
                    <div className="mb-4 text-center text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg py-2 px-3">
                        A new verification link has been sent to the email address you provided during registration.
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6 text-center">
                    <Button
                        disabled={processing}
                        className="w-full sm:w-auto bg-[#4e2780] text-white font-semibold rounded-xl shadow-md hover:bg-[#3a1e5a] focus:outline-none focus:ring-2 focus:ring-[#b39ddb] focus:ring-offset-2 transition-all duration-300"
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Resend verification email
                    </Button>

                    <TextLink
                        href={route('logout')}
                        method="post"
                        className="mx-auto block text-sm text-[#4e2780] hover:underline focus:outline-none focus:ring-2 focus:ring-[#b39ddb] rounded"
                    >
                        Log out
                    </TextLink>
                </form>
            </AuthLayout>
        </>
    );
}
