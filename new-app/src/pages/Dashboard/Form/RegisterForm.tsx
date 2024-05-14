import { useRouter } from "next/router";

export default function RegisterForm() {
  const router = useRouter();

  return (
    <form>
      <p>already account?</p>
      <button onClick={() => router.push("/LoginForm")}>Sign in</button>
    </form>
  );
}
