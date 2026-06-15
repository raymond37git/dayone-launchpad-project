import LoginForm from "./components/LoginForm";

async function handleLogin(username: string, password: string) {
  "use server";
  console.log("Login:", { username, password });
}

async function handleCreateAccount(username: string, password: string) {
  "use server";
  console.log("Create account:", { username, password });
}

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-16 dark:bg-black">
      <LoginForm onLogin={handleLogin} onCreateAccount={handleCreateAccount} />
    </div>
  );
}
