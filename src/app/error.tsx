"use client"; // los componentes de error siempre son Client Components

interface ErrorProps {
  error: Error;
  retry: () => void;
}

export default function Error({ error, retry }: ErrorProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-rose-500/40 bg-rose-500/5 px-6 py-16 text-center">
      <p className="text-4xl">🌀</p>
      <h2 className="mt-4 text-xl font-semibold">Algo salió mal al abrir el portal</h2>
      <p className="mt-2 max-w-md text-sm text-muted">
        No pudimos conectar con la Rick and Morty API. Revisa tu conexión a internet.
      </p>
      <p className="mt-2 text-xs text-slate-500">Detalle: {error.message}</p>
      <button
        type="button"
        onClick={() => retry()}
        className="mt-6 rounded-full bg-portal px-5 py-2 text-sm font-semibold text-bg hover:bg-portal-dark"
      >
        Reintentar
      </button>
    </div>
  );
}
