export const dynamic = 'force-dynamic';

export default function SignupPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <h1>Inscription</h1>
      <p>
        Un formulaire d'inscription sera affiché ici.
      </p>
      {searchParams.message && <p>{searchParams.message}</p>}
    </div>
  );
}