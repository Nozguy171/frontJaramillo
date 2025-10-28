export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400">
      © {new Date().getFullYear()} ACKER — Todos los derechos reservados
    </footer>
  );
}
