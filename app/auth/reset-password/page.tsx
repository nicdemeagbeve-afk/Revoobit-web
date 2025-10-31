export const dynamic = 'force-dynamic';

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <h1>Reset Password</h1>
      <p>
        A form to reset the user's password will be displayed here.
      </p>
      {searchParams.code && <p>Code: {searchParams.code}</p>}
    </div>
  );
}