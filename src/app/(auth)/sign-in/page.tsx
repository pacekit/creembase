import { SignInForm } from "@/components/features/supabase/SignInForm";
import { Card, CardContent } from "@/components/ui/card";

const SignInPage = () => {
    return (
        <Card>
            <CardContent>
                <p className="text-center text-xl/none font-medium">Greetings Again</p>
                <p className="text-muted-foreground mt-2 text-center text-sm">
                    Sign in with your Supabase account. Email/password and OAuth are supported.
                </p>
                <div className="mt-6">
                    <SignInForm />
                </div>
            </CardContent>
        </Card>
    );
};

export default SignInPage;
