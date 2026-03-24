import { SignUpForm } from "@/components/features/supabase/SignUpForm";
import { Card, CardContent } from "@/components/ui/card";

const SignUpPage = () => {
    return (
        <Card>
            <CardContent>
                <p className="text-center text-xl/none font-medium">Create Your Account</p>
                <p className="text-muted-foreground mt-2 text-center text-sm">
                    Create your Supabase account. Email/password and OAuth are supported.
                </p>
                <div className="mt-6">
                    <SignUpForm />
                </div>
            </CardContent>
        </Card>
    );
};

export default SignUpPage;
