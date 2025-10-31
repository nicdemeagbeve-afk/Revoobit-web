export const dynamic = 'force-dynamic';

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <h1>Forgot Password</h1>
      <p>
        A form to request a password reset link will be displayed here.
      </p>
    </div>
  );
}