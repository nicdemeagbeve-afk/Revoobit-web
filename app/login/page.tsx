export const dynamic = 'force-dynamic';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <h1>Connexion</h1>
      <p>
        Un formulaire de connexion sera affiché ici.
      </p>
      {searchParams.message && <p>{searchParams.message}</p>}
    </div>
  );
}