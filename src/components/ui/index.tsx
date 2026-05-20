import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react';

interface ChildrenProps {
  children: ReactNode;
}

interface DataProps {
  dataId: string;
  roleName?: string;
}

interface ButtonProps extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'onClick' | 'type'>, DataProps {
  label?: string;
  children: ReactNode;
}

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement>, DataProps {
  label: string;
  icon?: ReactNode;
}

interface SelectButtonProps extends DataProps {
  selected?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

export function AppShell({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div
      {...props}
      className="relative min-h-screen overflow-hidden bg-[#f6f7f9] text-zinc-950 antialiased dark:bg-[#080b12] dark:text-zinc-50"
    >
      <div
        data-melius-ui-id="app-ambient-gradient"
        data-melius-ui-role="background"
        className="ambient-gradient pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(248,250,252,0.99),rgba(241,245,249,0.96)_38%,rgba(226,232,240,0.88)_72%,rgba(236,241,245,0.92))] dark:bg-[linear-gradient(135deg,rgba(8,11,18,1),rgba(15,23,42,0.98)_38%,rgba(20,36,50,0.94)_74%,rgba(8,27,34,0.94))]"
      />
      <div
        data-melius-ui-id="app-ambient-grid"
        data-melius-ui-role="background"
        className="pointer-events-none absolute inset-0 opacity-[0.36] [background-image:linear-gradient(rgba(15,23,42,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.055)_1px,transparent_1px)] [background-size:42px_42px] dark:opacity-[0.22] dark:[background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]"
      />
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}

export function WorkspaceFrame({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div {...props} className="relative flex min-h-screen w-full overflow-hidden">
      {children}
    </div>
  );
}

export function SidebarShell({ children, ...props }: HTMLAttributes<HTMLElement> & ChildrenProps) {
  return (
    <aside
      {...props}
      className="hidden h-screen w-64 shrink-0 flex-col overflow-hidden border-r border-zinc-950/[0.08] bg-white/[0.78] shadow-[12px_0_56px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-zinc-950/[0.70] dark:shadow-black/30 md:flex"
    >
      {children}
    </aside>
  );
}

export function MobileDrawer({ children, ...props }: HTMLAttributes<HTMLElement> & ChildrenProps) {
  return (
    <aside
      {...props}
      className="drawer-enter fixed inset-y-0 left-0 z-50 flex w-[min(18rem,calc(100vw-2rem))] flex-col border-r border-zinc-950/[0.08] bg-white/[0.90] shadow-2xl shadow-zinc-950/25 backdrop-blur-2xl dark:border-white/[0.10] dark:bg-zinc-950/[0.90] md:hidden"
    >
      {children}
    </aside>
  );
}

export function Overlay({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div {...props} className="fixed inset-0 z-40 bg-zinc-950/45 backdrop-blur-sm md:hidden">
      {children}
    </div>
  );
}

export function SidebarHeader({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div {...props} className="flex min-h-16 items-center gap-3 border-b border-zinc-950/[0.08] px-4 dark:border-white/[0.08]">
      {children}
    </div>
  );
}

export function WorkspaceHeader({ children, ...props }: HTMLAttributes<HTMLElement> & ChildrenProps) {
  return (
    <header
      {...props}
      className="sticky top-0 z-30 flex min-h-16 items-center gap-3 border-b border-white/[0.72] bg-white/[0.70] px-3 shadow-sm shadow-zinc-950/[0.04] backdrop-blur-2xl dark:border-white/[0.08] dark:bg-zinc-950/[0.54] sm:px-4"
    >
      {children}
    </header>
  );
}

export function BrandMark({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div
      {...props}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-slate-950 via-blue-900 to-slate-700 text-white shadow-lg shadow-slate-950/15 dark:from-slate-100 dark:via-blue-200 dark:to-teal-200 dark:text-slate-950"
    >
      {children}
    </div>
  );
}

export function IconButton({ dataId, roleName, label, children, onClick, disabled, type = 'button' }: ButtonProps) {
  if (disabled) {
    return (
      <button
        type={type}
        data-melius-ui-id={dataId}
        data-melius-ui-role={roleName}
        aria-label={label}
        title={label}
        onClick={onClick}
        disabled
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-zinc-400 transition-colors dark:text-zinc-600"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      aria-label={label}
      title={label}
      onClick={onClick}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-zinc-600 transition-colors hover:bg-zinc-950/[0.06] hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/[0.10] dark:hover:text-white"
    >
      {children}
    </button>
  );
}

export function PrimaryButton({ dataId, roleName, children, onClick, disabled, type = 'button' }: ButtonProps) {
  if (disabled) {
    return (
      <button
        type={type}
        data-melius-ui-id={dataId}
        data-melius-ui-role={roleName}
        onClick={onClick}
        disabled
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl bg-zinc-300 px-4 py-2 text-sm font-bold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      onClick={onClick}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-900 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ dataId, roleName, children, onClick, disabled, type = 'button' }: ButtonProps) {
  if (disabled) {
    return (
      <button
        type={type}
        data-melius-ui-id={dataId}
        data-melius-ui-role={roleName}
        onClick={onClick}
        disabled
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-zinc-950/[0.10] bg-white/[0.48] px-4 py-2 text-sm font-bold text-zinc-400 dark:border-white/[0.10] dark:bg-white/[0.04] dark:text-zinc-600"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      onClick={onClick}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-2xl border border-zinc-950/[0.10] bg-white/[0.62] px-4 py-2 text-sm font-bold text-zinc-800 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white dark:border-white/[0.12] dark:bg-white/[0.08] dark:text-zinc-100 dark:hover:bg-white/[0.13]"
    >
      {children}
    </button>
  );
}

export function GhostButton({ dataId, roleName, children, onClick, disabled, type = 'button' }: ButtonProps) {
  if (disabled) {
    return (
      <button
        type={type}
        data-melius-ui-id={dataId}
        data-melius-ui-role={roleName}
        onClick={onClick}
        disabled
        className="inline-flex min-h-9 items-center justify-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold text-zinc-400 dark:text-zinc-600"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={type}
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      onClick={onClick}
      className="inline-flex min-h-9 items-center justify-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold text-zinc-700 transition-colors hover:bg-zinc-950/[0.06] hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/[0.10] dark:hover:text-white"
    >
      {children}
    </button>
  );
}

export function RowButton({ dataId, roleName, selected, onClick, children }: SelectButtonProps) {
  if (selected) {
    return (
      <button
        type="button"
        data-melius-ui-id={dataId}
        data-melius-ui-role={roleName}
        aria-pressed="true"
        onClick={onClick}
        className="flex min-h-10 w-full items-center justify-between rounded-2xl bg-zinc-950/[0.08] px-3 py-2 text-left text-sm font-bold text-zinc-950 dark:bg-white/[0.12] dark:text-white"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      aria-pressed="false"
      onClick={onClick}
      className="flex min-h-10 w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-950/[0.05] hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/[0.09] dark:hover:text-white"
    >
      {children}
    </button>
  );
}

export function TabButton({ dataId, roleName, selected, onClick, children }: SelectButtonProps) {
  if (selected) {
    return (
      <button
        type="button"
        data-melius-ui-id={dataId}
        data-melius-ui-role={roleName}
        aria-pressed="true"
        onClick={onClick}
        className="h-10 min-w-0 rounded-xl bg-white px-3 text-sm font-bold text-zinc-950 shadow-sm shadow-zinc-950/[0.08] transition-colors dark:bg-zinc-900 dark:text-white"
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type="button"
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      aria-pressed="false"
      onClick={onClick}
      className="h-10 min-w-0 rounded-xl px-3 text-sm font-semibold text-zinc-600 transition-colors hover:bg-white/[0.62] hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/[0.08] dark:hover:text-white"
    >
      {children}
    </button>
  );
}

export function SearchInput({ dataId, roleName, label, icon, ...props }: SearchInputProps) {
  return (
    <label
      data-melius-ui-id={dataId}
      data-melius-ui-role={roleName}
      className="relative block"
    >
      <span className="sr-only">{label}</span>
      {icon}
      <input
        {...props}
        className="h-10 w-full rounded-2xl border border-transparent bg-zinc-950/[0.06] px-9 text-sm font-medium text-zinc-950 outline-none transition placeholder:text-zinc-500 focus:border-blue-700 dark:bg-white/[0.08] dark:text-white dark:placeholder:text-zinc-400 dark:focus:border-teal-300"
      />
    </label>
  );
}

export function Badge({ children, ...props }: HTMLAttributes<HTMLSpanElement> & ChildrenProps) {
  return (
    <span
      {...props}
      className="inline-flex w-fit items-center gap-1 rounded-xl border border-zinc-950/[0.10] bg-white/[0.62] px-2.5 py-1 text-xs font-bold text-zinc-700 backdrop-blur dark:border-white/[0.12] dark:bg-white/[0.08] dark:text-zinc-200"
    >
      {children}
    </span>
  );
}

export function StrongBadge({ children, ...props }: HTMLAttributes<HTMLSpanElement> & ChildrenProps) {
  return (
    <span
      {...props}
      className="inline-flex w-fit items-center gap-1 rounded-xl bg-white/[0.18] px-2.5 py-1 text-xs font-bold text-white backdrop-blur"
    >
      {children}
    </span>
  );
}

export function CardSurface({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div
      {...props}
      className="app-card-enter overflow-hidden rounded-3xl border border-zinc-950/[0.08] bg-white/[0.82] shadow-sm shadow-zinc-950/[0.04] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-800/25 hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.055] dark:shadow-black/20 dark:hover:border-teal-200/25 dark:hover:bg-white/[0.085]"
    >
      {children}
    </div>
  );
}

export function PanelSurface({ children, ...props }: HTMLAttributes<HTMLDivElement> & ChildrenProps) {
  return (
    <div
      {...props}
      className="overflow-hidden rounded-3xl border border-zinc-950/[0.08] bg-white/[0.72] backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.055]"
    >
      {children}
    </div>
  );
}

export function ProgressBar({ value, dataId }: { value: number; dataId: string }) {
  return (
    <div
      data-melius-ui-id={dataId}
      data-melius-ui-role="progress"
      className="h-2 overflow-hidden rounded-full bg-zinc-950/[0.08] dark:bg-white/[0.10]"
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-slate-800 via-blue-800 to-teal-700 dark:from-slate-200 dark:via-blue-200 dark:to-teal-200"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
