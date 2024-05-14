import { useRouter } from "next/router";

interface RegisterUser {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  return (
    <form>
      <p>Haven't account?</p>
      <button onClick={() => router.push("/RegsterForm")}>Registrer</button>
    </form>
  );
}
