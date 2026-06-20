import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import shared from "@/styles/shared.module.css";
import styles from "./admin.module.css";

export function AdminLogin({ onLogin }: { onLogin: (password: string) => Promise<void> }) {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onLogin(password);
    } catch {
      setError(t("common.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={shared.page}>
      <header className={shared.pageHeader}>
        <h1>{t("admin.title")}</h1>
        <p>{t("admin.subtitle")}</p>
      </header>
      <form className={styles.loginForm} onSubmit={(e) => void handleSubmit(e)}>
        <div className={shared.field}>
          <label htmlFor="admin-password">{t("admin.password")}</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className={shared.error}>{error}</p>}
        <button type="submit" className={shared.button} disabled={loading}>
          {t("admin.login")}
        </button>
      </form>
    </div>
  );
}
